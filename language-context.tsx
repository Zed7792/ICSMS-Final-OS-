"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  currentLanguage: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>("en")

  const setLanguage = useCallback((lang: Language) => {
    setCurrentLanguage(lang)
  }, [])

  return <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    // During SSR or when provider is not available, return default values
    return {
      currentLanguage: "en" as Language,
      setLanguage: () => {}, // No-op function for SSR
    }
  }
  return context
}
