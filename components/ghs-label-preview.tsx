import Image from "next/image"
import type { LabelFormData } from "@/app/labels/create/page" // Import the type from the original page

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

// NFPA Diamond Component - Same size as GHS pictograms
function NFPADiamond({ formData }: { formData: LabelFormData }) {
  if (!formData.includeNfpa) return null

  return (
    <div className="relative w-12 h-12">
      {/* Outer diamond border */}
      <div className="absolute inset-0 transform rotate-45 border-2 border-black bg-white">
        {/* Health (Blue - Left) */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-600 flex items-center justify-center transform -rotate-45 border-r border-b border-black">
          <span className="text-white font-black text-sm">{formData.nfpaHealth}</span>
        </div>

        {/* Fire (Red - Top) */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-red-600 flex items-center justify-center transform -rotate-45 border-b border-black">
          <span className="text-white font-black text-sm">{formData.nfpaFire}</span>
        </div>

        {/* Reactivity (Yellow - Right) */}
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-400 flex items-center justify-center transform -rotate-45 border-l border-black">
          <span className="text-black font-black text-sm">{formData.nfpaReactivity}</span>
        </div>

        {/* Specific (White - Bottom) */}
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-white flex items-center justify-center transform -rotate-45 border-t border-r border-black">
          <span className="text-black font-bold text-xs">{formData.nfpaSpecific.join("")}</span>
        </div>
      </div>
    </div>
  )
}

export default function GHSLabelPreview({ formData }: { formData: LabelFormData }) {
  const getHazardSymbol = (code: string) => {
    return ghsHazards.find((h) => h.code === code)
  }

  const getPpeImage = (code: string) => {
    return commonPPE.find((ppe) => ppe.code === code)
  }

  // Arrange hazard pictograms in diamond formation (max 4)
  const renderHazardPictograms = () => {
    const selectedHazards = formData.hazards.slice(0, 4)
    if (selectedHazards.length === 0) return null

    return (
      <div className="relative w-32 h-32 mx-auto">
        {selectedHazards.map((hazardCode, index) => {
          const hazard = getHazardSymbol(hazardCode)
          let positionClass = ""

          // Diamond arrangement positions
          switch (index) {
            case 0: // Top
              positionClass = "absolute top-0 left-1/2 transform -translate-x-1/2"
              break
            case 1: // Right
              positionClass = "absolute top-1/2 right-0 transform -translate-y-1/2"
              break
            case 2: // Bottom
              positionClass = "absolute bottom-0 left-1/2 transform -translate-x-1/2"
              break
            case 3: // Left
              positionClass = "absolute top-1/2 left-0 transform -translate-y-1/2"
              break
          }

          return (
            <div key={hazardCode} className={`${positionClass} w-12 h-12`}>
              <Image
                src={hazard?.image || "/placeholder.svg"}
                alt={hazard?.name || "GHS Pictogram"}
                width={48}
                height={48}
                className="w-full h-full"
              />
            </div>
          )
        })}
      </div>
    )
  }

  // Render PPE icons with fixed 5 slots (circular)
  const renderPPEIcons = () => {
    const ppeSlots = Array(5).fill(null)

    return (
      <div className="flex gap-2 items-center justify-start">
        {ppeSlots.map((_, index) => {
          const ppeCode = formData.selectedPpe[index]
          const ppe = ppeCode ? getPpeImage(ppeCode) : null

          return (
            <div
              key={index}
              className="w-10 h-10 flex items-center justify-center border-2 border-gray-400 rounded-full bg-white"
            >
              {ppe ? (
                <Image
                  src={ppe.image || "/placeholder.svg"}
                  alt={ppe.name}
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    // Apply fixed dimensions for print compliance with black border
    <div
      className="bg-white border-4 border-black p-4 mx-auto flex flex-col justify-between print:max-w-none print:mx-0"
      style={{ width: "30cm", height: "15cm", overflow: "hidden" }}
    >
      {/* Header Section */}
      <div className="border-b-2 border-black pb-2 mb-3">
        <div className="flex justify-between items-start">
          {/* Left side - OILSERV Logo */}
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="grid grid-cols-2 gap-1"></div>
              <span className="text-orange-500 font-extrabold text-4xl my-0 px-0 py-0">OILSERV</span>
            </div>
          </div>

          {/* Center - Product Info */}
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-black text-gray-900 uppercase leading-tight mb-1">
              {formData.productName || "PRODUCT NAME"}
            </h1>
            <p className="text-lg font-bold text-gray-900 mb-2">({formData.chemicalName || "CHEMICAL NAME"})</p>
          </div>

          {/* Right side - Information Boxes (6 boxes in 2 columns) */}
          <div className="grid grid-cols-2 gap-1 min-w-[300px]">
            {/* Left Column */}
            <div className="space-y-1">
              {/* Batch Number */}
              <div className="flex items-center">
                <div className="px-2 py-1 text-xs font-bold min-w-[90px] text-left">Batch Number :</div>
                <div className="px-2 py-1 flex-1 min-h-[24px]">
                  <span className="text-xs">{formData.batchNumber || ""}</span>
                </div>
              </div>

              {/* CAS Number */}
              <div className="flex items-center">
                <div className="px-2 py-1 text-xs font-bold min-w-[90px] text-left">CAS Number :</div>
                <div className="px-2 py-1 flex-1 min-h-[24px]">
                  <span className="text-xs">{formData.identifierNumber || ""}</span>
                </div>
              </div>

              {/* OS Number */}
              <div className="flex items-center">
                <div className="px-2 py-1 text-xs font-bold min-w-[90px] text-left">OS Number :</div>
                <div className="px-2 py-1 flex-1 min-h-[24px]">
                  <span className="text-xs">{formData.osCode || ""}</span>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-1">
              {/* Manufacture date */}
              <div className="flex items-center">
                <div className="px-2 py-1 text-xs font-bold min-w-[90px] text-left">Manufacture date:</div>
                <div className="px-2 py-1 flex-1 min-h-[24px]">
                  <span className="text-xs">{formData.manufacturingDate || ""}</span>
                </div>
              </div>

              {/* Expiry date */}
              <div className="flex items-center">
                <div className="px-2 py-1 text-xs font-bold min-w-[90px] text-left">Expiry date :</div>
                <div className="px-2 py-1 flex-1 min-h-[24px]">
                  <span className="text-xs">{formData.expiryDate || ""}</span>
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center">
                <div className="px-2 py-1 text-xs font-bold min-w-[90px] text-left">Quantity :</div>
                <div className="px-2 py-1 flex-1 min-h-[24px]">
                  <span className="text-xs">{formData.nominalQuantity || ""}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Signal Word - Below header */}
        <div className="flex justify-center mt-2">
          <div
            className={`inline-block px-6 py-1 text-white font-black text-xl uppercase ${
              formData.signalWord === "DANGER" ? "bg-red-600" : "bg-orange-500"
            }`}
          >
            {formData.signalWord || "WARNING"}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 gap-4 items-start">
        {/* Left Column - GHS Hazard Symbols in Diamond Formation */}
        <div className="flex flex-col items-center justify-start min-w-[140px]">{renderHazardPictograms()}</div>

        {/* Center Column - Statements */}
        <div className="flex-1 space-y-3">
          {/* Hazard Statements - Limited to 5 lines */}
          {formData.hazardStatements.length > 0 && (
            <div>
              <h3 className="font-bold text-base mb-1 text-gray-900">HAZARD STATEMENTS:</h3>
              <ul className="text-xs space-y-0.5 list-disc list-inside">
                {formData.hazardStatements.slice(0, 5).map((statement, index) => (
                  <li key={index} className="leading-tight">
                    {statement}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Precautionary Statements - Limited to 5 lines */}
          {formData.precautionaryStatements.length > 0 && (
            <div>
              <h3 className="font-bold text-base mb-1 text-gray-900">PRECAUTIONARY STATEMENTS:</h3>
              <ul className="text-xs space-y-0.5 list-disc list-inside">
                {formData.precautionaryStatements.slice(0, 5).map((statement, index) => (
                  <li key={index} className="leading-tight">
                    {statement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Column - NFPA Diamond (same size as GHS pictograms) */}
        {formData.includeNfpa && (
          <div className="flex flex-col items-center justify-start min-w-[60px]">
            <NFPADiamond formData={formData} />
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="border-t-2 border-black pt-2 mt-3">
        <div className="flex justify-between items-end">
          {/* Left side - PPE Icons (5 slots) */}
          <div className="flex-1">
            <h4 className="font-bold text-sm mb-2 text-gray-900">PERSONAL PROTECTIVE EQUIPMENT:</h4>
            {renderPPEIcons()}
          </div>

          {/* Right side - Company Info */}
          <div className="text-right text-xs">
            <p className="font-bold uppercase text-gray-900 text-sm">{formData.supplier || "OILSERV ENERGY LTD"}</p>
            <p className="text-xs">{formData.supplierAddress || "cal gaz. hassi meseaoud ."}</p>
            <p className="text-xs">Emergency: {formData.emergencyPhone || "+234-1-234-5678"}</p>
            <p className="text-xs">Date: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export { GHSLabelPreview }
