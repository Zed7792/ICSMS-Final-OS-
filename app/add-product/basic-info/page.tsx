"use client"

import { useState } from "react"
import { CheckCircle, Clock, Send, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

type WorkflowPhase = "submit" | "review" | "approved"

interface BasicInfoFormData {
  productName: string
  oilservCode: string
  casNumber: string
  location: string
  batchNumber: string
  manufacturingDate: string
  expiryDate: string
  sdsAddedDate: string
  sdsReviewDate: string
}

const approvingAuthorities = [
  {
    id: 1,
    name: "Brahimi Zineddine",
    email: "zineddinebr@gmail.com",
    title: "Safety Manager",
    department: "HSE Department",
  },
  {
    id: 2,
    name: "Nadjib Debbabi",
    email: "nadjib.debbabi@oilserv.com",
    title: "Technical Director",
    department: "Technical Department",
  },
]

const initialFormData: BasicInfoFormData = {
  productName: "",
  oilservCode: "",
  casNumber: "",
  location: "",
  batchNumber: "",
  manufacturingDate: "",
  expiryDate: "",
  sdsAddedDate: new Date().toISOString().split("T")[0],
  sdsReviewDate: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 3 years from now
}

export default function BasicInfoPage() {
  const router = useRouter()
  const [currentPhase, setCurrentPhase] = useState<WorkflowPhase>("submit")
  const [formData, setFormData] = useState<BasicInfoFormData>(initialFormData)
  const [selectedAuthority, setSelectedAuthority] = useState<string>("")

  const handleInputChange = (field: keyof BasicInfoFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Auto-calculate expiry date when manufacturing date changes (3 years later)
    if (field === "manufacturingDate" && value) {
      const manufacturingDate = new Date(value)
      const expiryDate = new Date(manufacturingDate)
      expiryDate.setFullYear(manufacturingDate.getFullYear() + 3)
      setFormData((prev) => ({ ...prev, expiryDate: expiryDate.toISOString().split("T")[0] }))
    }
  }

  const validateForm = () => {
    const requiredFields: (keyof BasicInfoFormData)[] = [
      "productName",
      "oilservCode",
      "casNumber",
      "location",
      "batchNumber",
      "manufacturingDate",
      "expiryDate",
    ]

    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        alert(`Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()} field.`)
        return false
      }
    }
    return true
  }

  const handlePhaseTransition = (nextPhase: WorkflowPhase) => {
    if (nextPhase === "review" && currentPhase === "submit") {
      if (!validateForm()) return
      setCurrentPhase(nextPhase)
    } else if (nextPhase === "approved" && currentPhase === "review") {
      if (!selectedAuthority) {
        alert("Please select an approving authority before proceeding with approval.")
        return
      }

      const authority = approvingAuthorities.find((auth) => auth.id === Number.parseInt(selectedAuthority))

      if (authority) {
        console.log(`[v0] Email notification sent to ${authority.email}`)
        alert(
          `Approval notification sent to ${authority.name} (${authority.email})\n\nProduct: ${formData.productName}\nStatus: Approved and added to SDS Library`,
        )
      }

      setCurrentPhase(nextPhase)

      // Save basic info to SDS library when approved
      const newBasicEntry = {
        id: `${formData.oilservCode}-${Date.now()}`,
        productName: formData.productName,
        oilservCode: formData.oilservCode,
        casNumber: formData.casNumber,
        location: formData.location,
        batchNumber: formData.batchNumber,
        manufacturingDate: formData.manufacturingDate,
        expiryDate: formData.expiryDate,
        sdsAddedDate: formData.sdsAddedDate,
        sdsReviewDate: formData.sdsReviewDate,
        size: "Basic Info Only",
        pdfUrl: null, // No PDF until full SDS is completed
        isBasicInfoOnly: true, // Flag to indicate this is just basic info
        status: "Basic Info Approved",
        // Placeholder for full SDS sections - will be filled when user completes full form
        sections: {},
      }

      // Store in localStorage to simulate database integration
      if (typeof window !== "undefined") {
        const existingEntries = JSON.parse(localStorage.getItem("sdsEntries") || "[]")
        existingEntries.push(newBasicEntry)
        localStorage.setItem("sdsEntries", JSON.stringify(existingEntries))
      }

      console.log("[v0] Basic product info approved and added to SDS library:", newBasicEntry)
      alert(
        `Basic information for "${formData.productName}" successfully approved!\n\nThe product is now visible in the SDS Library. Click on it to complete the full SDS with all 16 elements.`,
      )

      setTimeout(() => {
        router.push("/sds-library")
      }, 2000)
    }
  }

  const getPhaseConfig = (phase: WorkflowPhase) => {
    const configs = {
      submit: {
        title: "Submit Basic Information",
        description: "Fill in basic product information and submit for review",
        icon: Send,
        color: "blue",
        nextPhase: "review" as WorkflowPhase,
        nextLabel: "Submit for Review",
        canEdit: true,
      },
      review: {
        title: "Review Basic Information",
        description: "Basic product information is under review by safety team",
        icon: Clock,
        color: "yellow",
        nextPhase: "approved" as WorkflowPhase,
        nextLabel: "Approve Basic Info",
        canEdit: false,
        showAuthorities: true,
      },
      approved: {
        title: "Basic Information Approved",
        description: "Basic information approved and added to SDS Library",
        icon: CheckCircle,
        color: "green",
        nextPhase: "approved" as WorkflowPhase,
        nextLabel: "Approved",
        canEdit: false,
      },
    }
    return configs[phase]
  }

  const phaseConfig = getPhaseConfig(currentPhase)
  const PhaseIcon = phaseConfig.icon

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
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-bold">
              1
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Product - Basic Information</h1>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {/* Workflow Status */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Basic Information Approval Workflow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              {["submit", "review", "approved"].map((phase, index) => {
                const isActive = index <= ["submit", "review", "approved"].indexOf(currentPhase)
                const isCurrent = phase === currentPhase
                const config = getPhaseConfig(phase as WorkflowPhase)
                const StepIcon = config.icon

                return (
                  <div key={phase} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isActive ? `bg-${config.color}-500` : "bg-gray-300"
                      } text-white mb-2`}
                    >
                      <StepIcon className="w-5 h-5" />
                    </div>
                    <div className={`text-xs font-medium ${isCurrent ? `text-${config.color}-600` : "text-gray-600"}`}>
                      {config.title}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Form Content */}
        {phaseConfig.canEdit ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Basic Product Information</CardTitle>
              <p className="text-sm text-gray-600">
                Complete these 9 essential fields to get your product listed in the SDS Library. You can add the full
                16-element SDS later by clicking on the product.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input
                    id="productName"
                    value={formData.productName}
                    onChange={(e) => handleInputChange("productName", e.target.value)}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label htmlFor="oilservCode">Oilserv Code *</Label>
                  <Input
                    id="oilservCode"
                    value={formData.oilservCode}
                    onChange={(e) => handleInputChange("oilservCode", e.target.value)}
                    placeholder="Enter Oilserv code"
                  />
                </div>
                <div>
                  <Label htmlFor="casNumber">CAS Number *</Label>
                  <Input
                    id="casNumber"
                    value={formData.casNumber}
                    onChange={(e) => handleInputChange("casNumber", e.target.value)}
                    placeholder="Enter CAS number"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Storage Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="Enter storage location"
                  />
                </div>
                <div>
                  <Label htmlFor="batchNumber">Batch Number *</Label>
                  <Input
                    id="batchNumber"
                    value={formData.batchNumber}
                    onChange={(e) => handleInputChange("batchNumber", e.target.value)}
                    placeholder="Enter batch number"
                  />
                </div>
                <div>
                  <Label htmlFor="manufacturingDate">Manufacturing Date *</Label>
                  <Input
                    id="manufacturingDate"
                    type="date"
                    value={formData.manufacturingDate}
                    onChange={(e) => handleInputChange("manufacturingDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="expiryDate">Expiry Date *</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Auto-calculated as 3 years from manufacturing date</p>
                </div>
                <div>
                  <Label htmlFor="sdsAddedDate">SDS Added Date</Label>
                  <Input
                    id="sdsAddedDate"
                    type="date"
                    value={formData.sdsAddedDate}
                    onChange={(e) => handleInputChange("sdsAddedDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="sdsReviewDate">SDS Review Date</Label>
                  <Input
                    id="sdsReviewDate"
                    type="date"
                    value={formData.sdsReviewDate}
                    onChange={(e) => handleInputChange("sdsReviewDate", e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">Auto-calculated as 3 years from SDS added date</p>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => handlePhaseTransition(phaseConfig.nextPhase)}
                  className={`bg-${phaseConfig.color}-600 hover:bg-${phaseConfig.color}-700`}
                >
                  {phaseConfig.nextLabel}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-12">
            <PhaseIcon className={`h-16 w-16 mx-auto mb-4 text-${phaseConfig.color}-500`} />
            <h3 className="text-xl font-semibold mb-2">{phaseConfig.title}</h3>
            <p className="text-gray-600 mb-6">{phaseConfig.description}</p>

            {currentPhase === "review" && (
              <div className="mb-8">
                <Card className="max-w-2xl mx-auto">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-left">Select Approving Authority</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {approvingAuthorities.map((authority) => (
                        <div
                          key={authority.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedAuthority === String(authority.id)
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedAuthority(String(authority.id))}
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name="authority"
                              checked={selectedAuthority === String(authority.id)}
                              onChange={() => setSelectedAuthority(String(authority.id))}
                              className="text-blue-600"
                            />
                            <div className="flex-1 text-left">
                              <div className="font-semibold text-gray-900">{authority.name}</div>
                              <div className="text-sm text-gray-600">{authority.title}</div>
                              <div className="text-sm text-gray-500">{authority.department}</div>
                              <div className="text-sm text-blue-600">{authority.email}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {selectedAuthority && (
                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="text-sm text-green-800">
                          ✓ Selected:{" "}
                          {approvingAuthorities.find((auth) => auth.id === Number.parseInt(selectedAuthority))?.name}
                        </div>
                        <div className="text-xs text-green-600 mt-1">Email notification will be sent upon approval</div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}

            {currentPhase !== "approved" && (
              <Button
                onClick={() => handlePhaseTransition(phaseConfig.nextPhase)}
                className={`bg-${phaseConfig.color}-600 hover:bg-${phaseConfig.color}-700 ${
                  currentPhase === "review" && !selectedAuthority ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={currentPhase === "review" && !selectedAuthority}
              >
                {phaseConfig.nextLabel}
              </Button>
            )}

            {currentPhase === "approved" && (
              <div className="space-y-4">
                <p className="text-green-600 font-semibold">Basic information successfully approved!</p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={() => router.push("/sds-library")} className="bg-blue-600 hover:bg-blue-700">
                    View in SDS Library
                  </Button>
                  <Button onClick={() => router.push("/add-product/basic-info")} variant="outline">
                    Add Another Product
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
