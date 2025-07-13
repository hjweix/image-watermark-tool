import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "专业图片水印工具 - 免费在线时间地点水印制作 | WatermarkPro",
  description:
    "专业的在线图片水印工具，支持批量添加时间、日期、地点水印。适用于工程记录、打卡签到、旅行日志、宝贝成长等场景。完全免费，无需下载安装，保护隐私安全。",
  keywords: "图片水印,时间水印,地点水印,批量水印,工程水印,打卡水印,在线水印工具,免费水印,图片处理",
  authors: [{ name: "WatermarkPro Team" }],
  creator: "WatermarkPro",
  publisher: "WatermarkPro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://watermarkpro.com"),
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/zh",
      "en-US": "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://watermarkpro.com",
    title: "专业图片水印工具 - 免费在线时间地点水印制作",
    description:
      "专业的在线图片水印工具，支持批量添加时间、日期、地点水印。适用于工程记录、打卡签到、旅行日志等多种场景。",
    siteName: "WatermarkPro",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "WatermarkPro - 专业图片水印工具",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "专业图片水印工具 - 免费在线时间地点水印制作",
    description: "专业的在线图片水印工具，支持批量添加时间、日期、地点水印。完全免费，无需下载安装。",
    images: ["/twitter-image.jpg"],
    creator: "@WatermarkPro",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "WatermarkPro",
              description: "专业的在线图片水印工具，支持批量添加时间、日期、地点水印",
              url: "https://watermarkpro.com",
              applicationCategory: "MultimediaApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "CNY",
              },
              featureList: [
                "批量图片水印处理",
                "多种专业模板",
                "自定义样式设置",
                "EXIF信息提取",
                "高清图片支持",
                "完全免费使用",
              ],
              screenshot: "https://watermarkpro.com/screenshot.jpg",
              author: {
                "@type": "Organization",
                name: "WatermarkPro Team",
              },
            }),
          }}
        />

        {/* 额外的SEO标签 */}
        <link rel="canonical" href="https://watermarkpro.com" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="WatermarkPro" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className}>
        {children}

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </body>
    </html>
  )
}
