import type { TemplateConfig } from "./templates"

type ImageFile = {
  id: string
  file: File
  url: string
  exifData?: any
  watermarkedUrl?: string
}

// Generate watermark based on template
export const generateWatermark = async (
  imageFile: ImageFile,
  config: TemplateConfig,
  selectedTemplate: string,
  canvas: HTMLCanvasElement,
): Promise<string> => {
  return new Promise((resolve) => {
    const ctx = canvas.getContext("2d")!
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height

      // Draw original image
      ctx.drawImage(img, 0, 0)

      // Generate template-specific watermark text
      const lines = generateTemplateText(selectedTemplate, config.content, imageFile.exifData)

      if (lines.length === 0) return resolve(canvas.toDataURL())

      // Set font
      ctx.font = `${config.fontStyle} ${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`

      // Calculate text dimensions
      const lineHeight = config.fontSize * 1.2
      const maxWidth = Math.max(...lines.map((line) => ctx.measureText(line).width))
      const textHeight = lines.length * lineHeight

      // Calculate position
      const bgWidth = maxWidth + config.padding * 2
      const bgHeight = textHeight + config.padding * 2

      let x, y
      switch (config.position) {
        case "top-left":
          x = config.offsetX
          y = config.offsetY
          break
        case "top-center":
          x = (canvas.width - bgWidth) / 2 + config.offsetX
          y = config.offsetY
          break
        case "top-right":
          x = canvas.width - bgWidth - config.offsetX
          y = config.offsetY
          break
        case "center-left":
          x = config.offsetX
          y = (canvas.height - bgHeight) / 2 + config.offsetY
          break
        case "center":
          x = (canvas.width - bgWidth) / 2 + config.offsetX
          y = (canvas.height - bgHeight) / 2 + config.offsetY
          break
        case "center-right":
          x = canvas.width - bgWidth - config.offsetX
          y = (canvas.height - bgHeight) / 2 + config.offsetY
          break
        case "bottom-left":
          x = config.offsetX
          y = canvas.height - bgHeight - config.offsetY
          break
        case "bottom-center":
          x = (canvas.width - bgWidth) / 2 + config.offsetX
          y = canvas.height - bgHeight - config.offsetY
          break
        case "bottom-right":
        default:
          x = canvas.width - bgWidth - config.offsetX
          y = canvas.height - bgHeight - config.offsetY
          break
      }

      // Draw background
      ctx.globalAlpha = config.backgroundOpacity
      ctx.fillStyle = config.backgroundColor
      if (config.borderRadius > 0) {
        ctx.beginPath()
        ctx.roundRect(x, y, bgWidth, bgHeight, config.borderRadius)
        ctx.fill()
      } else {
        ctx.fillRect(x, y, bgWidth, bgHeight)
      }

      // Draw text
      ctx.globalAlpha = config.textOpacity
      ctx.fillStyle = config.textColor
      ctx.textBaseline = "top"

      lines.forEach((line, index) => {
        const textY = y + config.padding + index * lineHeight
        ctx.fillText(line, x + config.padding, textY)
      })

      ctx.globalAlpha = 1
      resolve(canvas.toDataURL())
    }

    img.src = imageFile.url
  })
}

// Generate template-specific text
const generateTemplateText = (template: string, content: Record<string, any>, exifData: any): string[] => {
  const lines: string[] = []
  const now = new Date()
  const currentDate = now.toISOString().slice(0, 10)
  const currentTime = now.toTimeString().slice(0, 8)

  switch (template) {
    case "modern":
      if (content.showTime !== false) lines.push(`🕐 ${currentTime}`)
      if (content.showDate !== false) lines.push(`📅 ${formatDate(currentDate, content.dateFormat || "YYYY-MM-DD")}`)
      if (content.showLocation !== false && content.customLocation) lines.push(`📍 ${content.customLocation}`)
      break

    case "professional":
      if (content.longitude) lines.push(`经度: ${content.longitude}`)
      if (content.latitude) lines.push(`纬度: ${content.latitude}`)
      if (content.altitude) lines.push(`海拔: ${content.altitude}m`)
      if (content.accuracy) lines.push(`精度: ${content.accuracy}m`)
      if (content.showTime !== false) lines.push(`时间: ${currentDate} ${content.customTime || currentTime}`)
      break

    case "baby":
      if (content.babyName) {
        const babyText = `👶 ${content.babyName}`
        if (content.showDaysSince !== false && content.birthDate) {
          const birthDate = new Date(content.birthDate)
          const daysSince = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24))
          lines.push(`${babyText}·出生第${daysSince}天`)
        } else {
          lines.push(babyText)
        }
      }
      if (content.milestone) lines.push(`🎉 ${content.milestone}`)
      if (content.showCurrentDate !== false) lines.push(`📅 ${currentDate}`)
      break

    case "engineering":
      if (content.projectName) lines.push(`⚡ ${content.projectName}`)
      if (content.constructionArea) lines.push(`📍 ${content.constructionArea}`)
      if (content.constructionContent) lines.push(`🔧 ${content.constructionContent}`)
      if (content.contractor) lines.push(`🏗️ ${content.contractor}`)
      if (content.supervisor) lines.push(`👷 ${content.supervisor}`)
      if (content.showDateTime !== false) lines.push(`📅 ${currentDate} ${currentTime}`)
      break

    case "punch":
      const punchTypeLabels = {
        clockIn: "上班打卡",
        clockOut: "下班打卡",
        breakStart: "休息开始",
        breakEnd: "休息结束",
        overtime: "加班打卡",
      }
      const punchType = punchTypeLabels[content.punchType as keyof typeof punchTypeLabels] || "打卡"
      const punchTime = content.customTime || currentTime
      lines.push(`📍 ${punchType} ${punchTime}`)
      if (content.workLocation) lines.push(`${content.workLocation}`)
      if (content.department) lines.push(`部门: ${content.department}`)
      if (content.employeeId) lines.push(`工号: ${content.employeeId}`)
      const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
      if (content.showWeekday !== false) {
        lines.push(`${currentDate} ${weekdays[now.getDay()]}`)
      }
      break

    case "travel":
      lines.push(`✈️ 旅行日记`)
      if (content.destination) lines.push(`📍 ${content.destination}`)
      if (content.weather && content.temperature) {
        lines.push(`${content.weather} ${content.temperature}°C`)
      } else if (content.weather) {
        lines.push(`${content.weather}`)
      }
      if (content.companion) lines.push(`👥 ${content.companion}`)
      if (content.mood) lines.push(`${content.mood}`)
      break

    default:
      lines.push(`📅 ${currentDate}`)
      lines.push(`🕐 ${currentTime}`)
      break
  }

  return lines
}

// Format date
const formatDate = (dateStr: string, format: string): string => {
  if (!format) return dateStr
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return format.replace("YYYY", year.toString()).replace("MM", month).replace("DD", day)
}
