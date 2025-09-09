"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Send, ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import type { LabelFormData } from "../page"

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

export default function ProductLabelWorkflowPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [currentStatus, setCurrentStatus] = useState<WorkflowStatus>("submitted")
  const [labelData, setLabelData] = useState<LabelFormData | null>(null)
  const [selectedAuthority, setSelectedAuthority] = useState<string>("")

  const approvingAuthorities = [
    {
      id: "brahimi",
      name: "Brahimi Zineddine",
      email: "zineddinebr@gmail.com",
      title: "Safety Manager",
    },
    {
      id: "nadjib",
      name: "Nadjib Debbabi",
      email: "nadjib.debbabi@oilserv.com",
      title: "Technical Director",
    },
  ]

  const searchParamsString = useMemo(() => {
    return searchParams.toString()
  }, [searchParams])

  useEffect(() => {
    if (!searchParamsString) {
      setLabelData(null)
      return
    }

    const parsedData: Partial<LabelFormData> = {}

    for (const [key, value] of searchParams.entries()) {
      try {
        const decodedValue = decodeURIComponent(value)
        if (
          key === "hazards" ||
          key === "hazardStatements" ||
          key === "precautionaryStatements" ||
          key === "selectedPpe" ||
          key === "nfpaSpecific"
        ) {
          parsedData[key as keyof LabelFormData] = JSON.parse(decodedValue) as any
        } else if (key === "nfpaHealth" || key === "nfpaFire" || key === "nfpaReactivity") {
          parsedData[key as keyof LabelFormData] = Number.parseInt(decodedValue) as any
        } else if (key === "includeNfpa") {
          parsedData[key as keyof LabelFormData] = decodedValue === ("true" as any)
        } else {
          parsedData[key as keyof LabelFormData] = decodedValue as any
        }
      } catch (error) {
        console.error(`Error parsing ${key}:`, error)
      }
    }

    setLabelData(parsedData as LabelFormData)
  }, [searchParamsString])

  const handlePhaseTransition = (nextPhase: WorkflowStatus) => {
    if (nextPhase === "approved" && !selectedAuthority) {
      alert("Please select an approving authority before proceeding with approval.")
      return
    }

    const selectedAuth = approvingAuthorities.find((auth) => auth.id === selectedAuthority)

    if (nextPhase === "approved") {
      const newLabel = {
        id: Date.now(),
        productName: labelData?.productName || "Unknown Product",
        chemicalName: labelData?.chemicalName || "Unknown Chemical",
        identifierNumber: labelData?.identifierNumber || "",
        contributingSubstances: labelData?.contributingSubstances || "",
        nominalQuantity: labelData?.nominalQuantity || "",
        batchNumber: labelData?.batchNumber || "",
        osCode: labelData?.osCode || "",
        manufacturingDate: labelData?.manufacturingDate || "",
        expiryDate: labelData?.expiryDate || "",
        supplier: labelData?.supplier || "OILSERV Energy Ltd",
        supplierAddress: labelData?.supplierAddress || "",
        emergencyPhone: labelData?.emergencyPhone || "+234-1-234-5678",
        hazards: labelData?.hazards || [],
        signalWord: labelData?.signalWord || "WARNING",
        hazardStatements: labelData?.hazardStatements || [],
        precautionaryStatements: labelData?.precautionaryStatements || [],
        selectedPpe: labelData?.selectedPpe || [],
        additionalInfo: labelData?.additionalInfo || "",
        nfpaHealth: labelData?.nfpaHealth || 0,
        nfpaFire: labelData?.nfpaFire || 0,
        nfpaReactivity: labelData?.nfpaReactivity || 0,
        nfpaSpecific: labelData?.nfpaSpecific || [],
        includeNfpa: labelData?.includeNfpa || false,
        lastUpdated: new Date().toISOString().split("T")[0],
        status: "Approved", // Always save as "Approved" status
        notification: "Approved for use",
        type: "Product Label",
      }

      if (typeof window !== "undefined") {
        const existingLabels = JSON.parse(localStorage.getItem("ghsLabels") || "[]")
        const updatedLabels = [...existingLabels, newLabel]
        localStorage.setItem("ghsLabels", JSON.stringify(updatedLabels))
      }

      setCurrentStatus(nextPhase)
      alert(
        `Label "${labelData?.productName}" successfully approved by ${selectedAuth?.name || "management"}!\n\nEmail notification sent to ${selectedAuth?.email || "management"} for label approval.\n\nThe label is now available in the Labels Library with "Approved" status.`,
      )

      setTimeout(() => {
        router.push("/labels")
      }, 2000)
    } else {
      setCurrentStatus(nextPhase)
      const emailNotifications = {
        review: "Email notification sent to safety team for label review",
      }
      alert(emailNotifications[nextPhase as keyof typeof emailNotifications])
    }
  }

  const getPhaseConfig = (phase: WorkflowStatus) => {
    const configs = {
      submitted: {
        title: "Submit Section",
        description: "Label submitted and ready for review",
        icon: Send,
        color: "blue",
        nextPhase: "review" as WorkflowStatus,
        nextLabel: "Submit for Review",
      },
      review: {
        title: "Review Section",
        description: "Label is under technical review by safety team",
        icon: Clock,
        color: "yellow",
        nextPhase: "approved" as WorkflowStatus,
        nextLabel: "Approve Label",
      },
      approved: {
        title: "Approved Section",
        description: "Label has been approved and is ready for use",
        icon: CheckCircle,
        color: "green",
        nextPhase: "approved" as WorkflowStatus,
        nextLabel: "Approved",
      },
    }
    return configs[phase]
  }

  const getCurrentStepIndex = () => {
    return workflowSteps.findIndex((step) => step.status === currentStatus)
  }

  const getStepColor = (stepIndex: number) => {
    const currentIndex = getCurrentStepIndex()
    if (stepIndex <= currentIndex) {
      return "bg-blue-500"
    }
    return "bg-gray-300"
  }

  if (!labelData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Clock className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading label data...</p>
        </div>
      </div>
    )
  }

  const phaseConfig = getPhaseConfig(currentStatus)
  const PhaseIcon = phaseConfig.icon

  return (
    <div className="min-h-screen bg-gray-50">
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
              <div className="w-6 h-6 bg-slate-600 rounded flex items-center justify-center text-white text-sm font-bold">
                📦
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Product Label Workflow</h1>
                <p className="text-sm text-gray-600">Label processing - {phaseConfig.title}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <PhaseIcon className={`h-5 w-5 text-${phaseConfig.color}-500`} />
            <span className={`text-sm font-medium text-${phaseConfig.color}-600`}>{phaseConfig.title}</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Workflow Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              {(["submitted", "review", "approved"] as WorkflowStatus[]).map((phase, index) => {
                const config = getPhaseConfig(phase)
                const Icon = config.icon
                const isActive = currentStatus === phase
                const isCompleted =
                  (["submitted", "review", "approved"] as WorkflowStatus[]).indexOf(currentStatus) > index

                return (
                  <div key={phase} className="flex items-center">
                    <div
                      className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2
                      ${
                        isActive
                          ? `border-${config.color}-500 bg-${config.color}-50`
                          : isCompleted
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300 bg-gray-50"
                      }
                    `}
                    >
                      <Icon
                        className={`h-5 w-5 ${
                          isActive ? `text-${config.color}-500` : isCompleted ? "text-green-500" : "text-gray-400"
                        }`}
                      />
                    </div>
                    <div className="ml-3">
                      <p
                        className={`text-sm font-medium ${
                          isActive ? `text-${config.color}-600` : isCompleted ? "text-green-600" : "text-gray-500"
                        }`}
                      >
                        {config.title}
                      </p>
                    </div>
                    {index < 2 && <div className={`w-16 h-0.5 mx-4 ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} />}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Label Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <PhaseIcon className={`h-16 w-16 mx-auto mb-4 text-${phaseConfig.color}-500`} />
              <h3 className="text-xl font-semibold mb-2">{phaseConfig.title}</h3>
              <p className="text-gray-600 mb-6">{phaseConfig.description}</p>

              {currentStatus === "review" && (
                <div className="mb-6">
                  <Card className="max-w-md mx-auto">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-center">Select Approving Authority</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {approvingAuthorities.map((authority) => (
                          <div
                            key={authority.id}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedAuthority === authority.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedAuthority(authority.id)}
                          >
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="authority"
                                value={authority.id}
                                checked={selectedAuthority === authority.id}
                                onChange={() => setSelectedAuthority(authority.id)}
                                className="text-blue-600"
                              />
                              <div className="text-left">
                                <p className="font-medium text-gray-900">{authority.name}</p>
                                <p className="text-sm text-gray-600">{authority.title}</p>
                                <p className="text-xs text-gray-500">{authority.email}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {selectedAuthority && (
                        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                          <p className="text-sm text-green-800">
                            ✓ Selected: {approvingAuthorities.find((auth) => auth.id === selectedAuthority)?.name}
                          </p>
                          <p className="text-xs text-green-600">
                            Email notification will be sent to:{" "}
                            {approvingAuthorities.find((auth) => auth.id === selectedAuthority)?.email}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {currentStatus !== "approved" && (
                <Button
                  onClick={() => handlePhaseTransition(phaseConfig.nextPhase)}
                  className={`bg-${phaseConfig.color}-600 hover:bg-${phaseConfig.color}-700`}
                  disabled={currentStatus === "review" && !selectedAuthority}
                >
                  {phaseConfig.nextLabel}
                </Button>
              )}

              {currentStatus === "approved" && (
                <div className="space-y-4">
                  <p className="text-green-600 font-semibold">Label successfully approved and ready for use!</p>
                  <Button onClick={() => router.push("/labels")} className="bg-blue-600 hover:bg-blue-700">
                    View Labels Library
                  </Button>
                </div>
              )}
            </div>

            <div className="mt-8 pt-8 border-t">
              <h4 className="text-lg font-semibold mb-4">Label Summary</h4>
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
                  <p className="text-gray-900">{labelData.identifierNumber || "Not specified"}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">OS Code:</span>
                  <p className="text-gray-900">{labelData.osCode || "Not specified"}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Signal Word:</span>
                  <p className={`font-bold ${labelData.signalWord === "DANGER" ? "text-red-600" : "text-orange-600"}`}>
                    {labelData.signalWord || "WARNING"}
                  </p>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Quantity:</span>
                  <p className="text-gray-900">{labelData.nominalQuantity || "Not specified"}</p>
                </div>
              </div>

              {labelData.hazards && labelData.hazards.length > 0 && (
                <div className="mt-4">
                  <span className="font-semibold text-gray-700">Hazard Symbols:</span>
                  <div className="flex gap-2 mt-2">
                    {labelData.hazards.map((hazardCode: string, index: number) => (
                      <div key={index} className="w-8 h-8 bg-gray-100 rounded border flex items-center justify-center">
                        <span className="text-xs font-bold">{hazardCode}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
