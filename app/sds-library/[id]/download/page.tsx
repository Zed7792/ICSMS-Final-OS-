"use client"

import { ArrowLeft, Printer, Download, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

// Sample SDS Data (expanded to include PDF URLs)
const staticSdsDocuments = [
  {
    id: "cenospheres-all-grades",
    productName: "Cenospheres, All Grades",
    pdfUrl: "/sds-documents/cenospheres-sds.pdf",
  },
  {
    id: "norcem-portland-cements",
    productName: "Norcem Portland Cements",
    pdfUrl: "/sds-documents/sds-1.pdf",
  },
  {
    id: "silica-gel-grade-60",
    productName: "Silica gel, grade 60",
    pdfUrl: "/sds-documents/sds-2.pdf",
  },
  {
    id: "liquid-nitrogen-ln2",
    productName: "Liquid Nitrogen (LN2)",
    pdfUrl: "/sds-documents/sds-3.pdf",
  },
  {
    id: "xylenes",
    productName: "Xylenes",
    pdfUrl: "/sds-documents/sds-1.pdf",
  },
  {
    id: "ammonium-chloride-nh4cl",
    productName: "Ammonium chloride (NH4CL)",
    pdfUrl: "/sds-documents/sds-2.pdf",
  },
  {
    id: "potassium-chloride-kcl",
    productName: "Potassium chloride (KCL)",
    pdfUrl: "/sds-documents/sds-3.pdf",
  },
  {
    id: "biocide",
    productName: "Biocide",
    pdfUrl: "/sds-documents/sds-1.pdf",
  },
  {
    id: "sodium-chloride-nacl",
    productName: "Sodium chloride (Nacl)",
    pdfUrl: "/sds-documents/sds-2.pdf",
  },
  {
    id: "hydrochloric-acid",
    productName: "Hydrochloric acid",
    pdfUrl: "/sds-documents/sds-3.pdf",
  },
]

export default function SDSDownloadPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params
  const [sdsDocument, setSdsDocument] = useState<any>(null)
  const [pdfLoaded, setPdfLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const findDocument = () => {
      // First check static documents
      let foundDoc = staticSdsDocuments.find((doc) => doc.id === id)

      if (!foundDoc) {
        // Check user entries from localStorage
        const userEntries = JSON.parse(localStorage.getItem("sdsEntries") || "[]")
        foundDoc = userEntries.find((doc: any) => doc.id === id)
      }

      if (foundDoc) {
        setSdsDocument(foundDoc)
      } else {
        // Document not found, redirect to library
        router.replace("/sds-library")
      }
      setIsLoading(false)
    }

    findDocument()
  }, [id, router])

  const generateDynamicPDF = (doc: any) => {
    const printWindow = window.open("", "_blank")
    if (!printWindow) return

    const pdfContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Safety Data Sheet - ${doc.productName}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 20px; 
              line-height: 1.6; 
              color: #333;
            }
            .header { 
              text-align: center; 
              margin-bottom: 30px; 
              border-bottom: 3px solid #FF8C00; 
              padding-bottom: 20px; 
            }
            .company-logo {
              font-size: 24px;
              font-weight: bold;
              color: #FF8C00;
              margin-bottom: 10px;
            }
            .document-title {
              font-size: 28px;
              font-weight: bold;
              color: #333;
              margin-bottom: 10px;
            }
            .product-name {
              font-size: 22px;
              color: #666;
              margin-bottom: 5px;
            }
            .basic-info {
              background-color: #f8f9fa;
              padding: 20px;
              border-radius: 8px;
              margin-bottom: 25px;
              border-left: 4px solid #FF8C00;
            }
            .info-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 15px;
              margin-bottom: 20px;
            }
            .info-item {
              display: flex;
              flex-direction: column;
            }
            .info-label {
              font-weight: bold;
              color: #555;
              font-size: 14px;
              margin-bottom: 5px;
            }
            .info-value {
              color: #333;
              font-size: 16px;
            }
            .section { 
              margin-bottom: 25px; 
              page-break-inside: avoid; 
            }
            .section-title { 
              background-color: #FF8C00; 
              color: white; 
              padding: 12px; 
              font-weight: bold; 
              font-size: 16px;
              margin-bottom: 15px; 
              border-radius: 4px;
            }
            .section-content {
              padding: 15px;
              background-color: #fafafa;
              border-radius: 4px;
              border: 1px solid #e0e0e0;
            }
            .status-badge {
              display: inline-block;
              padding: 6px 12px;
              border-radius: 20px;
              font-size: 12px;
              font-weight: bold;
              margin-top: 10px;
            }
            .status-basic {
              background-color: #e3f2fd;
              color: #1976d2;
            }
            .status-complete {
              background-color: #e8f5e8;
              color: #2e7d32;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 2px solid #FF8C00;
              text-align: center;
              font-size: 12px;
              color: #666;
            }
            @media print { 
              body { margin: 0; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="company-logo">OILSERV</div>
            <div class="document-title">SAFETY DATA SHEET</div>
            <div class="product-name">${doc.productName}</div>
            <p style="margin: 10px 0; color: #666;">Generated on: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="basic-info">
            <h3 style="margin-top: 0; color: #FF8C00;">Product Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <div class="info-label">Product Name:</div>
                <div class="info-value">${doc.productName || "Not specified"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Oilserv Code:</div>
                <div class="info-value">${doc.oilservCode || "Not specified"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">CAS Number:</div>
                <div class="info-value">${doc.casNumber || "Not specified"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Location:</div>
                <div class="info-value">${doc.location || "Not specified"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Batch Number:</div>
                <div class="info-value">${doc.batchNumber || "Not specified"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Manufacturing Date:</div>
                <div class="info-value">${doc.manufacturingDate || "Not specified"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">Expiry Date:</div>
                <div class="info-value">${doc.expiryDate || "Not specified"}</div>
              </div>
              <div class="info-item">
                <div class="info-label">SDS Review Date:</div>
                <div class="info-value">${doc.sdsReviewDate || "Not specified"}</div>
              </div>
            </div>
            <div class="status-badge ${doc.isBasicInfoOnly ? "status-basic" : "status-complete"}">
              ${doc.isBasicInfoOnly ? "Basic Information Only" : "Complete SDS Document"}
            </div>
          </div>

          ${
            doc.sections && Object.keys(doc.sections).length > 0
              ? Object.entries(doc.sections)
                  .map(
                    ([key, section]: [string, any]) => `
              <div class="section">
                <div class="section-title">${section.title}</div>
                <div class="section-content">${section.content || "Information not available"}</div>
              </div>
            `,
                  )
                  .join("")
              : `<div class="section">
              <div class="section-title">Additional SDS Information</div>
              <div class="section-content">
                ${
                  doc.isBasicInfoOnly
                    ? "This document contains basic product information only. Complete SDS with all 16 elements will be available once the full form is completed."
                    : "Complete SDS information is available for this product."
                }
              </div>
            </div>`
          }
          
          <div class="footer">
            <p><strong>OILSERV Energy Ltd</strong> - Chemical Safety Management System</p>
            <p>This document was generated automatically from the SDS Library</p>
            <p>For questions or updates, contact the HSE Department</p>
          </div>
        </body>
      </html>
    `

    printWindow.document.write(pdfContent)
    printWindow.document.close()
    printWindow.focus()
  }

  const handlePrint = () => {
    if (sdsDocument?.pdfUrl) {
      // Use existing PDF for static documents
      const printWindow = window.open(sdsDocument.pdfUrl, "_blank")
      if (printWindow) {
        printWindow.onload = () => {
          printWindow.print()
        }
      }
    } else {
      // Generate dynamic PDF for user entries
      generateDynamicPDF(sdsDocument)
      setTimeout(() => {
        window.print()
      }, 500)
    }
  }

  const handleDownload = () => {
    if (sdsDocument?.pdfUrl) {
      // Download existing PDF for static documents
      const link = document.createElement("a")
      link.href = sdsDocument.pdfUrl
      link.download = `${sdsDocument.productName.replace(/\s/g, "_")}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      // Generate and download dynamic PDF for user entries
      generateDynamicPDF(sdsDocument)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SDS document for download...</p>
        </div>
      </div>
    )
  }

  if (!sdsDocument) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Document Not Found</h2>
          <p className="text-gray-600 mb-4">The requested SDS document could not be found.</p>
          <Button onClick={() => router.push("/sds-library")} className="bg-blue-600 hover:bg-blue-700">
            Return to SDS Library
          </Button>
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
            <Download className="h-6 w-6 text-slate-600" />
            <h1 className="text-2xl font-bold text-gray-900">Download SDS: {sdsDocument.productName}</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">SDS Document Options</CardTitle>
            {sdsDocument.isBasicInfoOnly && (
              <div className="flex items-center gap-2 text-blue-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                This document contains basic information only. Complete the full SDS to access all 16 elements.
              </div>
            )}
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            <div className="flex gap-4">
              <Button onClick={handlePrint} className="bg-slate-600 hover:bg-slate-700">
                <Printer className="h-5 w-5 mr-2" />
                Print PDF
              </Button>
              <Button onClick={handleDownload} variant="outline">
                <Download className="h-5 w-5 mr-2" />
                Download PDF
              </Button>
            </div>

            {sdsDocument.pdfUrl ? (
              <div className="w-full h-[600px] border border-gray-300 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                {!pdfLoaded && (
                  <div className="text-center text-gray-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400 mx-auto mb-2"></div>
                    Loading PDF preview...
                  </div>
                )}
                <iframe
                  src={sdsDocument.pdfUrl}
                  title={`${sdsDocument.productName} PDF Preview`}
                  className={`w-full h-full ${pdfLoaded ? "" : "hidden"}`}
                  onLoad={() => setPdfLoaded(true)}
                  onError={() => {
                    setPdfLoaded(true)
                    console.error("Failed to load PDF iframe")
                  }}
                ></iframe>
              </div>
            ) : (
              <div className="w-full p-8 border border-gray-300 rounded-md bg-gray-50 text-center">
                <div className="text-gray-600 mb-4">
                  <Download className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-lg font-medium">Dynamic PDF Generation</p>
                  <p className="text-sm">This document will be generated when you download or print it.</p>
                </div>
                {sdsDocument.isBasicInfoOnly && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-800 text-sm">
                      This PDF will contain the basic product information. To include all 16 SDS elements, complete the
                      full SDS form by clicking on this product in the SDS Library.
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
