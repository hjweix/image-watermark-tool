"use client"

import { Camera } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

type ImageFile = {
  id: string
  file: File
  url: string
  exifData?: any
  watermarkedUrl?: string
}

type ExifDataSectionProps = {
  image: ImageFile | undefined
}

export default function ExifDataSection({ image }: ExifDataSectionProps) {
  const { t } = useLanguage()

  if (!image?.exifData) {
    return null
  }

  const { dateTime, gps } = image.exifData

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Camera className="w-5 h-5" />
        {t.exifInfo || "EXIF Information"}
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span className="text-gray-500">{t.shootingDate || "Date"}:</span>
          <p className="font-medium">{dateTime || "N/A"}</p>
        </div>
        <div>
          <span className="text-gray-500">{t.latitude || "Latitude"}:</span>
          <p className="font-medium">{gps?.latitude?.toFixed(6) || "N/A"}</p>
        </div>
        <div>
          <span className="text-gray-500">{t.longitude || "Longitude"}:</span>
          <p className="font-medium">{gps?.longitude?.toFixed(6) || "N/A"}</p>
        </div>
      </div>
    </div>
  )
}
