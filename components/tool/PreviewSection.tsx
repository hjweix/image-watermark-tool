"use client"

import { Eye, ImageIcon, CheckCircle2, Clock } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Rnd } from "react-rnd"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from 'next-intl'
import ExifDataSection from "./ExifDataSection"
import Watermark from "./Watermark"
import { motion, AnimatePresence } from "framer-motion"

type ImageFile = {
  id: string
  file: File
  url: string
  exifData?: any
  watermarkedUrl?: string
}

type PreviewSectionProps = {
  images: ImageFile[]
  selectedImage: string | null
  currentTemplateConfig: any | null
  selectedTemplate: string
  updateTemplateStyle: (key: string, value: any) => void
  templateConfig: any
}

export default function PreviewSection({
  images,
  selectedImage,
  currentTemplateConfig,
  selectedTemplate,
  updateTemplateStyle,
  templateConfig,
}: PreviewSectionProps) {
  const t = useTranslations('preview')
  const selectedImageFile = images.find((img) => img.id === selectedImage)
  const imageRef = useRef<HTMLImageElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  // 当图片加载完成或选中的图片改变时，保存预览图片的尺寸信息
  useEffect(() => {
    if (selectedImageFile && imageRef.current && imageRef.current.complete) {
      updateTemplateStyle("_previewWidth", imageRef.current.clientWidth)
      updateTemplateStyle("_previewHeight", imageRef.current.clientHeight)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImage]) // 移除updateTemplateStyle依赖，避免无限循环

  // 图片加载完成时保存尺寸信息
  const handleImageLoad = useCallback(() => {
    if (imageRef.current) {
      // 使用setTimeout避免在渲染周期内更新状态
      setTimeout(() => {
        updateTemplateStyle("_previewWidth", imageRef.current?.clientWidth || 0)
        updateTemplateStyle("_previewHeight", imageRef.current?.clientHeight || 0)
      }, 0)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // 不依赖updateTemplateStyle，避免重新创建函数

  return (
    <div className="xl:col-span-2 order-first xl:order-none">
      <Card className="border-warm-200/50 shadow-md overflow-hidden bg-white">
        <CardHeader className="pb-4 border-b border-warm-100">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-charcoal">
            <div className="w-8 h-8 bg-warm-100 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-warm-dark" />
            </div>
            {t('preview')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {selectedImageFile ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-5"
              >
                {/* Large Preview Image */}
                <div
                  className="relative bg-warm-50/50 rounded-2xl overflow-hidden border border-warm-200/50"
                  style={{ minHeight: "400px" }}
                >
                  <img
                    ref={imageRef}
                    src={selectedImageFile.url}
                    alt="Preview"
                    className="w-full h-auto max-h-[70vh] object-contain rounded-2xl"
                    onLoad={handleImageLoad}
                  />

                  {/* 辅助线网格 - 悬停时显示 */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
                      {[...Array(9)].map((_, i) => (
                        <div key={i} className="border border-warm-200/30" />
                      ))}
                    </div>
                  </div>

                  {currentTemplateConfig && selectedImageFile && (
                    <Rnd
                      key={`watermark-${selectedImage}-${templateConfig.width}-${templateConfig.height}`}
                      size={{
                        width: templateConfig.width || 200,
                        height: templateConfig.height || 100,
                      }}
                      position={(() => {
                        const defaultX = 20
                        const defaultY = imageRef.current ? imageRef.current.clientHeight - (templateConfig.height || 100) - 20 : 300

                        if (templateConfig.position === "custom") {
                          // 优先使用保存的相对位置比例
                          if (templateConfig._relativeX !== undefined && templateConfig._relativeY !== undefined && imageRef.current) {
                            const previewWidth = imageRef.current.clientWidth
                            const previewHeight = imageRef.current.clientHeight
                            return {
                              x: templateConfig._relativeX * previewWidth,
                              y: templateConfig._relativeY * previewHeight
                            }
                          }
                          // 兼容旧版本：使用绝对像素值
                          return {
                            x: templateConfig.offsetX || defaultX,
                            y: templateConfig.offsetY || defaultY
                          }
                        }

                        // 根据position配置计算位置
                        const imageWidth = imageRef.current?.clientWidth || 800
                        const imageHeight = imageRef.current?.clientHeight || 600
                        const watermarkWidth = templateConfig.width || 200
                        const watermarkHeight = templateConfig.height || 100
                        const offsetX = templateConfig.offsetX || 20
                        const offsetY = templateConfig.offsetY || 20

                        switch (templateConfig.position) {
                          case "top-left":
                            return { x: offsetX, y: offsetY }
                          case "top-center":
                            return { x: (imageWidth - watermarkWidth) / 2 + offsetX, y: offsetY }
                          case "top-right":
                            return { x: imageWidth - watermarkWidth - offsetX, y: offsetY }
                          case "center-left":
                            return { x: offsetX, y: (imageHeight - watermarkHeight) / 2 + offsetY }
                          case "center":
                            return { x: (imageWidth - watermarkWidth) / 2 + offsetX, y: (imageHeight - watermarkHeight) / 2 + offsetY }
                          case "center-right":
                            return { x: imageWidth - watermarkWidth - offsetX, y: (imageHeight - watermarkHeight) / 2 + offsetY }
                          case "bottom-left":
                            return { x: offsetX, y: imageHeight - watermarkHeight - offsetY }
                          case "bottom-center":
                            return { x: (imageWidth - watermarkWidth) / 2 + offsetX, y: imageHeight - watermarkHeight - offsetY }
                          case "bottom-right":
                          default:
                            return { x: imageWidth - watermarkWidth - offsetX, y: imageHeight - watermarkHeight - offsetY }
                        }
                      })()}
                      onDragStart={() => setIsDragging(true)}
                      onDragStop={(e, d) => {
                        setIsDragging(false)
                        updateTemplateStyle("position", "custom")

                        if (imageRef.current) {
                          const previewWidth = imageRef.current.clientWidth
                          const previewHeight = imageRef.current.clientHeight

                          // 保存相对位置比例，而不是绝对像素值
                          const relativeX = d.x / previewWidth
                          const relativeY = d.y / previewHeight

                          updateTemplateStyle("offsetX", d.x)
                          updateTemplateStyle("offsetY", d.y)
                          updateTemplateStyle("_relativeX", relativeX)
                          updateTemplateStyle("_relativeY", relativeY)
                          updateTemplateStyle("_previewWidth", previewWidth)
                          updateTemplateStyle("_previewHeight", previewHeight)
                        }
                      }}
                      onResizeStart={() => setIsDragging(true)}
                      onResizeStop={(e, direction, ref, delta, position) => {
                        setIsDragging(false)
                        updateTemplateStyle("width", parseInt(ref.style.width) || 200)
                        updateTemplateStyle("height", parseInt(ref.style.height) || 100)
                        updateTemplateStyle("position", "custom")

                        if (imageRef.current) {
                          const previewWidth = imageRef.current.clientWidth
                          const previewHeight = imageRef.current.clientHeight

                          // 保存相对位置比例，而不是绝对像素值
                          const relativeX = position.x / previewWidth
                          const relativeY = position.y / previewHeight

                          updateTemplateStyle("offsetX", position.x)
                          updateTemplateStyle("offsetY", position.y)
                          updateTemplateStyle("_relativeX", relativeX)
                          updateTemplateStyle("_relativeY", relativeY)
                          updateTemplateStyle("_previewWidth", previewWidth)
                          updateTemplateStyle("_previewHeight", previewHeight)
                        }
                      }}
                      bounds="parent"
                      className="watermark-container"
                      style={{
                        position: 'absolute',
                        zIndex: 10,
                        cursor: isDragging ? 'grabbing' : 'grab',
                        userSelect: 'none'
                      }}
                      enableResizing={{
                        top: true,
                        right: true,
                        bottom: true,
                        left: true,
                        topRight: true,
                        bottomRight: true,
                        bottomLeft: true,
                        topLeft: true
                      }}
                      resizeHandleStyles={{
                        top: {
                          backgroundColor: '#C4A484',
                          height: '10px',
                          width: '10px',
                          left: '50%',
                          top: '-5px',
                          marginLeft: '-5px',
                          cursor: 'n-resize',
                          borderRadius: '50%',
                          border: '2px solid white',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                        },
                        right: {
                          backgroundColor: '#C4A484',
                          width: '10px',
                          height: '10px',
                          right: '-5px',
                          top: '50%',
                          marginTop: '-5px',
                          cursor: 'e-resize',
                          borderRadius: '50%',
                          border: '2px solid white',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                        },
                        bottom: {
                          backgroundColor: '#C4A484',
                          height: '10px',
                          width: '10px',
                          left: '50%',
                          bottom: '-5px',
                          marginLeft: '-5px',
                          cursor: 's-resize',
                          borderRadius: '50%',
                          border: '2px solid white',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                        },
                        left: {
                          backgroundColor: '#C4A484',
                          width: '10px',
                          height: '10px',
                          left: '-5px',
                          top: '50%',
                          marginTop: '-5px',
                          cursor: 'w-resize',
                          borderRadius: '50%',
                          border: '2px solid white',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                        },
                        topRight: {
                          backgroundColor: '#C4A484',
                          width: '10px',
                          height: '10px',
                          right: '-5px',
                          top: '-5px',
                          cursor: 'ne-resize',
                          borderRadius: '50%',
                          border: '2px solid white',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                        },
                        bottomRight: {
                          backgroundColor: '#C4A484',
                          width: '10px',
                          height: '10px',
                          right: '-5px',
                          bottom: '-5px',
                          cursor: 'se-resize',
                          borderRadius: '50%',
                          border: '2px solid white',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                        },
                        bottomLeft: {
                          backgroundColor: '#C4A484',
                          width: '10px',
                          height: '10px',
                          left: '-5px',
                          bottom: '-5px',
                          cursor: 'sw-resize',
                          borderRadius: '50%',
                          border: '2px solid white',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                        },
                        topLeft: {
                          backgroundColor: '#C4A484',
                          width: '10px',
                          height: '10px',
                          left: '-5px',
                          top: '-5px',
                          cursor: 'nw-resize',
                          borderRadius: '50%',
                          border: '2px solid white',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                        }
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          pointerEvents: 'none',
                          overflow: 'hidden'
                        }}
                      >
                        <Watermark
                          config={templateConfig}
                          selectedTemplate={selectedTemplate}
                          exifData={selectedImageFile.exifData}
                        />
                      </div>
                    </Rnd>
                  )}
                </div>

                {/* Preview Info */}
                {selectedImageFile && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-warm-50/70 rounded-xl p-4 border border-warm-200/50"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-xs text-charcoal-muted block mb-1">{t('fileName')}</span>
                        <p className="font-medium text-charcoal truncate text-xs">{selectedImageFile.file.name}</p>
                      </div>
                      <div>
                        <span className="text-xs text-charcoal-muted block mb-1">{t('fileSize')}</span>
                        <p className="font-medium text-charcoal text-xs">
                          {(selectedImageFile.file.size / 1024 / 1024).toFixed(1)} MB
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-charcoal-muted block mb-1">{t('status')}</span>
                        <div className="font-medium">
                          {selectedImageFile.watermarkedUrl ? (
                            <Badge variant="secondary" className="bg-sage/20 text-sage border-sage/30 text-xs">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              {t('processed')}
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-charcoal-muted border-warm-200 text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {t('pending')}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-xs text-charcoal-muted block mb-1">{t('watermark')}</span>
                        <p className="font-medium text-charcoal text-xs capitalize">{currentTemplateConfig?.name}</p>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* EXIF Data Section */}
                <ExifDataSection image={selectedImageFile} />
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full aspect-video bg-gradient-to-br from-warm-50 to-warm-100/50 rounded-2xl flex flex-col items-center justify-center min-h-[400px] border border-warm-200/50 border-dashed"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                  className="w-20 h-20 bg-warm-100 rounded-2xl flex items-center justify-center mb-4"
                >
                  <ImageIcon className="w-10 h-10 text-warm" />
                </motion.div>
                <p className="text-lg font-medium text-charcoal mb-2">{t('first')}</p>
                <p className="text-sm text-charcoal-muted">{t('supportDrag')}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </div>
  )
}
