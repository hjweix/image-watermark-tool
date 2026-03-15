"use client"

import { ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/src/i18n/routing'
import { useParams, usePathname as useNextPathname } from 'next/navigation'
import { routing } from '@/src/i18n/routing'
import { motion } from "framer-motion"

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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="sticky top-0 z-50 bg-cream/80 backdrop-blur-md border-b border-warm-200/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <button onClick={() => router.push('/', { locale })} className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-gradient-to-br from-warm to-warm-dark rounded-lg flex items-center justify-center shadow-warm transition-all duration-300 group-hover:shadow-warm-lg group-hover:scale-105">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-display font-semibold text-charcoal tracking-tight">
                {t('brand')}
              </span>
            </button>
          </motion.div>

          {/* Navigation */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-1">
              <NavButton onClick={() => router.push('/features', { locale })}>
                {t('features')}
              </NavButton>
              <NavButton onClick={() => router.push('/help', { locale })}>
                {t('help')}
              </NavButton>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="sm" className="text-charcoal-light hover:text-charcoal hover:bg-warm-100/50">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </Button>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center">
              <Select value={locale} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[110px] h-9 border-warm-200 bg-white/50 hover:bg-white transition-colors rounded-full px-3 text-sm">
                  <SelectValue>
                    <div className="flex items-center space-x-2">
                      <span className="text-base">{languages[locale as keyof typeof languages]?.flag}</span>
                      <span className="text-charcoal-secondary text-sm">{languages[locale as keyof typeof languages]?.name}</span>
                    </div>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent className="min-w-[110px]">
                  {routing.locales.map((loc: string) => (
                    <SelectItem key={loc} value={loc} className="cursor-pointer">
                      <div className="flex items-center space-x-2">
                        <span className="text-base">{languages[loc as keyof typeof languages]?.flag}</span>
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
    </motion.header>
  )
}

// 导航按钮组件
function NavButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative px-4 py-2 text-sm text-charcoal-light hover:text-charcoal transition-colors duration-200 rounded-full hover:bg-warm-100/50 group"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <span
        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-warm rounded-full group-hover:w-[60%] transition-all duration-300 ease-out"
      />
    </motion.button>
  )
}
