"use client"

import type React from "react"
import { useCallback, useRef, useEffect, useState } from "react"
import exifr from "exifr"
import Header from "@/components/header"
import { useTranslations } from 'next-intl'
import { templateConfigs, TemplateConfig } from "@/lib/templates"
import { generateWatermark as generateWatermarkUtil } from "@/lib/watermark"
import HeroSection from "@/components/tool/HeroSection"
import Footer from "@/components/tool/Footer"
import UploadSection from "@/components/tool/UploadSection"
import PreviewSection from "@/components/tool/PreviewSection"
import SettingsSection from "@/components/tool/SettingsSection"
import { motion } from "framer-motion"

type ImageFile = {
  id: string
  file: File
  url: string
  exifData?: any
  watermarkedUrl?: string
}

export default function ImageWatermarkTool() {
  useEffect(() => {
    document.title = `专业图片水印工具 - 免费在线时间地点水印制作 | PhotoStamper`

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

  const t = useTranslations('tool')
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

  const currentTemplateConfig = templateConfigs[selectedTemplate as keyof typeof templateConfigs]

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

  const applyWatermarkToAll = async () => {
    setIsProcessing(true)
    setProcessingProgress(0)

    for (let i = 0; i < images.length; i++) {
      const image = images[i]

      const tempImg = new Image()
      tempImg.src = image.url

      await new Promise<void>((resolve) => {
        tempImg.onload = async () => {
          const originalWidth = tempImg.naturalWidth
          const originalHeight = tempImg.naturalHeight

          const pWidth = templateConfig._previewWidth || 800
          const pHeight = templateConfig._previewHeight || (pWidth * originalHeight) / originalWidth
          const scale = originalWidth / pWidth

          const scaledConfig: TemplateConfig = {
            ...templateConfig,
            fontSize: templateConfig.fontSize * scale,
            offsetX: templateConfig.position === 'custom' ? templateConfig.offsetX : templateConfig.offsetX * scale,
            offsetY: templateConfig.position === 'custom' ? templateConfig.offsetY : templateConfig.offsetY * scale,
            width: templateConfig.width,
            height: templateConfig.height,
            _previewWidth: pWidth,
            _previewHeight: pHeight,
            _relativeX: templateConfig._relativeX,
            _relativeY: templateConfig._relativeY,
          }

          const watermarkedUrl = await generateWatermarkUtil(image, scaledConfig, selectedTemplate, canvasRef.current!)
          setImages((prev) => prev.map((img) => (img.id === image.id ? { ...img, watermarkedUrl } : img)))
          setProcessingProgress(((i + 1) / images.length) * 100)
          resolve()
        }
      })
    }

    setIsProcessing(false)
  }

  const downloadImage = async (imageId: string, previewWidth?: number, previewHeight?: number) => {
    const image = images.find((img) => img.id === imageId)
    if (!image) return

    const originalImage = new Image()
    originalImage.src = image.url

    originalImage.onload = async () => {
      const originalWidth = originalImage.naturalWidth
      const originalHeight = originalImage.naturalHeight

      const pWidth = previewWidth || 800
      const pHeight = previewHeight || (pWidth * originalHeight) / originalWidth

      const scale = originalWidth / pWidth

      const scaledConfig: TemplateConfig = {
        ...templateConfig,
        fontSize: templateConfig.fontSize * scale,
        offsetX: templateConfig.position === 'custom' ? templateConfig.offsetX : templateConfig.offsetX * scale,
        offsetY: templateConfig.position === 'custom' ? templateConfig.offsetY : templateConfig.offsetY * scale,
        width: templateConfig.width,
        height: templateConfig.height,
        _previewWidth: pWidth,
        _previewHeight: pHeight,
        _relativeX: templateConfig._relativeX,
        _relativeY: templateConfig._relativeY,
      }

      const watermarkedUrl = await generateWatermarkUtil(image, scaledConfig, selectedTemplate, canvasRef.current!)
      const link = document.createElement("a")
      link.download = `${image.file.name.split(".")[0]}-watermarked.jpg`
      link.href = watermarkedUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(watermarkedUrl)
    }
  }

  const downloadAllAsZip = async () => {
    setIsProcessing(true)
    setProcessingProgress(0)

    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      await downloadImage(image.id, undefined, undefined)
      setProcessingProgress(((i + 1) / images.length) * 100)
      await new Promise((resolve) => setTimeout(resolve, 200))
    }

    setIsProcessing(false)
  }

  const removeImage = (imageId: string) => {
    const imageToRemove = images.find((img) => img.id === imageId)
    if (!imageToRemove) return

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

  const updateTemplateContent = (key: string, value: any) => {
    setTemplateConfig((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [key]: value,
      },
    }))
  }

  const updateTemplateStyle = (key: string, value: any) => {
    setTemplateConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <HeroSection />

      {/* 主工具区域 */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-[1600px] mx-auto">
          {/* 标题区 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-14"
          >
            <div className="inline-flex items-center px-4 py-1.5 bg-warm-100 text-warm-dark rounded-full text-sm font-medium mb-5">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              {t('badge')}
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold text-charcoal mb-4">
              {t('title')}
            </h2>
            <p className="text-charcoal-light max-w-2xl mx-auto text-base md:text-lg">
              {t('description')}
            </p>
          </motion.div>

          {/* 三栏布局 */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 lg:gap-8">
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
              currentTemplateConfig={currentTemplateConfig}
              selectedTemplate={selectedTemplate}
              updateTemplateStyle={updateTemplateStyle}
              templateConfig={templateConfig}
            />

            <SettingsSection
              selectedTemplate={selectedTemplate}
              templateConfig={templateConfig}
              applyTemplate={applyTemplate}
              updateTemplateContent={updateTemplateContent}
              setTemplateConfig={setTemplateConfig}
            />
          </div>

          {/* Hidden canvas for image processing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </section>

      <Footer />
    </div>
  )
}
