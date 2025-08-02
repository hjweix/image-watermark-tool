// Template-specific configuration types
export type TemplateConfig = {
  // Common style properties
  position: string | "custom"
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
  width?: number
  height?: number
  useSvg?: boolean
  svgTemplate?: string
  _forceUpdate?: number // 用于强制更新的时间戳
  _previewWidth?: number // 预览图片宽度，用于计算水印相对位置
  _previewHeight?: number // 预览图片高度，用于计算水印相对位置

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
    preview: "11:30 | 2024-01-15\n📍 北京·三里屯",
    styleFields: [
      "position",
      "fontSize",
      "fontFamily",
      "textColor",
      "backgroundColor",
      "backgroundOpacity",
      "borderRadius",
      "useSvg",
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
    svgPath: "/templates/modern.svg",
    defaultStyle: {
      position: "bottom-right",
      fontSize: 24,
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
      width: undefined,
      height: undefined,
      useSvg: true,
      svgTemplate: "/templates/modern.svg",
    },
  },

  professional: {
    name: "专业标记",
    preview: "经度: 116.305315\n纬度: 39.930812\n时间: 2024-01-15 11:30:45",
    styleFields: ["position", "fontSize", "fontFamily", "textColor", "backgroundColor", "backgroundOpacity", "useSvg"],
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
    svgPath: "/templates/professional.svg",
    defaultStyle: {
      position: "bottom-left",
      fontSize: 16,
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
      width: undefined,
      height: undefined,
      useSvg: true,
      svgTemplate: "/templates/professional.svg",
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
      "useSvg",
    ],
    contentFields: [
      { key: "babyName", type: "input", label: "宝贝姓名", placeholder: "请输入宝贝姓名", required: true },
      { key: "birthDate", type: "date", label: "出生日期", required: true },
      { key: "milestone", type: "input", label: "成长里程碑", placeholder: "第一次笑、第一次翻身等" },
      { key: "showDaysSince", type: "checkbox", label: "显示出生天数", default: true },
      { key: "showCurrentDate", type: "checkbox", label: "显示当前日期", default: true },
    ],
    svgPath: "/templates/baby.svg",
    defaultStyle: {
      position: "bottom-right",
      fontSize: 22,
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
      width: undefined,
      height: undefined,
      useSvg: true,
      svgTemplate: "/templates/baby.svg",
    },
  },

  engineering: {
    name: "工程记录",
    preview: "⚡ 北京地铁15号线\n📍 望京东站施工区域\n🔧 隧道开挖作业\n📅 2024-01-15 11:30",
    styleFields: ["position", "fontSize", "fontFamily", "textColor", "backgroundColor", "backgroundOpacity", "useSvg"],
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
    svgPath: "/templates/engineering.svg",
    defaultStyle: {
      position: "top-left",
      fontSize: 18,
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
      width: undefined,
      height: undefined,
      useSvg: true,
      svgTemplate: "/templates/engineering.svg",
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
      "useSvg",
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
    svgPath: "/templates/punch.svg",
    defaultStyle: {
      position: "bottom-center",
      fontSize: 20,
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
      width: undefined,
      height: undefined,
      useSvg: true,
      svgTemplate: "/templates/punch.svg",
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
      "useSvg",
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
    svgPath: "/templates/travel.svg",
    defaultStyle: {
      position: "bottom-right",
      fontSize: 20,
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
      width: undefined,
      height: undefined,
      useSvg: true,
      svgTemplate: "/templates/travel.svg",
    },
  },
}
