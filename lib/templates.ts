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

  food: {
    name: "美食记录",
    preview: "🍜 老北京炸酱面馆\n招牌炸酱面 + 凉拌黄瓜\n⭐ 4.8  ·  ¥45/人\n📅 2024-01-15 晚餐",
    styleFields: ["position", "fontSize"],
    contentFields: [
      { key: "restaurantName", type: "input", label: "餐厅名称", placeholder: "输入餐厅名称", required: true },
      { key: "dishName", type: "input", label: "菜品名称", placeholder: "输入菜品名称" },
      { key: "rating", type: "input", label: "评分", placeholder: "4.8", inputType: "number", step: 0.1 },
      { key: "price", type: "input", label: "人均消费", placeholder: "45", inputType: "number", suffix: "元" },
      {
        key: "mealType",
        type: "select",
        label: "用餐时段",
        options: [
          { value: "早餐", label: "早餐" },
          { value: "午餐", label: "午餐" },
          { value: "晚餐", label: "晚餐" },
          { value: "下午茶", label: "下午茶" },
          { value: "夜宵", label: "夜宵" },
        ],
        default: "晚餐",
      },
      { key: "customDateTime", type: "datetime-local", label: "customDateTime" },
      { key: "showDateTime", type: "checkbox", label: "showDateTime", default: true },
    ],
    svgPath: "/templates/preview/food.svg",
    defaultStyle: {
      position: "bottom-left",
      fontSize: 20,
      offsetX: 20,
      offsetY: 20,
      width: undefined,
      height: undefined,
      svgTemplate: "/templates/preview/food.svg",
    },
  },

  fitness: {
    name: "运动健身",
    preview: "🏃 户外跑步\n5.20 公里\n⏱️ 32:15  ·  🔥 320千卡\n配速 6'12\"  ·  步数 6,842",
    styleFields: ["position", "fontSize"],
    contentFields: [
      {
        key: "sportType",
        type: "select",
        label: "运动类型",
        options: [
          { value: "户外跑步", label: "户外跑步" },
          { value: "室内跑步", label: "室内跑步" },
          { value: "户外骑行", label: "户外骑行" },
          { value: "游泳", label: "游泳" },
          { value: "健身", label: "健身" },
          { value: "瑜伽", label: "瑜伽" },
          { value: "徒步", label: "徒步" },
        ],
        default: "户外跑步",
        required: true,
      },
      { key: "distance", type: "input", label: "距离", placeholder: "5.20", inputType: "number", step: 0.01 },
      { key: "duration", type: "input", label: "运动时长", placeholder: "32:15" },
      { key: "calories", type: "input", label: "消耗卡路里", placeholder: "320", inputType: "number", suffix: "千卡" },
      { key: "pace", type: "input", label: "配速", placeholder: "6'12\"" },
      { key: "steps", type: "input", label: "步数", placeholder: "6842", inputType: "number" },
      { key: "showProgress", type: "checkbox", label: "显示完成进度", default: true },
      { key: "progressPercent", type: "input", label: "完成百分比", placeholder: "78", inputType: "number", suffix: "%" },
    ],
    svgPath: "/templates/preview/fitness.svg",
    defaultStyle: {
      position: "bottom-left",
      fontSize: 18,
      offsetX: 20,
      offsetY: 20,
      width: undefined,
      height: undefined,
      svgTemplate: "/templates/preview/fitness.svg",
    },
  },

  pet: {
    name: "宠物档案",
    preview: "🐱 咪咪 · 2岁3个月\n🐾 英短蓝猫  ·  4.2kg\n😸 今天心情很好，吃了罐头~",
    styleFields: ["position", "fontSize"],
    contentFields: [
      { key: "petName", type: "input", label: "宠物名字", placeholder: "输入宠物名字", required: true },
      {
        key: "petType",
        type: "select",
        label: "宠物类型",
        options: [
          { value: "🐱 猫咪", label: "猫咪" },
          { value: "🐶 狗狗", label: "狗狗" },
          { value: "🐰 兔子", label: "兔子" },
          { value: "🐹 仓鼠", label: "仓鼠" },
          { value: "🐦 鸟类", label: "鸟类" },
          { value: "🐢 爬宠", label: "爬宠" },
          { value: "🐟 鱼类", label: "鱼类" },
        ],
        default: "🐱 猫咪",
      },
      { key: "breed", type: "input", label: "品种", placeholder: "输入品种" },
      { key: "petAge", type: "input", label: "年龄", placeholder: "2岁3个月" },
      { key: "weight", type: "input", label: "体重", placeholder: "4.2", inputType: "number", suffix: "kg" },
      { key: "mood", type: "input", label: "心情/状态", placeholder: "今天心情很好~" },
      { key: "showCurrentDate", type: "checkbox", label: "showCurrentDate", default: false },
    ],
    svgPath: "/templates/preview/pet.svg",
    defaultStyle: {
      position: "bottom-left",
      fontSize: 20,
      offsetX: 20,
      offsetY: 20,
      width: undefined,
      height: undefined,
      svgTemplate: "/templates/preview/pet.svg",
    },
  },

  camera: {
    name: "摄影参数",
    preview: "Sony A7M4  35mm f/1.4 GM\nf/1.4  1/500  ISO 100\n2024.01.15 14:32",
    styleFields: ["position", "fontSize"],
    contentFields: [
      { key: "cameraModel", type: "input", label: "相机型号", placeholder: "Sony A7M4", required: true },
      { key: "lensModel", type: "input", label: "镜头型号", placeholder: "35mm f/1.4 GM" },
      { key: "aperture", type: "input", label: "光圈", placeholder: "f/1.4" },
      { key: "shutter", type: "input", label: "快门速度", placeholder: "1/500" },
      { key: "iso", type: "input", label: "ISO", placeholder: "ISO 100" },
      { key: "focalLength", type: "input", label: "焦距", placeholder: "35mm" },
      { key: "showDateTime", type: "checkbox", label: "showDateTime", default: true },
      { key: "customDateTime", type: "datetime-local", label: "customDateTime" },
    ],
    svgPath: "/templates/preview/camera.svg",
    defaultStyle: {
      position: "bottom-left",
      fontSize: 16,
      offsetX: 20,
      offsetY: 20,
      width: undefined,
      height: undefined,
      svgTemplate: "/templates/preview/camera.svg",
    },
  },
}
