"use client"

import { ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/src/i18n/routing'
import { useParams, usePathname as useNextPathname } from 'next/navigation'
import { routing } from '@/src/i18n/routing'

export default function Header() {
  const t = useTranslations('header')
  const params = useParams()
  const locale = (typeof params.locale === 'string' ? params.locale : useLocale()) as string
  const router = useRouter()
  const pathname = usePathname()
  const nextPathname = useNextPathname()

  const handleLanguageChange = (newLocale: string) => {
    // 移除当前locale前缀，获取纯路径
    const pathWithoutLocale = nextPathname.replace(`/${locale}`, '') || '/'
    router.replace(pathWithoutLocale, { locale: newLocale })
  }

  const languages = {
    zh: { flag: '🇨🇳', name: '中文' },
    en: { flag: '🇺🇸', name: 'English' }
  }

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button onClick={() => router.push('/', { locale })} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">{t('brand')}</span>
            </button>
          </div>
          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => router.push('/features', { locale })}
                className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                {t('features')}
              </button>
              <button 
                onClick={() => router.push('/help', { locale })}
                className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
              >
                {t('help')}
              </button>
            </nav>

            <div className="md:hidden">
              <Button variant="ghost" size="sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={locale} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-30 h-8 border-0 bg-transparent">
                  <SelectValue>
                    <div className="flex items-center space-x-1">
                      <span>{languages[locale as keyof typeof languages]?.flag}</span>
                      <span className="text-sm">{languages[locale as keyof typeof languages]?.name}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {routing.locales.map((loc: string) => (
                    <SelectItem key={loc} value={loc}>
                      <div className="flex items-center space-x-2">
                        <span>{languages[loc as keyof typeof languages]?.flag}</span>
                        <span>{languages[loc as keyof typeof languages]?.name}</span>
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
  )
}