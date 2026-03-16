import type React from "react"
import type { Metadata } from "next"
import { DM_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google"
import "@chinese-fonts/lxgwwenkai/dist/LXGWWenKai-Regular/result.css"
import "../globals.css"
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../src/i18n/routing';
import { Analytics } from '@vercel/analytics/next';

// 加载优雅字体
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
})

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const isZh = locale === 'zh';

  return {
    title: isZh
      ? "专业图片水印工具 - 免费在线时间地点水印制作 | PhotoStamper"
      : "Professional Image Watermark Tool - Free Online Time & Location Watermarking | PhotoStamper",
    description: isZh
      ? "专业的在线图片水印工具，支持批量添加时间、日期、地点水印。适用于工程记录、打卡签到、旅行日志、宝贝成长等场景。完全免费，无需下载安装，保护隐私安全。"
      : "Professional online image watermarking tool supporting batch addition of time, date, and location watermarks. Perfect for project documentation, check-ins, travel logs, and more. Completely free, no download required, privacy protected.",
    keywords: isZh
      ? "图片水印,时间水印,地点水印,批量水印,工程水印,打卡水印,在线水印工具,免费水印,图片处理"
      : "image watermark,time watermark,location watermark,batch watermark,project watermark,check-in watermark,online watermark tool,free watermark,image processing",
    authors: [{ name: "PhotoStamper Team" }],
    creator: "PhotoStamper",
    publisher: "PhotoStamper",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://watermarker.yuelabs.com"),
    icons: {
      icon: "/icon.svg",
      shortcut: "/icon.svg",
      apple: "/icon.svg",
    },
    alternates: {
      canonical: "/",
      languages: {
        "zh-CN": "/zh",
        "en-US": "/en",
      },
    },
    openGraph: {
      type: "website",
      locale: isZh ? "zh_CN" : "en_US",
      url: "https://watermarker.yuelabs.com",
      title: isZh
        ? "专业图片水印工具 - 免费在线时间地点水印制作"
        : "Professional Image Watermark Tool - Free Online Time & Location Watermarking",
      description: isZh
        ? "专业的在线图片水印工具，支持批量添加时间、日期、地点水印。适用于工程记录、打卡签到、旅行日志等多种场景。"
        : "Professional online image watermarking tool supporting batch addition of time, date, and location watermarks. Perfect for project documentation and more.",
      siteName: "PhotoStamper",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isZh ? "PhotoStamper - 专业图片水印工具" : "PhotoStamper - Professional Image Watermark Tool",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isZh
        ? "专业图片水印工具 - 免费在线时间地点水印制作"
        : "Professional Image Watermark Tool - Free Online Time & Location Watermarking",
      description: isZh
        ? "专业的在线图片水印工具，支持批量添加时间、日期、地点水印。完全免费，无需下载安装。"
        : "Professional online image watermarking tool supporting batch addition of time, date, and location watermarks. Completely free, no download required.",
      images: ["/twitter-image.jpg"],
      creator: "@PhotoStamper",
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
    generator: 'HJWEI'
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-GCPQ4VK871" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-GCPQ4VK871');
            `,
          }}
        />
        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "PhotoStamper",
              description: "专业的在线图片水印工具，支持批量添加时间、日期、地点水印",
              url: "https://watermarker.yuelabs.com",
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
                "高清图片支持",
                "完全免费使用",
              ],
              screenshot: "https://watermarker.yuelabs.com/screenshot.jpg",
              author: {
                "@type": "Organization",
                name: "PhotoStamper Team",
              },
            }),
          }}
        />

        {/* 额外的SEO标签 */}
        <link rel="canonical" href="https://watermarker.yuelabs.com" />
        <meta name="theme-color" content="#C4A484" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PhotoStamper" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${dmSans.variable} ${playfair.variable} ${jetbrainsMono.variable} font-sans antialiased bg-cream text-charcoal`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  )
}
