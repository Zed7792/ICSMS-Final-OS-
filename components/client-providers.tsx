"use client"

import type React from "react"

import { LanguageProvider } from "@/context/language-context"

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>
}
