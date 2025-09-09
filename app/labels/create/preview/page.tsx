"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { ArrowLeft, Printer, Download, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import GHSLabelPreview from "@/components/ghs-label-preview" // Import the extracted component

// Define the LabelFormData interface again for this page's context
interface LabelFormData {
  productName: string
  chemicalName: string
  identifierNumber: string
  contributingSubstances: string
  nominalQuantity: string
  supplier: string
  supplierAddress: string
  emergencyPhone: string
  hazards: string[]
  signalWord: "DANGER" | "WARNING"
  hazardStatements: string[]
  precautionaryStatements: string[]
  selectedPpe: string[]
  additionalInfo: string
}

export default function LabelPreviewPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize labelData directly using a function to parse searchParams once
  const [labelData] = useState<LabelFormData>(() => {
    const data: Partial<LabelFormData> = {}
    searchParams.forEach((value, key) => {
      try {
        // Attempt to parse JSON for array/object fields
        data[key as keyof LabelFormData] = JSON.parse(decodeURIComponent(value))
      } catch (e) {
        // If not JSON, treat as a simple string
        data[key as keyof LabelFormData] = decodeURIComponent(value) as any
      }
    })

    // Set default values for fields that might be missing or empty
    return {
      productName: data.productName || "",
      chemicalName: data.chemicalName || "",
      identifierNumber: data.identifierNumber || "",
      contributingSubstances: data.contributingSubstances || "",
      nominalQuantity: data.nominalQuantity || "",
      supplier: data.supplier || "OILSERV Energy Ltd",
      supplierAddress: data.supplierAddress || "",
      emergencyPhone: data.emergencyPhone || "+234-1-234-5678",
      hazards: (data.hazards as string[]) || [],
      signalWord: (data.signalWord as "DANGER" | "WARNING") || "WARNING",
      hazardStatements: (data.hazardStatements as string[]) || [],
      precautionaryStatements: (data.precautionaryStatements as string[]) || [],
      selectedPpe: (data.selectedPpe as string[]) || [],
      additionalInfo: data.additionalInfo || "",
    }
  })

  useEffect(() => {
    // Redirect if essential data is missing after initial load
    if (!labelData.productName) {
      router.replace("/labels/create")
    }
  }, [labelData.productName, router]) // Depend on productName and router for stable check

  const handlePrint = () => {
    window.print()
  }

  // For download, we'll trigger print for now as client-side PDF generation is complex
  const handleDownload = () => {
    window.print()
    // In a real application, you would integrate with a server-side PDF generation service here.
    // For example: fetch('/api/generate-pdf', { method: 'POST', body: JSON.stringify(labelData) })
    // .then(response => response.blob())
    // .then(blob => { /* create download link */ });
  }

  if (!labelData.productName) {
    // Check for productName to show loading or redirect
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading label preview...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Eye className="h-6 w-6 text-slate-600" />
            <h1 className="text-2xl font-bold text-gray-900">Label Preview: {labelData.productName}</h1>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col items-center justify-center">
        <Card className="w-full max-w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              GHS Label
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-4 rounded-lg overflow-auto flex justify-center items-center">
              {/* Display the GHSLabelPreview component */}
              <div style={{ transform: "scale(0.8)", transformOrigin: "top left" }}>
                <GHSLabelPreview formData={labelData} />
              </div>
            </div>
            <div className="flex gap-2 mt-4 justify-center print:hidden">
              <Button onClick={handlePrint} className="bg-slate-600 hover:bg-slate-700">
                <Printer className="h-4 w-4 mr-2" />
                Print Label
              </Button>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
