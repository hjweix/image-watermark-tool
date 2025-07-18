"use client"

import { useLanguage } from "@/contexts/language-context"

export default function HeroSection() {
  const { t } = useLanguage()

  return (
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
  )
}
