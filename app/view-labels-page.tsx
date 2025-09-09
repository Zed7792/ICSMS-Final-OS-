"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download, Edit, Clock, CheckCircle } from "lucide-react"
import { useLabels } from "@/context/labels-context"
import { useEffect } from "react"

export default function ViewLabelsPage() {
  const { labels, addLabel } = useLabels()

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLabels = JSON.parse(localStorage.getItem("ghsLabels") || "[]")
      savedLabels.forEach((savedLabel: any) => {
        // Check if label already exists in context
        const existingLabel = labels.find(
          (label) => label.productName === savedLabel.productName && label.id !== savedLabel.id,
        )

        if (!existingLabel && savedLabel.status === "Active") {
          // Add approved workflow labels to the labels context
          addLabel({
            labelName: `${savedLabel.productName} Label`,
            productName: savedLabel.productName,
            hazardSymbols: savedLabel.hazards ? savedLabel.hazards.join(", ") : "Not specified",
            signalWord: savedLabel.signalWord || "WARNING",
            hazardStatements: Array.isArray(savedLabel.hazardStatements)
              ? savedLabel.hazardStatements.join(", ")
              : savedLabel.hazardStatements || "",
            precautionaryStatements: Array.isArray(savedLabel.precautionaryStatements)
              ? savedLabel.precautionaryStatements.join(", ")
              : savedLabel.precautionaryStatements || "",
            supplierInfo: savedLabel.supplier || "Not specified",
            emergencyContact: savedLabel.emergencyPhone || "Not specified",
            additionalInfo: savedLabel.additionalInfo || "",
            status: "Active",
            notification: "active",
            workflowStatus: "approved",
          })
        }
      })
    }
  }, [labels, addLabel])

  const getStatusBadge = (status: string, notification: string | null, workflowStatus?: string) => {
    // Handle workflow-based status display - removed "released" status
    if (workflowStatus === "review" || status === "Under Review") {
      return (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            Under Review
          </Badge>
          {notification && (
            <Badge variant="outline" className="text-xs text-yellow-600 border-yellow-300">
              {notification}
            </Badge>
          )}
        </div>
      )
    }

    if (workflowStatus === "approved" || status === "Active" || status === "Approved") {
      return (
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-green-100 text-green-800 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
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

    // Fallback for other statuses (but no "released" option)
    return <Badge variant="secondary">{status}</Badge>
  }

  const getActionButtons = (label: any) => {
    const isReview = label.workflowStatus === "review" || label.status === "Under Review"
    const isApproved = label.workflowStatus === "approved" || label.status === "Active" || label.status === "Approved"

    return (
      <div className="flex gap-2">
        {/* View button - always available */}
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
          <Eye className="h-4 w-4" />
        </Button>

        {/* Download/Print button - only available for approved labels */}
        {isApproved ? (
          <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
            <Download className="h-4 w-4" />
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="h-8 w-8 p-0 bg-transparent opacity-50 cursor-not-allowed"
            disabled
          >
            <Download className="h-4 w-4" />
          </Button>
        )}

        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
          <Edit className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <Card className="bg-white text-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Chemical Labels
            <Badge variant="secondary" className="ml-2">
              {labels.length} Labels
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Label ID</TableHead>
                  <TableHead className="font-semibold">Label Name</TableHead>
                  <TableHead className="font-semibold">Product Name</TableHead>
                  <TableHead className="font-semibold">Hazard Symbols</TableHead>
                  <TableHead className="font-semibold">Signal Word</TableHead>
                  <TableHead className="font-semibold">H-Statements</TableHead>
                  <TableHead className="font-semibold">P-Statements</TableHead>
                  <TableHead className="font-semibold">Supplier Info</TableHead>
                  <TableHead className="font-semibold">Emergency Contact</TableHead>
                  <TableHead className="font-semibold">Date</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {labels.map((label) => (
                  <TableRow key={label.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{label.id}</TableCell>
                    <TableCell>{label.labelName}</TableCell>
                    <TableCell>{label.productName}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {label.hazardSymbols.split(", ").map((symbol, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {symbol}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={label.signalWord === "DANGER" ? "destructive" : "secondary"}
                        className="font-bold"
                      >
                        {label.signalWord}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        {label.hazardStatements && Array.isArray(label.hazardStatements) ? (
                          <div className="space-y-1">
                            {label.hazardStatements.slice(0, 2).map((statement, index) => (
                              <div key={index} className="text-xs text-gray-600">
                                {statement.length > 30 ? `${statement.substring(0, 30)}...` : statement}
                              </div>
                            ))}
                            {label.hazardStatements.length > 2 && (
                              <div className="text-xs text-gray-500">+{label.hazardStatements.length - 2} more</div>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-600">
                            {typeof label.hazardStatements === "string" && label.hazardStatements.length > 30
                              ? `${label.hazardStatements.substring(0, 30)}...`
                              : label.hazardStatements || "No H-statements"}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        {label.precautionaryStatements && Array.isArray(label.precautionaryStatements) ? (
                          <div className="space-y-1">
                            {label.precautionaryStatements.slice(0, 2).map((statement, index) => (
                              <div key={index} className="text-xs text-gray-600">
                                {statement.length > 30 ? `${statement.substring(0, 30)}...` : statement}
                              </div>
                            ))}
                            {label.precautionaryStatements.length > 2 && (
                              <div className="text-xs text-gray-500">
                                +{label.precautionaryStatements.length - 2} more
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-gray-600">
                            {typeof label.precautionaryStatements === "string" &&
                            label.precautionaryStatements.length > 30
                              ? `${label.precautionaryStatements.substring(0, 30)}...`
                              : label.precautionaryStatements || "No P-statements"}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs text-xs text-gray-600">
                        {label.supplierInfo ? (
                          label.supplierInfo.length > 40 ? (
                            `${label.supplierInfo.substring(0, 40)}...`
                          ) : (
                            label.supplierInfo
                          )
                        ) : (
                          <span className="text-gray-400">No supplier info</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs text-gray-600">
                        {label.emergencyContact || <span className="text-gray-400">No emergency contact</span>}
                      </div>
                    </TableCell>
                    <TableCell>{label.date}</TableCell>
                    <TableCell>{getStatusBadge(label.status, label.notification, label.workflowStatus)}</TableCell>
                    <TableCell>{getActionButtons(label)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
