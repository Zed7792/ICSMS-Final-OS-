"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Label {
  id: string
  labelName: string
  productName: string
  hazardSymbols: string
  signalWord: string
  hazardStatements: string
  precautionaryStatements: string
  supplierInfo: string
  emergencyContact: string
  additionalInfo: string
  status: "Under Review" | "Approved" | "Active"
  notification: "under review" | "approved notification" | "active"
  workflowStatus?: "submitted" | "review" | "approved" // Added workflowStatus property to match view-labels-page expectations
  date: string
}

interface LabelsContextType {
  labels: Label[]
  addLabel: (label: Omit<Label, "id" | "date">) => void
  updateLabelStatus: (
    id: string,
    status: Label["status"],
    notification: Label["notification"],
    workflowStatus?: Label["workflowStatus"],
  ) => void
}

const LabelsContext = createContext<LabelsContextType | undefined>(undefined)

export function LabelsProvider({ children }: { children: ReactNode }) {
  const [labels, setLabels] = useState<Label[]>([
    {
      id: "LBL-001",
      labelName: "Acetone Safety Label",
      productName: "Acetone",
      hazardSymbols: "Flammable, Health Hazard",
      signalWord: "DANGER",
      hazardStatements: "H225, H319, H336",
      precautionaryStatements: "P210, P233, P305+P351+P338",
      supplierInfo: "Chemical Corp, 123 Main St",
      emergencyContact: "+1-800-EMERGENCY",
      additionalInfo: "Store in cool, dry place",
      status: "Active",
      notification: "active",
      workflowStatus: "approved", // Added workflowStatus to existing labels
      date: "2024-01-15",
    },
    {
      id: "LBL-002",
      labelName: "Sulfuric Acid Label",
      productName: "Sulfuric Acid 98%",
      hazardSymbols: "Corrosive, Health Hazard",
      signalWord: "DANGER",
      hazardStatements: "H314, H290",
      precautionaryStatements: "P260, P280, P305+P351+P338",
      supplierInfo: "Acid Solutions Inc, 456 Industrial Ave",
      emergencyContact: "+1-800-ACID-HELP",
      additionalInfo: "Highly corrosive - handle with extreme care",
      status: "Active",
      notification: "active",
      workflowStatus: "approved", // Added workflowStatus to existing labels
      date: "2024-01-10",
    },
    {
      id: "LBL-003",
      labelName: "Methanol Warning Label",
      productName: "Methanol",
      hazardSymbols: "Flammable, Toxic",
      signalWord: "DANGER",
      hazardStatements: "H225, H301, H311, H331, H370",
      precautionaryStatements: "P210, P280, P302+P352, P304+P340",
      supplierInfo: "Solvent Supply Co, 789 Chemical Blvd",
      emergencyContact: "+1-800-POISON",
      additionalInfo: "Toxic by all routes of exposure",
      status: "Under Review",
      notification: "under review",
      workflowStatus: "review", // Added workflowStatus to existing labels
      date: "2024-01-08",
    },
  ])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLabels = JSON.parse(localStorage.getItem("ghsLabels") || "[]")
      if (savedLabels.length > 0) {
        // Merge saved labels with default labels, ensuring no duplicates
        const mergedLabels = [...labels]
        savedLabels.forEach((savedLabel: any) => {
          if (!mergedLabels.find((label) => label.id === savedLabel.id)) {
            mergedLabels.push({
              ...savedLabel,
              // Ensure proper status mapping from workflow
              status:
                savedLabel.status === "Active"
                  ? "Active"
                  : savedLabel.status === "Approved"
                    ? "Approved"
                    : "Under Review",
              workflowStatus: savedLabel.workflowStatus || (savedLabel.status === "Active" ? "approved" : "review"),
              notification: savedLabel.notification || (savedLabel.status === "Active" ? "active" : "under review"),
            })
          }
        })
        setLabels(mergedLabels)
      }
    }
  }, []) // Empty dependency array to run only once

  const addLabel = (labelData: Omit<Label, "id" | "date">) => {
    const newLabel: Label = {
      ...labelData,
      id: `LBL-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
    }
    setLabels((prev) => [...prev, newLabel])
  }

  const updateLabelStatus = (
    id: string,
    status: Label["status"],
    notification: Label["notification"],
    workflowStatus?: Label["workflowStatus"],
  ) => {
    setLabels((prev) =>
      prev.map((label) => (label.id === id ? { ...label, status, notification, workflowStatus } : label)),
    )
  }

  return <LabelsContext.Provider value={{ labels, addLabel, updateLabelStatus }}>{children}</LabelsContext.Provider>
}

export function useLabels() {
  const context = useContext(LabelsContext)
  if (context === undefined) {
    throw new Error("useLabels must be used within a LabelsProvider")
  }
  return context
}
