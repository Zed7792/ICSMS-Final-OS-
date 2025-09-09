"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Send, ArrowLeft, Mail, Users } from "lucide-react"
import { useRouter } from "next/navigation"

type WorkflowStatus = "submitted" | "review" | "approved"

const workflowSteps = [
  {
    status: "submitted",
    label: "Submit Section",
    icon: Send,
    color: "blue",
    description: "SDS submitted for processing",
  },
  {
    status: "review",
    label: "Review Section",
    icon: Clock,
    color: "yellow",
    description: "Technical review in progress",
  },
  {
    status: "approved",
    label: "Approved Section",
    icon: CheckCircle,
    color: "green",
    description: "SDS approved and active",
  },
]

const approverEmails = [
  "safety.manager@oilserv.com",
  "technical.reviewer@oilserv.com",
  "compliance.officer@oilserv.com",
]

interface SDSWorkflowPageProps {
  sdsData: any
  onComplete?: () => void
}

export default function SDSWorkflowPage({ sdsData, onComplete }: SDSWorkflowPageProps) {
  const router = useRouter()
  const [currentStatus, setCurrentStatus] = useState<WorkflowStatus>("submitted")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [workflowCompleted, setWorkflowCompleted] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState<string[]>([])

  useEffect(() => {
    const progressWorkflow = async () => {
      setIsProcessing(true)

      // Submit Section (immediate)
      setCurrentStatus("submitted")

      const submissionEmails = approverEmails.map((email) => `📧 Submission notification sent to ${email}`)
      setEmailNotifications((prev) => [...prev, ...submissionEmails])

      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Review Section
      setCurrentStatus("review")

      const reviewEmails = approverEmails.map((email) => `📧 Review request sent to ${email}`)
      setEmailNotifications((prev) => [...prev, ...reviewEmails])

      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Approved Section
      setCurrentStatus("approved")

      const newSDSEntry = {
        id: `${sdsData.oilservCode}-${Date.now()}`,
        productName: sdsData.productName || "Unknown Product",
        chemicalName: sdsData.chemicalName || "Unknown Chemical",
        oilservCode: sdsData.oilservCode || "",
        casNumber: sdsData.casNumber || "",
        location: sdsData.location || "",
        batchNumber: sdsData.batchNumber || "",
        manufacturingDate: sdsData.manufacturingDate || "",
        sdsAddedDate: new Date().toISOString().split("T")[0],
        sdsReviewDate: new Date(Date.now() + 3 * 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0], // 3 years from now
        size: "0.5 MB",
        pdfUrl: "/sds-documents/generated-sds.pdf",
        status: "Active", // When approved, status becomes Active (green, can view and print)
        notification: "Approved",
        workflowStatus: "approved", // Track workflow phase
        sections: {
          identification: {
            title: "1. Identification of the substance/mixture and of the company/undertaking",
            content: `Product Name: ${sdsData.productName}\nChemical Name: ${sdsData.chemicalName}\nCAS Number: ${sdsData.casNumber}\nOilserv Code: ${sdsData.oilservCode}\nSupplier: ${sdsData.supplier}\nAddress: ${sdsData.supplierAddress}\nEmergency Phone: ${sdsData.emergencyPhone}`,
          },
          hazards: {
            title: "2. Hazards identification",
            content: `Classification: ${sdsData.hazardClassification}\nSignal Word: ${sdsData.signalWord}\nHazard Statements: ${sdsData.hazardStatements}\nPrecautionary Statements: ${sdsData.precautionaryStatements}`,
          },
          composition: {
            title: "3. Composition/information on ingredients",
            content: `Chemical Name: ${sdsData.chemicalName}\nCAS Number: ${sdsData.casNumber}\nConcentration: Not specified\nImpurities: Not specified`,
          },
          firstaid: {
            title: "4. First-aid measures",
            content: `Eye Contact: ${sdsData.firstAidEyes}\nSkin Contact: ${sdsData.firstAidSkin}\nInhalation: ${sdsData.firstAidInhalation}\nIngestion: ${sdsData.firstAidIngestion}`,
          },
          firefighting: {
            title: "5. Firefighting measures",
            content: `Extinguishing Media: ${sdsData.extinguishingMedia}\nSpecial Hazards: ${sdsData.specialHazards}`,
          },
          accidental: {
            title: "6. Accidental release measures",
            content: `Personal Precautions: ${sdsData.personalPrecautions}\nEnvironmental Precautions: ${sdsData.environmentalPrecautions}\nCleanup Methods: ${sdsData.cleanupMethods}`,
          },
          handling: {
            title: "7. Handling and storage",
            content: `Handling Precautions: ${sdsData.handlingPrecautions}\nStorage Conditions: ${sdsData.storageConditions}`,
          },
          exposure: {
            title: "8. Exposure controls/personal protection",
            content: `Exposure Controls: ${sdsData.exposureControls}\nEye Protection: ${sdsData.eyeProtection}\nSkin Protection: ${sdsData.skinProtection}\nRespiratory Protection: ${sdsData.respiratoryProtection}`,
          },
          physical: {
            title: "9. Physical and chemical properties",
            content: `Physical State: ${sdsData.physicalState}\nAppearance: ${sdsData.appearance}\nOdor: ${sdsData.odor}\npH: ${sdsData.ph}\nMelting Point: ${sdsData.meltingPoint}\nBoiling Point: ${sdsData.boilingPoint}\nFlash Point: ${sdsData.flashPoint}`,
          },
          stability: {
            title: "10. Stability and reactivity",
            content: `Reactivity: ${sdsData.reactivity}\nChemical Stability: ${sdsData.chemicalStability}\nHazardous Reactions: ${sdsData.hazardousReactions}\nConditions to Avoid: ${sdsData.conditionsToAvoid}`,
          },
          toxicology: {
            title: "11. Toxicological information",
            content: `Acute Toxicity: ${sdsData.acuteToxicity}\nSkin Corrosion: ${sdsData.skinCorrosion}\nEye Damage: ${sdsData.eyeDamage}\nCarcinogenicity: ${sdsData.carcinogenicity}`,
          },
          ecological: {
            title: "12. Ecological information",
            content: `Ecotoxicity: ${sdsData.ecotoxicity}\nPersistence: ${sdsData.persistence}\nBioaccumulation: ${sdsData.bioaccumulation}\nMobility: ${sdsData.mobility}`,
          },
          disposal: {
            title: "13. Disposal considerations",
            content: `Waste Disposal: ${sdsData.wasteDisposal}`,
          },
          transport: {
            title: "14. Transport information",
            content: `UN Number: ${sdsData.unNumber}\nProper Shipping Name: ${sdsData.properShippingName}\nTransport Hazard Class: ${sdsData.transportHazardClass}\nPacking Group: ${sdsData.packingGroup}`,
          },
          regulatory: {
            title: "15. Regulatory information",
            content: `Safety Regulations: ${sdsData.safetyRegulations}\nChemical Safety Assessment: ${sdsData.chemicalSafetyAssessment}`,
          },
          other: {
            title: "16. Other information",
            content: `Additional Information: ${sdsData.otherInformation}`,
          },
        },
      }

      if (typeof window !== "undefined") {
        const existingEntries = JSON.parse(localStorage.getItem("sdsEntries") || "[]")
        const updatedEntries = [...existingEntries, newSDSEntry]
        localStorage.setItem("sdsEntries", JSON.stringify(updatedEntries))

        localStorage.removeItem("sds-submission")
      }

      const approvalEmails = [
        ...approverEmails.map((email) => `📧 Approval notification sent to ${email}`),
        `📧 Confirmation email sent to submitter`,
      ]
      setEmailNotifications((prev) => [...prev, ...approvalEmails])

      setIsProcessing(false)
      setShowOptions(true)
      setWorkflowCompleted(true)
    }

    progressWorkflow()
  }, [sdsData])

  const getCurrentStepIndex = () => {
    return workflowSteps.findIndex((step) => step.status === currentStatus)
  }

  const getStepColor = (stepIndex: number) => {
    const currentIndex = getCurrentStepIndex()
    const step = workflowSteps[stepIndex]

    if (stepIndex < currentIndex) {
      return "bg-green-500" // Completed steps are green
    } else if (stepIndex === currentIndex) {
      if (step.status === "review") {
        return "bg-yellow-500" // Yellow for review phase
      } else if (step.status === "approved") {
        return "bg-green-500" // Green for approved phase
      }
      return "bg-blue-500" // Blue for submit phase
    }
    return "bg-gray-300" // Future steps are gray
  }

  const handleGoToSdsLibrary = () => {
    router.push("/sds-library")
  }

  const handleCreateSDS = () => {
    router.push("/add-product/form")
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
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-sm font-bold">
              📋
            </div>
            <h1 className="text-2xl font-bold text-gray-900">SDS Processing Workflow</h1>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-4xl mx-auto space-y-6">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Workflow Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between relative">
              {workflowSteps.map((step, index) => {
                const StepIcon = step.icon
                const isActive = index <= getCurrentStepIndex()
                const isCurrent = step.status === currentStatus

                return (
                  <div key={step.status} className="flex flex-col items-center relative z-10">
                    {/* Step Circle */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${getStepColor(
                        index,
                      )} text-white mb-3 ${isCurrent ? "ring-4 ring-opacity-30" : ""} ${
                        step.status === "review" && isCurrent
                          ? "ring-yellow-200"
                          : step.status === "approved" && isCurrent
                            ? "ring-green-200"
                            : "ring-blue-200"
                      }`}
                    >
                      {isActive && index < getCurrentStepIndex() ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <StepIcon className="w-6 h-6" />
                      )}
                    </div>

                    {/* Step Label */}
                    <div className="text-center">
                      <div
                        className={`text-sm font-medium ${
                          isCurrent
                            ? step.status === "review"
                              ? "text-yellow-600"
                              : step.status === "approved"
                                ? "text-green-600"
                                : "text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        {step.label}
                      </div>
                      {isCurrent && isProcessing && (
                        <div className="text-xs text-gray-500 mt-1">{step.description}</div>
                      )}
                    </div>
                  </div>
                )
              })}

              {/* Progress Line */}
              <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-300 -z-0">
                <div
                  className="h-full transition-all duration-1000 ease-in-out"
                  style={{
                    width: `${(getCurrentStepIndex() / (workflowSteps.length - 1)) * 100}%`,
                    backgroundColor:
                      currentStatus === "review" ? "#eab308" : currentStatus === "approved" ? "#22c55e" : "#3b82f6",
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {emailNotifications.length > 0 && (
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                Email Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {emailNotifications.map((notification, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 p-2 rounded">
                    <Users className="h-4 w-4 text-blue-500" />
                    {notification}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* SDS Summary */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">SDS Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-semibold text-gray-700">Product Name:</span>
                <p className="text-gray-900">{sdsData.productName || "Not specified"}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Chemical Name:</span>
                <p className="text-gray-900">{sdsData.chemicalName || "Not specified"}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">CAS Number:</span>
                <p className="text-gray-900">{sdsData.casNumber || "Not specified"}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Oilserv Code:</span>
                <p className="text-gray-900">{sdsData.oilservCode || "Not specified"}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Location:</span>
                <p className="text-gray-900">{sdsData.location || "Not specified"}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Batch Number:</span>
                <p className="text-gray-900">{sdsData.batchNumber || "Not specified"}</p>
              </div>
            </div>

            {/* Status Information */}
            <div
              className={`p-4 rounded-lg border ${
                currentStatus === "review"
                  ? "bg-yellow-50 border-yellow-200"
                  : currentStatus === "approved"
                    ? "bg-green-50 border-green-200"
                    : "bg-blue-50 border-blue-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {currentStatus === "approved" ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : currentStatus === "review" ? (
                  <Clock className="w-5 h-5 text-yellow-600 animate-spin" />
                ) : (
                  <Clock className="w-5 h-5 text-blue-600 animate-spin" />
                )}
                <span className="font-semibold text-gray-700">Current Status:</span>
                <span
                  className={`font-bold ${
                    currentStatus === "approved"
                      ? "text-green-600"
                      : currentStatus === "review"
                        ? "text-yellow-600"
                        : "text-blue-600"
                  }`}
                >
                  {currentStatus === "submitted" && "Submitted for Review"}
                  {currentStatus === "review" && "Under Technical Review"}
                  {currentStatus === "approved" && "Approved and Active"}
                </span>
              </div>

              {currentStatus === "approved" && (
                <div className="mt-3 text-sm text-gray-600">
                  ✅ Your SDS has been successfully processed and is now available in the SDS Library with "Active"
                  status. You can now view and access this SDS sheet with complete product details.
                </div>
              )}

              {currentStatus === "review" && (
                <div className="mt-3 text-sm text-gray-600">
                  ⏳ Your SDS is currently under review by our technical team. Email notifications have been sent to all
                  approvers. It will be displayed in SDS Library with yellow status (view only, cannot be accessed until
                  approved).
                </div>
              )}
            </div>

            {workflowCompleted && currentStatus === "approved" && (
              <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">🎉 SDS Successfully Approved!</h3>
                <p className="text-sm text-gray-600 mb-6 text-center">
                  Your SDS has been processed and is ready for use. The complete product information is now available in
                  the SDS Library. Choose your next action:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleGoToSdsLibrary}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    📚 Go to SDS Library
                  </Button>
                  <Button
                    onClick={handleCreateSDS}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    ➕ Create Another SDS
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
