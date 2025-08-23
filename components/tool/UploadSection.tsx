"use client"

import type React from "react"
import { Upload, Download, Trash2, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTranslations } from 'next-intl'

type ImageFile = {
  id: string
  file: File
  url: string
  exifData?: any
  watermarkedUrl?: string
}

type UploadSectionProps = {
  images: ImageFile[]
  selectedImage: string | null
  isProcessing: boolean
  processingProgress: number
  fileInputRef: React.RefObject<HTMLInputElement | null>
  handleDrop: (e: React.DragEvent) => void
  handleDragOver: (e: React.DragEvent) => void
  handleFileUpload: (files: FileList) => void
  setSelectedImage: (id: string) => void
  setImages: (images: ImageFile[]) => void
  applyWatermarkToAll: () => void
  downloadAllAsZip: () => void
  removeImage: (id: string) => void
}

export default function UploadSection({
  images,
  selectedImage,
  isProcessing,
  processingProgress,
  fileInputRef,
  handleDrop,
  handleDragOver,
  handleFileUpload,
  setSelectedImage,
  setImages,
  applyWatermarkToAll,
  downloadAllAsZip,
  removeImage,
}: UploadSectionProps) {
  const tUpload = useTranslations('upload')
  const tActions = useTranslations('actions')

  return (
    <div className="xl:col-span-1 space-y-6">
      {/* Upload Area */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            {tUpload('title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-1">{tUpload('drag')}</p>
            <p className="text-xs text-gray-400">{tUpload('click')}</p>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
          />
        </CardContent>
      </Card>

      {/* Image List */}
      {images.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between text-sm">
              <span>
                {tUpload('uploaded')} ({images.length})
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setImages([])
                  setSelectedImage("")
                }}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              <div className="space-y-2">
                {images.map((image) => (
                  <div
                    key={image.id}
                    className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedImage === image.id ? "bg-blue-100 border border-blue-300" : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedImage(image.id)}
                  >
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.file.name}
                      className="w-8 h-8 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium truncate">{image.file.name}</p>
                      <p className="text-xs text-gray-500">{(image.file.size / 1024 / 1024).toFixed(1)} MB</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-6 h-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        removeImage(image.id)
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <Button
              onClick={applyWatermarkToAll}
              disabled={isProcessing || images.length === 0}
              className="w-full"
              size="sm"
            >
              {isProcessing ? tActions('processing') : tActions('applyAll')}
            </Button>
            {images.some((img) => img.watermarkedUrl) && (
              <Button onClick={downloadAllAsZip} variant="outline" className="w-full bg-transparent" size="sm">
                <Download className="w-3 h-3 mr-2" />
                {tActions('downloadAll')}
              </Button>
            )}
          </div>
          {isProcessing && (
            <div className="space-y-2 mt-4">
              <Progress value={processingProgress} />
              <p className="text-xs text-center text-gray-600">
                {tActions('processingProgress')}: {Math.round(processingProgress)}%
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
