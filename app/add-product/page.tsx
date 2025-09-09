"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Tag, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddNewProductPage() {
  const router = useRouter()

  const handleCreateNewProductClick = () => {
    router.push("/add-product/basic-info")
  }

  const handleCreateSDSSheetClick = () => {
    router.push("/add-product/form")
  }

  const handleCreateLabelClick = () => {
    router.push("/add-product/label")
  }

  return (
    <div className="min-h-screen bg-white p-6 space-y-6">
      <div className="text-center mb-8">
        <p className="text-gray-600 text-lg">Choose an option to get started with adding a new product to the system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <Card
          className="bg-white border-2 border-gray-200 hover:border-orange-400 hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
          onClick={handleCreateNewProductClick}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 p-6 bg-orange-50 group-hover:bg-orange-100 rounded-full w-fit transition-all duration-300 group-hover:scale-110">
              <Plus className="h-16 w-16 text-orange-500 group-hover:text-orange-600 transition-colors" />
            </div>
            <CardTitle className="text-2xl font-bold text-black group-hover:text-orange-600 transition-colors">
              Create New Product
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6 text-base leading-relaxed">
              Start with basic product information to quickly add a new product to the system.
            </p>
            <div className="space-y-3 text-sm text-gray-500 mb-8">
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Product Name & Codes</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Location & Batch Details</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Manufacturing & Expiry Dates</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Quick Approval Process</span>
              </div>
            </div>
            <Button
              className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 group-hover:shadow-lg active:scale-95"
              onClick={(e) => {
                e.stopPropagation()
                handleCreateNewProductClick()
              }}
            >
              Start Basic Info
            </Button>
          </CardContent>
        </Card>

        <Card
          className="bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
          onClick={handleCreateSDSSheetClick}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 p-6 bg-blue-50 group-hover:bg-blue-100 rounded-full w-fit transition-all duration-300 group-hover:scale-110">
              <FileText className="h-16 w-16 text-blue-500 group-hover:text-blue-600 transition-colors" />
            </div>
            <CardTitle className="text-2xl font-bold text-black group-hover:text-blue-600 transition-colors">
              Create SDS Sheet
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6 text-base leading-relaxed">
              Create a comprehensive Safety Data Sheet (SDS) with all 16 required sections for regulatory compliance.
            </p>
            <div className="space-y-3 text-sm text-gray-500 mb-8">
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Complete SDS Elements 1-16</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Approval Workflow Process</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Regulatory Compliance</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Export to SDS Library</span>
              </div>
            </div>
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 group-hover:shadow-lg active:scale-95"
              onClick={(e) => {
                e.stopPropagation()
                handleCreateSDSSheetClick()
              }}
            >
              Start SDS Sheet
            </Button>
          </CardContent>
        </Card>

        <Card
          className="bg-white border-2 border-gray-200 hover:border-green-400 hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
          onClick={handleCreateLabelClick}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 p-6 bg-green-50 group-hover:bg-green-100 rounded-full w-fit transition-all duration-300 group-hover:scale-110">
              <Tag className="h-16 w-16 text-green-500 group-hover:text-green-600 transition-colors" />
            </div>
            <CardTitle className="text-2xl font-bold text-black group-hover:text-green-600 transition-colors">
              Create Label
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6 text-base leading-relaxed">
              Generate GHS-compliant chemical labels with hazard statements, precautionary statements, and safety
              information.
            </p>
            <div className="space-y-3 text-sm text-gray-500 mb-8">
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span>
                <span>GHS Hazard & Precautionary Statements</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Auto-fill from SDS Library</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Label Preview & Printing</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Workflow Approval Process</span>
              </div>
            </div>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 group-hover:shadow-lg active:scale-95"
              onClick={(e) => {
                e.stopPropagation()
                handleCreateLabelClick()
              }}
            >
              Create New Label
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-500 text-base">
          All options include approval workflows and integration with the OILSERV chemical management system
        </p>
      </div>
    </div>
  )
}
