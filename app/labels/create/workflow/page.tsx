"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import LabelWorkflowPage from "@/components/label-workflow-page"

// Define the LabelFormData interface for this page's context
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

export default function WorkflowPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize labelData from URL parameters
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
  }, [labelData.productName, router])

  if (!labelData.productName) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading workflow...</p>
        </div>
      </div>
    )
  }

  return <LabelWorkflowPage labelData={labelData} />
}
