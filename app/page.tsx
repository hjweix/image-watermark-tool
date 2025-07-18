"use client"

import type React from "react"
import { useCallback, useRef, useEffect, useState } from "react"
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Get current template configuration
  const currentTemplateConfig = templateConfigs[selectedTemplate as keyof typeof templateConfigs]

  // Extract EXIF data from image
  const extractExifData = useCallback(async (file: File): Promise<any> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const dataView = new DataView(arrayBuffer)

        // Simple EXIF extraction (in a real app, you'd use a library like exif-js)
        // For demo purposes, we'll simulate EXIF data
        const mockExifData = {
          dateTime: new Date().toISOString().slice(0, 19).replace("T", " "),
          gps: {
            latitude: 39.9042 + (Math.random() - 0.5) * 0.1,
            longitude: 116.4074 + (Math.random() - 0.5) * 0.1,
            location: "",
          },
        }
        resolve(mockExifData)
      }
      reader.readAsArrayBuffer(file)
    })
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

  // Generate preview
  useEffect(() => {
    if (selectedImage) {
      const image = images.find((img) => img.id === selectedImage)
      if (image) {
        generateWatermark(image, templateConfig).then(setPreviewUrl)
      }
    }
  }, [selectedImage, templateConfig, images, generateWatermark])

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
  const downloadImage = (imageId: string) => {
    const image = images.find((img) => img.id === imageId)
    if (image?.watermarkedUrl) {
      const link = document.createElement("a")
      link.download = `${image.file.name.split(".")[0]}-watermarked.jpg`
      link.href = image.watermarkedUrl
      link.click()
    }
  }

  // Download all images as ZIP
  const downloadAllAsZip = async () => {
    // In a real implementation, you'd use a library like JSZip
    // For now, we'll download them individually
    images.forEach((image) => {
      if (image.watermarkedUrl) {
        setTimeout(() => downloadImage(image.id), 100)
      }
    })
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
              setPreviewUrl={setPreviewUrl}
              applyWatermarkToAll={applyWatermarkToAll}
              downloadAllAsZip={downloadAllAsZip}
            />

            <PreviewSection
              images={images}
              selectedImage={selectedImage}
              previewUrl={previewUrl}
              downloadImage={downloadImage}
              currentTemplateConfig={currentTemplateConfig}
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
