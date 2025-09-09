"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Download,
  Calendar,
  FileText,
  ArrowLeft,
  Info,
  CheckCircle,
  Text,
  AlignJustify,
  MapPin,
  Eye,
  Plus,
  Trash2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Helper function to calculate SDS status based on added date
const getSDSStatus = (sdsAddedDate: string) => {
  const addedDate = new Date(sdsAddedDate)
  const expiryDate = new Date(addedDate)
  expiryDate.setFullYear(addedDate.getFullYear() + 3) // 3 years expiry

  const reviewDate = new Date(addedDate)
  reviewDate.setMonth(addedDate.getMonth() + 30) // 2.5 years (30 months) for review

  const now = new Date()

  if (now > expiryDate) {
    return "Expired"
  } else if (now > reviewDate) {
    return "Under Review"
  } else {
    return "Active"
  }
}

// Helper function to check if expiry is within a month
const isExpirySoon = (expiryDateString: string) => {
  const expiryDate = new Date(expiryDateString)
  const now = new Date()
  const oneMonthFromNow = new Date()
  oneMonthFromNow.setMonth(now.getMonth() + 1)

  return expiryDate > now && expiryDate <= oneMonthFromNow
}

// Helper function to get date highlight class
const getDateHighlightClass = (dateString: string, type: "expiry" | "manufacturing") => {
  if (!dateString) return ""
  const date = new Date(dateString)
  const now = new Date()

  if (type === "expiry") {
    if (date < now) {
      return "text-red-600 font-semibold" // Expired
    } else if (isExpirySoon(dateString)) {
      return "text-orange-600 font-semibold" // Expiring soon
    }
  }
  // No special highlighting for manufacturing date unless specified
  return ""
}

// Sample SDS data (expanded with new fields and calculated status)
const staticSdsDocuments = [
  {
    id: "cenospheres-all-grades",
    productName: "Cenospheres, All Grades",
    chemicalName: "Ceramic Microspheres",
    oilservCode: "C402",
    casNumber: "66402-68-4",
    location: "Lab Storage",
    batchNumber: "BATCH-CEN-2024-001",
    manufacturingDate: "2024-01-01",
    sdsAddedDate: "2024-07-28",
    sdsReviewDate: "2027-01-28",
    size: "0.1 MB",
    pdfUrl: "/sds-documents/cenospheres-sds.pdf",
  },
  {
    id: "norcem-portland-cements",
    productName: "Norcem Portland Cements",
    chemicalName: "Portland Cement",
    oilservCode: "G001",
    casNumber: "65997-15-1",
    location: "Construction Site",
    batchNumber: "BATCH-NPC-2024-001",
    manufacturingDate: "2024-02-10",
    sdsAddedDate: "2024-07-28",
    sdsReviewDate: "2027-01-28",
    size: "0.5 MB",
    pdfUrl: "/sds-documents/sds-1.pdf",
  },
  {
    id: "silica-gel-grade-60",
    productName: "Silica gel, grade 60",
    chemicalName: "Silicon Dioxide",
    oilservCode: "C030",
    casNumber: "7631-86-9",
    location: "Lab Storage",
    batchNumber: "BATCH-SG-2024-001",
    manufacturingDate: "2024-03-05",
    sdsAddedDate: "2024-07-28",
    sdsReviewDate: "2027-01-28",
    size: "0.2 MB",
    pdfUrl: "/sds-documents/sds-2.pdf",
  },
  {
    id: "liquid-nitrogen-ln2",
    productName: "Liquid Nitrogen (LN2)",
    chemicalName: "Nitrogen",
    oilservCode: "N002",
    casNumber: "7727-37-9",
    location: "Cryo Storage",
    batchNumber: "BATCH-LN2-2024-001",
    manufacturingDate: "2024-04-15",
    sdsAddedDate: "2024-07-28",
    sdsReviewDate: "2027-01-28",
    size: "0.1 MB",
    pdfUrl: "/sds-documents/sds-3.pdf",
  },
  {
    id: "xylenes",
    productName: "Xylenes",
    chemicalName: "Dimethylbenzene",
    oilservCode: "S291",
    casNumber: "1330-20-7",
    location: "Chemical Store",
    batchNumber: "BATCH-XYL-2024-001",
    manufacturingDate: "2024-05-20",
    sdsAddedDate: "2024-07-28",
    sdsReviewDate: "2027-01-28",
    size: "0.3 MB",
    pdfUrl: "/sds-documents/sds-1.pdf",
  },
  {
    id: "ammonium-chloride-nh4cl",
    productName: "Ammonium chloride (NH4CL)",
    chemicalName: "Ammonium Chloride",
    oilservCode: "S861",
    casNumber: "12125-02-9",
    location: "Warehouse C",
    batchNumber: "BATCH-AC-2024-001",
    sdsAddedDate: "2024-07-28",
    manufacturingDate: "2024-06-01",
    sdsReviewDate: "2027-01-28",
    size: "0.4 MB",
    pdfUrl: "/sds-documents/sds-2.pdf",
  },
  {
    id: "potassium-chloride-kcl",
    productName: "Potassium chloride (KCL)",
    chemicalName: "Potassium Chloride",
    oilservCode: "S860",
    casNumber: "7447-40-7",
    location: "Lab Storage",
    batchNumber: "BATCH-KCL-2024-001",
    sdsAddedDate: "2024-07-28",
    manufacturingDate: "2024-07-01",
    sdsReviewDate: "2027-01-28",
    size: "0.2 MB",
    pdfUrl: "/sds-documents/sds-3.pdf",
  },
  {
    id: "biocide",
    productName: "Biocide",
    chemicalName: "Glutaraldehyde solution",
    oilservCode: "S830",
    casNumber: "111-30-8",
    location: "Water Treatment Plant",
    batchNumber: "BATCH-BIO-2024-001",
    sdsAddedDate: "2024-07-28",
    manufacturingDate: "2024-07-10",
    sdsReviewDate: "2027-01-28",
    size: "0.6 MB",
    pdfUrl: "/sds-documents/sds-1.pdf",
  },
  {
    id: "sodium-chloride-nacl",
    productName: "Sodium chloride (Nacl)",
    chemicalName: "Sodium Chloride",
    oilservCode: "C014",
    casNumber: "7647-14-5",
    location: "Warehouse A",
    batchNumber: "BATCH-NACL-2024-001",
    sdsAddedDate: "2024-07-28",
    manufacturingDate: "2024-07-15",
    sdsReviewDate: "2027-01-28",
    size: "0.3 MB",
    pdfUrl: "/sds-documents/sds-2.pdf",
  },
  {
    id: "hydrochloric-acid",
    productName: "Hydrochloric acid",
    chemicalName: "Hydrogen Chloride",
    oilservCode: "HA",
    casNumber: "7647-01-0",
    location: "Chemical Store",
    batchNumber: "BATCH-HCL-2024-001",
    sdsAddedDate: "2024-07-28",
    manufacturingDate: "2024-07-20",
    sdsReviewDate: "2027-01-28",
    size: "0.4 MB",
    pdfUrl: "/sds-documents/sds-3.pdf",
  },
]

const statuses = ["All Status", "Active", "Under Review", "Expired", "Basic Info Approved"]

export default function SDSLibraryPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("All Status")
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean
    productId: string
    productName: string
  }>({
    isOpen: false,
    productId: "",
    productName: "",
  })
  const [sdsDocuments, setSdsDocuments] = useState(() => {
    return staticSdsDocuments.map((doc) => ({
      ...doc,
      status: getSDSStatus(doc.sdsAddedDate),
      expiryDate: new Date(new Date(doc.sdsAddedDate).setFullYear(new Date(doc.sdsAddedDate).getFullYear() + 3))
        .toISOString()
        .split("T")[0],
    }))
  })

  useEffect(() => {
    const userEntries = JSON.parse(localStorage.getItem("sdsEntries") || "[]")
    if (userEntries.length > 0) {
      const combinedEntries = [
        ...staticSdsDocuments.map((doc) => ({
          ...doc,
          status: getSDSStatus(doc.sdsAddedDate),
          expiryDate: new Date(new Date(doc.sdsAddedDate).setFullYear(new Date(doc.sdsAddedDate).getFullYear() + 3))
            .toISOString()
            .split("T")[0],
        })),
        ...userEntries.map((doc: any) => ({
          ...doc,
          status: doc.isBasicInfoOnly ? "Basic Info Approved" : doc.status || getSDSStatus(doc.sdsAddedDate),
          expiryDate:
            doc.expiryDate ||
            new Date(new Date(doc.sdsAddedDate).setFullYear(new Date(doc.sdsAddedDate).getFullYear() + 3))
              .toISOString()
              .split("T")[0],
        })),
      ]
      setSdsDocuments(combinedEntries)
    }
  }, [])

  const filteredDocuments = sdsDocuments.filter((doc) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase()
    const matchesSearch =
      doc.productName.toLowerCase().includes(lowerCaseSearchTerm) ||
      doc.casNumber.toLowerCase().includes(lowerCaseSearchTerm) ||
      doc.batchNumber.toLowerCase().includes(lowerCaseSearchTerm) ||
      doc.oilservCode.toLowerCase().includes(lowerCaseSearchTerm) // Include OS Code in general search
    const matchesStatus = selectedStatus === "All Status" || doc.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Under Review":
        return "bg-yellow-100 text-yellow-800"
      case "Expired":
        return "bg-red-100 text-red-800"
      case "Basic Info Approved":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalDocuments = sdsDocuments.length
  const activeDocuments = sdsDocuments.filter((doc) => doc.status === "Active").length
  const underReviewDocuments = sdsDocuments.filter((doc) => doc.status === "Under Review").length
  const expiredDocuments = sdsDocuments.filter((doc) => doc.status === "Expired").length
  const basicInfoDocuments = sdsDocuments.filter((doc) => doc.status === "Basic Info Approved").length

  const exportToCSV = () => {
    const headers = [
      "Product Name",
      "Oilserv Code",
      "CAS Number",
      "Location",
      "Batch Number",
      "Manufacturing Date",
      "Expiry Date",
      "SDS Added Date",
      "SDS Review Date",
      "Size",
      "Status",
    ]
    const csvRows = []

    csvRows.push(headers.join(","))

    for (const doc of filteredDocuments) {
      const values = [
        doc.productName,
        doc.oilservCode,
        doc.casNumber,
        doc.location,
        doc.batchNumber,
        doc.manufacturingDate,
        doc.expiryDate,
        doc.sdsAddedDate,
        doc.sdsReviewDate,
        doc.size,
        doc.status,
      ]
      csvRows.push(values.map((v) => `"${v}"`).join(",")) // Wrap values in quotes to handle commas
    }

    const csvString = csvRows.join("\n")
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = "sds_library.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDeleteClick = (productId: string, productName: string) => {
    setDeleteConfirmation({
      isOpen: true,
      productId,
      productName,
    })
  }

  const handleDeleteConfirm = () => {
    const { productId } = deleteConfirmation

    // Remove from current state
    setSdsDocuments((prev) => prev.filter((doc) => doc.id !== productId))

    // Remove from localStorage if it exists there
    const userEntries = JSON.parse(localStorage.getItem("sdsEntries") || "[]")
    const updatedEntries = userEntries.filter((doc: any) => doc.id !== productId)
    localStorage.setItem("sdsEntries", JSON.stringify(updatedEntries))

    // Close modal and show success message
    setDeleteConfirmation({ isOpen: false, productId: "", productName: "" })
    alert(`Product "${deleteConfirmation.productName}" has been successfully deleted from the SDS Library.`)
  }

  const handleDeleteCancel = () => {
    setDeleteConfirmation({ isOpen: false, productId: "", productName: "" })
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
            <FileText className="h-6 w-6 text-slate-600" />
            <h1 className="text-2xl font-bold text-gray-900">SDS Library</h1>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalDocuments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{activeDocuments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{underReviewDocuments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Expired</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{expiredDocuments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Basic Info Only</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{basicInfoDocuments}</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Search & Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by product name, CAS number, batch number, or OS Code..."
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
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Documents Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-semibold">
                Safety Data Sheets ({filteredDocuments.length} documents)
              </CardTitle>
              <Button onClick={exportToCSV} className="bg-slate-600 hover:bg-slate-700">
                <Download className="h-4 w-4 mr-2" />
                Export All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[150px]">
                      <div className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-gray-500" /> Product name
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[120px]">
                      <div className="flex items-center gap-1">
                        <Text className="h-4 w-4 text-gray-500" /> Oilserv code
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[120px]">
                      <div className="flex items-center gap-1">
                        <AlignJustify className="h-4 w-4 text-gray-500" /> CAS Number
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[120px]">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-gray-500" /> Location
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[150px]">
                      <div className="flex items-center gap-1">
                        <Text className="h-4 w-4 text-gray-500" /> Batch Number
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[150px]">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" /> Manufacturing date{" "}
                        <Info className="h-3 w-3 text-gray-400 ml-1" />
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[120px]">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" /> Expiry date{" "}
                        <Info className="h-3 w-3 text-gray-400 ml-1" />
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[150px]">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" /> SDS Added Date{" "}
                        <Info className="h-3 w-3 text-gray-400 ml-1" />
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[150px]">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-gray-500" /> SDS Review Date{" "}
                        <Info className="h-3 w-3 text-gray-400 ml-1" />
                      </div>
                    </TableHead>
                    <TableHead className="min-w-[100px]">Status</TableHead>
                    <TableHead className="min-w-[120px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow
                      key={doc.id}
                      className={isExpirySoon(doc.expiryDate) ? "bg-yellow-50 hover:bg-yellow-100" : "hover:bg-gray-50"}
                    >
                      <TableCell className="font-medium">
                        <Button
                          variant="link"
                          className="p-0 h-auto text-left font-medium text-blue-600 hover:text-blue-800"
                          onClick={() => router.push(`/sds-library/${doc.id}`)}
                        >
                          {doc.productName}
                        </Button>
                      </TableCell>
                      <TableCell>{doc.oilservCode}</TableCell>
                      <TableCell>{doc.casNumber}</TableCell>
                      <TableCell>{doc.location}</TableCell>
                      <TableCell>{doc.batchNumber}</TableCell>
                      <TableCell className={getDateHighlightClass(doc.manufacturingDate, "manufacturing")}>
                        {doc.manufacturingDate}
                      </TableCell>
                      <TableCell className={getDateHighlightClass(doc.expiryDate, "expiry")}>
                        {doc.expiryDate}
                      </TableCell>
                      <TableCell>{doc.sdsAddedDate}</TableCell>
                      <TableCell>{doc.sdsReviewDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(doc.status)}>{doc.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {doc.status === "Basic Info Approved" ? (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.push(`/add-product/form?basicInfoId=${doc.id}`)}
                              title="Complete Full SDS"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.push(`/sds-library/${doc.id}`)}
                              title="View SDS"
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteClick(doc.id, doc.productName)}
                            title="Delete Product"
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={deleteConfirmation.isOpen} onOpenChange={handleDeleteCancel}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Product</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product?
              <br />
              <strong>"{deleteConfirmation.productName}"</strong>
              <br />
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleDeleteCancel}>
              No
            </Button>
            <Button variant="destructive" onClick={handleDeleteConfirm}>
              Yes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
