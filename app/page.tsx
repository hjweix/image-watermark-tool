"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { Upload, Download, Settings, Eye, Trash2, RotateCcw, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"

// Language configuration
const languages = {
  zh: {
    name: "中文",
    flag: "🇨🇳",
    translations: {
      // Header
      brand: "PhotoStamper",
      features: "功能特色",
      help: "使用帮助",

      // Hero section
      heroTitle: "专业工作图片时间水印工具",
      heroSubtitle: "智能提取，批量处理，提升工作效率",
      heroDescription:
        "专为工作场景设计，自动提取图片拍摄时间和地理位置信息，批量添加专业的时间日期地点水印，提升工作文档的规范性和可信度",

      // Hero section - 添加缺失的翻译
      heroMainTitle: "专业图片水印工具 - 免费在线时间地点水印制作",
      heroMainSubtitle: "智能提取EXIF信息，批量处理，提升工作效率",
      heroMainDescription:
        "专为工程记录、打卡签到、旅行日志、宝贝成长等场景设计，自动提取图片拍摄时间和地理位置信息，批量添加专业的时间日期地点水印，提升工作文档的规范性和可信度。完全免费，无需下载安装，保护隐私安全。",

      // Tool section
      toolBadge: "在线工具 - 无需下载安装",
      toolTitle: "开始制作您的专属水印",
      toolDescription: "上传图片，自定义水印样式，一键批量处理 - 简单三步完成专业水印制作",

      // Upload
      uploadTitle: "图片上传",
      uploadDrag: "拖拽图片到此处",
      uploadClick: "或点击选择文件",
      uploaded: "已上传",

      // Actions
      applyAll: "应用到所有图片",
      processing: "处理中...",
      downloadAll: "下载所有图片",
      processingProgress: "处理进度",

      // Preview
      preview: "实时预览",
      previewMode: "预览模式",
      uploadFirst: "请先上传图片",
      supportDrag: "支持拖拽上传或点击选择文件",
      fileName: "文件名",
      fileSize: "大小",
      status: "状态",
      processed: "已处理",
      pending: "待处理",
      watermark: "水印",

      // Settings
      settings: "水印设置",
      templates: "模板选择",
      style: "样式调整",
      content: "内容设置",

      // Templates
      modern: "现代简约",
      vintage: "复古胶片",
      engineering: "工程记录",
      travel: "旅行日志",
      minimal: "极简风格",
      digital: "数字时钟",
      baby: "宝贝成长",
      professional: "专业标记",
      punch: "打卡记录",
      frame: "相框风格",

      // Common style settings
      position: "位置",
      fontSize: "字体大小",
      font: "字体",
      textColor: "文字颜色",
      backgroundColor: "背景颜色",
      backgroundOpacity: "背景透明度",
      borderRadius: "圆角大小",
      padding: "内边距",

      // Position options
      topLeft: "左上角",
      topCenter: "顶部居中",
      topRight: "右上角",
      centerLeft: "左侧居中",
      center: "居中",
      centerRight: "右侧居中",
      bottomLeft: "左下角",
      bottomCenter: "底部居中",
      bottomRight: "右下角",

      // Template-specific fields
      // Professional template
      longitude: "经度",
      latitude: "纬度",
      altitude: "海拔",
      accuracy: "精度",

      // Baby template
      babyName: "宝贝姓名",
      birthDate: "出生日期",
      daysSinceBirth: "出生天数",
      milestone: "成长里程碑",

      // Engineering template
      projectName: "工程名称",
      constructionArea: "施工区域",
      constructionContent: "施工内容",
      contractor: "施工单位",
      supervisor: "监理单位",

      // Punch template
      punchType: "打卡类型",
      workLocation: "工作地点",
      department: "部门",
      employeeId: "员工编号",

      // Travel template
      destination: "目的地",
      weather: "天气",
      temperature: "温度",
      companion: "同行人",
      mood: "心情",

      // Digital template
      timezone: "时区",
      format24h: "24小时制",
      showSeconds: "显示秒数",

      // Common fields
      customDate: "自定义日期",
      customTime: "自定义时间",
      customLocation: "自定义地点",
      customText: "自定义文本",
      notes: "备注",

      // Placeholders
      enterProjectName: "请输入工程名称",
      enterBabyName: "请输入宝贝姓名",
      enterLocation: "请输入地点信息",
      enterNotes: "请输入备注信息",
      selectPunchType: "选择打卡类型",

      // Punch types
      clockIn: "上班打卡",
      clockOut: "下班打卡",
      breakStart: "休息开始",
      breakEnd: "休息结束",
      overtime: "加班打卡",

      // Reset
      reset: "重置设置",

      // Feature cards
      batchProcessingTitle: "批量处理",
      batchProcessingDesc: "一键处理多张图片",
      completelyFreeTitle: "完全免费",
      completelyFreeDesc: "无需注册付费",
      privacySecureTitle: "隐私安全",
      privacySecureDesc: "本地处理不上传",
      professionalTemplatesTitle: "专业模板",
      professionalTemplatesDesc: "多种行业模板",

      // Footer
      hotSearchTitle: "热门搜索",
      keywords: [
        "图片水印工具",
        "时间水印",
        "地点水印",
        "批量水印",
        "工程水印",
        "打卡水印",
        "在线水印",
        "免费水印",
        "图片处理工具",
        "水印制作",
      ],

      // Footer
      footerDescription:
        "专业的工作图片时间水印工具，帮助工程师、项目经理、现场工作人员为工作图片添加准确的时间日期地点信息，提升工作文档的专业性和可信度。完全免费，无需注册。",
      productFeatures: "产品功能",
      batchProcessing: "批量水印处理",
      customStyles: "自定义样式",
      exifExtraction: "EXIF信息提取",
      highResSupport: "高清图片支持",
      helpSupport: "帮助支持",
      tutorial: "使用教程",
      faq: "常见问题",
      contact: "联系我们",
      feedback: "意见反馈",
      copyright: "© 2024 PhotoStamper. 保留所有权利。",
      privacy: "隐私政策",
      terms: "服务条款",
      cookies: "Cookie政策",
    },
  },
  en: {
    name: "English",
    flag: "🇺🇸",
    translations: {
      // Header
      brand: "PhotoStamper",
      features: "Features",
      help: "Help",

      // Hero section
      heroTitle: "Professional Work Image Timestamping Tool",
      heroSubtitle: "Smart Extraction, Batch Processing, Boost Work Efficiency",
      heroDescription:
        "Designed for work scenarios, automatically extract shooting time and location information from images, batch add professional time, date and location watermarks to enhance the standardization and credibility of work documents",

      // Hero section - 添加缺失的翻译
      heroMainTitle: "Professional Image Watermark Tool - Free Online Time & Location Stamping",
      heroMainSubtitle: "Smart EXIF Extraction, Batch Processing, Boost Work Efficiency",
      heroMainDescription:
        "Designed for engineering records, check-in, travel logs, baby growth and other scenarios. Automatically extract shooting time and location information from images, batch add professional time, date and location watermarks to enhance the standardization and credibility of work documents. Completely free, no download required, privacy protected.",

      // Tool section
      toolBadge: "Online Tool - No Download Required",
      toolTitle: "Start Creating Your Custom Watermarks",
      toolDescription:
        "Upload images, customize watermark styles, batch process with one click - complete professional watermark creation in three simple steps",

      // Upload
      uploadTitle: "Image Upload",
      uploadDrag: "Drag images here",
      uploadClick: "or click to select files",
      uploaded: "Uploaded",

      // Actions
      applyAll: "Apply to All Images",
      processing: "Processing...",
      downloadAll: "Download All Images",
      processingProgress: "Processing Progress",

      // Preview
      preview: "Live Preview",
      previewMode: "Preview Mode",
      uploadFirst: "Please upload images first",
      supportDrag: "Support drag & drop or click to select files",
      fileName: "File Name",
      fileSize: "Size",
      status: "Status",
      processed: "Processed",
      pending: "Pending",
      watermark: "Watermark",

      // Settings
      settings: "Watermark Settings",
      templates: "Template Selection",
      style: "Style Adjustment",
      content: "Content Settings",

      // Templates
      modern: "Modern",
      vintage: "Vintage",
      engineering: "Engineering",
      travel: "Travel",
      minimal: "Minimal",
      digital: "Digital Clock",
      baby: "Baby Growth",
      professional: "Professional Marking",
      punch: "Punch Record",
      frame: "Frame Style",

      // Common style settings
      position: "Position",
      fontSize: "Font Size",
      font: "Font",
      textColor: "Text Color",
      backgroundColor: "Background Color",
      backgroundOpacity: "Background Opacity",
      borderRadius: "Border Radius",
      padding: "Padding",

      // Position options
      topLeft: "Top Left",
      topCenter: "Top Center",
      topRight: "Top Right",
      centerLeft: "Center Left",
      center: "Center",
      centerRight: "Center Right",
      bottomLeft: "Bottom Left",
      bottomCenter: "Bottom Center",
      bottomRight: "Bottom Right",

      // Template-specific fields
      longitude: "Longitude",
      latitude: "Latitude",
      altitude: "Altitude",
      accuracy: "Accuracy",

      babyName: "Baby Name",
      birthDate: "Birth Date",
      daysSinceBirth: "Days Since Birth",
      milestone: "Milestone",

      projectName: "Project Name",
      constructionArea: "Construction Area",
      constructionContent: "Construction Content",
      contractor: "Contractor",
      supervisor: "Supervisor",

      punchType: "Punch Type",
      workLocation: "Work Location",
      department: "Department",
      employeeId: "Employee ID",

      destination: "Destination",
      weather: "Weather",
      temperature: "Temperature",
      companion: "Companion",
      mood: "Mood",

      timezone: "Timezone",
      format24h: "24-hour Format",
      showSeconds: "Show Seconds",

      customDate: "Custom Date",
      customTime: "Custom Time",
      customLocation: "Custom Location",
      customText: "Custom Text",
      notes: "Notes",

      enterProjectName: "Enter project name",
      enterBabyName: "Enter baby name",
      enterLocation: "Enter location",
      enterNotes: "Enter notes",
      selectPunchType: "Select punch type",

      clockIn: "Clock In",
      clockOut: "Clock Out",
      breakStart: "Break Start",
      breakEnd: "Break End",
      overtime: "Overtime",

      reset: "Reset Settings",

      // Feature cards
      batchProcessingTitle: "Batch Processing",
      batchProcessingDesc: "Process multiple images at once",
      completelyFreeTitle: "Completely Free",
      completelyFreeDesc: "No registration or payment required",
      privacySecureTitle: "Privacy Secure",
      privacySecureDesc: "Local processing, no upload",
      professionalTemplatesTitle: "Professional Templates",
      professionalTemplatesDesc: "Multiple industry templates",

      // Footer
      hotSearchTitle: "Popular Searches",
      keywords: [
        "Image Watermark Tool",
        "Time Watermark",
        "Location Watermark",
        "Batch Watermark",
        "Engineering Watermark",
        "Check-in Watermark",
        "Online Watermark",
        "Free Watermark",
        "Image Processing Tool",
        "Watermark Creation",
      ],

      footerDescription:
        "Professional work image time watermark tool, helping engineers, project managers, and field workers add accurate time, date and location information to work images, enhancing the professionalism and credibility of work documents. Completely free, no registration required.",
      productFeatures: "Product Features",
      batchProcessing: "Batch Watermark Processing",
      customStyles: "Custom Styles",
      exifExtraction: "EXIF Information Extraction",
      highResSupport: "High Resolution Support",
      helpSupport: "Help & Support",
      tutorial: "Tutorial",
      faq: "FAQ",
      contact: "Contact Us",
      feedback: "Feedback",
      copyright: "© 2024 PhotoStamper. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookies: "Cookie Policy",
    },
  },
}

type Language = keyof typeof languages

type ImageFile = {
  id: string
  file: File
  url: string
  exifData?: any
  watermarkedUrl?: string
}

// Template-specific configuration types
type TemplateConfig = {
  // Common style properties
  position: string
  fontSize: number
  fontFamily: string
  fontWeight: "normal" | "bold"
  fontStyle: "normal" | "italic"
  textColor: string
  backgroundColor: string
  backgroundOpacity: number
  borderRadius: number
  padding: number
  offsetX: number
  offsetY: number
  textOpacity: number

  // Template-specific content
  content: Record<string, any>
}

// Define template-specific field configurations
const templateConfigs = {
  modern: {
    name: "现代简约",
    preview: "11:30 | 2024-01-15\n📍 北京·三里屯",
    styleFields: [
      "position",
      "fontSize",
      "fontFamily",
      "textColor",
      "backgroundColor",
      "backgroundOpacity",
      "borderRadius",
    ],
    contentFields: [
      { key: "showDate", type: "checkbox", label: "显示日期", default: true },
      { key: "showTime", type: "checkbox", label: "显示时间", default: true },
      { key: "showLocation", type: "checkbox", label: "显示位置", default: true },
      { key: "customLocation", type: "input", label: "自定义位置", placeholder: "输入位置信息" },
      {
        key: "dateFormat",
        type: "select",
        label: "日期格式",
        options: [
          { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
          { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
          { value: "MM-DD-YYYY", label: "MM-DD-YYYY" },
        ],
        default: "YYYY-MM-DD",
      },
    ],
    defaultStyle: {
      position: "bottom-right",
      fontSize: 50,
      fontFamily: "Arial",
      fontWeight: "normal" as const,
      fontStyle: "normal" as const,
      textColor: "#ffffff",
      backgroundColor: "#000000",
      backgroundOpacity: 0.2,
      borderRadius: 5,
      padding: 10,
      offsetX: 10,
      offsetY: 10,
      textOpacity: 1,
    },
  },

  professional: {
    name: "专业标记",
    preview: "经度: 116.305315\n纬度: 39.930812\n时间: 2024-01-15 11:30:45",
    styleFields: ["position", "fontSize", "fontFamily", "textColor", "backgroundColor", "backgroundOpacity"],
    contentFields: [
      {
        key: "longitude",
        type: "input",
        label: "经度",
        placeholder: "116.305315",
        inputType: "number",
        step: 0.000001,
      },
      { key: "latitude", type: "input", label: "纬度", placeholder: "39.930812", inputType: "number", step: 0.000001 },
      { key: "altitude", type: "input", label: "海拔(米)", placeholder: "50", inputType: "number" },
      { key: "accuracy", type: "input", label: "精度(米)", placeholder: "5", inputType: "number" },
      { key: "showTime", type: "checkbox", label: "显示时间", default: true },
      { key: "customTime", type: "datetime-local", label: "自定义时间" },
    ],
    defaultStyle: {
      position: "bottom-left",
      fontSize: 32,
      fontFamily: "monospace",
      fontWeight: "normal" as const,
      fontStyle: "normal" as const,
      textColor: "#FFFFFF",
      backgroundColor: "#2C3E50",
      backgroundOpacity: 0.8,
      borderRadius: 3,
      padding: 8,
      offsetX: 10,
      offsetY: 10,
      textOpacity: 1,
    },
  },

  baby: {
    name: "宝贝成长",
    preview: "👶 小宝贝·出生第101天\n2024.01.15",
    styleFields: [
      "position",
      "fontSize",
      "fontFamily",
      "textColor",
      "backgroundColor",
      "backgroundOpacity",
      "borderRadius",
    ],
    contentFields: [
      { key: "babyName", type: "input", label: "宝贝姓名", placeholder: "请输入宝贝姓名", required: true },
      { key: "birthDate", type: "date", label: "出生日期", required: true },
      { key: "milestone", type: "input", label: "成长里程碑", placeholder: "第一次笑、第一次翻身等" },
      { key: "showDaysSince", type: "checkbox", label: "显示出生天数", default: true },
      { key: "showCurrentDate", type: "checkbox", label: "显示当前日期", default: true },
    ],
    defaultStyle: {
      position: "bottom-right",
      fontSize: 45,
      fontFamily: "Arial",
      fontWeight: "bold" as const,
      fontStyle: "normal" as const,
      textColor: "#FFFFFF",
      backgroundColor: "#FFB6C1",
      backgroundOpacity: 0.9,
      borderRadius: 15,
      padding: 12,
      offsetX: 10,
      offsetY: 10,
      textOpacity: 1,
    },
  },

  engineering: {
    name: "工程记录",
    preview: "⚡ 北京地铁15号线\n📍 望京东站施工区域\n🔧 隧道开挖作业\n📅 2024-01-15 11:30",
    styleFields: ["position", "fontSize", "fontFamily", "textColor", "backgroundColor", "backgroundOpacity"],
    contentFields: [
      { key: "projectName", type: "input", label: "工程名称", placeholder: "请输入工程名称", required: true },
      { key: "constructionArea", type: "input", label: "施工区域", placeholder: "请输入施工区域", required: true },
      {
        key: "constructionContent",
        type: "textarea",
        label: "施工内容",
        placeholder: "请输入施工内容描述",
        required: true,
      },
      { key: "contractor", type: "input", label: "施工单位", placeholder: "请输入施工单位" },
      { key: "supervisor", type: "input", label: "监理单位", placeholder: "请输入监理单位" },
      { key: "showDateTime", type: "checkbox", label: "显示拍摄时间", default: true },
    ],
    defaultStyle: {
      position: "top-left",
      fontSize: 38,
      fontFamily: "Arial",
      fontWeight: "bold" as const,
      fontStyle: "normal" as const,
      textColor: "#000000",
      backgroundColor: "#FFD700",
      backgroundOpacity: 0.9,
      borderRadius: 3,
      padding: 10,
      offsetX: 10,
      offsetY: 10,
      textOpacity: 1,
    },
  },

  punch: {
    name: "打卡记录",
    preview: "📍 上班打卡 09:00\n北京·三里屯SOHO\n2024.01.15 星期一",
    styleFields: [
      "position",
      "fontSize",
      "fontFamily",
      "textColor",
      "backgroundColor",
      "backgroundOpacity",
      "borderRadius",
    ],
    contentFields: [
      {
        key: "punchType",
        type: "select",
        label: "打卡类型",
        options: [
          { value: "clockIn", label: "上班打卡" },
          { value: "clockOut", label: "下班打卡" },
          { value: "breakStart", label: "休息开始" },
          { value: "breakEnd", label: "休息结束" },
          { value: "overtime", label: "加班打卡" },
        ],
        default: "clockIn",
        required: true,
      },
      { key: "workLocation", type: "input", label: "工作地点", placeholder: "请输入工作地点", required: true },
      { key: "department", type: "input", label: "部门", placeholder: "请输入部门名称" },
      { key: "employeeId", type: "input", label: "员工编号", placeholder: "请输入员工编号" },
      { key: "showWeekday", type: "checkbox", label: "显示星期", default: true },
      { key: "customTime", type: "time", label: "自定义打卡时间" },
    ],
    defaultStyle: {
      position: "bottom-center",
      fontSize: 42,
      fontFamily: "Arial",
      fontWeight: "bold" as const,
      fontStyle: "normal" as const,
      textColor: "#FFFFFF",
      backgroundColor: "#FF6B35",
      backgroundOpacity: 0.9,
      borderRadius: 8,
      padding: 12,
      offsetX: 0,
      offsetY: 10,
      textOpacity: 1,
    },
  },

  travel: {
    name: "旅行日志",
    preview: "✈️ 旅行日记\n📍 上海·迪士尼乐园\n🌤️ 晴天 22°C\n😊 心情愉快",
    styleFields: [
      "position",
      "fontSize",
      "fontFamily",
      "textColor",
      "backgroundColor",
      "backgroundOpacity",
      "borderRadius",
    ],
    contentFields: [
      { key: "destination", type: "input", label: "目的地", placeholder: "请输入旅行目的地", required: true },
      {
        key: "weather",
        type: "select",
        label: "天气",
        options: [
          { value: "☀️ 晴天", label: "☀️ 晴天" },
          { value: "⛅ 多云", label: "⛅ 多云" },
          { value: "🌧️ 雨天", label: "🌧️ 雨天" },
          { value: "❄️ 雪天", label: "❄️ 雪天" },
          { value: "🌫️ 雾天", label: "🌫️ 雾天" },
        ],
        default: "☀️ 晴天",
      },
      { key: "temperature", type: "input", label: "温度", placeholder: "22", inputType: "number", suffix: "°C" },
      { key: "companion", type: "input", label: "同行人", placeholder: "请输入同行人" },
      {
        key: "mood",
        type: "select",
        label: "心情",
        options: [
          { value: "😊 愉快", label: "😊 愉快" },
          { value: "😍 兴奋", label: "😍 兴奋" },
          { value: "😌 放松", label: "😌 放松" },
          { value: "🤔 思考", label: "🤔 思考" },
          { value: "😴 疲惫", label: "😴 疲惫" },
        ],
        default: "😊 愉快",
      },
    ],
    defaultStyle: {
      position: "bottom-right",
      fontSize: 40,
      fontFamily: "Arial",
      fontWeight: "normal" as const,
      fontStyle: "normal" as const,
      textColor: "#FFFFFF",
      backgroundColor: "#008000",
      backgroundOpacity: 0.8,
      borderRadius: 12,
      padding: 10,
      offsetX: 10,
      offsetY: 10,
      textOpacity: 1,
    },
  },
}

// 在组件开头添加SEO优化的内容
export default function ImageWatermarkTool() {
  // 在return之前添加SEO相关的useEffect
  useEffect(() => {
    // 动态设置页面标题
    document.title = `专业图片水印工具 - 免费在线时间地点水印制作 | PhotoStamper`

    // 添加结构化数据
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PhotoStamper",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
      },
    }

    const script = document.createElement("script")
    script.type = "application/ld+json"
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  const [currentLanguage, setCurrentLanguage] = useState<Language>("zh")
  const t = languages[currentLanguage].translations
  
  const [images, setImages] = useState<ImageFile[]>([])
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  
  const [selectedTemplate, setSelectedTemplate] = useState<string>("modern")
  
  const [templateConfig, setTemplateConfig] = useState<TemplateConfig>({
    ...templateConfigs.modern.defaultStyle,
    content: {},
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingProgress, setProcessingProgress] = useState(0)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Get current template configuration
  const currentTemplateConfig = templateConfigs[selectedTemplate as keyof typeof templateConfigs]

  // Extract EXIF data from image
  const extractExifData = useCallback(async (file: File): Promise<any> => {
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer
        const dataView = new DataView(arrayBuffer)

        // Simple EXIF extraction (in a real app, you'd use a library like exif-js)
        // For demo purposes, we'll simulate EXIF data
        const mockExifData = {
          dateTime: new Date().toISOString().slice(0, 19).replace("T", " "),
          gps: {
            latitude: 39.9042 + (Math.random() - 0.5) * 0.1,
            longitude: 116.4074 + (Math.random() - 0.5) * 0.1,
            location: "",
          },
        }
        resolve(mockExifData)
      }
      reader.readAsArrayBuffer(file)
    })
  }, [])

  // Handle file upload
  const handleFileUpload = useCallback(
    async (files: FileList) => {
      const newImages: ImageFile[] = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file.type.startsWith("image/")) {
          const id = Math.random().toString(36).substr(2, 9)
          const url = URL.createObjectURL(file)
          const exifData = await extractExifData(file)

          newImages.push({
            id,
            file,
            url,
            exifData,
          })
        }
      }

      setImages((prev) => [...prev, ...newImages])
      if (newImages.length > 0 && !selectedImage) {
        setSelectedImage(newImages[0].id)
      }
    },
    [extractExifData, selectedImage],
  )

  // Handle drag and drop
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const files = e.dataTransfer.files
      handleFileUpload(files)
    },
    [handleFileUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  // Generate watermark based on template
  const generateWatermark = useCallback(
    async (imageFile: ImageFile, config: TemplateConfig): Promise<string> => {
      return new Promise((resolve) => {
        const canvas = canvasRef.current!
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
    },
    [selectedTemplate],
  )

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

  // Generate preview
  useEffect(() => {
    if (selectedImage) {
      const image = images.find((img) => img.id === selectedImage)
      if (image) {
        generateWatermark(image, templateConfig).then(setPreviewUrl)
      }
    }
  }, [selectedImage, templateConfig, images, generateWatermark])

  // Apply watermark to all images
  const applyWatermarkToAll = async () => {
    setIsProcessing(true)
    setProcessingProgress(0)

    for (let i = 0; i < images.length; i++) {
      const watermarkedUrl = await generateWatermark(images[i], templateConfig)
      setImages((prev) => prev.map((img) => (img.id === images[i].id ? { ...img, watermarkedUrl } : img)))
      setProcessingProgress(((i + 1) / images.length) * 100)
    }

    setIsProcessing(false)
  }

  // Download single image
  const downloadImage = (imageId: string) => {
    const image = images.find((img) => img.id === imageId)
    if (image?.watermarkedUrl) {
      const link = document.createElement("a")
      link.download = `${image.file.name.split(".")[0]}-watermarked.jpg`
      link.href = image.watermarkedUrl
      link.click()
    }
  }

  // Download all images as ZIP
  const downloadAllAsZip = async () => {
    // In a real implementation, you'd use a library like JSZip
    // For now, we'll download them individually
    images.forEach((image) => {
      if (image.watermarkedUrl) {
        setTimeout(() => downloadImage(image.id), 100)
      }
    })
  }

  // Apply template
  const applyTemplate = (templateKey: string) => {
    const template = templateConfigs[templateKey as keyof typeof templateConfigs]
    if (template) {
      setSelectedTemplate(templateKey)
      setTemplateConfig({
        ...template.defaultStyle,
        content: {},
      })
    }
  }

  // Update template content
  const updateTemplateContent = (key: string, value: any) => {
    setTemplateConfig((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [key]: value,
      },
    }))
  }

  // Update template style
  const updateTemplateStyle = (key: string, value: any) => {
    setTemplateConfig((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  // Render template-specific content fields
  const renderContentFields = () => {
    if (!currentTemplateConfig) return null

    return currentTemplateConfig.contentFields.map((field) => {
      const value = templateConfig.content[field.key] ?? field.default

      switch (field.type) {
        case "input":
          return (
            <div key={field.key}>
              <Label className="text-xs">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Input
                type={field.inputType || "text"}
                step={field.step}
                placeholder={field.placeholder}
                value={value || ""}
                onChange={(e) => updateTemplateContent(field.key, e.target.value)}
                className="h-8"
                required={field.required}
              />
              {field.suffix && <span className="text-xs text-gray-500 ml-1">{field.suffix}</span>}
            </div>
          )

        case "textarea":
          return (
            <div key={field.key}>
              <Label className="text-xs">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Textarea
                placeholder={field.placeholder}
                value={value || ""}
                onChange={(e) => updateTemplateContent(field.key, e.target.value)}
                className="min-h-[60px] text-xs"
                required={field.required}
              />
            </div>
          )

        case "select":
          return (
            <div key={field.key}>
              <Label className="text-xs">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Select value={value || field.default} onValueChange={(val) => updateTemplateContent(field.key, val)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )

        case "checkbox":
          return (
            <div key={field.key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={field.key}
                checked={value ?? field.default}
                onChange={(e) => updateTemplateContent(field.key, e.target.checked)}
                className="w-4 h-4"
              />
              <Label htmlFor={field.key} className="text-xs">
                {field.label}
              </Label>
            </div>
          )

        case "date":
          return (
            <div key={field.key}>
              <Label className="text-xs">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Input
                type="date"
                value={value || ""}
                onChange={(e) => updateTemplateContent(field.key, e.target.value)}
                className="h-8"
                required={field.required}
              />
            </div>
          )

        case "time":
          return (
            <div key={field.key}>
              <Label className="text-xs">{field.label}</Label>
              <Input
                type="time"
                step="1"
                value={value || ""}
                onChange={(e) => updateTemplateContent(field.key, e.target.value)}
                className="h-8"
              />
            </div>
          )

        case "datetime-local":
          return (
            <div key={field.key}>
              <Label className="text-xs">{field.label}</Label>
              <Input
                type="datetime-local"
                step="1"
                value={value || ""}
                onChange={(e) => updateTemplateContent(field.key, e.target.value)}
                className="h-8"
              />
            </div>
          )

        default:
          return null
      }
    })
  }

  // Render template-specific style fields
  const renderStyleFields = () => {
    if (!currentTemplateConfig) return null

    return currentTemplateConfig.styleFields.map((fieldKey) => {
      switch (fieldKey) {
        case "position":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">{t.position}</Label>
              <Select value={templateConfig.position} onValueChange={(value) => updateTemplateStyle("position", value)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-left">{t.topLeft}</SelectItem>
                  <SelectItem value="top-center">{t.topCenter}</SelectItem>
                  <SelectItem value="top-right">{t.topRight}</SelectItem>
                  <SelectItem value="center-left">{t.centerLeft}</SelectItem>
                  <SelectItem value="center">{t.center}</SelectItem>
                  <SelectItem value="center-right">{t.centerRight}</SelectItem>
                  <SelectItem value="bottom-left">{t.bottomLeft}</SelectItem>
                  <SelectItem value="bottom-center">{t.bottomCenter}</SelectItem>
                  <SelectItem value="bottom-right">{t.bottomRight}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )

        case "fontSize":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">
                {t.fontSize}: {templateConfig.fontSize}px
              </Label>
              <Slider
                value={[templateConfig.fontSize]}
                onValueChange={([value]) => updateTemplateStyle("fontSize", value)}
                min={8}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>
          )

        case "fontFamily":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">{t.font}</Label>
              <Select
                value={templateConfig.fontFamily}
                onValueChange={(value) => updateTemplateStyle("fontFamily", value)}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="serif">Serif</SelectItem>
                  <SelectItem value="monospace">Monospace</SelectItem>
                  <SelectItem value="sans-serif">Sans-serif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )

        case "textColor":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">{t.textColor}</Label>
              <Input
                type="color"
                value={templateConfig.textColor}
                onChange={(e) => updateTemplateStyle("textColor", e.target.value)}
                className="h-8"
              />
            </div>
          )

        case "backgroundColor":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">{t.backgroundColor}</Label>
              <Input
                type="color"
                value={templateConfig.backgroundColor}
                onChange={(e) => updateTemplateStyle("backgroundColor", e.target.value)}
                className="h-8"
              />
            </div>
          )

        case "backgroundOpacity":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">
                {t.backgroundOpacity}: {Math.round(templateConfig.backgroundOpacity * 100)}%
              </Label>
              <Slider
                value={[templateConfig.backgroundOpacity]}
                onValueChange={([value]) => updateTemplateStyle("backgroundOpacity", value)}
                min={0}
                max={1}
                step={0.1}
                className="mt-2"
              />
            </div>
          )

        case "borderRadius":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">
                {t.borderRadius}: {templateConfig.borderRadius}px
              </Label>
              <Slider
                value={[templateConfig.borderRadius]}
                onValueChange={([value]) => updateTemplateStyle("borderRadius", value)}
                min={0}
                max={20}
                step={1}
                className="mt-2"
              />
            </div>
          )

        case "padding":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">
                {t.padding}: {templateConfig.padding}px
              </Label>
              <Slider
                value={[templateConfig.padding]}
                onValueChange={([value]) => updateTemplateStyle("padding", value)}
                min={0}
                max={30}
                step={1}
                className="mt-2"
              />
            </div>
          )

        default:
          return null
      }
    })
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen">
      {/* Header Navigation */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">{t.brand}</span>
              </div>
            </div>
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex items-center space-x-8">
                <a href="/features" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t.features}
                </a>
                <a href="/help" className="text-gray-600 hover:text-gray-900 transition-colors">
                  {t.help}
                </a>
              </nav>

              <div className="md:hidden">
                <Button variant="ghost" size="sm">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={currentLanguage} onValueChange={(value: Language) => setCurrentLanguage(value)}>
                  <SelectTrigger className="w-24 h-8 border-0 bg-transparent">
                    <SelectValue>
                      <div className="flex items-center space-x-1">
                        <span>{languages[currentLanguage].flag}</span>
                        <span className="text-sm">{languages[currentLanguage].name}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(languages).map(([key, lang]) => (
                      <SelectItem key={key} value={key}>
                        <div className="flex items-center space-x-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="relative py-12 md:py-20 overflow-hidden"
        itemScope
        itemType="https://schema.org/WebApplication"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4" itemProp="name">
              {t.heroMainTitle}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed" itemProp="description">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {t.heroMainSubtitle}
              </span>
              <br className="hidden md:block" />
              {t.heroMainDescription}
            </p>

            {/* 功能列表 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-sm">
              <div className="bg-white/80 rounded-lg p-3">
                <div className="font-semibold text-blue-600">{t.batchProcessingTitle}</div>
                <div className="text-gray-600">{t.batchProcessingDesc}</div>
              </div>
              <div className="bg-white/80 rounded-lg p-3">
                <div className="font-semibold text-green-600">{t.completelyFreeTitle}</div>
                <div className="text-gray-600">{t.completelyFreeDesc}</div>
              </div>
              <div className="bg-white/80 rounded-lg p-3">
                <div className="font-semibold text-purple-600">{t.privacySecureTitle}</div>
                <div className="text-gray-600">{t.privacySecureDesc}</div>
              </div>
              <div className="bg-white/80 rounded-lg p-3">
                <div className="font-semibold text-orange-600">{t.professionalTemplatesTitle}</div>
                <div className="text-gray-600">{t.professionalTemplatesDesc}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen p-2 md:p-4">
        <div className="max-w-[1600px] mx-auto">
          {/* Updated Tool Title */}
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287zM10 13a3 3 0 100-6 3 3 0 000 6z"
                  clipRule="evenodd"
                />
              </svg>
              {t.toolBadge}
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t.toolTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.toolDescription}</p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Upload and Image Management - Sidebar */}
            <div className="xl:col-span-1 space-y-6">
              {/* Upload Area */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    {t.uploadTitle}
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
                    <p className="text-sm text-gray-600 mb-1">{t.uploadDrag}</p>
                    <p className="text-xs text-gray-400">{t.uploadClick}</p>
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
                        {t.uploaded} ({images.length})
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setImages([])
                          setSelectedImage(null)
                          setPreviewUrl(null)
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
                            {image.watermarkedUrl && (
                              <Badge variant="secondary" className="text-xs">
                                ✓
                              </Badge>
                            )}
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
                      {isProcessing ? t.processing : t.applyAll}
                    </Button>
                    {images.some((img) => img.watermarkedUrl) && (
                      <Button onClick={downloadAllAsZip} variant="outline" className="w-full bg-transparent" size="sm">
                        <Download className="w-3 h-3 mr-2" />
                        {t.downloadAll}
                      </Button>
                    )}
                  </div>
                  {isProcessing && (
                    <div className="space-y-2 mt-4">
                      <Progress value={processingProgress} />
                      <p className="text-xs text-center text-gray-600">
                        {t.processingProgress}: {Math.round(processingProgress)}%
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Enhanced Preview Area - Takes up more space */}
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
                          disabled={!images.find((img) => img.id === selectedImage)?.watermarkedUrl}
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
                      {selectedImage && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">{t.fileName}:</span>
                              <p className="font-medium truncate">
                                {images.find((img) => img.id === selectedImage)?.file.name}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">{t.fileSize}:</span>
                              <p className="font-medium">
                                {(
                                  (images.find((img) => img.id === selectedImage)?.file.size || 0) /
                                  1024 /
                                  1024
                                ).toFixed(1)}{" "}
                                MB
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-500">{t.status}:</span>
                              <p className="font-medium">
                                {images.find((img) => img.id === selectedImage)?.watermarkedUrl ? (
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

            {/* Watermark Configuration - Sidebar */}
            <div className="xl:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    {t.settings}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="templates" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="templates" className="text-xs">
                        {t.templates}
                      </TabsTrigger>
                      <TabsTrigger value="style" className="text-xs">
                        {t.style}
                      </TabsTrigger>
                      <TabsTrigger value="content" className="text-xs">
                        {t.content}
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="templates" className="space-y-3">
                      <div className="grid grid-cols-1 gap-3">
                        {Object.entries(templateConfigs).map(([key, template]) => (
                          <div
                            key={key}
                            className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                              selectedTemplate === key
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300 bg-white"
                            }`}
                            onClick={() => applyTemplate(key)}
                          >
                            {/* Template Preview */}
                            <div className="p-3">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-medium text-gray-700">{template.name}</span>
                                {selectedTemplate === key && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                              </div>

                              {/* Mock watermark preview */}
                              <div
                                className="relative bg-gray-100 rounded-md p-2 min-h-[60px] flex items-end"
                                style={{
                                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                }}
                              >
                                <div
                                  className="text-xs leading-tight whitespace-pre-line rounded px-2 py-1"
                                  style={{
                                    backgroundColor: template.defaultStyle.backgroundColor,
                                    color: template.defaultStyle.textColor,
                                    opacity: template.defaultStyle.backgroundOpacity + 0.6,
                                    fontFamily: template.defaultStyle.fontFamily,
                                    borderRadius: `${template.defaultStyle.borderRadius}px`,
                                    fontSize: "10px",
                                  }}
                                >
                                  {template.preview}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="style" className="space-y-4">
                      <div className="space-y-4">{renderStyleFields()}</div>
                    </TabsContent>

                    <TabsContent value="content" className="space-y-4">
                      <div className="space-y-4">{renderContentFields()}</div>
                    </TabsContent>
                  </Tabs>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <Button
                      onClick={() => {
                        const template = templateConfigs[selectedTemplate as keyof typeof templateConfigs]
                        if (template) {
                          setTemplateConfig({
                            ...template.defaultStyle,
                            content: {},
                          })
                        }
                      }}
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      <RotateCcw className="w-3 h-3 mr-2" />
                      {t.reset}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Hidden canvas for image processing */}
          <canvas ref={canvasRef} className="hidden" />

          {/* Footer */}
          <footer className="bg-gray-900 text-white mt-20 w-full" itemScope itemType="https://schema.org/WPFooter">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              {/* 热门关键词部分 */}
              <div className="mb-12">
                <h3 className="text-lg font-semibold mb-6">{t.hotSearchTitle}</h3>
                <div className="flex flex-wrap gap-3">
                  {t.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition-colors"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>

              {/* 主要内容区域 */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold">{t.brand}</span>
                  </div>
                  <p className="text-gray-400 mb-6 max-w-lg leading-relaxed">{t.footerDescription}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-6">{t.productFeatures}</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>
                      <a href="/features" className="hover:text-white transition-colors">
                        {t.batchProcessing}
                      </a>
                    </li>
                    <li>
                      <a href="/features" className="hover:text-white transition-colors">
                        {t.customStyles}
                      </a>
                    </li>
                    <li>
                      <a href="/features" className="hover:text-white transition-colors">
                        {t.exifExtraction}
                      </a>
                    </li>
                    <li>
                      <a href="/features" className="hover:text-white transition-colors">
                        {t.highResSupport}
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-6">{t.helpSupport}</h3>
                  <ul className="space-y-3 text-gray-400">
                    <li>
                      <a href="/help" className="hover:text-white transition-colors">
                        {t.tutorial}
                      </a>
                    </li>
                    <li>
                      <a href="/help" className="hover:text-white transition-colors">
                        {t.faq}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition-colors">
                        {t.contact}
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:text-white transition-colors">
                        {t.feedback}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 底部版权信息 */}
              <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm mb-4 md:mb-0">{t.copyright}</p>
                <div className="flex flex-wrap gap-6">
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {t.privacy}
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {t.terms}
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                    {t.cookies}
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
