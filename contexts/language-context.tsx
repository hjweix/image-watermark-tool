"use client"

import { createContext, useState, useContext, Dispatch, SetStateAction, ReactNode, useEffect } from "react"
import { languages, Language } from "@/lib/i18n"

type LanguageContextType = {
  currentLanguage: Language
  setCurrentLanguage: Dispatch<SetStateAction<Language>>
  t: (typeof languages)["zh"]["translations"]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language")
      return (savedLanguage as Language) || "zh"
    }
    return "zh"
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", currentLanguage)
    }
  }, [currentLanguage])

  const t = languages[currentLanguage].translations

  return (
    <LanguageContext.Provider value={{ currentLanguage, setCurrentLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}