"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, Download, Edit } from "lucide-react"

const sdsDocuments = [
  {
    id: "SDS-001",
    productName: "Acetone",
    manufacturer: "Chemical Corp",
    version: "1.2",
    lastUpdated: "2024-01-15",
    status: "Active",
    hazardClass: "Flammable Liquid",
  },
  {
    id: "SDS-002",
    productName: "Sulfuric Acid 98%",
    manufacturer: "Acid Industries",
    version: "2.1",
    lastUpdated: "2024-01-10",
    status: "Active",
    hazardClass: "Corrosive",
  },
  {
    id: "SDS-003",
    productName: "Methanol",
    manufacturer: "Solvent Solutions",
    version: "1.5",
    lastUpdated: "2024-01-08",
    status: "Active",
    hazardClass: "Flammable Liquid, Toxic",
  },
]

export default function SDSLibraryPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Search and Filter */}
      <Card className="bg-white text-gray-900">
        <CardHeader>
          <CardTitle>Search SDS Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search by product name, manufacturer, or SDS ID..." className="pl-10" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Search</Button>
          </div>
        </CardContent>
      </Card>

      {/* SDS Documents Table */}
      <Card className="bg-white text-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Safety Data Sheets Library
            <Badge variant="secondary" className="ml-2">
              {sdsDocuments.length} Documents
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">SDS ID</TableHead>
                  <TableHead className="font-semibold">Product Name</TableHead>
                  <TableHead className="font-semibold">Manufacturer</TableHead>
                  <TableHead className="font-semibold">Version</TableHead>
                  <TableHead className="font-semibold">Hazard Class</TableHead>
                  <TableHead className="font-semibold">Last Updated</TableHead>
                  <TableHead className="font-semibold">Status</TableHead>
                  <TableHead className="font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sdsDocuments.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{doc.id}</TableCell>
                    <TableCell className="font-medium">{doc.productName}</TableCell>
                    <TableCell>{doc.manufacturer}</TableCell>
                    <TableCell>{doc.version}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {doc.hazardClass.split(", ").map((hazard, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {hazard}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{doc.lastUpdated}</TableCell>
                    <TableCell>
                      <Badge variant="default" className="bg-green-100 text-green-800">
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                          <Edit className="h-4 w-4" />
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
  )
}
