import type { TemplateConfig } from "./templates"
import { templateConfigs } from "./templates"

type ImageFile = {
  id: string
  file: File
  url: string
  exifData?: any
  watermarkedUrl?: string
}

// 变量模板映射
const TEMPLATE_VARIABLES = {
  modern: {
    TIME_CONTENT: (config: any) => {
      if (config.showTime === false) return null
      const now = new Date()
      return `🕐 ${now.toTimeString().slice(0, 8)}`
    },
    DATE_CONTENT: (config: any) => {
      if (config.showDate === false) return null
      const now = new Date()
      const dateFormat = config.dateFormat || "YYYY-MM-DD"
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, "0")
      const day = String(now.getDate()).padStart(2, "0")
      const formattedDate = dateFormat.replace("YYYY", year.toString()).replace("MM", month).replace("DD", day)
      return `📅 ${formattedDate}`
    },
    LOCATION_CONTENT: (config: any) => {
      if (config.showLocation === false) return null
      return config.customLocation ? `📍 ${config.customLocation}` : `📍 位置信息`
    }
  },
  professional: {
    LONGITUDE_CONTENT: (config: any) => config.longitude ? `经度: ${config.longitude}` : `经度: 116.4074`,
    LATITUDE_CONTENT: (config: any) => config.latitude ? `纬度: ${config.latitude}` : `纬度: 39.9042`,
    ALTITUDE_CONTENT: (config: any) => config.altitude ? `海拔: ${config.altitude}m` : `海拔: 43m`,
    ACCURACY_CONTENT: (config: any) => config.accuracy ? `精度: ${config.accuracy}m` : `精度: 5m`,
    TIME_CONTENT: (config: any) => {
      if (config.showTime === false) return null
      const now = new Date()
      const currentDate = now.toISOString().slice(0, 10)
      const currentTime = config.customTime || now.toTimeString().slice(0, 8)
      return `时间: ${currentDate} ${currentTime}`
    }
  },
  baby: {
    BABY_NAME_CONTENT: (config: any) => {
      const babyName = config.babyName || "宝宝"
      let text = `👶 ${babyName}`
      if (config.showDaysSince !== false && config.birthDate) {
        const birthDate = new Date(config.birthDate)
        const now = new Date()
        const daysSince = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24))
        text += `·出生第${daysSince}天`
      }
      return text
    },
    MILESTONE_CONTENT: (config: any) => config.milestone ? `🎉 ${config.milestone}` : `🎉 成长记录`,
    DATE_CONTENT: (config: any) => {
      if (config.showCurrentDate === false) return null
      const now = new Date()
      return `📅 ${now.toISOString().slice(0, 10)}`
    }
  },
  engineering: {
    PROJECT_NAME_CONTENT: (config: any) => config.projectName ? `⚡ ${config.projectName}` : `⚡ 工程项目`,
    CONSTRUCTION_AREA_CONTENT: (config: any) => config.constructionArea ? `📍 ${config.constructionArea}` : `📍 施工区域`,
    CONSTRUCTION_CONTENT: (config: any) => config.constructionContent ? `🔧 ${config.constructionContent}` : `🔧 施工内容`,
    CONTRACTOR_CONTENT: (config: any) => config.contractor ? `🏗️ ${config.contractor}` : `🏗️ 施工单位`,
    SUPERVISOR_CONTENT: (config: any) => config.supervisor ? `👷 ${config.supervisor}` : `👷 监理单位`,
    DATETIME_CONTENT: (config: any) => {
      if (config.showDateTime === false) return null
      const now = new Date()
      const currentDate = now.toISOString().slice(0, 10)
      const currentTime = now.toTimeString().slice(0, 5)
      return `📅 ${currentDate} ${currentTime}`
    }
  },
  punch: {
    PUNCH_TYPE_CONTENT: (config: any) => {
      const punchTypeLabels = {
        clockIn: "上班打卡",
        clockOut: "下班打卡",
        breakStart: "休息开始",
        breakEnd: "休息结束",
        overtime: "加班打卡",
      }
      const punchType = punchTypeLabels[config.punchType as keyof typeof punchTypeLabels] || "上班打卡"
      const now = new Date()
      const punchTime = config.customTime || now.toTimeString().slice(0, 5)
      return `📍 ${punchType} ${punchTime}`
    },
    WORK_LOCATION_CONTENT: (config: any) => config.workLocation || `📍 办公地点`,
    DEPARTMENT_CONTENT: (config: any) => config.department ? `部门: ${config.department}` : `部门: 技术部`,
    EMPLOYEE_ID_CONTENT: (config: any) => config.employeeId ? `工号: ${config.employeeId}` : `工号: 001`,
    DATE_WEEKDAY_CONTENT: (config: any) => {
      const now = new Date()
      const currentDate = now.toISOString().slice(0, 10)
      let dateText = currentDate
      if (config.showWeekday !== false) {
        const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
        dateText += ` ${weekdays[now.getDay()]}`
      }
      return dateText
    }
  },
  travel: {
    TRAVEL_TITLE_CONTENT: () => "✈️ 旅行日记",
    DESTINATION_CONTENT: (config: any) => config.destination ? `📍 ${config.destination}` : `📍 目的地`,
    WEATHER_TEMPERATURE_CONTENT: (config: any) => {
      if (config.weather && config.temperature) {
        return `${config.weather} ${config.temperature}°C`
      } else if (config.weather) {
        return config.weather
      }
      return `☀️ 晴天 22°C`
    },
    COMPANION_CONTENT: (config: any) => config.companion ? `👥 ${config.companion}` : `👥  同行伙伴`,
    MOOD_CONTENT: (config: any) => config.mood || `😊 心情愉快`
  }
}

// 处理变量模板，替换占位符并隐藏空元素
export const processVariableTemplate = (svgContent: string, templateType: string, config: any): string => {
  let processedContent = svgContent
  const variables = TEMPLATE_VARIABLES[templateType as keyof typeof TEMPLATE_VARIABLES]
  
  if (!variables) return processedContent
  
  Object.entries(variables).forEach(([variableName, generator]) => {
    const content = generator(config)
    const placeholder = `{{${variableName}}}`
    
    if (content === null) {
      // 如果内容为null，隐藏对应的tspan元素
      const regex = new RegExp(`<tspan[^>]*>\\s*${placeholder.replace(/[{}]/g, '\\$&')}\\s*</tspan>`, 'g')
      processedContent = processedContent.replace(regex, (match) => {
        return match.replace('<tspan', '<tspan style="display:none"')
      })
      // 同时替换占位符为空字符串
      processedContent = processedContent.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), "")
    } else {
      // 替换占位符为实际内容
      processedContent = processedContent.replace(new RegExp(placeholder.replace(/[{}]/g, '\\$&'), 'g'), content)
    }
  })
  
  return processedContent
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

      // Check if using SVG template
      if (config.useSvg && config.svgTemplate) {
        // Fetch variable template SVG content
        const variableTemplatePath = config.svgTemplate.replace('/preview/', '/variables/')
        fetch(variableTemplatePath)
          .then(response => response.text())
          .then(svgContent => {
            // 处理变量模板替换
            const processedSvgContent = processVariableTemplate(svgContent, selectedTemplate, config.content)
            
            // Create SVG blob and object URL
            const svgBlob = new Blob([processedSvgContent], { type: 'image/svg+xml' })
            const svgUrl = URL.createObjectURL(svgBlob)
            
            // Create image from SVG
            const svgImg = new Image()
            svgImg.onload = () => {
              // Calculate position and size
              let x, y
              // 使用配置中的尺寸，如果没有配置则使用SVG原始尺寸
              const svgWidth = config.width || svgImg.width || 300
              const svgHeight = config.height || svgImg.height || 150
              
              if (config.position === "custom") {
                // 优先使用保存的相对位置比例
                if (config._relativeX !== undefined && config._relativeY !== undefined) {
                  x = config._relativeX * canvas.width
                  y = config._relativeY * canvas.height
                } else {
                  // 兼容旧版本：使用相对位置计算，确保在不同尺寸的图片上保持相同的相对位置
                  const previewWidth = config._previewWidth || canvas.width
                  const previewHeight = config._previewHeight || canvas.height
                  
                  // 计算预览中水印位置相对于预览图片的比例
                  const relativeX = config.offsetX / previewWidth
                  const relativeY = config.offsetY / previewHeight
                  
                  // 根据实际图片尺寸计算水印位置
                  x = relativeX * canvas.width
                  y = relativeY * canvas.height
                }
              } else {
                switch (config.position) {
                  case "top-left":
                    x = config.offsetX
                    y = config.offsetY
                    break
                  case "top-center":
                    x = (canvas.width - svgWidth) / 2 + config.offsetX
                    y = config.offsetY
                    break
                  case "top-right":
                    x = canvas.width - svgWidth - config.offsetX
                    y = config.offsetY
                    break
                  case "center-left":
                    x = config.offsetX
                    y = (canvas.height - svgHeight) / 2 + config.offsetY
                    break
                  case "center":
                    x = (canvas.width - svgWidth) / 2 + config.offsetX
                    y = (canvas.height - svgHeight) / 2 + config.offsetY
                    break
                  case "center-right":
                    x = canvas.width - svgWidth - config.offsetX
                    y = (canvas.height - svgHeight) / 2 + config.offsetY
                    break
                  case "bottom-left":
                    x = config.offsetX
                    y = canvas.height - svgHeight - config.offsetY
                    break
                  case "bottom-center":
                    x = (canvas.width - svgWidth) / 2 + config.offsetX
                    y = canvas.height - svgHeight - config.offsetY
                    break
                  case "bottom-right":
                  default:
                    x = canvas.width - svgWidth - config.offsetX
                    y = canvas.height - svgHeight - config.offsetY
                    break
                }
              }
              
              // Draw SVG watermark with specified dimensions
              ctx.drawImage(svgImg, x, y, svgWidth, svgHeight)
              ctx.globalAlpha = 1
              
              // Clean up object URL
              URL.revokeObjectURL(svgUrl)
              
              resolve(canvas.toDataURL())
            }
            
            // Load SVG image
            svgImg.src = svgUrl
          })
          .catch(error => {
            console.error("Error loading SVG template:", error)
            // Fallback to original image if SVG loading fails
            resolve(canvas.toDataURL())
          })
        return
      }

      // Generate template-specific watermark text (fallback for non-SVG templates)
      const initialLines = generateTemplateText(selectedTemplate, config.content, imageFile.exifData)

      if (initialLines.length === 0) return resolve(canvas.toDataURL())

      // Set font
      ctx.font = `${config.fontStyle} ${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`

      // Wrap text if width is defined
      const maxTextWidth = config.width ? config.width - config.padding * 2 : undefined
      const lines = maxTextWidth
        ? initialLines.flatMap((line) => wrapText(ctx, line, maxTextWidth))
        : initialLines

      // Calculate text dimensions
      const lineHeight = config.fontSize * 1.2
      const maxWidth = Math.max(...lines.map((line) => ctx.measureText(line).width))
      const textHeight = lines.length * lineHeight

      // Calculate position
      const bgWidth = config.width ?? maxWidth + config.padding * 2
      const bgHeight = config.height ?? textHeight + config.padding * 2

      let x, y
      if (config.position === "custom") {
        // 优先使用保存的相对位置比例
        if (config._relativeX !== undefined && config._relativeY !== undefined) {
          x = config._relativeX * canvas.width
          y = config._relativeY * canvas.height
        } else {
          // 兼容旧版本：使用相对位置计算，确保在不同尺寸的图片上保持相同的相对位置
          const previewWidth = config._previewWidth || canvas.width
          const previewHeight = config._previewHeight || canvas.height
          
          // 计算预览中水印位置相对于预览图片的比例
          const relativeX = config.offsetX / previewWidth
          const relativeY = config.offsetY / previewHeight
          
          // 根据实际图片尺寸计算水印位置
          x = relativeX * canvas.width
          y = relativeY * canvas.height
        }
      } else {
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

const wrapText = (context: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
  const words = text.split(" ")
  const lines: string[] = []
  let currentLine = words[0]

  for (let i = 1; i < words.length; i++) {
    const word = words[i]
    const width = context.measureText(currentLine + " " + word).width
    if (width < maxWidth) {
      currentLine += " " + word
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }
  lines.push(currentLine)
  return lines
}

export const generateTemplateText = (template: string, content: Record<string, any>, exifData: any): string[] => {
  const lines: string[] = []
  const now = new Date()

  switch (template) {
    case "modern":
      if (content.showTime !== false) {
        lines.push(`🕐 ${now.toTimeString().slice(0, 8)}`)
      }
      if (content.showDate !== false) {
        const dateFormat = content.dateFormat || "YYYY-MM-DD"
        const year = now.getFullYear()
        const month = String(now.getMonth() + 1).padStart(2, "0")
        const day = String(now.getDate()).padStart(2, "0")
        const formattedDate = dateFormat.replace("YYYY", year.toString()).replace("MM", month).replace("DD", day)
        lines.push(`📅 ${formattedDate}`)
      }
      if (content.showLocation !== false && content.customLocation) {
        lines.push(`📍 ${content.customLocation}`)
      }
      break

    case "professional":
      if (content.longitude) lines.push(`经度: ${content.longitude}`)
      if (content.latitude) lines.push(`纬度: ${content.latitude}`)
      if (content.altitude) lines.push(`海拔: ${content.altitude}m`)
      if (content.accuracy) lines.push(`精度: ${content.accuracy}m`)
      if (content.showTime !== false) {
        const currentDate = now.toISOString().slice(0, 10)
        const currentTime = content.customTime || now.toTimeString().slice(0, 8)
        lines.push(`时间: ${currentDate} ${currentTime}`)
      }
      break

    case "baby":
      if (content.babyName) {
        let babyText = `👶 ${content.babyName}`
        if (content.showDaysSince !== false && content.birthDate) {
          const birthDate = new Date(content.birthDate)
          const daysSince = Math.floor((now.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24))
          babyText += `·出生第${daysSince}天`
        }
        lines.push(babyText)
      }
      if (content.milestone) lines.push(`🎉 ${content.milestone}`)
      if (content.showCurrentDate !== false) {
        lines.push(`📅 ${now.toISOString().slice(0, 10)}`)
      }
      break

    case "engineering":
      if (content.projectName) lines.push(`⚡ ${content.projectName}`)
      if (content.constructionArea) lines.push(`📍 ${content.constructionArea}`)
      if (content.constructionContent) lines.push(`🔧 ${content.constructionContent}`)
      if (content.contractor) lines.push(`🏗️ ${content.contractor}`)
      if (content.supervisor) lines.push(`👷 ${content.supervisor}`)
      if (content.showDateTime !== false) {
        const currentDate = now.toISOString().slice(0, 10)
        const currentTime = now.toTimeString().slice(0, 5)
        lines.push(`📅 ${currentDate} ${currentTime}`)
      }
      break

    case "punch":
      if (content.punchType) {
        const punchTypeLabels = {
          clockIn: "上班打卡",
          clockOut: "下班打卡",
          breakStart: "休息开始",
          breakEnd: "休息结束",
          overtime: "加班打卡",
        }
        const punchType = punchTypeLabels[content.punchType as keyof typeof punchTypeLabels] || "打卡"
        const punchTime = content.customTime || now.toTimeString().slice(0, 5)
        lines.push(`📍 ${punchType} ${punchTime}`)
      }
      if (content.workLocation) lines.push(content.workLocation)
      if (content.department) lines.push(`部门: ${content.department}`)
      if (content.employeeId) lines.push(`工号: ${content.employeeId}`)
      const currentDate = now.toISOString().slice(0, 10)
      let dateText = currentDate
      if (content.showWeekday !== false) {
        const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
        dateText += ` ${weekdays[now.getDay()]}`
      }
      lines.push(dateText)
      break

    case "travel":
      lines.push("✈️ 旅行日记")
      if (content.destination) lines.push(`📍 ${content.destination}`)
      if (content.weather && content.temperature) {
        lines.push(`${content.weather} ${content.temperature}°C`)
      } else if (content.weather) {
        lines.push(content.weather)
      }
      if (content.companion) lines.push(`👥 ${content.companion}`)
      if (content.mood) lines.push(content.mood)
      break

    default:
      lines.push("水印文本")
      break
  }

  return lines
}

const formatDate = (dateStr: string, format: string): string => {
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return dateStr

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return format.replace("YYYY", year.toString()).replace("MM", month).replace("DD", day)
}
