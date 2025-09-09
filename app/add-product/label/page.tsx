"use client"

import { useState } from "react"
import { ArrowLeft, Package, Eye, Save, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import GHSLabelPreview from "@/components/ghs-label-preview"

export interface LabelFormData {
  productName: string
  chemicalName: string
  identifierNumber: string
  contributingSubstances: string
  nominalQuantity: string
  batchNumber: string
  osCode: string
  manufacturingDate: string
  expiryDate: string
  supplier: string
  supplierAddress: string
  emergencyPhone: string
  hazards: string[]
  signalWord: "DANGER" | "WARNING"
  hazardStatements: string[]
  precautionaryStatements: string[]
  selectedPpe: string[]
  additionalInfo: string
  nfpaHealth: number
  nfpaFire: number
  nfpaReactivity: number
  nfpaSpecific: string[]
  includeNfpa: boolean
}

const ghsHazards = [
  {
    code: "GHS03",
    name: "Oxidizing",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QHNs9gDp72NgGcldS7ZXZ5XTMNLdZH.png",
    description: "Oxidizing gases, liquids, and solids",
  },
  {
    code: "GHS02",
    name: "Flammable",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BqSUSEfIEAOblBI9GYbmg93UXEkkyi.png",
    description: "Flammable gases, liquids, and solids",
  },
  {
    code: "GHS06",
    name: "Toxic",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kj0AM6GcGjya3NDjdBr7Hw4An8dLa1.png",
    description: "Acute toxicity",
  },
  {
    code: "GHS04",
    name: "Compressed Gas",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zN4DbQltdfLgI5IVnhFY96elUxfuiV.png",
    description: "Gases under pressure",
  },
  {
    code: "GHS07",
    name: "Harmful",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fMQrYZagKChCQJEIQVGdqO5dFhRlh0.png",
    description: "Less severe health hazards",
  },
  {
    code: "GHS09",
    name: "Environmental",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UXJan1K0ptjvUxCOsfTBx3Zc1Sr2ir.png",
    description: "Environmental hazards",
  },
  {
    code: "GHS08",
    name: "Health Hazard",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XriQ8bZ0YRNc0JJta5ylJdwSwXFt5z.png",
    description: "Serious health hazards",
  },
  {
    code: "GHS01",
    name: "Explosive",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vYtSuuKga3kCMjuIbxfGphJjAFik1l.png",
    description: "Explosive substances and mixtures",
  },
  {
    code: "GHS05",
    name: "Corrosive",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yfvZVqCBTxzo6MfyVY4CQwY1nSuLDD.png",
    description: "Corrosive to metals and skin",
  },
]

const commonPPE = [
  {
    code: "EYE_PROTECTION",
    name: "Eye Protection (Safety Glasses/Goggles)",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-01%20172652.jpg-oHo5FGRV99sOFQx4WyBHrk3QAHzUNt.jpeg",
  },
  {
    code: "SAFETY_FOOTWEAR",
    name: "Safety Footwear (Safety Boots)",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VzudMmaV3TfceTRiDg1pnbM3IJwDG7.png",
  },
  {
    code: "HAND_PROTECTION",
    name: "Hand Protection (Safety Gloves)",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-01%20172803.jpg-xCnhWkokhdAjPzIkzzdotBVaPWQBUa.jpeg",
  },
  {
    code: "NO_SMOKING",
    name: "No Smoking",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dyPjPfx7JGc5SOUAuPyw61CVFcMS11.png",
  },
  {
    code: "FACE_SHIELD",
    name: "Face Shield Protection",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-01%20172917.jpg-umRcsL0F6fAC3iuDaBSFFNkICrtEwr.jpeg",
  },
  {
    code: "RESPIRATOR",
    name: "Respiratory Protection (Gas Mask/Respirator)",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-01%20173614.jpg-wp9IxmuD8awovI1q2LewuISkpBnc4Y.jpeg",
  },
  {
    code: "PROTECTIVE_CLOTHING",
    name: "Protective Clothing (Coveralls/Full Body Suit)",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-01%20173812.jpg-umJXTBAtjQ5pO8zMmcAtXDYBxmR4fC.jpeg",
  },
  {
    code: "SCBA",
    name: "Self-Contained Breathing Apparatus (SCBA)",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-01%20173213.jpg-joLxKUPpvlrcTQArnSBUycUaydpmif.jpeg",
  },
  {
    code: "DUST_MASK",
    name: "Dust Mask/Face Mask",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-01%20172938.jpg-IMTlm1EZ58Kpp5LTke1Kw9AtomANby.jpeg",
  },
  {
    code: "PROTECTIVE_APRON",
    name: "Protective Apron",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-01%20173740.jpg-FvnhLjnE4B3AMVYGLqAJig1UJI2ja6.jpeg",
  },
]

const categorizedHStatements = [
  {
    category: "Physical Hazards",
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
    category: "Health Hazards",
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
    category: "Environmental Hazards",
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

const categorizedPStatements = [
  {
    category: "General",
    statements: [
      "P101: If medical advice is needed, have product container or label at hand",
      "P102: Keep out of reach of children",
      "P103: Read label before use",
    ],
  },
  {
    category: "Prevention",
    statements: [
      "P201: Obtain special instructions before use",
      "P202: Do not handle until all safety precautions have been read and understood",
      "P210: Keep away from heat, hot surfaces, sparks, open flames and other ignition sources. No smoking",
      "P211: Do not spray on an open flame or other ignition source",
      "P220: Keep away from clothing and other combustible materials",
      "P221: Take any precaution to avoid mixing with combustibles",
      "P222: Do not allow contact with air",
      "P223: Keep away from any possible contact with water, because of violent reaction and possible flash fire",
      "P230: Keep wetted with water",
      "P231: Handle under inert gas",
      "P232: Protect from moisture",
      "P233: Keep container tightly closed",
      "P234: Keep only in original container",
      "P235: Keep cool",
      "P240: Ground/bond container and receiving equipment",
      "P241: Use explosion-proof electrical/ventilating/lighting equipment",
      "P242: Use only non-sparking tools",
      "P243: Take precautionary measures against static discharge",
      "P244: Keep reduction valves free from grease and oil",
      "P250: Do not subject to grinding/shock/friction",
      "P251: Pressurized container: Do not pierce or burn, even after use",
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
    category: "Response",
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
      "P310: Immediately call a POISON CENTER or doctor/physician",
      "P311: Call a POISON CENTER or doctor/physician",
      "P312: Call a POISON CENTER or doctor/physician if you feel unwell",
      "P313: Get medical advice/attention",
      "P314: Get medical advice/attention if you feel unwell",
      "P315: Get immediate medical advice/attention",
      "P320: Specific treatment is urgent (see supplemental first aid instructions on this label)",
      "P321: Specific treatment (see supplemental first aid instructions on this label)",
      "P330: Rinse mouth",
      "P331: Do NOT induce vomiting",
      "P332: If skin irritation occurs:",
      "P333: If skin irritation or rash occurs:",
      "P334: Immerse in cool water/wrap in wet bandages",
      "P335: Brush off loose particles from skin",
      "P336: Thaw frosted parts with lukewarm water. Do not rub affected area",
      "P337: If eye irritation persists:",
      "P338: Remove contact lenses, if present and easy to do. Continue rinsing",
      "P340: Remove victim to fresh air and keep at rest in a position comfortable for breathing",
      "P341: If breathing is difficult, remove victim to fresh air and keep at rest in a position comfortable for breathing",
      "P342: If experiencing respiratory symptoms:",
      "P350: Gently wash with plenty of soap and water",
      "P351: Rinse cautiously with water for several minutes",
      "P352: Wash with plenty of soap and water",
      "P353: Rinse skin with water/shower",
      "P360: Rinse immediately contaminated clothing and skin with plenty of water before removing clothes",
      "P361: Remove/Take off immediately all contaminated clothing",
      "P362: Take off contaminated clothing and wash before reuse",
      "P363: Wash contaminated clothing before reuse",
      "P370: In case of fire:",
      "P371: In case of major fire and large quantities:",
      "P372: Explosion risk in case of fire",
      "P373: DO NOT fight fire when fire reaches explosives",
      "P374: Fight fire with normal precautions from a reasonable distance",
      "P375: Fight fire remotely due to the risk of explosion",
      "P376: Stop leak if safe to do so",
      "P377: Leaking gas fire: Do not extinguish, unless leak can be stopped safely",
      "P378: Use dry sand, dry chemical or alcohol-resistant foam for extinction",
      "P380: Evacuate area",
      "P381: Eliminate all ignition sources if safe to do so",
      "P390: Absorb spillage to prevent material damage",
      "P391: Collect spillage",
    ],
  },
  {
    category: "Storage",
    statements: [
      "P401: Store in accordance with local/regional/national/international regulations",
      "P402: Store in a dry place",
      "P403: Store in a well-ventilated place",
      "P404: Store in a closed container",
      "P405: Store locked up",
      "P406: Store in corrosive resistant container with a resistant inner liner",
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
    category: "Disposal",
    statements: [
      "P501: Dispose of contents/container to an approved waste disposal plant",
      "P502: Refer to manufacturer/supplier for information on recovery/recycling",
      "P503: Refer to manufacturer/supplier for information on disposal/recovery/recycling",
    ],
  },
]

const nfpaSpecificHazards = [
  { code: "OX", name: "Oxidizer" },
  { code: "W", name: "Water Reactive" },
  { code: "SA", name: "Simple Asphyxiant" },
  { code: "COR", name: "Corrosive" },
  { code: "ACID", name: "Acid" },
  { code: "ALK", name: "Alkali" },
  { code: "BIO", name: "Biological Hazard" },
  { code: "POI", name: "Poison" },
  { code: "RAD", name: "Radioactive" },
]

export default function AddProductLabelPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [formData, setFormData] = useState<LabelFormData>(() => {
    const productName = searchParams.get("productName") || ""
    const chemicalName = searchParams.get("chemicalName") || ""
    const identifierNumber = searchParams.get("identifierNumber") || ""
    const contributingSubstances = searchParams.get("contributingSubstances") || ""
    const batchNumber = searchParams.get("batchNumber") || ""
    const osCode = searchParams.get("osCode") || ""
    const manufacturingDate = searchParams.get("manufacturingDate") || ""
    const expiryDate = searchParams.get("expiryDate") || ""

    return {
      productName: productName,
      chemicalName: chemicalName,
      identifierNumber: identifierNumber,
      contributingSubstances: contributingSubstances,
      nominalQuantity: "",
      batchNumber: batchNumber,
      osCode: osCode,
      manufacturingDate: manufacturingDate,
      expiryDate: expiryDate,
      supplier: "OILSERV Energy Ltd",
      supplierAddress: "",
      emergencyPhone: "+234-1-234-5678",
      hazards: [],
      signalWord: "WARNING",
      hazardStatements: [],
      precautionaryStatements: [],
      selectedPpe: [],
      additionalInfo: "",
      nfpaHealth: 0,
      nfpaFire: 0,
      nfpaReactivity: 0,
      nfpaSpecific: [],
      includeNfpa: false,
    }
  })

  const [customHStatement, setCustomHStatement] = useState("")
  const [customPStatement, setCustomPStatement] = useState("")
  const [activeFormTab, setActiveFormTab] = useState<string>("basic-info")

  const handleInputChange = (field: keyof LabelFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleHazardToggle = (hazardCode: string) => {
    setFormData((prev) => ({
      ...prev,
      hazards: prev.hazards.includes(hazardCode)
        ? prev.hazards.filter((h) => h !== hazardCode)
        : [...prev.hazards, hazardCode],
    }))
  }

  const handlePpeToggle = (ppeCode: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedPpe: prev.selectedPpe.includes(ppeCode)
        ? prev.selectedPpe.filter((p) => p !== ppeCode)
        : [...prev.selectedPpe, ppeCode],
    }))
  }

  const handleNfpaSpecificToggle = (specificCode: string) => {
    setFormData((prev) => ({
      ...prev,
      nfpaSpecific: prev.nfpaSpecific.includes(specificCode)
        ? prev.nfpaSpecific.filter((s) => s !== specificCode)
        : [...prev.nfpaSpecific, specificCode],
    }))
  }

  const addCustomHStatement = () => {
    if (customHStatement.trim()) {
      setFormData((prev) => ({
        ...prev,
        hazardStatements: [...prev.hazardStatements, customHStatement.trim()],
      }))
      setCustomHStatement("")
    }
  }

  const addCustomPStatement = () => {
    if (customPStatement.trim()) {
      setFormData((prev) => ({
        ...prev,
        precautionaryStatements: [...prev.precautionaryStatements, customPStatement.trim()],
      }))
      setCustomPStatement("")
    }
  }

  const removeHStatement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      hazardStatements: prev.hazardStatements.filter((_, i) => i !== index),
    }))
  }

  const removePStatement = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      precautionaryStatements: prev.precautionaryStatements.filter((_, i) => i !== index),
    }))
  }

  const handleSave = () => {
    if (!formData.productName || !formData.chemicalName || !formData.identifierNumber || !formData.nominalQuantity) {
      toast({
        title: "Validation Error",
        description:
          "Basic Information section: Product name, chemical name, identifier number, and nominal quantity are required.",
        variant: "destructive",
      })
      setActiveFormTab("basic-info")
      return
    }

    if (formData.hazards.length === 0) {
      toast({
        title: "Validation Error",
        description: "GHS Hazards section: At least one hazard pictogram must be selected.",
        variant: "destructive",
      })
      setActiveFormTab("ghs-hazards")
      return
    }

    if (formData.hazardStatements.length === 0 || formData.precautionaryStatements.length === 0) {
      toast({
        title: "Validation Error",
        description:
          "H & P Statements section: At least one hazard statement and one precautionary statement are required.",
        variant: "destructive",
      })
      setActiveFormTab("statements")
      return
    }

    if (formData.selectedPpe.length === 0) {
      toast({
        title: "Validation Error",
        description: "PPE section: At least one PPE item must be selected.",
        variant: "destructive",
      })
      setActiveFormTab("ppe")
      return
    }

    const params = new URLSearchParams()
    for (const key in formData) {
      const value = formData[key as keyof LabelFormData]
      if (Array.isArray(value)) {
        params.append(key, encodeURIComponent(JSON.stringify(value)))
      } else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        params.append(key, encodeURIComponent(value.toString()))
      }
    }
    router.push(`/add-product/label/workflow?${params.toString()}`)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleViewPdf = () => {
    const params = new URLSearchParams()
    for (const key in formData) {
      const value = formData[key as keyof LabelFormData]
      if (Array.isArray(value)) {
        params.append(key, encodeURIComponent(JSON.stringify(value)))
      } else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        params.append(key, encodeURIComponent(value.toString()))
      }
    }
    router.push(`/labels/create/preview?${params.toString()}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
              <Package className="h-6 w-6 text-slate-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create Product Label</h1>
                <p className="text-sm text-gray-600">Generate GHS compliant chemical label</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-slate-600 hover:bg-slate-700">
              <Save className="h-4 w-4 mr-2 text-blue-500" />
              Submit Labels
            </Button>
          </div>
        </div>

        <div className="p-6 max-w-7xl mx-auto">
          {/* Form Section */}
          <div className="space-y-6 mb-8">
            <Card className="bg-white text-gray-900 border-gray-200">
              <CardHeader className="pb-0">
                <nav className="flex overflow-x-auto whitespace-nowrap border-b border-gray-200 -mx-6 px-6">
                  <Button
                    variant="ghost"
                    onClick={() => setActiveFormTab("basic-info")}
                    className={`
                    px-4 py-3 rounded-none border-b-2
                    ${activeFormTab === "basic-info" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"}
                    transition-colors duration-200
                  `}
                  >
                    Basic Information *
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveFormTab("ghs-hazards")}
                    className={`
                    px-4 py-3 rounded-none border-b-2
                    ${activeFormTab === "ghs-hazards" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"}
                    transition-colors duration-200
                  `}
                  >
                    GHS Hazards *
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveFormTab("statements")}
                    className={`
                    px-4 py-3 rounded-none border-b-2
                    ${activeFormTab === "statements" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"}
                    transition-colors duration-200
                  `}
                  >
                    H & P Statements *
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveFormTab("ppe")}
                    className={`
                    px-4 py-3 rounded-none border-b-2
                    ${activeFormTab === "ppe" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"}
                    transition-colors duration-200
                  `}
                  >
                    PPE *
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveFormTab("nfpa")}
                    className={`
                    px-4 py-3 rounded-none border-b-2
                    ${activeFormTab === "nfpa" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"}
                    transition-colors duration-200
                  `}
                  >
                    NFPA
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setActiveFormTab("supplemental-info")}
                    className={`
                    px-4 py-3 rounded-none border-b-2
                    ${activeFormTab === "supplemental-info" ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300"}
                    transition-colors duration-200
                  `}
                  >
                    Supplemental Info
                  </Button>
                </nav>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Basic Information */}
                {activeFormTab === "basic-info" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="productName">Product Name *</Label>
                      <Input
                        id="productName"
                        value={formData.productName}
                        onChange={(e) => handleInputChange("productName", e.target.value)}
                        placeholder="e.g., Crude Oil"
                      />
                    </div>
                    <div>
                      <Label htmlFor="chemicalName">Chemical Name *</Label>
                      <Input
                        id="chemicalName"
                        value={formData.chemicalName}
                        onChange={(e) => handleInputChange("chemicalName", e.target.value)}
                        placeholder="e.g., Petroleum, crude oil"
                      />
                    </div>
                    <div>
                      <Label htmlFor="identifierNumber">CAS Number *</Label>
                      <Input
                        id="identifierNumber"
                        value={formData.identifierNumber}
                        onChange={(e) => handleInputChange("identifierNumber", e.target.value)}
                        placeholder="e.g., CAS No. 8002-05-9"
                      />
                    </div>
                    <div>
                      <Label htmlFor="osCode">OS Code</Label>
                      <Input
                        id="osCode"
                        value={formData.osCode}
                        onChange={(e) => handleInputChange("osCode", e.target.value)}
                        placeholder="e.g., C402"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nominalQuantity">Quantity *</Label>
                      <Input
                        id="nominalQuantity"
                        value={formData.nominalQuantity}
                        onChange={(e) => handleInputChange("nominalQuantity", e.target.value)}
                        placeholder="e.g., 10 Liters, 500 kg"
                      />
                    </div>
                    <div>
                      <Label htmlFor="batchNumber">Batch Number</Label>
                      <Input
                        id="batchNumber"
                        value={formData.batchNumber}
                        onChange={(e) => handleInputChange("batchNumber", e.target.value)}
                        placeholder="e.g., BATCH-2024-001"
                      />
                    </div>
                    <div>
                      <Label htmlFor="manufacturingDate">Manufacturing Date</Label>
                      <Input
                        id="manufacturingDate"
                        type="date"
                        value={formData.manufacturingDate}
                        onChange={(e) => handleInputChange("manufacturingDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="supplier">Supplier</Label>
                      <Input
                        id="supplier"
                        value={formData.supplier}
                        onChange={(e) => handleInputChange("supplier", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Phone</Label>
                      <Input
                        id="emergencyPhone"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="contributingSubstances">Identity of Contributing Substances (if mixture)</Label>
                      <Textarea
                        id="contributingSubstances"
                        value={formData.contributingSubstances}
                        onChange={(e) => handleInputChange("contributingSubstances", e.target.value)}
                        placeholder="e.g., Benzene (CAS 71-43-2), Toluene (CAS 108-88-3)"
                        rows={2}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="supplierAddress">Supplier Address</Label>
                      <Textarea
                        id="supplierAddress"
                        value={formData.supplierAddress}
                        onChange={(e) => handleInputChange("supplierAddress", e.target.value)}
                        placeholder="Complete supplier address"
                        rows={2}
                      />
                    </div>
                  </div>
                )}

                {/* GHS Hazard Classification */}
                {activeFormTab === "ghs-hazards" && (
                  <div className="space-y-6">
                    <div>
                      <Label>Signal Word</Label>
                      <RadioGroup
                        value={formData.signalWord}
                        onValueChange={(value) => handleInputChange("signalWord", value as "DANGER" | "WARNING")}
                        className="flex gap-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="DANGER" id="danger" />
                          <Label htmlFor="danger" className="text-red-600 font-bold">
                            DANGER
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="WARNING" id="warning" />
                          <Label htmlFor="warning" className="text-orange-600 font-bold">
                            WARNING
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Hazard Pictograms (Select up to 4 - will be arranged in diamond formation)</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                        {ghsHazards.map((hazard) => (
                          <div
                            key={hazard.code}
                            className={`flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 ${
                              formData.hazards.includes(hazard.code) ? "border-blue-500 bg-blue-50" : ""
                            } ${
                              formData.hazards.length >= 4 && !formData.hazards.includes(hazard.code)
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <Checkbox
                              id={hazard.code}
                              checked={formData.hazards.includes(hazard.code)}
                              onCheckedChange={() => handleHazardToggle(hazard.code)}
                              disabled={formData.hazards.length >= 4 && !formData.hazards.includes(hazard.code)}
                            />
                            <div className="flex items-center gap-2">
                              <Image
                                src={hazard.image || "/placeholder.svg"}
                                alt={hazard.name}
                                width={32}
                                height={32}
                                className="flex-shrink-0"
                              />
                              <div>
                                <Label htmlFor={hazard.code} className="text-sm font-medium cursor-pointer">
                                  {hazard.name}
                                </Label>
                                <p className="text-xs text-gray-500">{hazard.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      {formData.hazards.length > 0 && (
                        <p className="text-sm text-gray-600 mt-2">Selected: {formData.hazards.length}/4 pictograms</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Copy all other form sections from the original create page */}

                {/* NFPA Section */}
                {activeFormTab === "nfpa" && (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="includeNfpa"
                        checked={formData.includeNfpa}
                        onCheckedChange={(checked) => handleInputChange("includeNfpa", checked)}
                      />
                      <Label htmlFor="includeNfpa" className="text-lg font-semibold">
                        Include NFPA Diamond in Label
                      </Label>
                    </div>

                    {formData.includeNfpa && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label>Health Hazard (Blue)</Label>
                            <Select
                              value={formData.nfpaHealth.toString()}
                              onValueChange={(value) => handleInputChange("nfpaHealth", Number.parseInt(value))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select rating" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">0 - Normal Material</SelectItem>
                                <SelectItem value="1">1 - Slightly Hazardous</SelectItem>
                                <SelectItem value="2">2 - Hazardous</SelectItem>
                                <SelectItem value="3">3 - Extremely Hazardous</SelectItem>
                                <SelectItem value="4">4 - Deadly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Fire Hazard (Red)</Label>
                            <Select
                              value={formData.nfpaFire.toString()}
                              onValueChange={(value) => handleInputChange("nfpaFire", Number.parseInt(value))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select rating" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">0 - Will not burn</SelectItem>
                                <SelectItem value="1">1 - Above 200°F</SelectItem>
                                <SelectItem value="2">2 - Below 200°F</SelectItem>
                                <SelectItem value="3">3 - Below 100°F</SelectItem>
                                <SelectItem value="4">4 - Below 73°F</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Reactivity (Yellow)</Label>
                            <Select
                              value={formData.nfpaReactivity.toString()}
                              onValueChange={(value) => handleInputChange("nfpaReactivity", Number.parseInt(value))}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select rating" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="0">0 - Stable</SelectItem>
                                <SelectItem value="1">1 - Not Stable if Heated</SelectItem>
                                <SelectItem value="2">2 - Violent Chemical Change</SelectItem>
                                <SelectItem value="3">3 - May Detonate with Heat/Shock</SelectItem>
                                <SelectItem value="4">4 - May Detonate</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <Label>Specific Hazards (White)</Label>
                          <div className="grid grid-cols-2 gap-3 mt-2">
                            {nfpaSpecificHazards.map((specific) => (
                              <div key={specific.code} className="flex items-center space-x-2">
                                <Checkbox
                                  id={specific.code}
                                  checked={formData.nfpaSpecific.includes(specific.code)}
                                  onCheckedChange={() => handleNfpaSpecificToggle(specific.code)}
                                />
                                <Label htmlFor={specific.code} className="text-sm">
                                  {specific.code} - {specific.name}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Statements Section - Simplified for space */}
                {activeFormTab === "statements" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Hazard Statements (H-Statements) - Max 10</h3>
                      <div>
                        <Label>Add Custom H-Statement</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            value={customHStatement}
                            onChange={(e) => setCustomHStatement(e.target.value)}
                            placeholder="Enter hazard statement..."
                            disabled={formData.hazardStatements.length >= 10}
                          />
                          <Button
                            onClick={addCustomHStatement}
                            size="sm"
                            disabled={formData.hazardStatements.length >= 10}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {formData.hazardStatements.length > 0 && (
                        <div>
                          <Label>Selected H-Statements ({formData.hazardStatements.length}/10)</Label>
                          <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                            {formData.hazardStatements.map((statement, index) => (
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
                      <h3 className="text-lg font-semibold">Precautionary Statements (P-Statements) - Max 10</h3>
                      <div>
                        <Label>Add Custom P-Statement</Label>
                        <div className="flex gap-2 mt-2">
                          <Input
                            value={customPStatement}
                            onChange={(e) => setCustomPStatement(e.target.value)}
                            placeholder="Enter precautionary statement..."
                            disabled={formData.precautionaryStatements.length >= 10}
                          />
                          <Button
                            onClick={addCustomPStatement}
                            size="sm"
                            disabled={formData.precautionaryStatements.length >= 10}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {formData.precautionaryStatements.length > 0 && (
                        <div>
                          <Label>Selected P-Statements ({formData.precautionaryStatements.length}/10)</Label>
                          <div className="space-y-2 mt-2 max-h-40 overflow-y-auto">
                            {formData.precautionaryStatements.map((statement, index) => (
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
                )}

                {/* PPE Section */}
                {activeFormTab === "ppe" && (
                  <div className="space-y-4">
                    <div>
                      <Label>Select Applicable PPE (Max 5 - will be displayed in fixed slots)</Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                        {commonPPE.map((ppe) => (
                          <div
                            key={ppe.code}
                            className={`flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 ${
                              formData.selectedPpe.includes(ppe.code) ? "border-blue-500 bg-blue-50" : ""
                            } ${
                              formData.selectedPpe.length >= 5 && !formData.selectedPpe.includes(ppe.code)
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <Checkbox
                              id={ppe.code}
                              checked={formData.selectedPpe.includes(ppe.code)}
                              onCheckedChange={() => handlePpeToggle(ppe.code)}
                              disabled={formData.selectedPpe.length >= 5 && !formData.selectedPpe.includes(ppe.code)}
                            />
                            <div className="flex items-center gap-3 flex-1">
                              <Image
                                src={ppe.image || "/placeholder.svg"}
                                alt={ppe.name}
                                width={40}
                                height={40}
                                className="flex-shrink-0"
                              />
                              <Label htmlFor={ppe.code} className="text-sm font-medium cursor-pointer flex-1">
                                {ppe.name}
                              </Label>
                            </div>
                          </div>
                        ))}
                      </div>
                      {formData.selectedPpe.length > 0 && (
                        <p className="text-sm text-gray-600 mt-2">
                          Selected: {formData.selectedPpe.length}/5 PPE items
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Additional Information */}
                {activeFormTab === "supplemental-info" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                      <Textarea
                        id="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={(e) => handleInputChange("additionalInfo", e.target.value)}
                        placeholder="Any additional safety information or notes..."
                        rows={3}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Label Preview Section */}
          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Label Preview
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-6 rounded-lg overflow-auto flex justify-center items-center">
                <GHSLabelPreview formData={formData} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
