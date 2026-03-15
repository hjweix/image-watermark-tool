"use client"

import type React from "react"
import { Upload, Download, Trash2, ImageIcon, X, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTranslations } from 'next-intl'
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

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
  const [isDragging, setIsDragging] = useState(false)

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDropWrapper = (e: React.DragEvent) => {
    setIsDragging(false)
    handleDrop(e)
  }

  return (
    <div className="xl:col-span-1 space-y-5">
      {/* Upload Area */}
      <Card className="border-warm-200/50 shadow-sm overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-charcoal">
            <div className="w-8 h-8 bg-warm-100 rounded-lg flex items-center justify-center">
              <Upload className="w-4 h-4 text-warm-dark" />
            </div>
            {tUpload('title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.div
            onDrop={handleDropWrapper}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`
              relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
              transition-all duration-300 overflow-hidden
              ${isDragging
                ? 'border-warm bg-warm-50/80 shadow-warm'
                : 'border-warm-200 hover:border-warm hover:bg-warm-50/50'
              }
            `}
          >
            {/* 拖拽时的动画背景 */}
            <AnimatePresence>
              {isDragging && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-warm/5 flex items-center justify-center"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Upload className="w-12 h-12 text-warm" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.2 }}
                className="w-14 h-14 bg-warm-100 rounded-2xl flex items-center justify-center mx-auto mb-4"
              >
                <ImageIcon className="w-7 h-7 text-warm-dark" />
              </motion.div>
              <p className="text-sm font-medium text-charcoal mb-1">
                {tUpload('drag')}
              </p>
              <p className="text-xs text-charcoal-muted">
                {tUpload('click')}
              </p>
            </div>
          </motion.div>

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
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-warm-200/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between text-sm font-semibold text-charcoal">
                  <span className="flex items-center gap-2">
                    <span className="w-6 h-6 bg-warm-100 rounded-md flex items-center justify-center text-xs text-warm-dark font-bold">
                      {images.length}
                    </span>
                    {tUpload('uploaded')}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setImages([])
                      setSelectedImage("")
                    }}
                    className="text-charcoal-muted hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-52 scrollbar-thin">
                  <div className="space-y-2 pr-2">
                    <AnimatePresence>
                      {images.map((image, index) => (
                        <motion.div
                          key={image.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setSelectedImage(image.id)}
                          className={`
                            group flex items-center gap-3 p-2.5 rounded-xl cursor-pointer
                            transition-all duration-200 border
                            ${selectedImage === image.id
                              ? "bg-warm-50 border-warm shadow-sm"
                              : "bg-white border-transparent hover:bg-warm-50/50 hover:border-warm-200"
                            }
                          `}
                        >
                          {/* 选中指示器 */}
                          <div className={`
                            w-1 h-8 rounded-full transition-all duration-200
                            ${selectedImage === image.id ? "bg-warm" : "bg-transparent group-hover:bg-warm-200"}
                          `} />

                          {/* 缩略图 */}
                          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-warm-100 flex-shrink-0">
                            <img
                              src={image.url || "/placeholder.svg"}
                              alt={image.file.name}
                              className="w-full h-full object-cover"
                            />
                            {image.watermarkedUrl && (
                              <div className="absolute bottom-0.5 right-0.5">
                                <CheckCircle2 className="w-3 h-3 text-sage bg-white rounded-full" />
                              </div>
                            )}
                          </div>

                          {/* 文件信息 */}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-charcoal truncate">
                              {image.file.name}
                            </p>
                            <p className="text-[10px] text-charcoal-muted">
                              {(image.file.size / 1024 / 1024).toFixed(1)} MB
                            </p>
                          </div>

                          {/* 删除按钮 */}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={(e) => {
                              e.stopPropagation()
                              removeImage(image.id)
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-red-50 rounded-lg"
                          >
                            <X className="w-3.5 h-3.5 text-charcoal-muted hover:text-red-500" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions */}
      <AnimatePresence>
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card className="border-warm-200/50 shadow-sm">
              <CardContent className="pt-5 space-y-3">
                <Button
                  onClick={applyWatermarkToAll}
                  disabled={isProcessing || images.length === 0}
                  className="w-full bg-warm hover:bg-warm-dark text-white shadow-warm hover:shadow-warm-lg transition-all duration-300"
                  size="sm"
                >
                  {isProcessing ? (
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      {tActions('processing')}
                    </motion.span>
                  ) : (
                    tActions('applyAll')
                  )}
                </Button>

                {images.some((img) => img.watermarkedUrl) && (
                  <Button
                    onClick={downloadAllAsZip}
                    variant="outline"
                    className="w-full border-warm-200 hover:border-warm hover:bg-warm-50 text-charcoal transition-all duration-300"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {tActions('downloadAll')}
                  </Button>
                )}

                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-2 pt-2"
                  >
                    <div className="h-1.5 bg-warm-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-warm to-warm-light rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${processingProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-xs text-center text-charcoal-muted">
                      {tActions('processingProgress')}: {Math.round(processingProgress)}%
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
