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
      let displayDate = new Date()
      if (config.customDateTime) {
        displayDate = new Date(config.customDateTime)
      }
      return `🕐 ${displayDate.toTimeString().slice(0, 8)}`
    },
    DATE_CONTENT: (config: any) => {
      if (config.showDate === false) return null
      let displayDate = new Date()
      if (config.customDateTime) {
        displayDate = new Date(config.customDateTime)
      }
      const dateFormat = config.dateFormat || "YYYY-MM-DD"
      const year = displayDate.getFullYear()
      const month = String(displayDate.getMonth() + 1).padStart(2, "0")
      const day = String(displayDate.getDate()).padStart(2, "0")
      const formattedDate = dateFormat.replace("YYYY", year.toString()).replace("MM", month).replace("DD", day)
      return `📅 ${formattedDate}`
    },
    LOCATION_CONTENT: (config: any) => {
      if (config.showLocation === false) return null
      return config.customLocation ? `📍 ${config.customLocation}` : `📍 位置信息`
    }
  },
  professional: {
    LONGITUDE_CONTENT: (config: any) => config.longitude ? `${config.longitude}°` : `116.4074°`,
    LATITUDE_CONTENT: (config: any) => config.latitude ? `${config.latitude}°` : `39.9042°`,
    ALTITUDE_CONTENT: (config: any) => config.altitude ? `${config.altitude}m` : `43m`,
    ACCURACY_CONTENT: (config: any) => config.accuracy ? `${config.accuracy}m` : `5m`,
  },
  baby: {
    BABY_NAME_CONTENT: (config: any) => {
      const babyName = config.babyName || "宝宝"
      let text = `👶 ${babyName}`
      if (config.showDaysSince !== false && config.birthDate) {
        const birthDate = new Date(config.birthDate)
        let currentDisplayDate = new Date()
        if (config.customDateTime) {
          currentDisplayDate = new Date(config.customDateTime)
        }
        const daysSince = Math.floor((currentDisplayDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24))
        text += ` · 出生第 ${daysSince} 天`
      }
      return text
    },
    MILESTONE_CONTENT: (config: any) => config.milestone ? `${config.milestone}` : null,
    DATE_CONTENT: (config: any) => {
      if (config.showCurrentDate === false) return null
      let currentDisplayDate = new Date()
      if (config.customDateTime) {
        currentDisplayDate = new Date(config.customDateTime)
      }
      return `📅 ${currentDisplayDate.toISOString().slice(0, 10)}`
    }
  },
  engineering: {
    PROJECT_NAME_CONTENT: (config: any) => config.projectName ? `⚡ ${config.projectName}` : `⚡ 工程项目`,
    CONSTRUCTION_AREA_CONTENT: (config: any) => config.constructionArea ? `📍 ${config.constructionArea}` : `📍 施工区域`,
    CONSTRUCTION_CONTENT: (config: any) => config.constructionContent ? `${config.constructionContent}` : `隧道开挖作业`,
  },
  punch: {
    PUNCH_TYPE_CONTENT: (config: any) => {
      const punchTypeLabels: Record<string, string> = {
        clockIn: "上班打卡",
        clockOut: "下班打卡",
        breakStart: "休息开始",
        breakEnd: "休息结束",
        overtime: "加班打卡",
      }
      return punchTypeLabels[config.punchType as string] || "上班打卡"
    },
    WORK_LOCATION_CONTENT: (config: any) => config.workLocation ? `${config.workLocation}` : `北京·三里屯SOHO`,
    DATE_WEEKDAY_CONTENT: (config: any) => {
      let displayDate
      if (config.customDateTime) {
        displayDate = new Date(config.customDateTime)
      } else {
        displayDate = new Date()
      }
      const currentDate = displayDate.toISOString().slice(0, 10).replace(/-/g, ".")
      let dateText = currentDate
      if (config.showWeekday !== false) {
        const weekdays = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
        dateText += ` ${weekdays[displayDate.getDay()]}`
      }
      return dateText
    }
  },
  travel: {
    DESTINATION_CONTENT: (config: any) => config.destination ? `${config.destination}` : `上海·迪士尼乐园`,
    WEATHER_TEMPERATURE_CONTENT: (config: any) => {
      if (config.weather && config.temperature) {
        return `${config.weather} ${config.temperature}°C`
      } else if (config.weather) {
        return config.weather
      }
      return `☀️ 晴天 22°C`
    },
    COMPANION_CONTENT: (config: any) => config.companion ? `👥 ${config.companion}` : `👥  同行伙伴`,
    MOOD_CONTENT: (config: any) => config.mood ? `${config.mood}` : `😊 心情愉快`,
    DATE_CONTENT: (config: any) => {
      if (config.showCurrentDate === false) {
        return ""
      }
      let displayDate = new Date()
      if (config.customDateTime) {
        displayDate = new Date(config.customDateTime)
      }
      const year = displayDate.getFullYear()
      const month = String(displayDate.getMonth() + 1).padStart(2, "0")
      const day = String(displayDate.getDate()).padStart(2, "0")
      return `${year}.${month}.${day}`
    }
  },
  food: {
    FOOD_ICON: () => "🍜",
    RESTAURANT_NAME: (config: any) => config.restaurantName ? config.restaurantName : "老北京炸酱面馆",
    DISH_NAME: (config: any) => config.dishName ? config.dishName : "招牌炸酱面 + 凉拌黄瓜",
    RATING_PRICE: (config: any) => {
      const rating = config.rating || "4.8"
      const price = config.price || "45"
      return `⭐ ${rating}  ·  ¥${price}/人`
    },
    MEAL_DATETIME: (config: any) => {
      let displayDate = new Date()
      if (config.customDateTime) {
        displayDate = new Date(config.customDateTime)
      }
      const dateStr = displayDate.toISOString().slice(0, 10)
      const mealType = config.mealType || "晚餐"
      return `📅 ${dateStr} ${mealType}`
    },
    UTENSIL_ICON: () => "🥢"
  },
  fitness: {
    SPORT_ICON: (config: any) => {
      const iconMap: Record<string, string> = {
        "户外跑步": "🏃",
        "室内跑步": "🏃",
        "户外骑行": "🚴",
        "游泳": "🏊",
        "健身": "💪",
        "瑜伽": "🧘",
        "徒步": "🥾",
      }
      return iconMap[config.sportType as string] || "🏃"
    },
    SPORT_TYPE: (config: any) => config.sportType || "户外跑步",
    DISTANCE: (config: any) => config.distance || "5.20",
    DISTANCE_UNIT: () => "公里",
    DURATION_CALORIES: (config: any) => {
      const duration = config.duration || "32:15"
      const calories = config.calories || "320"
      return `⏱️ ${duration}  ·  🔥 ${calories}千卡`
    },
    PACE_STEPS: (config: any) => {
      const pace = config.pace || "6'12\""
      const steps = config.steps || "6,842"
      return `配速 ${pace}  ·  步数 ${steps}`
    },
    PROGRESS_WIDTH: (config: any) => {
      const percent = config.progressPercent || 78
      return String(Math.round((percent / 100) * 200))
    },
    PROGRESS_PERCENT: (config: any) => `${config.progressPercent || 78}%`
  },
  pet: {
    PET_ICON: (config: any) => {
      const iconMap: Record<string, string> = {
        "🐱 猫咪": "🐱",
        "🐶 狗狗": "🐶",
        "🐰 兔子": "🐰",
        "🐹 仓鼠": "🐹",
        "🐦 鸟类": "🐦",
        "🐢 爬宠": "🐢",
        "🐟 鱼类": "🐟",
      }
      return iconMap[config.petType as string] || "🐱"
    },
    PET_NAME_AGE: (config: any) => {
      const name = config.petName || "咪咪"
      const age = config.petAge || "2岁3个月"
      return `${name} · ${age}`
    },
    PET_BREED_WEIGHT: (config: any) => {
      const breed = config.breed || "英短蓝猫"
      const weight = config.weight || "4.2"
      return `🐾 ${breed}  ·  ${weight}kg`
    },
    PET_MOOD: (config: any) => {
      const mood = config.mood || "今天心情很好~"
      return `😸 ${mood}`
    }
  },
  camera: {
    CAMERA_MODEL: (config: any) => config.cameraModel || "Sony A7M4",
    LENS_MODEL: (config: any) => config.lensModel || "35mm f/1.4 GM",
    APERTURE: (config: any) => config.aperture || "f/1.4",
    SHUTTER: (config: any) => config.shutter || "1/500",
    ISO: (config: any) => config.iso || "ISO 100",
    SHOT_DATETIME: (config: any) => {
      let displayDate = new Date()
      if (config.customDateTime) {
        displayDate = new Date(config.customDateTime)
      }
      const dateStr = displayDate.toISOString().slice(0, 10).replace(/-/g, ".")
      const timeStr = displayDate.toTimeString().slice(0, 5)
      return `${dateStr} ${timeStr}`
    }
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
            
            // 计算水印尺寸的缩放比例
            // 如果有预览尺寸信息，则根据实际图片与预览图片的比例来缩放水印
            let svgWidth, svgHeight
            if (config._previewWidth && config._previewHeight) {
              // 计算图片的缩放比例
              const scaleX = canvas.width / config._previewWidth
              const scaleY = canvas.height / config._previewHeight
              // 使用较小的缩放比例以保持水印的宽高比
              const scale = Math.min(scaleX, scaleY)
              
              svgWidth = (config.width || 200) * scale
              svgHeight = (config.height || 100) * scale
            } else {
              // 兼容旧版本：使用配置中的尺寸，如果没有配置则使用SVG原始尺寸
              svgWidth = config.width || svgImg.width || 300
              svgHeight = config.height || svgImg.height || 150
            }
            
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
    }

    img.src = imageFile.url
  })
}
