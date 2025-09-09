"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Send, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

type WorkflowStatus = "submitted" | "review" | "approved"

const workflowSteps = [
  {
    status: "submitted",
    label: "Submit Section",
    icon: Send,
    color: "blue",
    description: "Label submitted for processing",
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
    description: "Label approved and active",
  },
]

interface LabelWorkflowPageProps {
  labelData: any
  onComplete: () => void
}

export default function LabelWorkflowPage({ labelData, onComplete }: LabelWorkflowPageProps) {
  const router = useRouter()
  const [currentStatus, setCurrentStatus] = useState<WorkflowStatus>("submitted")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [workflowCompleted, setWorkflowCompleted] = useState(false)

  useEffect(() => {
    const progressWorkflow = async () => {
      setIsProcessing(true)

      // Submit Section (immediate)
      setCurrentStatus("submitted")
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Review Section
      setCurrentStatus("review")
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Approved Section
      setCurrentStatus("approved")

      const newLabel = {
        id: Date.now(),
        productName: labelData.productName || "Unknown Product",
        chemicalName: labelData.chemicalName || "Unknown Chemical",
        identifierNumber: labelData.identifierNumber || "",
        contributingSubstances: labelData.contributingSubstances || "",
        nominalQuantity: labelData.nominalQuantity || "",
        supplier: labelData.supplier || "OILSERV Energy Ltd",
        supplierAddress: labelData.supplierAddress || "",
        emergencyPhone: labelData.emergencyPhone || "+234-1-234-5678",
        hazards: labelData.hazards || [],
        signalWord: labelData.signalWord || "WARNING",
        hazardStatements: labelData.hazardStatements || [],
        precautionaryStatements: labelData.precautionaryStatements || [],
        selectedPpe: labelData.selectedPpe || [],
        additionalInfo: labelData.additionalInfo || "",
        lastUpdated: new Date().toISOString().split("T")[0],
        status: "Active", // When approved, status becomes Active (green, can view and print)
        notification: "Approved",
        workflowStatus: "approved", // Track workflow phase
      }

      if (typeof window !== "undefined") {
        const existingLabels = JSON.parse(localStorage.getItem("ghsLabels") || "[]")
        const updatedLabels = [...existingLabels, newLabel]
        localStorage.setItem("ghsLabels", JSON.stringify(updatedLabels))
      }

      setIsProcessing(false)
      setShowOptions(true)
      setWorkflowCompleted(true)
    }

    progressWorkflow()
  }, [labelData])

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

  const handleCreateLabel = () => {
    router.push("/add-product/label")
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
            <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white text-sm font-bold">
              ⚠️
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Label Processing Workflow</h1>
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

        {/* Label Summary */}
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Label Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="font-semibold text-gray-700">Product Name:</span>
                <p className="text-gray-900">{labelData.productName || "Not specified"}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Chemical Name:</span>
                <p className="text-gray-900">{labelData.chemicalName || "Not specified"}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">CAS Number:</span>
                <p className="text-gray-900">{labelData.casNumber || "Not specified"}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Signal Word:</span>
                <p className={`font-bold ${labelData.signalWord === "DANGER" ? "text-red-600" : "text-orange-600"}`}>
                  {labelData.signalWord || "WARNING"}
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Supplier:</span>
                <p className="text-gray-900">{labelData.supplier || "OILSERV Energy Ltd"}</p>
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
                  ✅ Your label has been successfully processed and is now available in the Labels section with "Active"
                  status. You can now view and print this label.
                </div>
              )}

              {currentStatus === "review" && (
                <div className="mt-3 text-sm text-gray-600">
                  ⏳ Your label is currently under review. It will be displayed in View Labels with yellow status (view
                  only, cannot be printed until approved).
                </div>
              )}
            </div>

            {workflowCompleted && currentStatus === "approved" && (
              <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  🎉 Label Successfully Approved!
                </h3>
                <p className="text-sm text-gray-600 mb-6 text-center">
                  Your label has been processed and is ready for use. Choose your next action:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    onClick={handleGoToSdsLibrary}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    📚 Go to SDS Library
                  </Button>
                  <Button
                    onClick={handleCreateLabel}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                  >
                    ➕ Create Another Label
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
