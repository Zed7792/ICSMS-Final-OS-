"use client"

import { useState, useEffect } from "react"
import {
  X,
  List,
  PenTool,
  Type,
  Plus,
  Minus,
  RotateCw,
  Copy,
  Search,
  Printer,
  Save,
  Settings,
  Lock,
  Volume2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

// Helper function to calculate SDS status based on added date (copied for consistency)
const getSDSStatus = (sdsAddedDate: string) => {
  const addedDate = new Date(sdsAddedDate)
  const expiryDate = new Date(addedDate)
  expiryDate.setFullYear(addedDate.getFullYear() + 3) // 3 years expiry

  const reviewDate = new Date(addedDate)
  reviewDate.setMonth(addedDate.getMonth() + 30) // 2.5 years (30 months) for review

  const now = new Date()

  if (now > expiryDate) {
    return "Expired"
  } else if (now > reviewDate) {
    return "Under Review"
  } else {
    return "Active"
  }
}

// Sample SDS Data (expanded to include PDF URLs) - UPDATED TO MATCH LATEST LIST
const sdsDocuments = [
  {
    id: "cenospheres-all-grades",
    productName: "Cenospheres, All Grades",
    chemicalName: "Ceramic Microspheres",
    oilservCode: "C402",
    casNumber: "66402-68-4",
    location: "Lab Storage",
    batchNumber: "BATCH-CEN-2024-001",
    manufacturingDate: "2024-01-01",
    sdsAddedDate: "2024-07-28",
    sdsReviewDate: "2027-01-28",
    size: "0.1 MB",
    pdfUrl: "/sds-documents/cenospheres-sds.pdf",
  },
  {
    id: "norcem-portland-cements",
    productName: "Norcem Portland Cements",
    chemicalName: "Portland Cement",
    oilservCode: "G001",
    casNumber: "65997-15-1",
    location: "Construction Site",
    batchNumber: "BATCH-NPC-2024-001",
    manufacturingDate: "2024-02-10",
    sdsAddedDate: "2024-07-28",
    sdsReviewDate: "2027-01-28",
    size: "0.5 MB",
    pdfUrl: "/sds-documents/sds-1.pdf", // Placeholder PDF
  },
  {
    id: "silica-gel-grade-60",
    productName: "Silica gel, grade 60",
    chemicalName: "Silicon Dioxide",
    oilservCode: "C030",
    casNumber: "7631-86-9",
    location: "Lab Storage",
    batchNumber: "BATCH-SG-2024-001",
    manufacturingDate: "2024-03-05",
    sdsAddedDate: "2024-07-28",
    sdsReviewDate: "2027-01-28",
    size: "0.2 MB",
    pdfUrl: "/sds-documents/sds-2.pdf", // Placeholder PDF
  },
  {
    id: "liquid-nitrogen-ln2",
    productName: "Liquid Nitrogen (LN2)",
    chemicalName: "Nitrogen",
    oilservCode: "N002",
    casNumber: "7727-37-9",
    location: "Cryo Storage",
    batchNumber: "BATCH-LN2-2024-001",
    manufacturingDate: "2024-04-15",
    sdsAddedDate: "2024-07-28",
    sdsReviewDate: "2027-01-28",
    size: "0.1 MB",
    pdfUrl: "/sds-documents/sds-3.pdf", // Placeholder PDF
  },
  {
    id: "xylenes",
    productName: "Xylenes",
    chemicalName: "Dimethylbenzene",
    oilservCode: "S291",
    casNumber: "1330-20-7",
    location: "Chemical Store",
    batchNumber: "BATCH-XYL-2024-001",
    manufacturingDate: "2024-05-20",
    sdsAddedDate: "2024-07-28",
    sdsReviewDate: "2027-01-28",
    size: "0.3 MB",
    pdfUrl: "/sds-documents/sds-1.pdf", // Placeholder PDF
  },
  {
    id: "ammonium-chloride-nh4cl",
    productName: "Ammonium chloride (NH4CL)",
    chemicalName: "Ammonium Chloride",
    oilservCode: "S861",
    casNumber: "12125-02-9",
    location: "Warehouse C",
    batchNumber: "BATCH-AC-2024-001",
    manufacturingDate: "2024-06-01",
    sdsAddedDate: "2024-07-28",
    sdsReviewDate: "2027-01-28",
    size: "0.4 MB",
    pdfUrl: "/sds-documents/sds-2.pdf", // Placeholder PDF
  },
  {
    id: "potassium-chloride-kcl",
    productName: "Potassium chloride (KCL)",
    chemicalName: "Potassium Chloride",
    oilservCode: "S860",
    casNumber: "7447-40-7",
    location: "Lab Storage",
    batchNumber: "BATCH-KCL-2024-001",
    sdsAddedDate: "2024-07-28",
    manufacturingDate: "2024-07-01",
    sdsReviewDate: "2027-01-28",
    size: "0.2 MB",
    pdfUrl: "/sds-documents/sds-3.pdf", // Placeholder PDF
  },
  {
    id: "biocide",
    productName: "Biocide",
    chemicalName: "Glutaraldehyde solution",
    oilservCode: "S830",
    casNumber: "111-30-8",
    location: "Water Treatment Plant",
    batchNumber: "BATCH-BIO-2024-001",
    sdsAddedDate: "2024-07-28",
    manufacturingDate: "2024-07-10",
    sdsReviewDate: "2027-01-28",
    size: "0.6 MB",
    pdfUrl: "/sds-documents/sds-1.pdf", // Placeholder PDF
  },
  {
    id: "sodium-chloride-nacl",
    productName: "Sodium chloride (Nacl)",
    chemicalName: "Sodium Chloride",
    oilservCode: "C014",
    casNumber: "7647-14-5",
    location: "Warehouse A",
    batchNumber: "BATCH-NACL-2024-001",
    sdsAddedDate: "2024-07-28",
    manufacturingDate: "2024-07-15",
    sdsReviewDate: "2027-01-28",
    size: "0.3 MB",
    pdfUrl: "/sds-documents/sds-2.pdf", // Placeholder PDF
  },
  {
    id: "hydrochloric-acid",
    productName: "Hydrochloric acid",
    chemicalName: "Hydrogen Chloride",
    oilservCode: "HA",
    casNumber: "7647-01-0",
    location: "Chemical Store",
    batchNumber: "BATCH-HCL-2024-001",
    sdsAddedDate: "2024-07-28",
    manufacturingDate: "2024-07-20",
    sdsReviewDate: "2027-01-28",
    size: "0.4 MB",
    pdfUrl: "/sds-documents/sds-3.pdf", // Placeholder PDF
  },
].map((doc) => ({
  ...doc,
  status: getSDSStatus(doc.sdsAddedDate),
  expiryDate: new Date(new Date(doc.sdsAddedDate).setFullYear(new Date(doc.sdsAddedDate).getFullYear() + 3))
    .toISOString()
    .split("T")[0],
}))

export default function SDSViewPDFPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const sdsDocument = sdsDocuments.find((doc) => doc.id === id)
  const [pdfLoaded, setPdfLoaded] = useState(false)

  useEffect(() => {
    if (!sdsDocument) {
      router.replace("/sds-library") // Redirect if document not found
    }
  }, [sdsDocument, router])

  const handlePrint = () => {
    if (sdsDocument?.pdfUrl) {
      const printWindow = window.open(sdsDocument.pdfUrl, "_blank")
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print()
        }
      }
    }
  }

  const handleOpenInNewWindow = () => {
    if (sdsDocument?.pdfUrl) {
      window.open(sdsDocument.pdfUrl, "_blank")
    }
  }

  if (!sdsDocument) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SDS document...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-gray-800 text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2 shadow-md">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">{sdsDocument.productName}</h1>
          <div className="flex items-center gap-2 text-gray-400 border-l border-gray-700 pl-4">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-gray-700">
              <List className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-gray-700">
              <PenTool className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-gray-700">
              <Type className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:bg-gray-700">
              <Volume2 className="h-5 w-5" /> {/* 'A' with speaker icon */}
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
            <Minus className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
            <Plus className="h-5 w-5" />
          </Button>
          <span className="text-sm">7 of 15</span> {/* Placeholder for page number */}
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
            <RotateCw className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
            <Copy className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 border-l border-gray-700 pl-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700" onClick={handlePrint}>
              <Printer className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
              <Save className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-700">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
          <Button variant="ghost" size="icon" className="text-white hover:bg-red-600" onClick={() => router.back()}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Permissions Warning */}
      <div className="bg-yellow-700 text-white text-sm px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>This file has limited permissions. You may not have access to some features.</span>
          <Button variant="link" className="text-white underline p-0 h-auto">
            View permissions
          </Button>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-yellow-600">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* PDF Viewer Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full h-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
          {!pdfLoaded && (
            <div className="text-center text-gray-500">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400 mx-auto mb-4"></div>
              Loading PDF preview...
            </div>
          )}
          {sdsDocument.pdfUrl ? (
            <iframe
              src={sdsDocument.pdfUrl}
              title={`${sdsDocument.productName} PDF Preview`}
              className={`w-full h-full ${pdfLoaded ? "" : "hidden"}`}
              onLoad={() => setPdfLoaded(true)}
              onError={() => {
                setPdfLoaded(true) // Still set loaded to true to hide spinner, show error message
                console.error("Failed to load PDF iframe")
              }}
            ></iframe>
          ) : (
            <div className="text-gray-500">PDF not available for preview.</div>
          )}
        </div>
      </div>

      {/* Footer Button */}
      <div className="p-4 flex justify-center bg-gray-800">
        <Button
          variant="outline"
          onClick={handleOpenInNewWindow}
          className="bg-transparent text-white border-white hover:bg-gray-700"
        >
          Open in New Window
        </Button>
      </div>
    </div>
  )
}
