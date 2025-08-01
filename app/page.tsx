"use client"

import type React from "react"
import { useCallback, useRef, useEffect, useState } from "react"
import exifr from "exifr"
import Header from "@/components/header"
import { useLanguage } from "@/contexts/language-context"
import { templateConfigs, TemplateConfig } from "@/lib/templates"
import { generateWatermark as generateWatermarkUtil } from "@/lib/watermark"
import HeroSection from "@/components/tool/HeroSection"
import Footer from "@/components/tool/Footer"
import UploadSection from "@/components/tool/UploadSection"
import PreviewSection from "@/components/tool/PreviewSection"
import SettingsSection from "@/components/tool/SettingsSection"

type ImageFile = {
  id: string
  file: File
  url: string
  exifData?: any
  watermarkedUrl?: string
}

// 在组件开头添加SEO优化的内容
export default function ImageWatermarkTool() {
  // 在return之前添加SEO相关的useEffect
  useEffect(() => {
    // 动态设置页面标题
    document.title = `专业图片水印工具 - 免费在线时间地点水印制作 | PhotoStamper`

    // 添加结构化数据
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PhotoStamper",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
      },
    }

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const { t } = useLanguage()
  const [images, setImages] = useState<ImageFile[]>([])
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern")
  const [templateConfig, setTemplateConfig] = useState<TemplateConfig>({
    ...templateConfigs.modern.defaultStyle,
    content: {},
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Get current template configuration
  const currentTemplateConfig = templateConfigs[selectedTemplate as keyof typeof templateConfigs]

  // Extract EXIF data from image
  const extractExifData = useCallback(async (file: File): Promise<any> => {
    try {
      const exif = await exifr.parse(file)
      if (!exif) return {}

      const gps = await exifr.gps(file)

      return {
        dateTime: exif.CreateDate ? exif.CreateDate.toISOString().slice(0, 19).replace("T", " ") : null,
        gps: gps ? { latitude: gps.latitude, longitude: gps.longitude } : null,
        ...exif,
      }
    } catch (error) {
      console.error("Error extracting EXIF data:", error)
      return {}
    }
  }, [])

  const generateWatermark = useCallback(
    (imageFile: ImageFile, config: TemplateConfig) => {
      if (!canvasRef.current) return Promise.resolve("")
      return generateWatermarkUtil(imageFile, config, selectedTemplate, canvasRef.current)
    },
    [selectedTemplate],
  )

  // Handle file upload
  const handleFileUpload = useCallback(
    async (files: FileList) => {
      const newImages: ImageFile[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file.type.startsWith("image/")) {
          const id = Math.random().toString(36).substr(2, 9)
          const url = URL.createObjectURL(file)
          const exifData = await extractExifData(file)

          newImages.push({
            id,
            file,
            url,
            exifData,
          })
        }
      }

      setImages((prev) => [...prev, ...newImages])
      if (newImages.length > 0 && !selectedImage) {
        setSelectedImage(newImages[0].id)
      }
    },
    [extractExifData, selectedImage],
  )

  // Handle drag and drop
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const files = e.dataTransfer.files
      handleFileUpload(files)
    },
    [handleFileUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  // Apply watermark to all images
  const applyWatermarkToAll = async () => {
    setIsProcessing(true)
    setProcessingProgress(0)

    for (let i = 0; i < images.length; i++) {
      const watermarkedUrl = await generateWatermark(images[i], templateConfig)
      setImages((prev) => prev.map((img) => (img.id === images[i].id ? { ...img, watermarkedUrl } : img)))
      setProcessingProgress(((i + 1) / images.length) * 100)
    }

    setIsProcessing(false)
  }

  // Download single image
  const downloadImage = async (imageId: string, previewWidth?: number, previewHeight?: number) => {
    const image = images.find((img) => img.id === imageId)
    if (!image) return

    const originalImage = new Image()
    originalImage.src = image.url

    originalImage.onload = async () => {
      const originalWidth = originalImage.naturalWidth
      const originalHeight = originalImage.naturalHeight

      // If preview dimensions are not provided, we can't guarantee a perfect match.
      // We'll use a default preview width for a reasonable approximation for batch downloads.
      const pWidth = previewWidth || 800 // A reasonable default if none provided
      const pHeight = previewHeight || (pWidth * originalHeight) / originalWidth

      const scale = originalWidth / pWidth

      const scaledConfig: TemplateConfig = {
        ...templateConfig,
        fontSize: templateConfig.fontSize * scale,
        padding: templateConfig.padding * scale,
        borderRadius: templateConfig.borderRadius * scale,
        offsetX: templateConfig.offsetX * scale,
        offsetY: templateConfig.offsetY * scale,
        // Scale width and height as well to ensure wrapping consistency
        width: templateConfig.width ? templateConfig.width * scale : undefined,
        height: templateConfig.height ? templateConfig.height * scale : undefined,
      }

      const watermarkedUrl = await generateWatermark(image, scaledConfig)
      const link = document.createElement("a")
      link.download = `${image.file.name.split(".")[0]}-watermarked.jpg`
      link.href = watermarkedUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(watermarkedUrl) // Clean up
    }
  }

  // Download all images as ZIP
  const downloadAllAsZip = async () => {
    setIsProcessing(true)
    setProcessingProgress(0)

    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      // We pass undefined for preview dimensions to use the default approximation
      await downloadImage(image.id, undefined, undefined)
      setProcessingProgress(((i + 1) / images.length) * 100)
      // Add a small delay to prevent browser from blocking multiple downloads
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    setIsProcessing(false)
  }

  // Remove single image
  const removeImage = (imageId: string) => {
    const imageToRemove = images.find((img) => img.id === imageId)
    if (!imageToRemove) return

    // Revoke the object URL to free up memory
    URL.revokeObjectURL(imageToRemove.url)
    if (imageToRemove.watermarkedUrl) {
      URL.revokeObjectURL(imageToRemove.watermarkedUrl)
    }

    const updatedImages = images.filter((img) => img.id !== imageId)
    setImages(updatedImages)

    if (selectedImage === imageId) {
      if (updatedImages.length > 0) {
        setSelectedImage(updatedImages[0].id)
      } else {
        setSelectedImage(null)
      }
    }
  }

  // Apply template
  const applyTemplate = (templateKey: string) => {
    const template = templateConfigs[templateKey as keyof typeof templateConfigs]
    if (template) {
      setSelectedTemplate(templateKey)
      setTemplateConfig({
        ...template.defaultStyle,
        content: {},
      })
    }
  }

  // Update template content
  const updateTemplateContent = (key: string, value: any) => {
    setTemplateConfig((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [key]: value,
      },
    }))
  }

  // Update template style
  const updateTemplateStyle = (key: string, value: any) => {
    setTemplateConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      <Header />
      <HeroSection />

      <div className="min-h-screen p-2 md:p-4">
        <div className="max-w-[1600px] mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              {t.toolBadge}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.toolTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.toolDescription}</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            <UploadSection
              images={images}
              selectedImage={selectedImage}
              isProcessing={isProcessing}
              processingProgress={processingProgress}
              fileInputRef={fileInputRef}
              handleDrop={handleDrop}
              handleDragOver={handleDragOver}
              handleFileUpload={handleFileUpload}
              setSelectedImage={setSelectedImage}
              setImages={setImages}
              applyWatermarkToAll={applyWatermarkToAll}
              downloadAllAsZip={downloadAllAsZip}
              removeImage={removeImage}
            />

            <PreviewSection
              images={images}
              selectedImage={selectedImage}
              downloadImage={downloadImage}
              currentTemplateConfig={currentTemplateConfig}
              selectedTemplate={selectedTemplate}
              updateTemplateStyle={updateTemplateStyle}
              templateConfig={templateConfig}
            />

            <SettingsSection
              selectedTemplate={selectedTemplate}
              templateConfig={templateConfig}
              applyTemplate={applyTemplate}
              updateTemplateStyle={updateTemplateStyle}
              updateTemplateContent={updateTemplateContent}
              setTemplateConfig={setTemplateConfig}
            />
          </div>

          {/* Hidden canvas for image processing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>

      <Footer />
    </div>
  )
}
