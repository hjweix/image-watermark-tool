"use client"

import { Eye, ImageIcon } from "lucide-react"
import { useState, useEffect, useRef, useCallback } from "react"
import { Rnd } from "react-rnd"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"
import ExifDataSection from "./ExifDataSection"
import Watermark from "./Watermark"
import { generateTemplateText } from "@/lib/watermark"

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
  const { t } = useLanguage()
  const selectedImageFile = images.find((img) => img.id === selectedImage)
  const imageRef = useRef<HTMLImageElement>(null)

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
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5" />
            {t.preview}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedImageFile ? (
            <div className="space-y-4">
              {/* Large Preview Image */}
              <div className="relative bg-gray-50 rounded-lg overflow-hidden" style={{ minHeight: "400px" }}>
                <img
                  ref={imageRef}
                  src={selectedImageFile.url}
                  alt="Preview"
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                  onLoad={handleImageLoad}
                />
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
                    onDragStop={(e, d) => {
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
                    onResizeStop={(e, direction, ref, delta, position) => {
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
                      cursor: 'move',
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
                        backgroundColor: '#3b82f6', 
                        height: '8px',
                        width: '8px',
                        left: '50%',
                        top: '-4px',
                        marginLeft: '-4px',
                        cursor: 'n-resize',
                        borderRadius: '50%'
                      },
                      right: { 
                        backgroundColor: '#3b82f6', 
                        width: '8px',
                        height: '8px',
                        right: '-4px',
                        top: '50%',
                        marginTop: '-4px',
                        cursor: 'e-resize',
                        borderRadius: '50%'
                      },
                      bottom: { 
                        backgroundColor: '#3b82f6', 
                        height: '8px',
                        width: '8px',
                        left: '50%',
                        bottom: '-4px',
                        marginLeft: '-4px',
                        cursor: 's-resize',
                        borderRadius: '50%'
                      },
                      left: { 
                        backgroundColor: '#3b82f6', 
                        width: '8px',
                        height: '8px',
                        left: '-4px',
                        top: '50%',
                        marginTop: '-4px',
                        cursor: 'w-resize',
                        borderRadius: '50%'
                      },
                      topRight: { 
                        backgroundColor: '#3b82f6', 
                        width: '8px', 
                        height: '8px',
                        right: '-4px',
                        top: '-4px',
                        cursor: 'ne-resize',
                        borderRadius: '50%'
                      },
                      bottomRight: { 
                        backgroundColor: '#3b82f6', 
                        width: '8px', 
                        height: '8px',
                        right: '-4px',
                        bottom: '-4px',
                        cursor: 'se-resize',
                        borderRadius: '50%'
                      },
                      bottomLeft: { 
                        backgroundColor: '#3b82f6', 
                        width: '8px', 
                        height: '8px',
                        left: '-4px',
                        bottom: '-4px',
                        cursor: 'sw-resize',
                        borderRadius: '50%'
                      },
                      topLeft: { 
                        backgroundColor: '#3b82f6', 
                        width: '8px', 
                        height: '8px',
                        left: '-4px',
                        top: '-4px',
                        cursor: 'nw-resize',
                        borderRadius: '50%'
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
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">{t.fileName}:</span>
                      <p className="font-medium truncate">{selectedImageFile.file.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">{t.fileSize}:</span>
                      <p className="font-medium">
                        {(selectedImageFile.file.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">{t.status}:</span>
                      <div className="font-medium">
                        {selectedImageFile.watermarkedUrl ? (
                          <Badge variant="secondary" className="text-xs">
                            {t.processed}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            {t.pending}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">{t.watermark}:</span>
                      <p className="font-medium capitalize">{currentTemplateConfig?.name}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* EXIF Data Section */}
              <ExifDataSection image={selectedImageFile} />
            </div>
          ) : (
            <div className="w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex flex-col items-center justify-center min-h-[400px]">
              <ImageIcon className="w-16 h-16 text-gray-400 mb-4" />
              <p className="text-lg text-gray-500 mb-2">{t.uploadFirst}</p>
              <p className="text-sm text-gray-400">{t.supportDrag}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
