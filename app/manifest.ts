import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "PhotoStamper - 专业图片水印工具",
    short_name: "PhotoStamper",
    description: "专业的在线图片水印工具，支持批量添加时间、日期、地点水印",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#3B82F6",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    categories: ["productivity", "photo", "utilities"],
    lang: "zh-CN",
  }
}
