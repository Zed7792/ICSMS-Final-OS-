"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, Send } from "lucide-react"

type WorkflowStatus = "draft" | "submitted" | "review" | "approval" | "released"

const workflowSteps = [
  { status: "draft", label: "Draft", icon: AlertCircle, color: "bg-gray-500" },
  { status: "submitted", label: "Submitted", icon: Send, color: "bg-blue-500" },
  { status: "review", label: "Review", icon: Clock, color: "bg-yellow-500" },
  { status: "approval", label: "Approval", icon: Clock, color: "bg-orange-500" },
  { status: "released", label: "Released", icon: CheckCircle, color: "bg-green-500" },
]

const sdsElements = [
  {
    main: "1. Identification of the substance/mixture and of the company/undertaking",
    sub: [
      "Product Identifier",
      "Relevant identified uses of the substance or mixture and uses advised against",
      "Details of the supplier of the safety data sheet",
      "Emergency telephone number",
    ],
  },
  {
    main: "2. Hazards identification",
    sub: ["Classification of the substance or mixture", "Label elements", "Other hazards"],
  },
  {
    main: "3. Composition/information on ingredients",
    sub: ["Substances", "Mixtures"],
  },
  {
    main: "4. First-aid measures",
    sub: [
      "Description of first-aid measures",
      "Most important symptoms and effects, both acute and delayed",
      "Indication of any immediate medical attention and special treatment needed",
    ],
  },
  {
    main: "5. Firefighting measures",
    sub: ["Extinguishing media", "Special hazards arising from the substance or mixture", "Advice for firefighters"],
  },
  {
    main: "6. Accidental release measures",
    sub: [
      "Personal precautions, protective equipment and emergency procedures",
      "Environmental precautions",
      "Methods and material for containment and cleaning up",
      "Reference to other sections",
    ],
  },
  {
    main: "7. Handling and storage",
    sub: [
      "Precautions for safe handling",
      "Conditions for safe storage, including any incompatibilities",
      "Specific end use(s)",
    ],
  },
  {
    main: "8. Exposure controls/personal protection",
    sub: ["Control parameters", "Exposure controls"],
  },
  {
    main: "9. Physical and chemical properties",
    sub: ["Information on basic physical and chemical properties", "Other information"],
  },
  {
    main: "10. Stability and reactivity",
    sub: [
      "Reactivity",
      "Chemical stability",
      "Possibility of hazardous reactions",
      "Conditions to avoid",
      "Incompatible materials",
      "Hazardous decomposition products",
    ],
  },
  {
    main: "11. Toxicological information",
    sub: ["Information on toxicological effects"],
  },
  {
    main: "12. Ecological information",
    sub: [
      "Toxicity",
      "Persistence and degradability",
      "Bio-accumulative potential",
      "Mobility in soil",
      "Results of PBT and vPvB assessment",
      "Other adverse effects",
    ],
  },
  {
    main: "13. Disposal considerations",
    sub: ["Waste treatment methods"],
  },
  {
    main: "14. Transport information",
    sub: [
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
    main: "15. Regulatory information",
    sub: [
      "Safety, health and environmental regulations/legislation specific for the substance or mixture",
      "Chemical safety assessment",
    ],
  },
  {
    main: "16. Other information",
    sub: [],
  },
]

export default function ProductFormPage() {
  const [currentStatus, setCurrentStatus] = useState<WorkflowStatus>("draft")
  const [formData, setFormData] = useState<Record<string, string>>({
    // Basic Information fields
    productName: "",
    productCode: "",
    manufacturer: "",
    dateCreated: "",
    version: "",
    // Section 1 fields
    productIdentifier: "",
    identifiedUses: "",
    supplierDetails: "",
    emergencyTelephone: "",
    // Section 2 fields
    classification: "",
    labelElements: "",
    otherHazards: "",
    // Section 3 fields
    substances: "",
    mixtures: "",
    // Section 4 fields
    firstAidMeasures: "",
    symptomsEffects: "",
    medicalAttention: "",
    // Section 5 fields
    extinguishingMedia: "",
    specialHazards: "",
    firefighterAdvice: "",
    // Section 6 fields
    personalPrecautions: "",
    environmentalPrecautions: "",
    containmentMethods: "",
    referenceToSections: "",
    // Section 7 fields
    safeHandling: "",
    storageConditions: "",
    specificEndUse: "",
    // Section 8 fields
    controlParameters: "",
    exposureControls: "",
    // Section 9 fields
    physicalChemicalProperties: "",
    otherPhysicalInfo: "",
    // Section 10 fields
    reactivity: "",
    chemicalStability: "",
    hazardousReactions: "",
    conditionsToAvoid: "",
    incompatibleMaterials: "",
    hazardousDecomposition: "",
    // Section 11 fields
    toxicologicalEffects: "",
    // Section 12 fields
    toxicity: "",
    persistenceDegradability: "",
    bioAccumulative: "",
    mobilityInSoil: "",
    pbtAssessment: "",
    otherAdverseEffects: "",
    // Section 13 fields
    wasteTreatment: "",
    // Section 14 fields
    unNumber: "",
    properShippingName: "",
    transportHazardClass: "",
    packingGroup: "",
    environmentalHazards: "",
    userPrecautions: "",
    bulkTransport: "",
    // Section 15 fields
    regulatoryInfo: "",
    chemicalSafetyAssessment: "",
    // Section 16 fields
    otherInformation: "",
  })

  const handleSubmit = () => {
    if (currentStatus === "draft") {
      setCurrentStatus("submitted")
      console.log("Email notification sent for product submission")
    } else if (currentStatus === "submitted") {
      setCurrentStatus("review")
    } else if (currentStatus === "review") {
      setCurrentStatus("approval")
    } else if (currentStatus === "approval") {
      setCurrentStatus("released")
      console.log("Product released and added to SDS Library")
    }
  }

  const getCurrentStepIndex = () => {
    return workflowSteps.findIndex((step) => step.status === currentStatus)
  }

  const getFieldKey = (sectionIndex: number, subIndex: number): string => {
    const fieldMappings = [
      ["productIdentifier", "identifiedUses", "supplierDetails", "emergencyTelephone"], // Section 1
      ["classification", "labelElements", "otherHazards"], // Section 2
      ["substances", "mixtures"], // Section 3
      ["firstAidMeasures", "symptomsEffects", "medicalAttention"], // Section 4
      ["extinguishingMedia", "specialHazards", "firefighterAdvice"], // Section 5
      ["personalPrecautions", "environmentalPrecautions", "containmentMethods", "referenceToSections"], // Section 6
      ["safeHandling", "storageConditions", "specificEndUse"], // Section 7
      ["controlParameters", "exposureControls"], // Section 8
      ["physicalChemicalProperties", "otherPhysicalInfo"], // Section 9
      [
        "reactivity",
        "chemicalStability",
        "hazardousReactions",
        "conditionsToAvoid",
        "incompatibleMaterials",
        "hazardousDecomposition",
      ], // Section 10
      ["toxicologicalEffects"], // Section 11
      [
        "toxicity",
        "persistenceDegradability",
        "bioAccumulative",
        "mobilityInSoil",
        "pbtAssessment",
        "otherAdverseEffects",
      ], // Section 12
      ["wasteTreatment"], // Section 13
      [
        "unNumber",
        "properShippingName",
        "transportHazardClass",
        "packingGroup",
        "environmentalHazards",
        "userPrecautions",
        "bulkTransport",
      ], // Section 14
      ["regulatoryInfo", "chemicalSafetyAssessment"], // Section 15
      ["otherInformation"], // Section 16
    ]

    return fieldMappings[sectionIndex]?.[subIndex] || `section${sectionIndex + 1}_sub${subIndex}`
  }

  return (
    <div className="p-6 space-y-6">
      {/* Workflow Status */}
      <Card className="bg-white text-gray-900">
        <CardHeader>
          <CardTitle>Product Approval Workflow</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            {workflowSteps.map((step, index) => {
              const isActive = index <= getCurrentStepIndex()
              const isCurrent = step.status === currentStatus
              const StepIcon = step.icon

              return (
                <div key={step.status} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${isActive ? step.color : "bg-gray-300"} text-white mb-2`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <Badge variant={isCurrent ? "default" : "secondary"} className="text-xs">
                    {step.label}
                  </Badge>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white text-gray-900">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="productName" className="text-sm font-medium text-gray-700">
                Product Name
              </Label>
              <Input
                id="productName"
                value={formData.productName || ""}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                placeholder="Enter product name"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productCode" className="text-sm font-medium text-gray-700">
                Product Code
              </Label>
              <Input
                id="productCode"
                value={formData.productCode || ""}
                onChange={(e) => setFormData({ ...formData, productCode: e.target.value })}
                placeholder="Enter product code"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="manufacturer" className="text-sm font-medium text-gray-700">
                Manufacturer
              </Label>
              <Input
                id="manufacturer"
                value={formData.manufacturer || ""}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                placeholder="Enter manufacturer name"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateCreated" className="text-sm font-medium text-gray-700">
                Date Created
              </Label>
              <Input
                id="dateCreated"
                type="date"
                value={formData.dateCreated || ""}
                onChange={(e) => setFormData({ ...formData, dateCreated: e.target.value })}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="version" className="text-sm font-medium text-gray-700">
                Version
              </Label>
              <Input
                id="version"
                value={formData.version || ""}
                onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                placeholder="Enter version (e.g., 1.0)"
                className="w-full"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SDS Form with Elements 1-16 and Sub-sections */}
      <Card className="bg-white text-gray-900">
        <CardHeader>
          <CardTitle>Safety Data Sheet - SDS Elements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {sdsElements.map((element, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4 border-b border-gray-200 pb-6">
              <h3 className="text-lg font-semibold text-blue-600">{element.main}</h3>

              {element.sub.length > 0 ? (
                <div className="space-y-4">
                  {element.sub.map((subSection, subIndex) => {
                    const fieldKey = getFieldKey(sectionIndex, subIndex)
                    return (
                      <div key={subIndex} className="space-y-2">
                        <Label htmlFor={fieldKey} className="text-sm font-medium text-gray-700">
                          {subSection}
                        </Label>
                        <Textarea
                          id={fieldKey}
                          value={formData[fieldKey] || ""}
                          onChange={(e) => setFormData({ ...formData, [fieldKey]: e.target.value })}
                          placeholder={`Enter ${subSection.toLowerCase()}`}
                          rows={3}
                          className="w-full"
                        />
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="otherInformation" className="text-sm font-medium text-gray-700">
                    Additional Information
                  </Label>
                  <Textarea
                    id="otherInformation"
                    value={formData.otherInformation || ""}
                    onChange={(e) => setFormData({ ...formData, otherInformation: e.target.value })}
                    placeholder="Enter any other relevant information"
                    rows={3}
                    className="w-full"
                  />
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-end pt-6">
            <Button
              onClick={handleSubmit}
              disabled={currentStatus === "released"}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {currentStatus === "draft"
                ? "Submit for Review"
                : currentStatus === "submitted"
                  ? "Move to Review"
                  : currentStatus === "review"
                    ? "Move to Approval"
                    : currentStatus === "approval"
                      ? "Release Product"
                      : "Released"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
