"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  Download,
  Hash,
  AlertCircle,
  Package,
  Plus,
  Flame,
  AlertTriangle,
  Shield,
  Beaker,
  Zap,
  Skull,
  Leaf,
  Trash2,
  Truck,
  FileText,
  Info,
  Calendar,
  MapPin,
} from "lucide-react"

const sections = [
  {
    key: "identification",
    title: "1. Identification of the substance/mixture and of the company/undertaking",
    icon: <Hash className="h-5 w-5" />,
    subsections: [
      "Product Identifier",
      "Relevant identified uses of the substance or mixture and uses advised against",
      "Details of the supplier of the safety data sheet",
      "Emergency telephone number",
    ],
  },
  {
    key: "hazards",
    title: "2. Hazards identification",
    icon: <AlertCircle className="h-5 w-5" />,
    subsections: ["Classification of the substance or mixture", "Label elements", "Other hazards"],
  },
  {
    key: "composition",
    title: "3. Composition/information on ingredients",
    icon: <Package className="h-5 w-5" />,
    subsections: ["Substances", "Mixtures"],
  },
  {
    key: "firstaid",
    title: "4. First-aid measures",
    icon: <Plus className="h-5 w-5" />,
    subsections: [
      "Description of first-aid measures",
      "Most important symptoms and effects, both acute and delayed",
      "Indication of any immediate medical attention and special treatment needed",
    ],
  },
  {
    key: "firefighting",
    title: "5. Firefighting measures",
    icon: <Flame className="h-5 w-5" />,
    subsections: [
      "Extinguishing media",
      "Special hazards arising from the substance or mixture",
      "Advice for firefighters",
    ],
  },
  {
    key: "accidental",
    title: "6. Accidental release measures",
    icon: <AlertTriangle className="h-5 w-5" />,
    subsections: [
      "Personal precautions, protective equipment and emergency procedures",
      "Environmental precautions",
      "Methods and material for containment and cleaning up",
      "Reference to other sections",
    ],
  },
  {
    key: "handling",
    title: "7. Handling and storage",
    icon: <Package className="h-5 w-5" />,
    subsections: [
      "Precautions for safe handling",
      "Conditions for safe storage, including any incompatibilities",
      "Specific end use(s)",
    ],
  },
  {
    key: "exposure",
    title: "8. Exposure controls/personal protection",
    icon: <Shield className="h-5 w-5" />,
    subsections: ["Control parameters", "Exposure controls"],
  },
  {
    key: "physical",
    title: "9. Physical and chemical properties",
    icon: <Beaker className="h-5 w-5" />,
    subsections: ["Information on basic physical and chemical properties", "Other information"],
  },
  {
    key: "stability",
    title: "10. Stability and reactivity",
    icon: <Zap className="h-5 w-5" />,
    subsections: [
      "Reactivity",
      "Chemical stability",
      "Possibility of hazardous reactions",
      "Conditions to avoid",
      "Incompatible materials",
      "Hazardous decomposition products",
    ],
  },
  {
    key: "toxicological",
    title: "11. Toxicological information",
    icon: <Skull className="h-5 w-5" />,
    subsections: ["Information on toxicological effects"],
  },
  {
    key: "ecological",
    title: "12. Ecological information",
    icon: <Leaf className="h-5 w-5" />,
    subsections: [
      "Toxicity",
      "Persistence and degradability",
      "Bio-accumulative potential",
      "Mobility in soil",
      "Results of PBT and vPvB assessment",
      "Other adverse effects",
    ],
  },
  {
    key: "disposal",
    title: "13. Disposal considerations",
    icon: <Trash2 className="h-5 w-5" />,
    subsections: ["Waste treatment methods"],
  },
  {
    key: "transport",
    title: "14. Transport information",
    icon: <Truck className="h-5 w-5" />,
    subsections: [
      "UN number",
      "UN proper shipping name",
      "Transport hazard class(es)",
      "Packing group",
      "Environmental hazards",
      "Special precautions for the user",
      "Transport in bulk according to Annex II of MARPOL73/78 and the IBC Code",
    ],
  },
  {
    key: "regulatory",
    title: "15. Regulatory information",
    icon: <FileText className="h-5 w-5" />,
    subsections: [
      "Safety, health and environmental regulations/legislation specific for the substance or mixture",
      "Chemical safety assessment",
    ],
  },
  {
    key: "other",
    title: "16. Other information",
    icon: <Info className="h-5 w-5" />,
    subsections: [
      "Date of preparation or last revision",
      "Sources of key data used to compile the data sheet",
      "Other information",
    ],
  },
]

export default function SDSDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("identification")
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Mock SDS document data
  const sdsDocument = {
    id: params.id,
    productName: "Ceramic Microspheres",
    chemicalName: "Hollow Glass Microspheres",
    casNumber: "65997-17-3",
    oilservCode: "OIL-CMS-001",
    batchNumber: "B2024-001",
    location: "Port Harcourt Facility",
    manufacturingDate: "2024-01-15",
    sdsAddedDate: "2024-01-20",
    sdsReviewDate: "2027-01-01",
    status: "Active",
    size: "2.4 MB",
    pdfUrl: "/sds-documents/ceramic-microspheres.pdf",
  }

  const scrollToSection = (sectionKey: string) => {
    setActiveSection(sectionKey)
    const element = sectionRefs.current[sectionKey]
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const renderSectionContent = (section: any) => {
    const getSampleContent = (sectionKey: string, subsectionTitle: string) => {
      // Sample content for demonstration - in real app this would come from database
      const sampleData: { [key: string]: { [key: string]: string } } = {
        identification: {
          "Product Identifier": `Product Name: ${sdsDocument.productName}\nChemical Name: ${sdsDocument.chemicalName}\nCAS Number: ${sdsDocument.casNumber}\nProduct Code: ${sdsDocument.oilservCode}\nBatch Number: ${sdsDocument.batchNumber}`,
          "Relevant identified uses of the substance or mixture and uses advised against":
            "Recommended Use: Industrial filler, lightweight aggregate, construction applications\nRestrictions: Not for food contact applications",
          "Details of the supplier of the safety data sheet":
            "Company: OILSERV Energy Ltd.\nAddress: 123 Oilserv Road, Port Harcourt, Nigeria\nPhone: +234-1-234-5679\nEmail: safety@oilserv.com",
          "Emergency telephone number": "Emergency Phone: +234-1-234-5678\n24/7 Emergency Response: Available",
        },
        hazards: {
          "Classification of the substance or mixture":
            "GHS Classification: Not classified as hazardous under GHS criteria\nPhysical Hazards: None identified\nHealth Hazards: May cause mechanical irritation to eyes and respiratory system",
          "Label elements":
            "Signal Word: None required\nHazard Statements: None required\nPrecautionary Statements: P102: Keep out of reach of children",
          "Other hazards":
            "PBT/vPvB Assessment: Not applicable - inorganic substance\nOther Hazards: Dust may cause mechanical irritation to eyes and respiratory tract",
        },
        composition: {
          Substances: "Main Component: Ceramic Microspheres (≥95%)\nCAS Number: " + sdsDocument.casNumber,
          Mixtures: "Crystalline Silica (trace): <5%\nCAS Number: 14808-60-7\nClassification: H315, H319, H335",
        },
        // Add more sample data for other sections as needed
      }

      return (
        sampleData[sectionKey]?.[subsectionTitle] ||
        `Information for ${subsectionTitle} would be displayed here. This section contains detailed safety and technical information about the chemical product.`
      )
    }

    return (
      <div className="space-y-6">
        {section.subsections.map((subsection: string, index: number) => (
          <Card key={index} className="border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                <span className="text-blue-600 font-bold">{index + 1}.</span>
                {subsection}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                {getSampleContent(section.key, subsection)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="w-80 bg-white border-r border-gray-200 h-screen sticky top-0">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">SDS Details</h1>
                <p className="text-sm text-gray-600">{sdsDocument.productName}</p>
              </div>
            </div>

            {/* Status and Actions */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    sdsDocument.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : sdsDocument.status === "Under Review"
                        ? "bg-yellow-100 text-yellow-800"
                        : sdsDocument.status === "Expired"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {sdsDocument.status}
                </span>
              </div>

              {sdsDocument.pdfUrl && (
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              )}
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">SDS Sections</h3>
              <div className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.key}
                    onClick={() => scrollToSection(section.key)}
                    className={`w-full text-left px-3 py-3 rounded-lg text-sm transition-colors ${
                      activeSection === section.key
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 text-blue-600">{section.icon}</div>
                      <div>
                        <div className="font-medium text-gray-900 leading-tight">{section.title.split(".")[0]}.</div>
                        <div className="text-xs text-gray-500 mt-1 leading-tight">
                          {section.title.split(".")[1]?.trim()}
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          {section.subsections.length} subsection{section.subsections.length > 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>

        <div className="flex-1">
          {/* Product Header */}
          <div className="bg-white border-b border-gray-200 p-6">
            <div className="max-w-4xl">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{sdsDocument.productName}</h1>
              <p className="text-lg text-gray-600 mb-4">{sdsDocument.chemicalName}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-gray-500">CAS Number:</span>
                    <p className="font-mono font-medium">{sdsDocument.casNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-gray-500">Product Code:</span>
                    <p className="font-mono font-medium">{sdsDocument.oilservCode}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-gray-500">Location:</span>
                    <p className="font-medium">{sdsDocument.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <div>
                    <span className="text-gray-500">Review Date:</span>
                    <p className="font-medium">{sdsDocument.sdsReviewDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="p-6 max-w-4xl">
              <div className="space-y-8">
                {sections.map((section) => (
                  <div
                    key={section.key}
                    id={section.key}
                    ref={(el) => (sectionRefs.current[section.key] = el)}
                    className="scroll-mt-4"
                  >
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">{section.icon}</div>
                        <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                      </div>
                    </div>
                    {renderSectionContent(section)}
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}
