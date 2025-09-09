"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useToast } from "@/hooks/use-toast"
import { ChevronDown, ArrowLeft, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { GHSLabelPreview } from "@/components/ghs-label-preview"

// GHS Hazard Categories with new image paths - UPDATED WITH PROVIDED IMAGES
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

// NFPA Specific Hazard symbols
const nfpaSpecificHazards = [
  { code: "OXY", name: "Oxidizer", description: "Materials that possess oxidizing properties" },
  { code: "ACID", name: "Acid", description: "Materials that are acidic" },
  { code: "ALK", name: "Alkali", description: "Materials that are alkaline" },
  { code: "COR", name: "Corrosive", description: "Materials that are corrosive" },
  { code: "W", name: "Use no water", description: "Materials that are water-reactive" },
  { code: "☢", name: "Radiation", description: "Materials that are radioactive" },
]

const comprehensiveHStatements = [
  {
    category: "200 - 299 Physical hazard",
    statements: [
      { code: "H200", statement: "Unstable explosives." },
      { code: "H201", statement: "Explosive; mass explosion hazard." },
      { code: "H202", statement: "Explosive, severe projection hazard." },
      { code: "H203", statement: "Explosive; fire, blast or projection hazard." },
      { code: "H204", statement: "Fire or projection hazard." },
      { code: "H205", statement: "May mass explode in fire." },
      {
        code: "H206",
        statement: "Fire, blast or projection hazard; increased risk of explosion if desensitising agent is reduced.",
      },
      {
        code: "H207",
        statement: "Fire or projection hazard; increased risk of explosion if desensitising agent is reduced.",
      },
      { code: "H208", statement: "Fire hazard; increased risk of explosion if desensitising agent is reduced." },
      { code: "H220", statement: "Extremely flammable gas." },
      { code: "H221", statement: "Flammable gas." },
      { code: "H222", statement: "Extremely flammable aerosol." },
      { code: "H223", statement: "Flammable aerosol." },
      { code: "H224", statement: "Extremely flammable liquid and vapour." },
      { code: "H225", statement: "Highly flammable liquid and vapour." },
      { code: "H226", statement: "Flammable liquid and vapour." },
      { code: "H228", statement: "Flammable solid." },
      { code: "H229", statement: "Pressurised container: May burst if heated." },
      { code: "H230", statement: "May react explosively even in the absence of air." },
      {
        code: "H231",
        statement: "May react explosively even in the absence of air at elevated pressure and/or temperature.",
      },
      { code: "H232", statement: "May ignite spontaneously if exposed to air." },
      { code: "H240", statement: "Heating may cause an explosion." },
      { code: "H241", statement: "Heating may cause a fire or explosion." },
      { code: "H242", statement: "Heating may cause a fire." },
      { code: "H250", statement: "Catches fire spontaneously if exposed to air." },
      { code: "H251", statement: "Self-heating: may catch fire." },
      { code: "H252", statement: "Self-heating in large quantities; may catch fire." },
      { code: "H260", statement: "In contact with water releases flammable gases which may ignite spontaneously." },
      { code: "H261", statement: "In contact with water releases flammable gases." },
      { code: "H270", statement: "May cause or intensify fire; oxidiser." },
      { code: "H271", statement: "May cause fire or explosion; strong oxidiser." },
      { code: "H272", statement: "May intensify fire; oxidiser." },
      { code: "H280", statement: "Contains gas under pressure; may explode if heated." },
      { code: "H281", statement: "Contains refrigerated gas; may cause cryogenic burns or injury." },
      { code: "H290", statement: "May be corrosive to metals." },
    ],
  },
  {
    category: "300 - 399 Health hazard",
    statements: [
      { code: "H300", statement: "Fatal if swallowed." },
      { code: "H301", statement: "Toxic if swallowed." },
      { code: "H302", statement: "Harmful if swallowed." },
      { code: "H304", statement: "May be fatal if swallowed and enters airways." },
      { code: "H310", statement: "Fatal in contact with skin." },
      { code: "H311", statement: "Toxic in contact with skin." },
      { code: "H312", statement: "Harmful in contact with skin." },
      { code: "H314", statement: "Causes severe skin burns and eye damage." },
      { code: "H315", statement: "Causes skin irritation." },
      { code: "H317", statement: "May cause an allergic skin reaction." },
      { code: "H318", statement: "Causes serious eye damage." },
      { code: "H319", statement: "Causes serious eye irritation." },
      { code: "H330", statement: "Fatal if inhaled." },
      { code: "H331", statement: "Toxic if inhaled." },
      { code: "H332", statement: "Harmful if inhaled." },
      { code: "H334", statement: "May cause allergy or asthma symptoms or breathing difficulties if inhaled." },
      { code: "H335", statement: "May cause respiratory irritation." },
      { code: "H336", statement: "May cause drowsiness or dizziness." },
      { code: "H340", statement: "May cause genetic defects." },
      { code: "H341", statement: "Suspected of causing genetic defects." },
      { code: "H350", statement: "May cause cancer." },
      { code: "H350i", statement: "May cause cancer by inhalation." },
      { code: "H351", statement: "Suspected of causing cancer." },
      { code: "H360", statement: "May damage fertility or the unborn child." },
      { code: "H360F", statement: "May damage fertility." },
      { code: "H360D", statement: "May damage the unborn child." },
      { code: "H360FD", statement: "May damage fertility. May damage the unborn child." },
      { code: "H360Fd", statement: "May damage fertility. Suspected of damaging the unborn child." },
      { code: "H360Df", statement: "May damage the unborn child. Suspected of damaging fertility." },
      { code: "H361", statement: "Suspected of damaging fertility or the unborn child." },
      { code: "H361f", statement: "Suspected of damaging fertility." },
      { code: "H361d", statement: "Suspected of damaging the unborn child." },
      { code: "H361fd", statement: "Suspected of damaging fertility. Suspected of damaging the unborn child." },
      { code: "H362", statement: "May cause harm to breast-fed children." },
      { code: "H370", statement: "Causes damage to organs." },
      { code: "H371", statement: "May cause damage to organs." },
      { code: "H372", statement: "Causes damage to organs through prolonged or repeated exposure." },
      { code: "H373", statement: "May cause damage to organs through prolonged or repeated exposure." },
    ],
  },
  {
    category: "400 - 499 Environmental hazard",
    statements: [
      { code: "H400", statement: "Very toxic to aquatic life." },
      { code: "H410", statement: "Very toxic to aquatic life with long lasting effects." },
      { code: "H411", statement: "Toxic to aquatic life with long lasting effects." },
      { code: "H412", statement: "Harmful to aquatic life with long lasting effects." },
      { code: "H413", statement: "May cause long lasting harmful effects to aquatic life." },
      {
        code: "H420",
        statement: "Harms public health and the environment by destroying ozone in the upper atmosphere.",
      },
    ],
  },
]

const comprehensivePStatements = [
  {
    category: "100 - 199 General",
    statements: [
      { code: "P101", statement: "If medical advice is needed, have product container or label at hand." },
      { code: "P102", statement: "Keep out of reach of children." },
      { code: "P103", statement: "Read carefully and follow all instructions." },
    ],
  },
  {
    category: "200 - 299 Prevention",
    statements: [
      { code: "P201", statement: "Obtain special instructions before use." },
      { code: "P202", statement: "Do not handle until all safety precautions have been read and understood." },
      {
        code: "P210",
        statement: "Keep away from heat, hot surfaces, sparks, open flames and other ignition sources. No smoking.",
      },
      { code: "P211", statement: "Do not spray on an open flame or other ignition source." },
      { code: "P212", statement: "Avoid heating under confinement or reduction of the desensitising agent." },
      { code: "P220", statement: "Keep away from clothing and other combustible materials." },
      { code: "P222", statement: "Do not allow contact with air." },
      { code: "P223", statement: "Do not allow contact with water." },
      { code: "P230", statement: "Keep wetted with..." },
      { code: "P231", statement: "Handle and store contents under inert gas/..." },
      { code: "P232", statement: "Protect from moisture." },
      { code: "P233", statement: "Keep container tightly closed." },
      { code: "P234", statement: "Keep only in original packaging." },
      { code: "P235", statement: "Keep cool." },
      { code: "P240", statement: "Ground and bond container and receiving equipment." },
      { code: "P241", statement: "Use explosion-proof [electrical/ventilating/lighting/...] equipment." },
      { code: "P242", statement: "Use only non-sparking tools." },
      { code: "P243", statement: "Take precautionary measures against static discharge." },
      { code: "P244", statement: "Keep valves and fittings free from oil and grease." },
      { code: "P250", statement: "Do not subject to grinding/shock/friction/..." },
      { code: "P251", statement: "Do not pierce or burn, even after use." },
      { code: "P260", statement: "Do not breathe dust/fume/gas/mist/vapours/spray." },
      { code: "P261", statement: "Avoid breathing dust/fume/gas/mist/vapours/spray." },
      { code: "P262", statement: "Do not get in eyes, on skin, or on clothing." },
      { code: "P263", statement: "Avoid contact during pregnancy and while nursing." },
      { code: "P264", statement: "Wash ... thoroughly after handling." },
      { code: "P270", statement: "Do not eat, drink or smoke when using this product." },
      { code: "P271", statement: "Use only outdoors or in a well-ventilated area." },
      { code: "P272", statement: "Contaminated work clothing should not be allowed out of the workplace." },
      { code: "P273", statement: "Avoid release to the environment." },
      {
        code: "P280",
        statement: "Wear protective gloves/protective clothing/eye protection/face protection/hearing protection/...",
      },
      { code: "P282", statement: "Wear cold insulating gloves and either face shield or eye protection." },
      { code: "P283", statement: "Wear fire resistant or flame retardant clothing." },
      { code: "P284", statement: "[In case of inadequate ventilation] wear respiratory protection." },
    ],
  },
  {
    category: "300 - 399 Response",
    statements: [
      { code: "P301", statement: "IF SWALLOWED:" },
      { code: "P302", statement: "IF ON SKIN:" },
      { code: "P303", statement: "IF ON SKIN (or hair):" },
      { code: "P304", statement: "IF INHALED:" },
      { code: "P305", statement: "IF IN EYES:" },
      { code: "P306", statement: "IF ON CLOTHING:" },
      { code: "P308", statement: "IF exposed or concerned:" },
      { code: "P310", statement: "Immediately call a POISON CENTER/doctor/..." },
      { code: "P311", statement: "Call a POISON CENTER/doctor/..." },
      { code: "P312", statement: "Call a POISON CENTER/doctor/.../if you feel unwell." },
      { code: "P313", statement: "Get medical advice/attention." },
      { code: "P314", statement: "Get medical advice/attention if you feel unwell." },
      { code: "P315", statement: "Get immediate medical advice/attention." },
      { code: "P320", statement: "Specific treatment is urgent (see ... on this label)." },
      { code: "P321", statement: "Specific treatment (see ... on this label)." },
      { code: "P330", statement: "Rinse mouth." },
      { code: "P331", statement: "Do NOT induce vomiting." },
      { code: "P332", statement: "If skin irritation occurs:" },
      { code: "P333", statement: "If skin irritation or rash occurs:" },
      { code: "P334", statement: "Immerse in cool water [or wrap in wet bandages]." },
      { code: "P335", statement: "Brush off loose particles from skin." },
      { code: "P336", statement: "Thaw frosted parts with lukewarm water. Do no rub affected area." },
      { code: "P337", statement: "If eye irritation persists:" },
      { code: "P338", statement: "Remove contact lenses, if present and easy to do. Continue rinsing." },
      { code: "P340", statement: "Remove person to fresh air and keep comfortable for breathing." },
      { code: "P342", statement: "If experiencing respiratory symptoms:" },
      { code: "P351", statement: "Rinse cautiously with water for several minutes." },
      { code: "P352", statement: "Wash with plenty of water/..." },
      { code: "P353", statement: "Rinse skin with water [or shower]." },
      {
        code: "P360",
        statement: "Rinse immediately contaminated clothing and skin with plenty of water before removing clothes.",
      },
      { code: "P361", statement: "Take off immediately all contaminated clothing." },
      { code: "P362", statement: "Take off contaminated clothing." },
      { code: "P363", statement: "Wash contaminated clothing before reuse." },
      { code: "P364", statement: "And wash it before reuse." },
      { code: "P370", statement: "In case of fire:" },
      { code: "P371", statement: "In case of major fire and large quantities:" },
      { code: "P372", statement: "Explosion risk." },
      { code: "P373", statement: "DO NOT fight fire when fire reaches explosives." },
      { code: "P375", statement: "Fight fire remotely due to the risk of explosion." },
      { code: "P376", statement: "Stop leak if safe to do so." },
      { code: "P377", statement: "Leaking gas fire: Do not extinguish, unless leak can be stopped safely." },
      { code: "P378", statement: "Use... to extinguish." },
      { code: "P380", statement: "Evacuate area." },
      { code: "P381", statement: "In case of leakage, eliminate all ignition sources." },
      { code: "P390", statement: "Absorb spillage to prevent material damage." },
      { code: "P391", statement: "Collect spillage." },
    ],
  },
  {
    category: "400 - 499 Storage",
    statements: [
      { code: "P401", statement: "Store in accordance with..." },
      { code: "P402", statement: "Store in a dry place." },
      { code: "P403", statement: "Store in a well-ventilated place." },
      { code: "P404", statement: "Store in a closed container." },
      { code: "P405", statement: "Store locked up." },
      { code: "P406", statement: "Store in corrosive resistant/... container with a resistant inner liner." },
      { code: "P407", statement: "Maintain air gap between stacks or pallets." },
      { code: "P410", statement: "Protect from sunlight." },
      { code: "P411", statement: "Store at temperatures not exceeding ... °C/ ... °F." },
      { code: "P412", statement: "Do not expose to temperatures exceeding 50 °C/ 122 °F." },
      {
        code: "P413",
        statement: "Store bulk masses greater than ... kg/... lbs at temperatures not exceeding ... °C/... °F.",
      },
      { code: "P420", statement: "Store separately." },
    ],
  },
  {
    category: "500 - 599 Disposal",
    statements: [
      { code: "P501", statement: "Dispose of contents/container to ..." },
      { code: "P502", statement: "Refer to manufacturer or supplier for information on recovery or recycling." },
      {
        code: "P503",
        statement: "Refer to manufacturer/ supplier/... for information on disposal/recovery/ recycling.",
      },
    ],
  },
]

// Common PPE options with new pictogram images
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
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-01%20172733.jpg-FeOsiWpZVWvYuKikRqHO501DbQuEsR.jpeg",
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
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-08-01%20174557.jpg-58QZHkTChkp5aqSZDBN1m1ih5NcO6Q.jpeg",
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
  hazards: string[] // No limit
  signalWord: "DANGER" | "WARNING"
  hazardStatements: string[] // No limit
  precautionaryStatements: string[] // No limit
  selectedPpe: string[] // No limit
  additionalInfo: string
  nfpaHealth: number
  nfpaFire: number
  nfpaReactivity: number
  nfpaSpecific: string[]
  includeNfpa: boolean
}

export default function CreateLabelPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [hStatementSearch, setHStatementSearch] = useState("")
  const [pStatementSearch, setPStatementSearch] = useState("")
  const [showHSuggestions, setShowHSuggestions] = useState(false)
  const [showPSuggestions, setShowPSuggestions] = useState(false)

  // Initialize formData directly from searchParams using a function
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
      // NFPA defaults
      nfpaHealth: 0,
      nfpaFire: 0,
      nfpaReactivity: 0,
      nfpaSpecific: [],
      includeNfpa: false,
    }
  })

  console.log("[v0] H Statements data:", comprehensiveHStatements)
  console.log("[v0] P Statements data:", comprehensivePStatements)
  console.log("[v0] Current form data H statements:", formData.hazardStatements)
  console.log("[v0] Current form data P statements:", formData.precautionaryStatements)

  const allHStatements = comprehensiveHStatements.flatMap((category) =>
    category.statements.map((s) => `${s.code}: ${s.statement}`),
  )
  const allPStatements = comprehensivePStatements.flatMap((category) =>
    category.statements.map((s) => `${s.code}: ${s.statement}`),
  )

  const filteredHSuggestions = allHStatements
    .filter(
      (statement) =>
        statement.toLowerCase().includes(hStatementSearch.toLowerCase()) &&
        !formData.hazardStatements.includes(statement),
    )
    .slice(0, 10)

  const filteredPSuggestions = allPStatements
    .filter(
      (statement) =>
        statement.toLowerCase().includes(pStatementSearch.toLowerCase()) &&
        !formData.precautionaryStatements.includes(statement),
    )
    .slice(0, 10)

  const [customHStatement, setCustomHStatement] = useState("")
  const [customPStatement, setCustomPStatement] = useState("")
  const [activeFormTab, setActiveFormTab] = useState<string>("basic") // Fixed initial state to match tab ID

  const handleTabClick = (tab: string) => {
    setActiveFormTab(tab)
  }

  const handleInputChange = (field: keyof LabelFormData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePpeToggle = (ppeCode: string) => {
    setFormData((prev) => {
      const isCurrentlySelected = prev.selectedPpe.includes(ppeCode)

      if (isCurrentlySelected) {
        // Remove if already selected
        return {
          ...prev,
          selectedPpe: prev.selectedPpe.filter((p) => p !== ppeCode),
        }
      } else {
        // Add only if under limit of 10
        if (prev.selectedPpe.length >= 10) {
          alert("Maximum 10 PPE items can be selected")
          return prev
        }
        return {
          ...prev,
          selectedPpe: [...prev.selectedPpe, ppeCode],
        }
      }
    })
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
        description: "Product name, chemical name, identifier number, and nominal quantity are required.",
        variant: "destructive",
      })
      return
    }

    // Navigate to workflow page with form data
    const params = new URLSearchParams()
    for (const key in formData) {
      const value = formData[key as keyof LabelFormData]
      if (Array.isArray(value)) {
        params.append(key, encodeURIComponent(JSON.stringify(value)))
      } else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        params.append(key, encodeURIComponent(value.toString()))
      }
    }
    router.push(`/labels/create/workflow?${params.toString()}`)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleViewPdf = () => {
    // Serialize formData into URL query parameters
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

  const handleHazardToggle = (hazardCode: string) => {
    setFormData((prev) => {
      const isCurrentlySelected = prev.hazards.includes(hazardCode)

      if (isCurrentlySelected) {
        // Remove if already selected
        return {
          ...prev,
          hazards: prev.hazards.filter((h) => h !== hazardCode),
        }
      } else {
        // Add if not selected
        return {
          ...prev,
          hazards: [...prev.hazards, hazardCode],
        }
      }
    })
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
              <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white text-sm font-bold">
                ⚠️
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Create New GHS Label</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handlePrint}>
              Print Preview
            </Button>
            <Button onClick={handleSave} className="bg-slate-600 hover:bg-slate-700">
              Save Label
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        <div className="space-y-6 mb-8">
          <Card className="bg-white text-gray-900 border-gray-200">
            <CardHeader className="pb-0">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                {[
                  { id: "basic", label: "Basic Information" },
                  { id: "ghs-hazards", label: "GHS Hazards" },
                  { id: "statements", label: "H & P Statements" },
                  { id: "ppe", label: "PPE" },
                  { id: "nfpa", label: "NFPA" },
                  { id: "supplemental-info", label: "Supplemental Info" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      activeFormTab === tab.id
                        ? "bg-blue-600 text-white shadow-sm"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {activeFormTab === "basic" && (
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
                    <Label>Hazard Pictograms (Select as many as needed)</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                      {ghsHazards.map((hazard) => (
                        <div
                          key={hazard.code}
                          className={`flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 ${
                            formData.hazards.includes(hazard.code) ? "border-blue-500 bg-blue-50" : ""
                          }`}
                        >
                          <Checkbox
                            id={hazard.code}
                            checked={formData.hazards.includes(hazard.code)}
                            onCheckedChange={() => handleHazardToggle(hazard.code)}
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
                      <p className="text-sm text-gray-600 mt-2">Selected: {formData.hazards.length} pictograms</p>
                    )}
                  </div>
                </div>
              )}

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
                        {/* Health Hazard */}
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

                        {/* Fire Hazard */}
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

                        {/* Reactivity */}
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

                      {/* Specific Hazards */}
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

              {/* H&P Statements Section */}
              {activeFormTab === "statements" && (
                <div className="space-y-6">
                  <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
                    <div className="bg-blue-800 text-white p-4">
                      <h2 className="text-xl font-bold text-center">SDS Sections – Hazards identification</h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      {/* Left side - Hazard Statements */}
                      <div className="border-r border-gray-300">
                        <div className="bg-blue-700 text-white p-3">
                          <h3 className="font-bold text-center">Hazard Statements: H</h3>
                        </div>

                        <div className="p-4 space-y-3">
                          {comprehensiveHStatements && comprehensiveHStatements.length > 0 ? (
                            comprehensiveHStatements.map((categoryGroup, groupIndex) => (
                              <div
                                key={`h-category-${groupIndex}`}
                                className="bg-blue-50 border border-blue-200 rounded"
                              >
                                <Collapsible defaultOpen className="group/collapsible">
                                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 text-sm font-medium hover:bg-blue-100 transition-colors">
                                    <span className="text-blue-800">{categoryGroup.category}</span>
                                    <ChevronDown className="h-4 w-4 text-blue-600 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="px-3 pb-3">
                                    <div className="space-y-2 max-h-60 overflow-y-auto bg-white rounded p-2 border">
                                      {categoryGroup.statements && categoryGroup.statements.length > 0 ? (
                                        categoryGroup.statements.map((statement) => {
                                          const fullStatement = `${statement.code}: ${statement.statement}`
                                          return (
                                            <div key={`h-${statement.code}`} className="flex items-start space-x-2">
                                              <Checkbox
                                                id={`h-statement-${statement.code}`}
                                                checked={formData.hazardStatements.includes(fullStatement)}
                                                onCheckedChange={(checked) => {
                                                  console.log(
                                                    "[v0] H Statement checkbox changed:",
                                                    statement.code,
                                                    checked,
                                                  )
                                                  if (checked) {
                                                    handleInputChange("hazardStatements", [
                                                      ...formData.hazardStatements,
                                                      fullStatement,
                                                    ])
                                                  } else {
                                                    handleInputChange(
                                                      "hazardStatements",
                                                      formData.hazardStatements.filter((s) => s !== fullStatement),
                                                    )
                                                  }
                                                }}
                                              />
                                              <div className="flex-1">
                                                <Label
                                                  htmlFor={`h-statement-${statement.code}`}
                                                  className="text-xs leading-relaxed cursor-pointer block"
                                                >
                                                  <span className="font-semibold text-blue-700">{statement.code}:</span>{" "}
                                                  <span>{statement.statement}</span>
                                                </Label>
                                              </div>
                                            </div>
                                          )
                                        })
                                      ) : (
                                        <div className="text-sm text-gray-500">
                                          No statements available in this category
                                        </div>
                                      )}
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              </div>
                            ))
                          ) : (
                            <div className="text-sm text-red-500">No hazard statement categories available</div>
                          )}

                          {/* Custom H-Statement input */}
                          <div className="mt-4">
                            <Label className="text-sm font-medium">Add Custom H-Statement</Label>
                            <div className="relative">
                              <div className="flex gap-2 mt-2">
                                <div className="relative flex-1">
                                  <Input
                                    value={hStatementSearch}
                                    onChange={(e) => {
                                      setHStatementSearch(e.target.value)
                                      setShowHSuggestions(true)
                                    }}
                                    onFocus={() => setShowHSuggestions(true)}
                                    onBlur={() => setTimeout(() => setShowHSuggestions(false), 200)}
                                    placeholder="Type H code (e.g., H200) or search statement..."
                                    className="text-sm"
                                  />
                                  {/* Auto-complete suggestions */}
                                  {showHSuggestions && filteredHSuggestions.length > 0 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                      {filteredHSuggestions.map((statement, index) => (
                                        <div
                                          key={index}
                                          className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                                          onClick={() => {
                                            handleInputChange("hazardStatements", [
                                              ...formData.hazardStatements,
                                              statement,
                                            ])
                                            setHStatementSearch("")
                                            setShowHSuggestions(false)
                                          }}
                                        >
                                          <div className="font-medium text-blue-700">{statement.split(":")[0]}</div>
                                          <div className="text-gray-600 text-xs">
                                            {statement.split(":").slice(1).join(":").trim()}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <Button
                                  onClick={() => {
                                    if (hStatementSearch.trim()) {
                                      handleInputChange("hazardStatements", [
                                        ...formData.hazardStatements,
                                        hStatementSearch.trim(),
                                      ])
                                      setHStatementSearch("")
                                    }
                                  }}
                                  size="sm"
                                  disabled={!hStatementSearch.trim()}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {formData.hazardStatements.length > 0 && (
                            <div className="mt-4">
                              <Label className="text-sm font-medium">
                                Selected H-Statements ({formData.hazardStatements.length})
                              </Label>
                              <div className="space-y-1 mt-2 max-h-32 overflow-y-auto">
                                {formData.hazardStatements.map((statement, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start justify-between p-2 hover:bg-blue-50 rounded text-xs border-l-2 border-blue-500"
                                  >
                                    <span className="flex-1 leading-relaxed">{statement}</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removeHStatement(index)}
                                      className="ml-2 h-6 w-6 p-0"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right side - Precautionary Statements */}
                      <div>
                        <div className="bg-blue-700 text-white p-3">
                          <h3 className="font-bold text-center">Precautionary Statements: P</h3>
                        </div>
                        <div className="p-4 space-y-3">
                          {comprehensivePStatements && comprehensivePStatements.length > 0 ? (
                            comprehensivePStatements.map((categoryGroup, groupIndex) => (
                              <div
                                key={`p-category-${groupIndex}`}
                                className="bg-green-50 border border-green-200 rounded"
                              >
                                <Collapsible defaultOpen className="group/collapsible">
                                  <CollapsibleTrigger className="flex w-full items-center justify-between p-3 text-sm font-medium hover:bg-green-100 transition-colors">
                                    <span className="text-green-800">{categoryGroup.category}</span>
                                    <ChevronDown className="h-4 w-4 text-green-600 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                  </CollapsibleTrigger>
                                  <CollapsibleContent className="px-3 pb-3">
                                    <div className="space-y-2 max-h-60 overflow-y-auto bg-white rounded p-2 border">
                                      {categoryGroup.statements && categoryGroup.statements.length > 0 ? (
                                        categoryGroup.statements.map((statement) => {
                                          const fullStatement = `${statement.code}: ${statement.statement}`
                                          return (
                                            <div key={`p-${statement.code}`} className="flex items-start space-x-2">
                                              <Checkbox
                                                id={`p-statement-${statement.code}`}
                                                checked={formData.precautionaryStatements.includes(fullStatement)}
                                                onCheckedChange={(checked) => {
                                                  console.log(
                                                    "[v0] P Statement checkbox changed:",
                                                    statement.code,
                                                    checked,
                                                  )
                                                  if (checked) {
                                                    handleInputChange("precautionaryStatements", [
                                                      ...formData.precautionaryStatements,
                                                      fullStatement,
                                                    ])
                                                  } else {
                                                    handleInputChange(
                                                      "precautionaryStatements",
                                                      formData.precautionaryStatements.filter(
                                                        (s) => s !== fullStatement,
                                                      ),
                                                    )
                                                  }
                                                }}
                                              />
                                              <div className="flex-1">
                                                <Label
                                                  htmlFor={`p-statement-${statement.code}`}
                                                  className="text-xs leading-relaxed cursor-pointer block"
                                                >
                                                  <span className="font-semibold text-green-700">
                                                    {statement.code}:
                                                  </span>{" "}
                                                  <span>{statement.statement}</span>
                                                </Label>
                                              </div>
                                            </div>
                                          )
                                        })
                                      ) : (
                                        <div className="text-sm text-gray-500">
                                          No statements available in this category
                                        </div>
                                      )}
                                    </div>
                                  </CollapsibleContent>
                                </Collapsible>
                              </div>
                            ))
                          ) : (
                            <div className="text-sm text-red-500">No precautionary statement categories available</div>
                          )}

                          {/* Custom P-Statement input */}
                          <div className="mt-4">
                            <Label className="text-sm font-medium">Add Custom P-Statement</Label>
                            <div className="relative">
                              <div className="flex gap-2 mt-2">
                                <div className="relative flex-1">
                                  <Input
                                    value={pStatementSearch}
                                    onChange={(e) => {
                                      setPStatementSearch(e.target.value)
                                      setShowPSuggestions(true)
                                    }}
                                    onFocus={() => setShowPSuggestions(true)}
                                    onBlur={() => setTimeout(() => setShowPSuggestions(false), 200)}
                                    placeholder="Type P code (e.g., P101) or search statement..."
                                    className="text-sm"
                                  />
                                  {/* Auto-complete suggestions */}
                                  {showPSuggestions && filteredPSuggestions.length > 0 && (
                                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                      {filteredPSuggestions.map((statement, index) => (
                                        <div
                                          key={index}
                                          className="px-3 py-2 hover:bg-green-50 cursor-pointer text-sm border-b border-gray-100 last:border-b-0"
                                          onClick={() => {
                                            handleInputChange("precautionaryStatements", [
                                              ...formData.precautionaryStatements,
                                              statement,
                                            ])
                                            setPStatementSearch("")
                                            setShowPSuggestions(false)
                                          }}
                                        >
                                          <div className="font-medium text-green-700">{statement.split(":")[0]}</div>
                                          <div className="text-gray-600 text-xs">
                                            {statement.split(":").slice(1).join(":").trim()}
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <Button
                                  onClick={() => {
                                    if (pStatementSearch.trim()) {
                                      handleInputChange("precautionaryStatements", [
                                        ...formData.precautionaryStatements,
                                        pStatementSearch.trim(),
                                      ])
                                      setPStatementSearch("")
                                    }
                                  }}
                                  size="sm"
                                  disabled={!pStatementSearch.trim()}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {formData.precautionaryStatements.length > 0 && (
                            <div className="mt-4">
                              <Label className="text-sm font-medium">
                                Selected P-Statements ({formData.precautionaryStatements.length})
                              </Label>
                              <div className="space-y-1 mt-2 max-h-32 overflow-y-auto">
                                {formData.precautionaryStatements.map((statement, index) => (
                                  <div
                                    key={index}
                                    className="flex items-start justify-between p-2 hover:bg-green-50 rounded text-xs border-l-2 border-green-500"
                                  >
                                    <span className="flex-1 leading-relaxed">{statement}</span>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={() => removePStatement(index)}
                                      className="ml-2 h-6 w-6 p-0"
                                    >
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-100 p-3 border-t border-gray-300">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">• TIP –</span> Important information to communicate and monitor
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Personal Protective Equipment (PPE) */}
              {activeFormTab === "ppe" && (
                <div className="space-y-4">
                  <div>
                    <Label>Select Applicable PPE (Maximum 10 selections)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                      {commonPPE.map((ppe) => (
                        <div
                          key={ppe.code}
                          className={`flex items-center space-x-3 p-3 border rounded-md hover:bg-gray-50 ${
                            formData.selectedPpe.includes(ppe.code) ? "border-blue-500 bg-blue-50" : ""
                          }`}
                        >
                          <Checkbox
                            id={ppe.code}
                            checked={formData.selectedPpe.includes(ppe.code)}
                            onCheckedChange={() => handlePpeToggle(ppe.code)}
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
                      <p className="text-sm text-gray-600 mt-2">Selected: {formData.selectedPpe.length}/10 PPE items</p>
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

        {/* Label Preview */}
        <div className="mt-8">
          <GHSLabelPreview formData={formData} />
        </div>
      </div>
    </div>
  )
}
