"use client"

import { generateTemplateText } from "@/lib/watermark"
import type { TemplateConfig } from "@/lib/templates"

type WatermarkProps = {
  config: TemplateConfig
  selectedTemplate: string
  exifData: any
}

export default function Watermark({ config, selectedTemplate, exifData }: WatermarkProps) {
  const lines = generateTemplateText(selectedTemplate, config.content, exifData)

  if (lines.length === 0) {
    return null
  }

  const containerStyle: React.CSSProperties = {
    backgroundColor: config.backgroundColor,
    opacity: config.backgroundOpacity,
    padding: `${config.padding}px`,
    borderRadius: `${config.borderRadius}px`,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  }

  const textStyle: React.CSSProperties = {
    fontFamily: config.fontFamily,
    fontSize: `${config.fontSize}px`,
    fontWeight: config.fontWeight,
    fontStyle: config.fontStyle,
    color: config.textColor,
    opacity: config.textOpacity,
    whiteSpace: "pre",
    lineHeight: 1.2,
  }

  return (
    <div style={containerStyle}>
      {lines.map((line: string, index: number) => (
        <div key={index} style={textStyle}>
          {line}
        </div>
      ))}
    </div>
  )
}
