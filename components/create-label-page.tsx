"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { FileText, Plus, Trash2, ChevronDown, ChevronRight } from "lucide-react"
import LabelWorkflowPage from "./label-workflow-page"

const sdsLibraryData = [
  {
    id: "cenospheres-all-grades",
    productName: "Cenospheres, All Grades",
    chemicalName: "Ceramic Microspheres",
    oilservCode: "C402",
    casNumber: "66402-68-4",
    location: "Lab Storage",
    supplier: "Advanced Materials Corp",
    supplierAddress: "123 Industrial Blvd, Houston, TX 77001",
    emergencyContact: "+1-800-424-9300",
  },
  {
    id: "norcem-portland-cements",
    productName: "Norcem Portland Cements",
    chemicalName: "Portland Cement",
    oilservCode: "G001",
    casNumber: "65997-15-1",
    location: "Construction Site",
    supplier: "Norcem AS",
    supplierAddress: "Postboks 38, 3991 Brevik, Norway",
    emergencyContact: "+47-35-57-70-00",
  },
  {
    id: "silica-gel-grade-60",
    productName: "Silica gel, grade 60",
    chemicalName: "Silicon Dioxide",
    oilservCode: "C030",
    casNumber: "7631-86-9",
    location: "Lab Storage",
    supplier: "Sigma-Aldrich",
    supplierAddress: "3050 Spruce Street, St. Louis, MO 63103",
    emergencyContact: "+1-314-771-5765",
  },
  {
    id: "liquid-nitrogen-ln2",
    productName: "Liquid Nitrogen (LN2)",
    chemicalName: "Nitrogen",
    oilservCode: "N002",
    casNumber: "7727-37-9",
    location: "Cryo Storage",
    supplier: "Air Products",
    supplierAddress: "7201 Hamilton Blvd, Allentown, PA 18195",
    emergencyContact: "+1-800-523-9374",
  },
  {
    id: "xylenes",
    productName: "Xylenes",
    chemicalName: "Dimethylbenzene",
    oilservCode: "S291",
    casNumber: "1330-20-7",
    location: "Chemical Store",
    supplier: "ExxonMobil Chemical",
    supplierAddress: "5959 Las Colinas Blvd, Irving, TX 75039",
    emergencyContact: "+1-832-624-6336",
  },
  {
    id: "ammonium-chloride-nh4cl",
    productName: "Ammonium chloride (NH4CL)",
    chemicalName: "Ammonium Chloride",
    oilservCode: "S861",
    casNumber: "12125-02-9",
    location: "Warehouse C",
    supplier: "Honeywell International",
    supplierAddress: "115 Tabor Road, Morris Plains, NJ 07950",
    emergencyContact: "+1-800-796-8367",
  },
  {
    id: "potassium-chloride-kcl",
    productName: "Potassium chloride (KCL)",
    chemicalName: "Potassium Chloride",
    oilservCode: "S860",
    casNumber: "7447-40-7",
    location: "Lab Storage",
    supplier: "Compass Minerals",
    supplierAddress: "9900 W 109th St, Overland Park, KS 66210",
    emergencyContact: "+1-913-344-9200",
  },
  {
    id: "biocide",
    productName: "Biocide",
    chemicalName: "Glutaraldehyde solution",
    oilservCode: "S830",
    casNumber: "111-30-8",
    location: "Water Treatment Plant",
    supplier: "Dow Chemical",
    supplierAddress: "2030 Dow Center, Midland, MI 48674",
    emergencyContact: "+1-989-636-4400",
  },
  {
    id: "sodium-chloride-nacl",
    productName: "Sodium chloride (Nacl)",
    chemicalName: "Sodium Chloride",
    oilservCode: "C014",
    casNumber: "7647-14-5",
    location: "Warehouse A",
    supplier: "Morton Salt",
    supplierAddress: "123 N Wacker Dr, Chicago, IL 60606",
    emergencyContact: "+1-312-807-2000",
  },
  {
    id: "hydrochloric-acid",
    productName: "Hydrochloric acid",
    chemicalName: "Hydrogen Chloride",
    oilservCode: "HA",
    casNumber: "7647-01-0",
    location: "Chemical Store",
    supplier: "Olin Corporation",
    supplierAddress: "190 Carondelet Plaza, Clayton, MO 63105",
    emergencyContact: "+1-314-480-1400",
  },
]

const hStatementCategories = [
  {
    category: "Physical Hazard (200 - 299)",
    statements: [
      "H200: Unstable explosive",
      "H201: Explosive; mass explosion hazard",
      "H202: Explosive; severe projection hazard",
      "H203: Explosive; fire, blast or projection hazard",
      "H204: Fire or projection hazard",
      "H205: May mass explode in fire",
      "H220: Extremely flammable gas",
      "H221: Flammable gas",
      "H222: Extremely flammable aerosol",
      "H223: Flammable aerosol",
      "H224: Extremely flammable liquid and vapour",
      "H225: Highly flammable liquid and vapour",
      "H226: Flammable liquid and vapour",
      "H228: Flammable solid",
      "H240: Heating may cause an explosion",
      "H241: Heating may cause a fire or explosion",
      "H242: Heating may cause a fire",
      "H250: Catches fire spontaneously if exposed to air",
      "H251: Self-heating; may catch fire",
      "H252: Self-heating in large quantities; may catch fire",
      "H260: In contact with water releases flammable gases which may ignite spontaneously",
      "H261: In contact with water releases flammable gas",
      "H270: May cause or intensify fire; oxidizer",
      "H271: May cause fire or explosion; strong oxidizer",
      "H272: May intensify fire; oxidizer",
      "H280: Contains gas under pressure; may explode if heated",
      "H281: Contains refrigerated gas; may cause cryogenic burns or injury",
      "H290: May be corrosive to metals",
    ],
  },
  {
    category: "Health Hazard (300 - 399)",
    statements: [
      "H300: Fatal if swallowed",
      "H301: Toxic if swallowed",
      "H302: Harmful if swallowed",
      "H304: May be fatal if swallowed and enters airways",
      "H310: Fatal in contact with skin",
      "H311: Toxic in contact with skin",
      "H312: Harmful in contact with skin",
      "H314: Causes severe skin burns and eye damage",
      "H315: Causes skin irritation",
      "H317: May cause an allergic skin reaction",
      "H318: Causes serious eye damage",
      "H319: Causes serious eye irritation",
      "H330: Fatal if inhaled",
      "H331: Toxic if inhaled",
      "H332: Harmful if inhaled",
      "H334: May cause allergy or asthma symptoms or breathing difficulties if inhaled",
      "H335: May cause respiratory irritation",
      "H336: May cause drowsiness or dizziness",
      "H340: May cause genetic defects",
      "H341: Suspected of causing genetic defects",
      "H350: May cause cancer",
      "H351: Suspected of causing cancer",
      "H360: May damage fertility or the unborn child",
      "H361: Suspected of damaging fertility or the unborn child",
      "H362: May cause harm to breast-fed children",
      "H370: Causes damage to organs",
      "H371: May cause damage to organs",
      "H372: Causes damage to organs through prolonged or repeated exposure",
      "H373: May cause damage to organs through prolonged or repeated exposure",
    ],
  },
  {
    category: "Environmental Hazard (400 - 499)",
    statements: [
      "H400: Very toxic to aquatic life",
      "H410: Very toxic to aquatic life with long lasting effects",
      "H411: Toxic to aquatic life with long lasting effects",
      "H412: Harmful to aquatic life with long lasting effects",
      "H413: May cause long lasting harmful effects to aquatic life",
      "H420: Harms public health and the environment by destroying ozone in the upper atmosphere",
    ],
  },
]

const pStatementCategories = [
  {
    category: "General (100 - 199)",
    statements: [
      "P101: If medical advice is needed, have product container or label at hand",
      "P102: Keep out of reach of children",
      "P103: Read label before use",
    ],
  },
  {
    category: "Prevention (200 - 299)",
    statements: [
      "P201: Obtain special instructions before use",
      "P202: Do not handle until all safety precautions have been read and understood",
      "P210: Keep away from heat, hot surfaces, sparks, open flames and other ignition sources",
      "P211: Do not spray on an open flame or other ignition source",
      "P220: Keep away from clothing and other combustible materials",
      "P221: Take any precaution to avoid mixing with combustibles",
      "P222: Do not allow contact with air",
      "P223: Keep away from any possible contact with water",
      "P230: Keep wetted with water",
      "P231: Handle under inert gas",
      "P232: Protect from moisture",
      "P233: Keep container tightly closed",
      "P234: Keep only in original container",
      "P235: Keep cool",
      "P240: Ground/bond container and receiving equipment",
      "P241: Use explosion-proof electrical equipment",
      "P242: Use only non-sparking tools",
      "P243: Take precautionary measures against static discharge",
      "P244: Keep reduction valves free from grease and oil",
      "P250: Do not subject to grinding/shock/friction",
      "P251: Pressurized container: Do not pierce or burn",
      "P260: Do not breathe dust/fume/gas/mist/vapours/spray",
      "P261: Avoid breathing dust/fume/gas/mist/vapours/spray",
      "P262: Do not get in eyes, on skin, or on clothing",
      "P263: Avoid contact during pregnancy/while nursing",
      "P264: Wash hands thoroughly after handling",
      "P270: Do not eat, drink or smoke when using this product",
      "P271: Use only outdoors or in a well-ventilated area",
      "P272: Contaminated work clothing should not be allowed out of the workplace",
      "P273: Avoid release to the environment",
      "P280: Wear protective gloves/protective clothing/eye protection/face protection",
      "P281: Use personal protective equipment as required",
      "P282: Wear cold insulating gloves/face shield/eye protection",
      "P283: Wear fire/flame resistant/retardant clothing",
      "P284: Wear respiratory protection",
      "P285: In case of inadequate ventilation wear respiratory protection",
    ],
  },
  {
    category: "Response (300 - 399)",
    statements: [
      "P301: IF SWALLOWED:",
      "P302: IF ON SKIN:",
      "P303: IF ON SKIN (or hair):",
      "P304: IF INHALED:",
      "P305: IF IN EYES:",
      "P306: IF ON CLOTHING:",
      "P307: IF exposed:",
      "P308: IF exposed or concerned:",
      "P309: IF exposed or if you feel unwell:",
      "P310: Immediately call a POISON CENTER/doctor",
      "P311: Call a POISON CENTER/doctor",
      "P312: Call a POISON CENTER/doctor if you feel unwell",
      "P313: Get medical advice/attention",
      "P314: Get medical advice/attention if you feel unwell",
      "P315: Get immediate medical advice/attention",
      "P320: Specific treatment is urgent",
      "P321: Specific treatment",
      "P322: Specific measures",
      "P330: Rinse mouth",
      "P331: Do NOT induce vomiting",
      "P332: If skin irritation occurs:",
      "P333: If skin irritation or rash occurs:",
      "P334: Immerse in cool water/wrap in wet bandages",
      "P335: Brush off loose particles from skin",
      "P336: Thaw frosted parts with lukewarm water",
      "P337: If eye irritation persists:",
      "P338: Remove contact lenses, if present and easy to do",
      "P340: Remove person to fresh air and keep comfortable for breathing",
      "P341: If breathing is difficult, remove person to fresh air",
      "P342: If experiencing respiratory symptoms:",
      "P350: Gently wash with plenty of soap and water",
      "P351: Rinse cautiously with water for several minutes",
      "P352: Wash with plenty of water",
      "P353: Rinse skin with water/shower",
      "P360: Rinse immediately contaminated clothing and skin",
      "P361: Take off immediately all contaminated clothing",
      "P362: Take off contaminated clothing",
      "P363: Wash contaminated clothing before reuse",
      "P370: In case of fire:",
      "P371: In case of major fire and large quantities:",
      "P372: Explosion risk in case of fire",
      "P373: DO NOT fight fire when fire reaches explosives",
      "P374: Fight fire with normal precautions from a reasonable distance",
      "P375: Fight fire remotely due to the risk of explosion",
      "P376: Stop leak if safe to do so",
      "P377: Leaking gas fire: Do not extinguish",
      "P378: Use appropriate media to extinguish",
      "P380: Evacuate area",
      "P381: Eliminate all ignition sources if safe to do so",
      "P390: Absorb spillage to prevent material damage",
      "P391: Collect spillage",
    ],
  },
  {
    category: "Storage (400 - 499)",
    statements: [
      "P401: Store in accordance with local regulations",
      "P402: Store in a dry place",
      "P403: Store in a well-ventilated place",
      "P404: Store in a closed container",
      "P405: Store locked up",
      "P406: Store in corrosive resistant container",
      "P407: Maintain air gap between stacks/pallets",
      "P410: Protect from sunlight",
      "P411: Store at temperatures not exceeding °C/°F",
      "P412: Do not expose to temperatures exceeding 50°C/122°F",
      "P413: Store bulk masses greater than kg/lbs at temperatures not exceeding °C/°F",
      "P420: Store away from other materials",
      "P422: Store contents under inert gas",
      "P402+P404: Store in a dry place. Store in a closed container",
      "P403+P233: Store in a well-ventilated place. Keep container tightly closed",
      "P403+P235: Store in a well-ventilated place. Keep cool",
      "P410+P403: Protect from sunlight. Store in a well-ventilated place",
      "P410+P412: Protect from sunlight. Do not expose to temperatures exceeding 50°C/122°F",
      "P411+P235: Store at temperatures not exceeding °C/°F. Keep cool",
    ],
  },
  {
    category: "Disposal (500 - 599)",
    statements: [
      "P501: Dispose of contents/container in accordance with local regulations",
      "P502: Refer to manufacturer/supplier for information on recovery/recycling",
      "P503: Refer to manufacturer/supplier for information on disposal/recovery/recycling",
    ],
  },
]

export default function CreateLabelPage() {
  const [showWorkflow, setShowWorkflow] = useState(false)
  const [customHStatement, setCustomHStatement] = useState("")
  const [customPStatement, setCustomPStatement] = useState("")
  const [casNumber, setCasNumber] = useState("")
  const [autoFillSuggestion, setAutoFillSuggestion] = useState<any>(null)

  const [openHSections, setOpenHSections] = useState<Record<string, boolean>>({
    "Physical Hazard (200 - 299)": true,
    "Health Hazard (300 - 399)": true,
    "Environmental Hazard (400 - 499)": true,
  })

  const [openPSections, setOpenPSections] = useState<Record<string, boolean>>({
    "General (100 - 199)": true,
    "Prevention (200 - 299)": true,
    "Response (300 - 399)": true,
    "Storage (400 - 499)": true,
    "Disposal (500 - 599)": true,
  })

  const [labelData, setLabelData] = useState({
    labelName: "",
    productName: "",
    chemicalName: "",
    casNumber: "",
    oilservCode: "",
    location: "",
    supplier: "",
    supplierAddress: "",
    emergencyContact: "",
    hazardSymbols: "",
    signalWord: "",
    hazardStatements: [] as string[],
    precautionaryStatements: [] as string[],
    additionalInfo: "",
  })

  useEffect(() => {
    if (casNumber.trim()) {
      const foundChemical = sdsLibraryData.find(
        (chemical) => chemical.casNumber.toLowerCase() === casNumber.toLowerCase().trim(),
      )
      if (foundChemical) {
        setAutoFillSuggestion(foundChemical)
      } else {
        setAutoFillSuggestion(null)
      }
    } else {
      setAutoFillSuggestion(null)
    }
  }, [casNumber])

  const handleAutoFill = () => {
    if (autoFillSuggestion) {
      setLabelData((prev) => ({
        ...prev,
        productName: autoFillSuggestion.productName,
        chemicalName: autoFillSuggestion.chemicalName,
        casNumber: autoFillSuggestion.casNumber,
        oilservCode: autoFillSuggestion.oilservCode,
        location: autoFillSuggestion.location,
        supplier: autoFillSuggestion.supplier,
        supplierAddress: autoFillSuggestion.supplierAddress,
        emergencyContact: autoFillSuggestion.emergencyContact,
      }))
      setCasNumber(autoFillSuggestion.casNumber)
      setAutoFillSuggestion(null)
    }
  }

  const addCustomHStatement = () => {
    if (customHStatement.trim() && labelData.hazardStatements.length < 5) {
      setLabelData((prev) => ({
        ...prev,
        hazardStatements: [...prev.hazardStatements, customHStatement.trim()],
      }))
      setCustomHStatement("")
    }
  }

  const addCustomPStatement = () => {
    if (customPStatement.trim() && labelData.precautionaryStatements.length < 5) {
      setLabelData((prev) => ({
        ...prev,
        precautionaryStatements: [...prev.precautionaryStatements, customPStatement.trim()],
      }))
      setCustomPStatement("")
    }
  }

  const removeHStatement = (index: number) => {
    setLabelData((prev) => ({
      ...prev,
      hazardStatements: prev.hazardStatements.filter((_, i) => i !== index),
    }))
  }

  const removePStatement = (index: number) => {
    setLabelData((prev) => ({
      ...prev,
      precautionaryStatements: prev.precautionaryStatements.filter((_, i) => i !== index),
    }))
  }

  const handleHStatementToggle = (statement: string, checked: boolean) => {
    if (checked && !labelData.hazardStatements.includes(statement) && labelData.hazardStatements.length < 5) {
      setLabelData((prev) => ({
        ...prev,
        hazardStatements: [...prev.hazardStatements, statement],
      }))
    } else if (!checked) {
      setLabelData((prev) => ({
        ...prev,
        hazardStatements: prev.hazardStatements.filter((s) => s !== statement),
      }))
    }
  }

  const handlePStatementToggle = (statement: string, checked: boolean) => {
    if (
      checked &&
      !labelData.precautionaryStatements.includes(statement) &&
      labelData.precautionaryStatements.length < 5
    ) {
      setLabelData((prev) => ({
        ...prev,
        precautionaryStatements: [...prev.precautionaryStatements, statement],
      }))
    } else if (!checked) {
      setLabelData((prev) => ({
        ...prev,
        precautionaryStatements: prev.precautionaryStatements.filter((s) => s !== statement),
      }))
    }
  }

  const toggleHSection = (category: string) => {
    setOpenHSections((prev) => ({ ...prev, [category]: !prev[category] }))
  }

  const togglePSection = (category: string) => {
    setOpenPSections((prev) => ({ ...prev, [category]: !prev[category] }))
  }

  const handleSubmitLabel = () => {
    console.log("[v0] Label submitted, navigating to workflow page")
    setShowWorkflow(true)
  }

  const handleWorkflowComplete = () => {
    setShowWorkflow(false)
    // Reset form or navigate back
    setLabelData({
      labelName: "",
      productName: "",
      chemicalName: "",
      casNumber: "",
      oilservCode: "",
      location: "",
      supplier: "",
      supplierAddress: "",
      emergencyContact: "",
      hazardSymbols: "",
      signalWord: "",
      hazardStatements: [],
      precautionaryStatements: [],
      additionalInfo: "",
    })
    setCasNumber("")
    setAutoFillSuggestion(null)
  }

  if (showWorkflow) {
    return <LabelWorkflowPage labelData={labelData} onComplete={handleWorkflowComplete} />
  }

  return (
    <div className="p-6">
      <Card className="bg-white text-gray-900">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jTlVuHHgbMeGiG1slq1ZYxx3XBDBfx.png"
              alt="OILSERV Logo"
              className="h-12"
            />
          </div>
          <CardTitle>Create Chemical Label</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="casNumber">CAS Number</Label>
              <Input
                id="casNumber"
                value={casNumber}
                onChange={(e) => setCasNumber(e.target.value)}
                placeholder="Enter CAS number (e.g., 7647-14-5)"
              />
              {autoFillSuggestion && (
                <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900">
                        Found in SDS Library: {autoFillSuggestion.productName}
                      </p>
                      <p className="text-xs text-blue-700">
                        Chemical: {autoFillSuggestion.chemicalName} | Code: {autoFillSuggestion.oilservCode}
                      </p>
                    </div>
                    <Button onClick={handleAutoFill} size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Auto Fill
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="labelName">Label Name</Label>
              <Input
                id="labelName"
                value={labelData.labelName}
                onChange={(e) => setLabelData({ ...labelData, labelName: e.target.value })}
                placeholder="Enter label name"
              />
            </div>
            <div>
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                value={labelData.productName}
                onChange={(e) => setLabelData({ ...labelData, productName: e.target.value })}
                placeholder="Enter product name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="chemicalName">Chemical Name</Label>
              <Input
                id="chemicalName"
                value={labelData.chemicalName}
                onChange={(e) => setLabelData({ ...labelData, chemicalName: e.target.value })}
                placeholder="Enter chemical name"
              />
            </div>
            <div>
              <Label htmlFor="oilservCode">Oilserv Code</Label>
              <Input
                id="oilservCode"
                value={labelData.oilservCode}
                onChange={(e) => setLabelData({ ...labelData, oilservCode: e.target.value })}
                placeholder="Enter Oilserv code"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={labelData.location}
                onChange={(e) => setLabelData({ ...labelData, location: e.target.value })}
                placeholder="Enter storage location"
              />
            </div>
            <div>
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                value={labelData.supplier}
                onChange={(e) => setLabelData({ ...labelData, supplier: e.target.value })}
                placeholder="Enter supplier name"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="supplierAddress">Supplier Address</Label>
            <Textarea
              id="supplierAddress"
              value={labelData.supplierAddress}
              onChange={(e) => setLabelData({ ...labelData, supplierAddress: e.target.value })}
              placeholder="Enter supplier address"
              rows={2}
            />
          </div>

          <div>
            <Label htmlFor="emergencyContact">Emergency Contact</Label>
            <Input
              id="emergencyContact"
              value={labelData.emergencyContact}
              onChange={(e) => setLabelData({ ...labelData, emergencyContact: e.target.value })}
              placeholder="Enter emergency contact number"
            />
          </div>

          <div>
            <Label htmlFor="hazardSymbols">Hazard Symbols</Label>
            <Select onValueChange={(value) => setLabelData({ ...labelData, hazardSymbols: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select hazard symbols" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="explosive">Explosive</SelectItem>
                <SelectItem value="flammable">Flammable</SelectItem>
                <SelectItem value="oxidizing">Oxidizing</SelectItem>
                <SelectItem value="compressed-gas">Compressed Gas</SelectItem>
                <SelectItem value="corrosive">Corrosive</SelectItem>
                <SelectItem value="toxic">Toxic</SelectItem>
                <SelectItem value="harmful">Harmful</SelectItem>
                <SelectItem value="health-hazard">Health Hazard</SelectItem>
                <SelectItem value="environmental-hazard">Environmental Hazard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="signalWord">Signal Word</Label>
            <Select onValueChange={(value) => setLabelData({ ...labelData, signalWord: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select signal word" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="danger">DANGER</SelectItem>
                <SelectItem value="warning">WARNING</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Hazard Statements (H-Statements) - Max 5</h3>
              <p className="text-sm text-gray-600">Click on each category below to expand and select statements:</p>

              <div className="space-y-3">
                {hStatementCategories.map((category) => (
                  <Collapsible
                    key={category.category}
                    open={openHSections[category.category]}
                    onOpenChange={() => toggleHSection(category.category)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-blue-50 hover:bg-blue-100 rounded-md text-left border border-blue-200">
                      <span className="font-medium text-blue-800">{category.category}</span>
                      {openHSections[category.category] ? (
                        <ChevronDown className="h-4 w-4 text-blue-600" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-blue-600" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 space-y-2 max-h-60 overflow-y-auto border rounded-md p-3 bg-white">
                      {category.statements.map((statement) => (
                        <div key={statement} className="flex items-start space-x-2">
                          <Checkbox
                            id={`h-${statement}`}
                            checked={labelData.hazardStatements.includes(statement)}
                            onCheckedChange={(checked) => handleHStatementToggle(statement, checked as boolean)}
                            disabled={
                              !labelData.hazardStatements.includes(statement) && labelData.hazardStatements.length >= 5
                            }
                          />
                          <label htmlFor={`h-${statement}`} className="text-sm leading-relaxed cursor-pointer">
                            {statement}
                          </label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>

              <div>
                <Label>Add Custom H-Statement</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={customHStatement}
                    onChange={(e) => setCustomHStatement(e.target.value)}
                    placeholder="Enter custom hazard statement..."
                    disabled={labelData.hazardStatements.length >= 5}
                  />
                  <Button onClick={addCustomHStatement} size="sm" disabled={labelData.hazardStatements.length >= 5}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {labelData.hazardStatements.length > 0 && (
                <div>
                  <Label>Selected H-Statements ({labelData.hazardStatements.length}/5)</Label>
                  <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                    {labelData.hazardStatements.map((statement, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{statement}</span>
                        <Button variant="ghost" size="sm" onClick={() => removeHStatement(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Precautionary Statements (P-Statements) - Max 5</h3>
              <p className="text-sm text-gray-600">Click on each category below to expand and select statements:</p>

              <div className="space-y-3">
                {pStatementCategories.map((category) => (
                  <Collapsible
                    key={category.category}
                    open={openPSections[category.category]}
                    onOpenChange={() => togglePSection(category.category)}
                  >
                    <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-green-50 hover:bg-green-100 rounded-md text-left border border-green-200">
                      <span className="font-medium text-green-800">{category.category}</span>
                      {openPSections[category.category] ? (
                        <ChevronDown className="h-4 w-4 text-green-600" />
                      ) : (
                        <ChevronRight className="h-4 w-4 text-green-600" />
                      )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2 space-y-2 max-h-60 overflow-y-auto border rounded-md p-3 bg-white">
                      {category.statements.map((statement) => (
                        <div key={statement} className="flex items-start space-x-2">
                          <Checkbox
                            id={`p-${statement}`}
                            checked={labelData.precautionaryStatements.includes(statement)}
                            onCheckedChange={(checked) => handlePStatementToggle(statement, checked as boolean)}
                            disabled={
                              !labelData.precautionaryStatements.includes(statement) &&
                              labelData.precautionaryStatements.length >= 5
                            }
                          />
                          <label htmlFor={`p-${statement}`} className="text-sm leading-relaxed cursor-pointer">
                            {statement}
                          </label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ))}
              </div>

              <div>
                <Label>Add Custom P-Statement</Label>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={customPStatement}
                    onChange={(e) => setCustomPStatement(e.target.value)}
                    placeholder="Enter custom precautionary statement..."
                    disabled={labelData.precautionaryStatements.length >= 5}
                  />
                  <Button
                    onClick={addCustomPStatement}
                    size="sm"
                    disabled={labelData.precautionaryStatements.length >= 5}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {labelData.precautionaryStatements.length > 0 && (
                <div>
                  <Label>Selected P-Statements ({labelData.precautionaryStatements.length}/5)</Label>
                  <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                    {labelData.precautionaryStatements.map((statement, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                        <span className="text-sm">{statement}</span>
                        <Button variant="ghost" size="sm" onClick={() => removePStatement(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              value={labelData.additionalInfo}
              onChange={(e) => setLabelData({ ...labelData, additionalInfo: e.target.value })}
              placeholder="Enter any additional information"
              rows={2}
            />
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Label Preview (30cm width)</h3>
            <div className="border-2 border-gray-300 bg-white p-4 rounded-lg">
              {/* Header Section */}
              <div className="flex items-center justify-between mb-4">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jTlVuHHgbMeGiG1slq1ZYxx3XBDBfx.png"
                  alt="OILSERV Logo"
                  className="h-8"
                />
                <div className="text-center flex-1 mx-4">
                  <h2 className="text-xl font-bold uppercase">{labelData.productName || "PRODUCT NAME"}</h2>
                  <p className="text-sm">({labelData.chemicalName || "Chemical Name"})</p>
                </div>
                <div className="text-right text-xs space-y-1">
                  <div>
                    Batch Number: <span className="font-medium">LN2-2024-001</span>
                  </div>
                  <div>
                    Manufacture date: <span className="font-medium">2024-09-18</span>
                  </div>
                  <div>
                    CAS Number: <span className="font-medium">{labelData.casNumber || "0000-00-0"}</span>
                  </div>
                  <div>
                    Expiry date: <span className="font-medium">2025-10-23</span>
                  </div>
                  <div>
                    OS Number: <span className="font-medium">{labelData.oilservCode || "N002"}</span>
                  </div>
                  <div>
                    Quantity: <span className="font-medium">30 M3</span>
                  </div>
                </div>
              </div>

              {/* Signal Word */}
              <div className="text-center mb-4">
                <div className="inline-block bg-orange-500 text-white px-4 py-1 font-bold text-sm rounded">
                  {labelData.signalWord?.toUpperCase() || "WARNING"}
                </div>
              </div>

              {/* Main Content Layout - 30cm width with proportions */}
              <div className="flex border-t-2 border-gray-400 pt-4">
                {/* Left Section - Hazard Pictograms (7.5cm = 25% width) */}
                <div className="w-1/4 pr-4 border-r border-gray-300">
                  <div className="grid grid-cols-2 gap-2">
                    {/* Placeholder hazard pictograms */}
                    <div className="w-12 h-12 border-2 border-red-600 flex items-center justify-center bg-white transform rotate-45">
                      <div className="transform -rotate-45">
                        <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">!</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-12 h-12 border-2 border-red-600 flex items-center justify-center bg-white transform rotate-45">
                      <div className="transform -rotate-45">
                        <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">🔥</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-12 h-12 border-2 border-red-600 flex items-center justify-center bg-white transform rotate-45">
                      <div className="transform -rotate-45">
                        <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">☠</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-12 h-12 border-2 border-red-600 flex items-center justify-center bg-white transform rotate-45">
                      <div className="transform -rotate-45">
                        <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">⚠</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2 text-xs font-bold">7.5 cm</div>
                </div>

                {/* Middle Section - H&P Statements (15cm = 50% width) */}
                <div className="w-1/2 px-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-sm mb-2">HAZARD STATEMENTS:</h4>
                      <ul className="text-xs space-y-1">
                        {labelData.hazardStatements.length > 0 ? (
                          labelData.hazardStatements.map((statement, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-1">•</span>
                              <span>{statement}</span>
                            </li>
                          ))
                        ) : (
                          <>
                            <li>• H412: Harmful to aquatic life with long lasting effects</li>
                            <li>• H411: Toxic to aquatic life with long lasting effects</li>
                            <li>• H304: May be fatal if swallowed and enters airways</li>
                            <li>• H315: Causes skin irritation</li>
                            <li>• H319: Causes serious eye irritation</li>
                          </>
                        )}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-sm mb-2">PRECAUTIONARY STATEMENTS:</h4>
                      <ul className="text-xs space-y-1">
                        {labelData.precautionaryStatements.length > 0 ? (
                          labelData.precautionaryStatements.map((statement, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-1">•</span>
                              <span>{statement}</span>
                            </li>
                          ))
                        ) : (
                          <>
                            <li>• P301+P310: IF SWALLOWED: Immediately call a POISON CENTER/doctor</li>
                            <li>• P305+P351+P338: IF IN EYES: Rinse cautiously with water for several minutes</li>
                            <li>• P370+P378: In case of fire: Use appropriate media to extinguish</li>
                            <li>
                              • P210: Keep away from heat, hot surfaces, sparks, open flames and other ignition sources
                            </li>
                            <li>• P273: Avoid release to the environment</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="text-center mt-2 text-xs font-bold border-t pt-2">15 cm</div>
                </div>

                {/* Right Section - NFPA Diamond (7.5cm = 25% width) */}
                <div className="w-1/4 pl-4 border-l border-gray-300">
                  <div className="flex justify-center">
                    <div className="relative w-16 h-16">
                      {/* NFPA Diamond */}
                      <div className="absolute inset-0 transform rotate-45 border-2 border-black bg-white">
                        {/* Health (Blue) - Top */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-600 flex items-center justify-center -rotate-45">
                          <span className="text-white font-bold text-xs">3</span>
                        </div>
                        {/* Flammability (Red) - Right */}
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-red-600 flex items-center justify-center -rotate-45">
                          <span className="text-white font-bold text-xs">2</span>
                        </div>
                        {/* Reactivity (Yellow) - Bottom */}
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-400 flex items-center justify-center -rotate-45">
                          <span className="text-black font-bold text-xs">1</span>
                        </div>
                        {/* Special (White) - Left */}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border border-black flex items-center justify-center -rotate-45">
                          <span className="text-black font-bold text-xs">SA</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center mt-2 text-xs font-bold">7.5 cm</div>
                </div>
              </div>

              {/* Footer Section */}
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-300">
                <div>
                  <h4 className="font-bold text-xs mb-1">PERSONAL PROTECTIVE EQUIPMENT:</h4>
                  <div className="flex space-x-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">👓</span>
                    </div>
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">🧤</span>
                    </div>
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">👕</span>
                    </div>
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">👤</span>
                    </div>
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">ℹ</span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <div className="font-bold">OILSERV ENERGY LTD</div>
                  <div>{labelData.supplierAddress || "cal gaz. hassi meseaoud ."}</div>
                  <div>Emergency: {labelData.emergencyContact || "+234-1-234-5678"}</div>
                  <div>Date: 16/08/2025</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button onClick={handleSubmitLabel} className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Submit Label
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
