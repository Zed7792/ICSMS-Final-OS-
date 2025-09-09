"use client"

import { useState, useEffect, useMemo } from "react"
import { ArrowLeft, Eye, Printer, Download, Search, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import Image from "next/image"
import GHSLabelPreview from "@/components/ghs-label-preview"
import type { LabelFormData } from "@/app/labels/create/page"

export default function LabelsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [allLabels, setAllLabels] = useState<
    (LabelFormData & { id: number; lastUpdated: string; status: string; notification?: string })[]
  >([])
  const [isLoading, setIsLoading] = useState(true)

  const defaultLabelData = useMemo(
    () => [
      {
        id: 1,
        productName: "Crude Oil",
        chemicalName: "Petroleum, crude oil",
        identifierNumber: "CAS No. 8002-05-9",
        contributingSubstances: "Benzene (CAS 71-43-2), Toluene (CAS 108-88-3)",
        nominalQuantity: "200 Liters",
        supplier: "OILSERV Energy Ltd",
        supplierAddress: "123 Industrial Zone, Port Harcourt, Nigeria",
        emergencyPhone: "+234-1-234-5678",
        hazards: ["GHS02", "GHS08", "GHS09"],
        signalWord: "DANGER",
        hazardStatements: [
          "H226: Flammable liquid and vapour",
          "H304: May be fatal if swallowed and enters airways",
          "H315: Causes skin irritation",
          "H411: Toxic to aquatic life with long lasting effects",
        ],
        precautionaryStatements: [
          "P210: Keep away from heat, hot surfaces, sparks, open flames and other ignition sources",
          "P273: Avoid release to the environment",
          "P280: Wear protective gloves/protective clothing/eye protection/face protection",
          "P301+P310: IF SWALLOWED: Immediately call a POISON CENTER/doctor",
        ],
        selectedPpe: ["EYE_PROTECTION", "HAND_PROTECTION", "PROTECTIVE_CLOTHING", "RESPIRATOR"],
        additionalInfo: "Store in well-ventilated area. Keep container tightly closed.",
        lastUpdated: "2024-01-15",
        status: "Approved",
        notification: "Approved for use",
      },
      {
        id: 2,
        productName: "Diesel Fuel",
        chemicalName: "Distillates (petroleum), hydrotreated light",
        identifierNumber: "CAS No. 68334-30-5",
        contributingSubstances: "",
        nominalQuantity: "500 Liters",
        supplier: "OILSERV Energy Ltd",
        supplierAddress: "123 Industrial Zone, Port Harcourt, Nigeria",
        emergencyPhone: "+234-1-234-5678",
        hazards: ["GHS02", "GHS08"],
        signalWord: "WARNING",
        hazardStatements: [
          "H226: Flammable liquid and vapour",
          "H304: May be fatal if swallowed and enters airways",
          "H315: Causes skin irritation",
        ],
        precautionaryStatements: [
          "P210: Keep away from heat, hot surfaces, sparks, open flames",
          "P280: Wear protective gloves/protective clothing",
          "P301+P310: IF SWALLOWED: Immediately call a POISON CENTER",
        ],
        selectedPpe: ["EYE_PROTECTION", "HAND_PROTECTION", "SAFETY_FOOTWEAR"],
        additionalInfo: "",
        lastUpdated: "2024-01-10",
        status: "Approved",
        notification: "Approved for use",
      },
    ],
    [],
  )

  const ghsHazards = [
    {
      code: "GHS03",
      name: "Oxidizing",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QHNs9gDp72NgGcldS7ZXZ5XTMNLdZH.png",
    },
    {
      code: "GHS02",
      name: "Flammable",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BqSUSEfIEAOblBI9GYbmg93UXEkkyi.png",
    },
    {
      code: "GHS06",
      name: "Toxic",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kj0AM6GcGjya3NDjdBr7Hw4An8dLa1.png",
    },
    {
      code: "GHS04",
      name: "Compressed Gas",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zN4DbQltdfLgI5IVnhFY96elUxfuiV.png",
    },
    {
      code: "GHS07",
      name: "Harmful",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fMQrYZagKChCQJEIQVGdqO5dFhRlh0.png",
    },
    {
      code: "GHS09",
      name: "Environmental",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UXJan1K0ptjvUxCOsfTBx3Zc1Sr2ir.png",
    },
    {
      code: "GHS08",
      name: "Health Hazard",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XriQ8bZ0YRNc0JJta5ylJdwSwXFt5z.png",
    },
    {
      code: "GHS01",
      name: "Explosive",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vYtSuuKga3kCMjuIbxfGphJjAFik1l.png",
    },
    {
      code: "GHS05",
      name: "Corrosive",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yfvZVqCBTxzo6MfyVY4CQwY1nSuLDD.png",
    },
  ]

  useEffect(() => {
    const loadLabels = () => {
      try {
        const savedLabels = JSON.parse(localStorage.getItem("ghsLabels") || "[]")

        // Create a map to track unique labels by a combination of productName and identifierNumber
        const labelMap = new Map()

        // Add default labels first
        defaultLabelData.forEach((label) => {
          const key = `${label.productName}-${label.identifierNumber}`
          labelMap.set(key, label)
        })

        // Add saved labels, ensuring proper ID assignment and no duplicates
        savedLabels.forEach((savedLabel: any, index: number) => {
          const key = `${savedLabel.productName}-${savedLabel.identifierNumber}`
          if (!labelMap.has(key)) {
            // Assign a unique ID that doesn't conflict with existing ones
            const maxId = Math.max(...Array.from(labelMap.values()).map((l: any) => l.id), 0)
            labelMap.set(key, {
              ...savedLabel,
              id: savedLabel.id || maxId + index + 1,
            })
          }
        })

        const mergedLabels = Array.from(labelMap.values())
        const approvedLabels = mergedLabels.filter((label: any) => label.status === "Approved")
        setAllLabels(approvedLabels)
      } catch (error) {
        console.error("Error loading labels:", error)
        const approvedDefaults = defaultLabelData.filter((label) => label.status === "Approved")
        setAllLabels(approvedDefaults)
      } finally {
        setIsLoading(false)
      }
    }

    loadLabels()
  }, [defaultLabelData])

  const printLabel = (label: any) => {
    const printWindow = window.open("", "_blank")
    if (printWindow) {
      const labelHtml = `
        <html>
          <head>
            <title>GHS Label - ${label.productName}</title>
            <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { 
                font-family: Arial, sans-serif; 
                background: white;
                padding: 20px;
              }
              .label-container { 
                width: 210mm;
                height: 297mm;
                margin: 0 auto;
                padding: 20px;
                border: 2px solid #000;
                background: white;
                display: flex;
                flex-direction: column;
              }
              .header { 
                text-align: center; 
                margin-bottom: 20px;
                border-bottom: 2px solid #000;
                padding-bottom: 15px;
              }
              .product-name { 
                font-size: 24px; 
                font-weight: bold; 
                margin-bottom: 10px;
              }
              .chemical-name { 
                font-size: 18px; 
                color: #666;
                margin-bottom: 5px;
              }
              .identifier { 
                font-size: 14px; 
                color: #333;
              }
              .hazards-section {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin: 20px 0;
                justify-content: center;
              }
              .hazard-symbol {
                width: 60px;
                height: 60px;
                border: 2px solid #000;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
              }
              .signal-word {
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                padding: 10px;
                margin: 15px 0;
                border: 2px solid #000;
                background: ${label.signalWord === "DANGER" ? "#ff0000" : "#ff8c00"};
                color: white;
              }
              .statements {
                margin: 15px 0;
              }
              .statements h3 {
                font-size: 16px;
                margin-bottom: 10px;
                border-bottom: 1px solid #ccc;
                padding-bottom: 5px;
              }
              .statements ul {
                list-style-type: none;
                padding-left: 0;
              }
              .statements li {
                margin-bottom: 8px;
                font-size: 12px;
                line-height: 1.4;
                padding-left: 15px;
                position: relative;
              }
              .statements li:before {
                content: "•";
                position: absolute;
                left: 0;
                font-weight: bold;
              }
              .supplier-info {
                margin-top: auto;
                border-top: 2px solid #000;
                padding-top: 15px;
                font-size: 12px;
              }
              .emergency {
                background: #ff0000;
                color: white;
                padding: 10px;
                text-align: center;
                font-weight: bold;
                margin-top: 10px;
              }
              @media print {
                body { padding: 0; }
                .label-container { 
                  width: 100%; 
                  height: 100vh;
                  margin: 0;
                  border: 2px solid #000;
                }
              }
            </style>
          </head>
          <body>
            <div class="label-container">
              <div class="header">
                <div class="product-name">${label.productName}</div>
                <div class="chemical-name">${label.chemicalName}</div>
                <div class="identifier">${label.identifierNumber}</div>
              </div>
              
              <div class="hazards-section">
                ${label.hazards
                  .map(
                    (hazardCode) => `
                  <div class="hazard-symbol">
                    ${hazardCode}
                  </div>
                `,
                  )
                  .join("")}
              </div>
              
              <div class="signal-word">${label.signalWord}</div>
              
              <div class="statements">
                <h3>Hazard Statements:</h3>
                <ul>
                  ${label.hazardStatements.map((statement) => `<li>${statement}</li>`).join("")}
                </ul>
              </div>
              
              <div class="statements">
                <h3>Precautionary Statements:</h3>
                <ul>
                  ${label.precautionaryStatements.map((statement) => `<li>${statement}</li>`).join("")}
                </ul>
              </div>
              
              <div class="supplier-info">
                <strong>Supplier:</strong> ${label.supplier}<br>
                <strong>Address:</strong> ${label.supplierAddress}<br>
                <strong>Quantity:</strong> ${label.nominalQuantity}
                ${label.additionalInfo ? `<br><strong>Additional Info:</strong> ${label.additionalInfo}` : ""}
              </div>
              
              <div class="emergency">
                EMERGENCY: ${label.emergencyPhone}
              </div>
            </div>
            <script>
              window.onload = function() {
                setTimeout(() => {
                  window.print();
                  window.onafterprint = function() {
                    window.close();
                  }
                }, 500);
              }
            </script>
          </body>
        </html>
      `

      printWindow.document.write(labelHtml)
      printWindow.document.close()
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading labels...</p>
        </div>
      </div>
    )
  }

  const filteredLabels = allLabels.filter((label) => {
    const matchesSearch =
      label.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      label.chemicalName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "All Status" || label.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string, notification?: string) => {
    if (status === "Approved") {
      return (
        <div className="flex items-center gap-2">
          <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            Approved
          </Badge>
          {notification && (
            <Badge variant="outline" className="text-xs text-green-600 border-green-300">
              {notification}
            </Badge>
          )}
        </div>
      )
    }

    return <Badge className="bg-gray-100 text-gray-800">{status}</Badge>
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
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/")}
            className="text-gray-600 hover:text-gray-900"
          >
            <Home className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white text-sm font-bold">
              ⚠️
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Labels Library</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Labels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{allLabels.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Approved Labels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {allLabels.filter((label) => label.status === "Approved").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Ready to Print</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{allLabels.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">GHS Compliant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">100%</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">Search & Filter Labels</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by product name or chemical..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Status">All Status</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Labels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabels.map((label) => (
            <Card key={`${label.id}-${label.productName}`} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold">{label.productName}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{label.chemicalName}</p>
                  </div>
                  {getStatusColor(label.status, label.notification)}
                </div>
              </CardHeader>
              <CardContent>
                {/* Hazard Symbols Preview */}
                <div className="flex gap-1 mb-4">
                  {label.hazards.map((hazardCode) => {
                    const hazard = ghsHazards.find((h) => h.code === hazardCode)
                    return (
                      <div key={hazardCode} className="w-8 h-8 flex items-center justify-center">
                        <Image
                          src={hazard?.image || "/placeholder.svg"}
                          alt={hazard?.name || "GHS Pictogram"}
                          width={32}
                          height={32}
                        />
                      </div>
                    )
                  })}
                </div>

                {/* Signal Word */}
                <div className="mb-4">
                  <span
                    className={`inline-block px-2 py-1 text-white font-bold text-sm ${
                      label.signalWord === "DANGER" ? "bg-red-600" : "bg-orange-500"
                    }`}
                  >
                    {label.signalWord}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>GHS Label Preview - {label.productName}</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 flex justify-center">
                        <div style={{ transform: "scale(0.8)", transformOrigin: "center" }}>
                          <GHSLabelPreview formData={label} />
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4 justify-center print:hidden">
                        <Button onClick={() => printLabel(label)} className="bg-slate-600 hover:bg-slate-700">
                          <Printer className="h-4 w-4 mr-2" />
                          Print Label Only
                        </Button>
                        <Button variant="outline" onClick={() => printLabel(label)}>
                          <Download className="h-4 w-4 mr-2" />
                          Save as PDF
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm" onClick={() => printLabel(label)}>
                    <Printer className="h-4 w-4" />
                  </Button>
                </div>

                <div className="text-xs text-gray-500 mt-2">Last updated: {label.lastUpdated}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
