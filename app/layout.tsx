import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClientProviders } from "@/components/client-providers"
import OilservSidebar from "../oilserv-sidebar"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OILSERV - Chemical Safety Management System",
  description: "Safety Data Sheet Library and Chemical Management",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientProviders>
            <OilservSidebar>{children}</OilservSidebar>
          </ClientProviders>
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
