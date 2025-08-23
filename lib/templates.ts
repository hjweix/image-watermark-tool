// Template-specific configuration types
export type TemplateConfig = {
  // Common style properties
  position: string | "custom"
  fontSize: number
  offsetX: number
  offsetY: number
  width?: number
  height?: number
  svgTemplate: string
  _forceUpdate?: number // 用于强制更新的时间戳
  _previewWidth?: number // 预览图片宽度，用于计算水印相对位置
  _previewHeight?: number // 预览图片高度，用于计算水印相对位置
  _relativeX?: number // 水印相对于预览图片的X位置比例
  _relativeY?: number // 水印相对于预览图片的Y位置比例

  // Template-specific content
  content: Record<string, any>
}

// Define template-specific field configurations
export type ContentField = {
  key: string
  type: "input" | "textarea" | "select" | "checkbox" | "date" | "time" | "datetime-local"
  label: string
  required?: boolean
  placeholder?: string
  inputType?: string
  step?: number
  suffix?: string
  options?: { value: string; label: string }[]
  default?: any
}

export const templateConfigs: {
  [key: string]: {
    name: string
    preview: string
    styleFields: string[]
    contentFields: ContentField[]
    defaultStyle: Omit<TemplateConfig, "content">
    svgPath?: string
  }
} = {
  modern: {
    name: "现代简约",
    preview: "🕐 11:30\n📅 2024-01-15\n📍 北京·三里屯",
    styleFields: [
      "position",
      "fontSize",
    ],
    contentFields: [
      { key: "showDate", type: "checkbox", label: "showDate", default: true },
      { key: "showTime", type: "checkbox", label: "showTime", default: true },
      { key: "customDateTime", type: "datetime-local", label: "customDateTime" },
      { key: "showLocation", type: "checkbox", label: "showLocation", default: true },
      { key: "customLocation", type: "input", label: "customLocation", placeholder: "enterLocation" },
      {
        key: "dateFormat",
        type: "select",
        label: "dateFormat",
        options: [
          { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
          { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
          { value: "MM-DD-YYYY", label: "MM-DD-YYYY" },
        ],
        default: "YYYY-MM-DD",
      },
    ],
    svgPath: "/templates/preview/modern.svg",
    defaultStyle: {
      position: "bottom-left",
      fontSize: 24,
      offsetX: 20,
      offsetY: 20,
      width: undefined,
      height: undefined,
      svgTemplate: "/templates/preview/modern.svg",
    },
  },

  professional: {
    name: "专业标记",
    preview: "经度: 116.305315\n纬度: 39.930812\n海拔: 50m\n精度: 5m\n时间: 2024-01-15 11:30:45",
    styleFields: ["position", "fontSize"],
    contentFields: [
      {
        key: "longitude",
        type: "input",
        label: "longitude",
        placeholder: "116.305315",
        inputType: "number",
        step: 0.000001,
      },
      { key: "latitude", type: "input", label: "latitude", placeholder: "39.930812", inputType: "number", step: 0.000001 },
      { key: "altitude", type: "input", label: "altitude", placeholder: "50", inputType: "number" },
      { key: "accuracy", type: "input", label: "accuracy", placeholder: "5", inputType: "number" },
      { key: "showTime", type: "checkbox", label: "showTime", default: true },
      { key: "customDateTime", type: "datetime-local", label: "customDateTime" },
    ],
    svgPath: "/templates/preview/professional.svg",
    defaultStyle: {
      position: "bottom-left",
      fontSize: 16,
      offsetX: 20,
      offsetY: 20,
      width: undefined,
      height: undefined,
      svgTemplate: "/templates/preview/professional.svg",
    },
  },

  baby: {
    name: "宝贝成长",
    preview: "👶 小宝贝·出生第101天\n🎉 第一次笑\n📅 2024.01.15",
    styleFields: [
      "position",
      "fontSize",
    ],
    contentFields: [
      { key: "babyName", type: "input", label: "babyName", placeholder: "enterBabyName", required: true },
      { key: "birthDate", type: "date", label: "birthDate", required: true },
      { key: "milestone", type: "input", label: "milestone", placeholder: "enterMilestone" },
      { key: "showDaysSince", type: "checkbox", label: "daysSinceBirth", default: true },
      { key: "showCurrentDate", type: "checkbox", label: "showCurrentDate", default: true },
      { key: "customDateTime", type: "datetime-local", label: "customDateTime" },
    ],
    svgPath: "/templates/preview/baby.svg",
    defaultStyle: {
      position: "bottom-left",
      fontSize: 22,
      offsetX: 20,
      offsetY: 20,
      width: undefined,
      height: undefined,
      svgTemplate: "/templates/preview/baby.svg",
    },
  },

  engineering: {
    name: "工程记录",
    preview: "⚡ 北京地铁15号线\n📍 望京东站施工区域\n🔧 隧道开挖作业\n⏰ 09:30\n📅 2024-01-15 11:30",
    styleFields: ["position", "fontSize"],
    contentFields: [
      { key: "projectName", type: "input", label: "projectName", placeholder: "enterProjectName", required: true },
      { key: "constructionArea", type: "input", label: "constructionArea", placeholder: "enterConstructionArea", required: true },
      {
        key: "constructionContent",
        type: "textarea",
        label: "constructionContent",
        placeholder: "enterConstructionContent",
        required: true,
      },
      { key: "customDateTime", type: "datetime-local", label: "customDateTime" },
      { key: "showDateTime", type: "checkbox", label: "showDateTime", default: true },
    ],
    svgPath: "/templates/preview/engineering.svg",
    defaultStyle: {
      position: "bottom-left",
      fontSize: 18,
      offsetX: 20,
      offsetY: 20,
      width: undefined,
      height: undefined,
      svgTemplate: "/templates/preview/engineering.svg",
    },
  },

  punch: {
    name: "打卡记录",
    preview: "📍 上班打卡 09:00\n北京·三里屯SOHO\n2024.01.15 星期一",
    styleFields: [
      "position",
      "fontSize",
    ],
    contentFields: [
      {
        key: "punchType",
        type: "select",
        label: "punchType",
        options: [
          { value: "clockIn", label: "clockIn" },
          { value: "clockOut", label: "clockOut" },
          { value: "breakStart", label: "breakStart" },
          { value: "breakEnd", label: "breakEnd" },
          { value: "overtime", label: "overtime" },
        ],
        default: "clockIn",
        required: true,
      },
      { key: "workLocation", type: "input", label: "workLocation", placeholder: "enterWorkLocation", required: true },
      { key: "showWeekday", type: "checkbox", label: "showWeekday", default: true },
      { key: "customDateTime", type: "datetime-local", label: "customDateTime" },
    ],
    svgPath: "/templates/preview/punch.svg",
    defaultStyle: {
      position: "bottom-left",
      fontSize: 20,
      offsetX: 20,
      offsetY: 20,
      width: undefined,
      height: undefined,
      svgTemplate: "/templates/preview/punch.svg",
    },
  },

  travel: {
    name: "旅行日志",
    preview: "✈️ 旅行日记\n📍 上海·迪士尼乐园\n☀️ 晴天 22°C\n👥 家人\n😊 愉快",
    styleFields: [
      "position",
      "fontSize",
    ],
    contentFields: [
      { key: "destination", type: "input", label: "destination", placeholder: "enterDestination", required: true },
      {
        key: "weather",
        type: "select",
        label: "weather",
        options: [
          { value: "☀️ 晴天", label: "sunny" },
          { value: "⛅ 多云", label: "cloudy" },
          { value: "🌧️ 雨天", label: "rainy" },
          { value: "❄️ 雪天", label: "snowy" },
          { value: "🌫️ 雾天", label: "foggy" },
        ],
        default: "☀️ 晴天",
      },
      { key: "temperature", type: "input", label: "temperature", placeholder: "22", inputType: "number", suffix: "°C" },
      { key: "companion", type: "input", label: "companion", placeholder: "enterCompanion" },
      {
        key: "mood",
        type: "select",
        label: "mood",
        options: [
          { value: "😊 愉快", label: "happy" },
          { value: "😍 兴奋", label: "excited" },
          { value: "😌 放松", label: "relaxed" },
          { value: "🤔 思考", label: "thinking" },
          { value: "😴 疲惫", label: "tired" },
        ],
        default: "😊 愉快",
      },
    ],
    svgPath: "/templates/preview/travel.svg",
    defaultStyle: {
      position: "bottom-left",
      fontSize: 20,
      offsetX: 20,
      offsetY: 20,
      width: undefined,
      height: undefined,
      svgTemplate: "/templates/preview/travel.svg",
    },
  },
}
