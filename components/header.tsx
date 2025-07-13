"use client"

import { ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { languages, Language } from "@/lib/i18n"
import { useLanguage } from "@/contexts/language-context"

export default function Header() {
  const { currentLanguage, setCurrentLanguage, t } = useLanguage()

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">{t.brand}</span>
            </a>
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
                    <SelectItem key={key} value={key as Language}>
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
  )
}