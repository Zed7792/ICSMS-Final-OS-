"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Tag } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddNewProductPage() {
  const router = useRouter()

  const handleProductFormClick = () => {
    router.push("/add-product/form")
  }

  const handleCreateLabelClick = () => {
    router.push("/add-product/label")
  }

  return (
    <div className="min-h-screen bg-white p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-orange-600 mb-4">Add New Product</h2>
        <p className="text-gray-600 text-lg">Choose an option to get started with adding a new product to the system</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Product Form Card */}
        <Card
          className="bg-white border-2 border-gray-200 hover:border-blue-400 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          onClick={handleProductFormClick}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 p-6 bg-blue-50 group-hover:bg-blue-100 rounded-full w-fit transition-colors">
              <FileText className="h-16 w-16 text-blue-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Product Form</CardTitle>
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                handleProductFormClick()
              }}
            >
              Start Product Form
            </Button>
          </CardContent>
        </Card>

        {/* Create Label Card */}
        <Card
          className="bg-white border-2 border-gray-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          onClick={handleCreateLabelClick}
        >
          <CardHeader className="text-center pb-4">
            <div className="mx-auto mb-4 p-6 bg-green-50 group-hover:bg-green-100 rounded-full w-fit transition-colors">
              <Tag className="h-16 w-16 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Create Label</CardTitle>
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
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
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
          Both options include approval workflows and integration with the OILSERV chemical management system
        </p>
      </div>
    </div>
  )
}
