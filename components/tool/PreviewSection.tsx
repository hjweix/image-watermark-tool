"use client"

import { Eye, Download, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

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
  previewUrl: string | null
  downloadImage: (id: string) => void
  currentTemplateConfig: { name: string } | null
}

export default function PreviewSection({
  images,
  selectedImage,
  previewUrl,
  downloadImage,
  currentTemplateConfig,
}: PreviewSectionProps) {
  const { t } = useLanguage()
  const selectedImageFile = images.find((img) => img.id === selectedImage)

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
                  onClick={() => downloadImage(selectedImage)}
                  disabled={!selectedImageFile?.watermarkedUrl}
                >
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {previewUrl ? (
            <div className="space-y-4">
              {/* Large Preview Image */}
              <div className="relative bg-gray-50 rounded-lg overflow-hidden">
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="Preview"
                  className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
                  style={{ minHeight: "400px" }}
                />
                {/* Preview Controls Overlay */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Eye className="w-4 h-4" />
                    <span>{t.previewMode}</span>
                  </div>
                </div>
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
                      <p className="font-medium">
                        {selectedImageFile.watermarkedUrl ? (
                          <Badge variant="secondary" className="text-xs">
                            {t.processed}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs">
                            {t.pending}
                          </Badge>
                        )}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">{t.watermark}:</span>
                      <p className="font-medium capitalize">{currentTemplateConfig?.name}</p>
                    </div>
                  </div>
                </div>
              )}
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
