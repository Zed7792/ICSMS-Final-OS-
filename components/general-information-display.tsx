"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/context/language-context"
import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// Import the content components
import SDSOverviewPage from "@/app/general-information/sds-overview/page"
import GHSPage from "@/app/general-information/ghs-pictograms/page"
import TransportationPage from "@/app/general-information/transportation/page"
import SDS16ElementsPage from "@/app/general-information/sds-16-elements/page"
import ChemicalSafetyDosDontsPage from "@/app/general-information/chemical-safety-dos-donts/page"
import NFPAHazardAwarenessPage from "@/app/general-information/nfpa-hazard-awareness/page"
import HazardsPrecautionaryStatementsPage from "@/app/general-information/hazards-precautionary-statements/page"

// Add a translation object for tab titles
const tabTitles = {
  en: {
    sdsOverview: "SDS Overview",
    ghsPictograms: "GHS Pictograms",
    transportation: "Transportation",
    sds16Elements: "SDS 16 Elements",
    chemicalSafetyDosDonts: "Chemical Safety Dos & Don'ts",
    nfpaHazardAwareness: "NFPA Hazard Awareness Chart",
    hazardsPrecautionaryStatements: "Hazards & Precautionary Statements List",
  },
  ar: {
    sdsOverview: "نظرة عامة على صحائف بيانات السلامة",
    ghsPictograms: "رموز GHS التوضيحية",
    transportation: "النقل",
    sds16Elements: "عناصر صحيفة بيانات السلامة الـ 16",
    chemicalSafetyDosDonts: "إرشادات السلامة الكيميائية: ما يجب فعله وما لا يجب فعله",
    nfpaHazardAwareness: "مخطط الوعي بمخاطر NFPA",
    hazardsPrecautionaryStatements: "قائمة بيانات المخاطر والاحتياطات",
  },
}

// Define a type for the active tab
type ActiveTab =
  | "sds-overview"
  | "ghs-pictograms"
  | "transportation"
  | "sds-16-elements"
  | "chemical-safety-dos-donts"
  | "nfpa-hazard-awareness"
  | "hazards-precautionary-statements"

export default function GeneralInformationDisplay() {
  const { currentLanguage, setLanguage } = useLanguage()
  const [activeTab, setActiveTab] = useState<ActiveTab>("sds-overview") // Default to SDS Overview

  const renderSelectedPage = () => {
    switch (activeTab) {
      case "sds-overview":
        return <SDSOverviewPage />
      case "ghs-pictograms":
        return <GHSPage />
      case "transportation":
        return <TransportationPage />
      case "sds-16-elements":
        return <SDS16ElementsPage />
      case "chemical-safety-dos-donts":
        return <ChemicalSafetyDosDontsPage />
      case "nfpa-hazard-awareness":
        return <NFPAHazardAwarenessPage />
      case "hazards-precautionary-statements":
        return <HazardsPrecautionaryStatementsPage />
      default:
        return <SDSOverviewPage />
    }
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <Card className="bg-white text-gray-900 border-gray-200">
        <CardHeader className="pb-0">
          {/* Language Selector */}
          <div className="flex justify-end mb-4">
            <Select value={currentLanguage} onValueChange={(value) => setLanguage(value as "en" | "ar")}>
              <SelectTrigger className="w-[120px] bg-gray-100 text-gray-800 border-gray-300 hover:border-gray-400">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-800 border-gray-300">
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tab Navigation */}
          <nav className="flex overflow-x-auto whitespace-nowrap border-b border-gray-200 -mx-6 px-6">
            <Button
              variant="ghost"
              onClick={() => setActiveTab("sds-overview")}
              className={`
                px-4 py-3 rounded-none border-b-2
                ${activeTab === "sds-overview" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"}
                transition-colors duration-200
              `}
            >
              {tabTitles[currentLanguage].sdsOverview}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("ghs-pictograms")}
              className={`
                px-4 py-3 rounded-none border-b-2
                ${activeTab === "ghs-pictograms" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"}
                transition-colors duration-200
              `}
            >
              {tabTitles[currentLanguage].ghsPictograms}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("transportation")}
              className={`
                px-4 py-3 rounded-none border-b-2
                ${activeTab === "transportation" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"}
                transition-colors duration-200
              `}
            >
              {tabTitles[currentLanguage].transportation}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("sds-16-elements")}
              className={`
                px-4 py-3 rounded-none border-b-2
                ${activeTab === "sds-16-elements" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"}
                transition-colors duration-200
              `}
            >
              {tabTitles[currentLanguage].sds16Elements}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("chemical-safety-dos-donts")}
              className={`
                px-4 py-3 rounded-none border-b-2
                ${activeTab === "chemical-safety-dos-donts" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"}
                transition-colors duration-200
              `}
            >
              {tabTitles[currentLanguage].chemicalSafetyDosDonts}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("nfpa-hazard-awareness")}
              className={`
                px-4 py-3 rounded-none border-b-2
                ${activeTab === "nfpa-hazard-awareness" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"}
                transition-colors duration-200
              `}
            >
              {tabTitles[currentLanguage].nfpaHazardAwareness}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setActiveTab("hazards-precautionary-statements")}
              className={`
                px-4 py-3 rounded-none border-b-2
                ${activeTab === "hazards-precautionary-statements" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"}
                transition-colors duration-200
              `}
            >
              {tabTitles[currentLanguage].hazardsPrecautionaryStatements}
            </Button>
          </nav>
        </CardHeader>
        <CardContent className="pt-6">
          {/* Render selected content component */}
          {renderSelectedPage()}
        </CardContent>
      </Card>
    </div>
  )
}
