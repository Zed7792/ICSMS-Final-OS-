"use client"

import { useState, useEffect } from "react"
import { CheckCircle, Clock, Send, ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

type WorkflowPhase = "submit" | "review" | "approved"

interface SectionData {
  [key: string]: string
}

interface ProductFormData {
  identification: SectionData
  hazards: SectionData
  composition: SectionData
  firstaid: SectionData
  firefighting: SectionData
  accidental: SectionData
  handling: SectionData
  exposure: SectionData
  physical: SectionData
  stability: SectionData
  toxicology: SectionData
  ecological: SectionData
  disposal: SectionData
  transport: SectionData
  regulatory: SectionData
  other: SectionData
}

const initialFormData: ProductFormData = {
  identification: {
    productName: "",
    chemicalName: "",
    casNumber: "",
    oilservCode: "",
    location: "",
    batchNumber: "",
    manufacturingDate: "",
    supplier: "",
    supplierAddress: "",
    emergencyPhone: "",
  },
  hazards: {
    hazardClassification: "",
    signalWord: "",
    hazardStatements: "",
    precautionaryStatements: "",
  },
  composition: {
    chemicalName: "",
    casNumber: "",
    concentration: "",
    impurities: "",
  },
  firstaid: {
    firstAidEyes: "",
    firstAidSkin: "",
    firstAidInhalation: "",
    firstAidIngestion: "",
  },
  firefighting: {
    extinguishingMedia: "",
    specialHazards: "",
    fireInstructions: "",
  },
  accidental: {
    personalPrecautions: "",
    environmentalPrecautions: "",
    cleanupMethods: "",
  },
  handling: {
    handlingPrecautions: "",
    storageConditions: "",
  },
  exposure: {
    exposureControls: "",
    eyeProtection: "",
    skinProtection: "",
    respiratoryProtection: "",
  },
  physical: {
    physicalState: "",
    appearance: "",
    odor: "",
    ph: "",
    meltingPoint: "",
    boilingPoint: "",
    flashPoint: "",
    evaporationRate: "",
    flammability: "",
    explosiveLimits: "",
    vaporPressure: "",
    vaporDensity: "",
    relativeGravity: "",
    solubility: "",
    partitionCoefficient: "",
    autoIgnitionTemp: "",
    decompositionTemp: "",
    viscosity: "",
  },
  stability: {
    reactivity: "",
    chemicalStability: "",
    hazardousReactions: "",
    conditionsToAvoid: "",
    incompatibleMaterials: "",
    hazardousDecomposition: "",
  },
  toxicology: {
    acuteToxicity: "",
    skinCorrosion: "",
    eyeDamage: "",
    respiratorySensitization: "",
    skinSensitization: "",
    germCellMutagenicity: "",
    carcinogenicity: "",
    reproductiveToxicity: "",
    specificTargetOrgan: "",
    aspirationHazard: "",
  },
  ecological: {
    ecotoxicity: "",
    persistence: "",
    bioaccumulation: "",
    mobility: "",
  },
  disposal: {
    wasteDisposal: "",
    containerDisposal: "",
    regulations: "",
  },
  transport: {
    unNumber: "",
    properShippingName: "",
    transportHazardClass: "",
    packingGroup: "",
    transportPrecautions: "",
  },
  regulatory: {
    safetyRegulations: "",
    inventoryStatus: "",
    restrictions: "",
    chemicalSafetyAssessment: "",
  },
  other: {
    preparationDate: "",
    revision: "",
    supersedes: "",
    additionalInfo: "",
  },
}

const approvingAuthorities = [
  { id: 1, name: "Authority A", email: "authorityA@example.com" },
  { id: 2, name: "Authority B", email: "authorityB@example.com" },
]

export default function CreateSDSForm() {
  const router = useRouter()
  const [currentPhase, setCurrentPhase] = useState<"submit" | "review" | "approved">("submit")
  const [currentSection, setCurrentSection] = useState<string>("identification")
  const [formData, setFormData] = useState<ProductFormData>(initialFormData)
  const [selectedAuthority, setSelectedAuthority] = useState<string>("")
  const [activeSection, setActiveSection] = useState(0)
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set())
  const [sectionProgress, setSectionProgress] = useState<Record<string, boolean>>({})

  const handleInputChange = (section: string, field: string, value: string) => {
    setFormData((prev) => {
      const updated = {
        ...prev,
        [section]: {
          ...prev[section as keyof ProductFormData],
          [field]: value,
        },
      }
      localStorage.setItem("sds-draft", JSON.stringify(updated))

      // Immediately update progress for this section
      setTimeout(() => updateSectionProgress(updated), 0)

      return updated
    })
  }

  const getRequiredSectionsCount = () => {
    const requiredSections = [
      "identification",
      "hazards",
      "composition",
      "firstaid",
      "firefighting",
      "accidental",
      "handling",
      "exposure",
      "physical",
      "stability",
      "toxicology",
      "ecological",
    ]
    return requiredSections.filter((section) => sectionProgress[section]).length
  }

  const areRequiredSectionsFilled = () => {
    return getRequiredSectionsCount() >= 12
  }

  const isSectionComplete = (sectionKey: string) => {
    const currentSectionData = formData[sectionKey as keyof ProductFormData] as SectionData
    if (!currentSectionData) return false

    // Count filled subsections for this section
    const filledSubsections = Object.values(currentSectionData).filter(
      (value) => value && typeof value === "string" && value.trim().length > 0,
    ).length

    // Section is complete if at least 50% of subsections are filled
    const section = sections.find((s) => s.key === sectionKey)
    if (!section) return false

    const requiredSubsections = Math.ceil(section.subsections.length * 0.5)
    return filledSubsections >= requiredSubsections
  }

  const updateSectionProgress = (currentFormData = formData) => {
    const progress: Record<string, boolean> = {}

    sections.forEach((section) => {
      const sectionData = currentFormData[section.key as keyof ProductFormData] as SectionData
      if (!sectionData) {
        progress[section.key] = false
        return
      }

      // Count filled subsections
      const filledSubsections = Object.values(sectionData).filter(
        (value) => value && typeof value === "string" && value.trim().length > 0,
      ).length

      // Section is complete if at least 50% of subsections are filled
      const requiredSubsections = Math.ceil(section.subsections.length * 0.5)
      progress[section.key] = filledSubsections >= requiredSubsections
    })

    setSectionProgress(progress)
  }

  const handleSubmitSDS = () => {
    const completedCount = getRequiredSectionsCount()

    if (!areRequiredSectionsFilled()) {
      alert(
        `Please complete at least 12 sections before submitting.\n\nCurrently completed: ${completedCount}/16 sections\nNeed ${12 - completedCount} more sections to submit.`,
      )
      return
    }

    // Save the complete form data to localStorage for the workflow page
    const sdsSubmissionData = {
      ...formData.identification,
      sections: formData,
      submissionDate: new Date().toISOString(),
      completedSections: completedCount,
      status: "submitted",
    }

    localStorage.setItem("sds-submission", JSON.stringify(sdsSubmissionData))

    // Show success message and redirect
    alert(
      `SDS form submitted successfully!\n\nCompleted sections: ${completedCount}/16\nProceeding to approval workflow...`,
    )

    // Navigate to workflow page
    router.push("/add-product/form/workflow")
  }

  const handleSaveDraft = () => {
    localStorage.setItem("sds-draft", JSON.stringify(formData))
    alert("Draft saved successfully!")
  }

  const handlePhaseTransition = (nextPhase: WorkflowPhase) => {
    if (nextPhase === "approved" && currentPhase === "review") {
      if (!selectedAuthority) {
        alert("Please select an approving authority before proceeding with approval.")
        return
      }

      const authority = approvingAuthorities.find((auth) => auth.id === Number.parseInt(selectedAuthority))

      if (authority) {
        console.log(`[v0] Email notification sent to ${authority.email}`)
        alert(
          `Approval notification sent to ${authority.name} (${authority.email})\n\nProduct: ${formData.identification.productName}\nStatus: Approved and added to SDS Library`,
        )
      }

      setCurrentPhase(nextPhase)

      // Save to SDS library when approved
      const newSDSEntry = {
        id: `${formData.identification.oilservCode}-${Date.now()}`,
        productName: formData.identification.productName,
        chemicalName: formData.identification.chemicalName,
        oilservCode: formData.identification.oilservCode,
        casNumber: formData.identification.casNumber,
        location: formData.identification.location,
        batchNumber: formData.identification.batchNumber,
        manufacturingDate: formData.identification.manufacturingDate,
        sdsAddedDate: new Date().toISOString().split("T")[0],
        sdsReviewDate: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 3 years from now
        size: "0.5 MB",
        pdfUrl: "/sds-documents/generated-sds.pdf",
        // Additional SDS sections from form data
        sections: {
          productDetails: {
            title: "Product details",
            content: `Product Name: ${formData.identification.productName}\nChemical Name: ${formData.identification.chemicalName}\nCAS Number: ${formData.identification.casNumber}\nSupplier: ${formData.identification.supplier}\nAddress: ${formData.identification.supplierAddress}\nEmergency Phone: ${formData.identification.emergencyPhone}`,
          },
          hazardIdentification: {
            title: "Hazard Identification",
            content: `Classification: ${formData.hazards.hazardClassification}\nSignal Word: ${formData.hazards.signalWord}\nHazard Statements: ${formData.hazards.hazardStatements}\nPrecautionary Statements: ${formData.hazards.precautionaryStatements}`,
          },
          firstAidMeasures: {
            title: "First Aid Measures",
            content: `Eye Contact: ${formData.firstaid.firstAidEyes}\nSkin Contact: ${formData.firstaid.firstAidSkin}\nInhalation: ${formData.firstaid.firstAidInhalation}\nIngestion: ${formData.firstaid.firstAidIngestion}`,
          },
          fireFightingMeasures: {
            title: "Fire-Fighting Measures",
            content: `Extinguishing Media: ${formData.firefighting.extinguishingMedia}\nSpecial Hazards: ${formData.firefighting.specialHazards}`,
          },
          accidentalReleaseMeasures: {
            title: "Accidental Release Measures",
            content: `Personal Precautions: ${formData.accidental.personalPrecautions}\nEnvironmental Precautions: ${formData.accidental.environmentalPrecautions}\nCleanup Methods: ${formData.accidental.cleanupMethods}`,
          },
          handlingAndStorage: {
            title: "Handling and Storage",
            content: `Handling Precautions: ${formData.handling.handlingPrecautions}\nStorage Conditions: ${formData.handling.storageConditions}`,
          },
          exposureControlsPPE: {
            title: "Exposure Controls/(PPE)",
            content: `Exposure Controls: ${formData.exposure.exposureControls}\nEye Protection: ${formData.exposure.eyeProtection}\nSkin Protection: ${formData.exposure.skinProtection}\nRespiratory Protection: ${formData.exposure.respiratoryProtection}`,
          },
          physicalChemicalProperties: {
            title: "Physical and Chemical Properties",
            content: `Physical State: ${formData.physical.physicalState}\nAppearance: ${formData.physical.appearance}\nOdor: ${formData.physical.odor}\npH: ${formData.physical.ph}\nMelting Point: ${formData.physical.meltingPoint}\nBoiling Point: ${formData.physical.boilingPoint}\nFlash Point: ${formData.physical.flashPoint}`,
          },
          stabilityReactivity: {
            title: "Stability and Reactivity",
            content: `Reactivity: ${formData.stability.reactivity}\nChemical Stability: ${formData.stability.chemicalStability}\nHazardous Reactions: ${formData.stability.hazardousReactions}\nConditions to Avoid: ${formData.stability.conditionsToAvoid}`,
          },
          toxicologicalInformation: {
            title: "Toxicological Information",
            content: `Acute Toxicity: ${formData.toxicology.acuteToxicity}\nSkin Corrosion: ${formData.toxicology.skinCorrosion}\nEye Damage: ${formData.toxicology.eyeDamage}\nCarcinogenicity: ${formData.toxicology.carcinogenicity}`,
          },
          ecologicalInformation: {
            title: "Ecological Information",
            content: `Ecotoxicity: ${formData.ecological.ecotoxicity}\nPersistence: ${formData.ecological.persistence}\nBioaccumulation: ${formData.ecological.bioaccumulation}\nMobility: ${formData.ecological.mobility}`,
          },
          disposalConsiderations: {
            title: "Disposal Considerations",
            content: `Waste Disposal: ${formData.disposal.wasteDisposal}`,
          },
          transportInformation: {
            title: "Transport Information",
            content: `UN Number: ${formData.transport.unNumber}\nProper Shipping Name: ${formData.transport.properShippingName}\nTransport Hazard Class: ${formData.transport.transportHazardClass}\nPacking Group: ${formData.transport.packingGroup}`,
          },
          regulatoryInformation: {
            title: "Regulatory Information",
            content: `Safety Regulations: ${formData.regulatory.safetyRegulations}\nChemical Safety Assessment: ${formData.regulatory.chemicalSafetyAssessment}`,
          },
          otherInformation: {
            title: "Other Information",
            content: `${formData.other.additionalInfo}`,
          },
        },
      }

      // Store in localStorage to simulate database integration
      const existingEntries = JSON.parse(localStorage.getItem("sdsEntries") || "[]")
      existingEntries.push(newSDSEntry)
      localStorage.setItem("sdsEntries", JSON.stringify(existingEntries))

      console.log("[v0] Product approved and added to SDS library:", newSDSEntry)
      alert(
        `Product "${formData.identification.productName}" successfully approved and added to SDS Library!\n\nThe new SDS entry is now available in the SDS Library with ID: ${newSDSEntry.id}`,
      )

      setTimeout(() => {
        router.push("/sds-library")
      }, 2000)
    } else {
      setCurrentPhase(nextPhase)
    }
  }

  const getPhaseConfig = (phase: WorkflowPhase) => {
    const configs = {
      submit: {
        title: "Submit Section",
        description: "Fill in all product information and submit for review",
        icon: Send,
        color: "blue",
        nextPhase: "review" as WorkflowPhase,
        nextLabel: "Submit for Review",
        canEdit: true,
      },
      review: {
        title: "Review Section",
        description: "Product information is under review by safety team",
        icon: Clock,
        color: "yellow",
        nextPhase: "approved" as WorkflowPhase,
        nextLabel: "Approve Product",
        canEdit: false,
        showAuthorities: true,
      },
      approved: {
        title: "Approved Section",
        description: "Product has been approved and added to SDS Library",
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

  const sections = [
    {
      key: "identification",
      label: "1. Identification of the substance/mixture and of the company/undertaking",
      icon: "📋",
      subsections: [
        "Product Identifier",
        "Relevant identified uses of the substance or mixture and uses advised against",
        "Details of the supplier of the safety data sheet",
        "Emergency telephone number",
      ],
    },
    {
      key: "hazards",
      label: "2. Hazards identification",
      icon: "⚠️",
      subsections: ["Classification of the substance or mixture", "Label elements", "Other hazards"],
    },
    {
      key: "composition",
      label: "3. Composition/information on ingredients",
      icon: "🧪",
      subsections: ["Substances", "Mixtures"],
    },
    {
      key: "firstaid",
      label: "4. First-aid measures",
      icon: "🏥",
      subsections: [
        "Description of first-aid measures",
        "Most important symptoms and effects, both acute and delayed",
        "Indication of any immediate medical attention and special treatment needed",
      ],
    },
    {
      key: "firefighting",
      label: "5. Firefighting measures",
      icon: "🔥",
      subsections: [
        "Extinguishing media",
        "Special hazards arising from the substance or mixture",
        "Advice for firefighters",
      ],
    },
    {
      key: "accidental",
      label: "6. Accidental release measures",
      icon: "🚨",
      subsections: [
        "Personal precautions, protective equipment and emergency procedures",
        "Environmental precautions",
        "Methods and material for containment and cleaning up",
        "Reference to other sections",
      ],
    },
    {
      key: "handling",
      label: "7. Handling and storage",
      icon: "📦",
      subsections: [
        "Precautions for safe handling",
        "Conditions for safe storage, including any incompatibilities",
        "Specific end use(s)",
      ],
    },
    {
      key: "exposure",
      label: "8. Exposure controls/personal protection",
      icon: "🛡️",
      subsections: ["Control parameters", "Exposure controls"],
    },
    {
      key: "physical",
      label: "9. Physical and chemical properties",
      icon: "⚗️",
      subsections: ["Information on basic physical and chemical properties", "Other information"],
    },
    {
      key: "stability",
      label: "10. Stability and reactivity",
      icon: "⚡",
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
      key: "toxicology",
      label: "11. Toxicological information",
      icon: "☠️",
      subsections: ["Information on toxicological effects"],
    },
    {
      key: "ecological",
      label: "12. Ecological information",
      icon: "🌱",
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
      label: "13. Disposal considerations",
      icon: "♻️",
      subsections: ["Waste treatment methods"],
    },
    {
      key: "transport",
      label: "14. Transport information",
      icon: "🚛",
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
      label: "15. Regulatory information",
      icon: "📜",
      subsections: [
        "Safety, health and environmental regulations/legislation specific for the substance or mixture",
        "Chemical safety assessment",
      ],
    },
    {
      key: "other",
      label: "16. Other information",
      icon: "ℹ️",
      subsections: [
        "Date of preparation or last revision",
        "Sources of key data used to compile the data sheet",
        "Other information",
      ],
    },
  ]

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDraft = localStorage.getItem("sds-draft")
      if (savedDraft) {
        setFormData(JSON.parse(savedDraft))
      }
    }
  }, [])

  useEffect(() => {
    updateSectionProgress()
  }, [formData])

  const renderFormSection = () => {
    const section = sections.find((s) => s.key === currentSection)
    if (!section) return null

    const currentSectionData = (formData[currentSection as keyof ProductFormData] as SectionData) || {}

    return (
      <div className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <span className="text-3xl">{section.icon}</span>
            {section.label}
          </h2>
        </div>

        <div className="grid gap-6">
          {section.subsections.map((subsection, index) => (
            <div key={index} className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                {index + 1}. {subsection} *
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                rows={4}
                value={currentSectionData[`subsection_${index}`] || ""}
                onChange={(e) => handleInputChange(currentSection, `subsection_${index}`, e.target.value)}
                placeholder={`Enter information for ${subsection.toLowerCase()}...`}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
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
              <PhaseIcon
                className={`h-6 w-6 ${
                  phaseConfig.color === "blue"
                    ? "text-blue-600"
                    : phaseConfig.color === "yellow"
                      ? "text-yellow-600"
                      : phaseConfig.color === "green"
                        ? "text-green-600"
                        : "text-gray-600"
                }`}
              />
              <h1 className="text-2xl font-bold text-gray-900">Create SDS Sheet</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>Progress: {getRequiredSectionsCount()}/16 sections completed</span>
                <div className="w-24 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-600 rounded-full transition-all duration-300"
                    style={{ width: `${(getRequiredSectionsCount() / 16) * 100}%` }}
                  />
                </div>
              </div>
              {getRequiredSectionsCount() >= 12 && (
                <span className="text-green-600 font-semibold">✓ Ready to submit!</span>
              )}
            </div>
            <Button variant="outline" onClick={handleSaveDraft} className="flex items-center gap-2 bg-transparent">
              <Save className="h-4 w-4" />
              Save Draft
            </Button>
          </div>
        </div>

        <div className="p-6">
          {/* Section Navigation */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">SDS Sections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
                {sections.map((section, index) => (
                  <Button
                    key={section.key}
                    variant={currentSection === section.key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentSection(section.key)}
                    className={`justify-start text-left h-auto p-3 ${
                      sectionProgress[section.key] ? "border-green-500 bg-green-50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{section.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium truncate">{section.label}</div>
                        {sectionProgress[section.key] && <div className="text-xs text-green-600">✓ Completed</div>}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">{phaseConfig.title}</CardTitle>
                    <p className="text-gray-600 mt-1">{phaseConfig.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>{renderFormSection()}</CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
            <div className="p-4 border-t border-gray-200">
              <Button
                onClick={handleSubmitSDS}
                className={`w-full text-white transition-all duration-200 ${
                  areRequiredSectionsFilled()
                    ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!areRequiredSectionsFilled()}
              >
                <Send className="w-4 h-4 mr-2" />
                {areRequiredSectionsFilled()
                  ? "Submit SDS"
                  : `Complete ${12 - getRequiredSectionsCount()} more sections to submit`}
              </Button>
              {!areRequiredSectionsFilled() && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Progress: {getRequiredSectionsCount()}/12 required sections completed
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
