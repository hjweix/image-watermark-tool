"use client"

import { Eye, Download, ImageIcon } from "lucide-react"
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
  downloadImage: (id: string, previewWidth?: number, previewHeight?: number) => void
  currentTemplateConfig: any | null
  selectedTemplate: string
  updateTemplateStyle: (key: string, value: any) => void
  templateConfig: any
}

export default function PreviewSection({
  images,
  selectedImage,
  downloadImage,
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

  const handleDownload = () => {
    if (selectedImage && imageRef.current) {
      const previewImage = imageRef.current
      downloadImage(selectedImage, previewImage.clientWidth, previewImage.clientHeight)
    }
  }

  return (
    <div className="xl:col-span-2 order-first xl:order-none">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              {t.preview}
            </div>
            {selectedImage && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDownload}
                  disabled={!selectedImageFile}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            )}
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
                    position={{ 
                      x: templateConfig.offsetX || 50, 
                      y: templateConfig.offsetY || 50 
                    }}
                    onDragStop={(e, d) => {
                      updateTemplateStyle("position", "custom")
                      updateTemplateStyle("offsetX", d.x)
                      updateTemplateStyle("offsetY", d.y)
                      
                      if (imageRef.current) {
                        updateTemplateStyle("_previewWidth", imageRef.current.clientWidth)
                        updateTemplateStyle("_previewHeight", imageRef.current.clientHeight)
                      }
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                      updateTemplateStyle("width", parseInt(ref.style.width) || 200)
                      updateTemplateStyle("height", parseInt(ref.style.height) || 100)
                      updateTemplateStyle("position", "custom")
                      updateTemplateStyle("offsetX", position.x)
                      updateTemplateStyle("offsetY", position.y)
                      
                      if (imageRef.current) {
                        updateTemplateStyle("_previewWidth", imageRef.current.clientWidth)
                        updateTemplateStyle("_previewHeight", imageRef.current.clientHeight)
                      }
                    }}
                    bounds="parent"
                    className="watermark-container"
                    style={{ 
                      position: 'absolute',
                      zIndex: 10,
                      border: '2px dashed #3b82f6',
                      borderRadius: '4px',
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
                        background: '#3b82f6', 
                        height: '6px', 
                        top: '-3px',
                        cursor: 'n-resize'
                      },
                      right: { 
                        background: '#3b82f6', 
                        width: '6px', 
                        right: '-3px',
                        cursor: 'e-resize'
                      },
                      bottom: { 
                        background: '#3b82f6', 
                        height: '6px', 
                        bottom: '-3px',
                        cursor: 's-resize'
                      },
                      left: { 
                        background: '#3b82f6', 
                        width: '6px', 
                        left: '-3px',
                        cursor: 'w-resize'
                      },
                      topRight: { 
                        background: '#3b82f6', 
                        width: '10px', 
                        height: '10px', 
                        right: '-5px', 
                        top: '-5px',
                        cursor: 'ne-resize'
                      },
                      bottomRight: { 
                        background: '#3b82f6', 
                        width: '10px', 
                        height: '10px', 
                        right: '-5px', 
                        bottom: '-5px',
                        cursor: 'se-resize'
                      },
                      bottomLeft: { 
                        background: '#3b82f6', 
                        width: '10px', 
                        height: '10px', 
                        left: '-5px', 
                        bottom: '-5px',
                        cursor: 'sw-resize'
                      },
                      topLeft: { 
                        background: '#3b82f6', 
                        width: '10px', 
                        height: '10px', 
                        left: '-5px', 
                        top: '-5px',
                        cursor: 'nw-resize'
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
