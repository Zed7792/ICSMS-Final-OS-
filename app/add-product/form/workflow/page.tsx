"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import SDSWorkflowComponent from "@/components/sds-workflow-page"

// Define the SDSFormData interface for this page's context
interface SDSFormData {
  productName: string
  chemicalName: string
  casNumber: string
  oilservCode: string
  location: string
  batchNumber: string
  manufacturingDate: string
  supplier: string
  supplierAddress: string
  emergencyPhone: string
  hazardClassification: string
  signalWord: string
  hazardStatements: string
  precautionaryStatements: string
  firstAidEyes: string
  firstAidSkin: string
  firstAidInhalation: string
  firstAidIngestion: string
  extinguishingMedia: string
  specialHazards: string
  personalPrecautions: string
  environmentalPrecautions: string
  cleanupMethods: string
  handlingPrecautions: string
  storageConditions: string
  exposureControls: string
  eyeProtection: string
  skinProtection: string
  respiratoryProtection: string
  physicalState: string
  appearance: string
  odor: string
  ph: string
  meltingPoint: string
  boilingPoint: string
  flashPoint: string
  evaporationRate: string
  flammability: string
  explosiveLimits: string
  vaporPressure: string
  vaporDensity: string
  relativeGravity: string
  solubility: string
  partitionCoefficient: string
  autoIgnitionTemp: string
  decompositionTemp: string
  viscosity: string
  reactivity: string
  chemicalStability: string
  hazardousReactions: string
  conditionsToAvoid: string
  incompatibleMaterials: string
  hazardousDecomposition: string
  acuteToxicity: string
  skinCorrosion: string
  eyeDamage: string
  respiratorySensitization: string
  skinSensitization: string
  germCellMutagenicity: string
  carcinogenicity: string
  reproductiveToxicity: string
  specificTargetOrgan: string
  aspirationHazard: string
  ecotoxicity: string
  persistence: string
  bioaccumulation: string
  mobility: string
  pbtAssessment: string
  otherAdverseEffects: string
  wasteDisposal: string
  unNumber: string
  properShippingName: string
  transportHazardClass: string
  packingGroup: string
  environmentalHazards: string
  transportPrecautions: string
  bulkTransport: string
  safetyRegulations: string
  chemicalSafetyAssessment: string
  otherInformation: string
}

export default function SDSWorkflowPage() {
  const router = useRouter()
  const [sdsData, setSdsData] = useState<SDSFormData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSDSData = () => {
      try {
        const submissionData = localStorage.getItem("sds-submission")
        if (submissionData) {
          const parsed = JSON.parse(submissionData)

          // Extract data from the sections structure
          const extractedData: SDSFormData = {
            productName: parsed.productName || "",
            chemicalName: parsed.chemicalName || "",
            casNumber: parsed.casNumber || "",
            oilservCode: parsed.oilservCode || "",
            location: parsed.location || "",
            batchNumber: parsed.batchNumber || "",
            manufacturingDate: parsed.manufacturingDate || "",
            supplier: parsed.supplier || "",
            supplierAddress: parsed.supplierAddress || "",
            emergencyPhone: parsed.emergencyPhone || "",
            hazardClassification: parsed.sections?.hazards?.hazardClassification || "",
            signalWord: parsed.sections?.hazards?.signalWord || "",
            hazardStatements: parsed.sections?.hazards?.hazardStatements || "",
            precautionaryStatements: parsed.sections?.hazards?.precautionaryStatements || "",
            firstAidEyes: parsed.sections?.firstaid?.firstAidEyes || "",
            firstAidSkin: parsed.sections?.firstaid?.firstAidSkin || "",
            firstAidInhalation: parsed.sections?.firstaid?.firstAidInhalation || "",
            firstAidIngestion: parsed.sections?.firstaid?.firstAidIngestion || "",
            extinguishingMedia: parsed.sections?.firefighting?.extinguishingMedia || "",
            specialHazards: parsed.sections?.firefighting?.specialHazards || "",
            personalPrecautions: parsed.sections?.accidental?.personalPrecautions || "",
            environmentalPrecautions: parsed.sections?.accidental?.environmentalPrecautions || "",
            cleanupMethods: parsed.sections?.accidental?.cleanupMethods || "",
            handlingPrecautions: parsed.sections?.handling?.handlingPrecautions || "",
            storageConditions: parsed.sections?.handling?.storageConditions || "",
            exposureControls: parsed.sections?.exposure?.exposureControls || "",
            eyeProtection: parsed.sections?.exposure?.eyeProtection || "",
            skinProtection: parsed.sections?.exposure?.skinProtection || "",
            respiratoryProtection: parsed.sections?.exposure?.respiratoryProtection || "",
            physicalState: parsed.sections?.physical?.physicalState || "",
            appearance: parsed.sections?.physical?.appearance || "",
            odor: parsed.sections?.physical?.odor || "",
            ph: parsed.sections?.physical?.ph || "",
            meltingPoint: parsed.sections?.physical?.meltingPoint || "",
            boilingPoint: parsed.sections?.physical?.boilingPoint || "",
            flashPoint: parsed.sections?.physical?.flashPoint || "",
            evaporationRate: parsed.sections?.physical?.evaporationRate || "",
            flammability: parsed.sections?.physical?.flammability || "",
            explosiveLimits: parsed.sections?.physical?.explosiveLimits || "",
            vaporPressure: parsed.sections?.physical?.vaporPressure || "",
            vaporDensity: parsed.sections?.physical?.vaporDensity || "",
            relativeGravity: parsed.sections?.physical?.relativeGravity || "",
            solubility: parsed.sections?.physical?.solubility || "",
            partitionCoefficient: parsed.sections?.physical?.partitionCoefficient || "",
            autoIgnitionTemp: parsed.sections?.physical?.autoIgnitionTemp || "",
            decompositionTemp: parsed.sections?.physical?.decompositionTemp || "",
            viscosity: parsed.sections?.physical?.viscosity || "",
            reactivity: parsed.sections?.stability?.reactivity || "",
            chemicalStability: parsed.sections?.stability?.chemicalStability || "",
            hazardousReactions: parsed.sections?.stability?.hazardousReactions || "",
            conditionsToAvoid: parsed.sections?.stability?.conditionsToAvoid || "",
            incompatibleMaterials: parsed.sections?.stability?.incompatibleMaterials || "",
            hazardousDecomposition: parsed.sections?.stability?.hazardousDecomposition || "",
            acuteToxicity: parsed.sections?.toxicology?.acuteToxicity || "",
            skinCorrosion: parsed.sections?.toxicology?.skinCorrosion || "",
            eyeDamage: parsed.sections?.toxicology?.eyeDamage || "",
            respiratorySensitization: parsed.sections?.toxicology?.respiratorySensitization || "",
            skinSensitization: parsed.sections?.toxicology?.skinSensitization || "",
            germCellMutagenicity: parsed.sections?.toxicology?.germCellMutagenicity || "",
            carcinogenicity: parsed.sections?.toxicology?.carcinogenicity || "",
            reproductiveToxicity: parsed.sections?.toxicology?.reproductiveToxicity || "",
            specificTargetOrgan: parsed.sections?.toxicology?.specificTargetOrgan || "",
            aspirationHazard: parsed.sections?.toxicology?.aspirationHazard || "",
            ecotoxicity: parsed.sections?.ecological?.ecotoxicity || "",
            persistence: parsed.sections?.ecological?.persistence || "",
            bioaccumulation: parsed.sections?.ecological?.bioaccumulation || "",
            mobility: parsed.sections?.ecological?.mobility || "",
            pbtAssessment: "",
            otherAdverseEffects: "",
            wasteDisposal: parsed.sections?.disposal?.wasteDisposal || "",
            unNumber: parsed.sections?.transport?.unNumber || "",
            properShippingName: parsed.sections?.transport?.properShippingName || "",
            transportHazardClass: parsed.sections?.transport?.transportHazardClass || "",
            packingGroup: parsed.sections?.transport?.packingGroup || "",
            environmentalHazards: "",
            transportPrecautions: parsed.sections?.transport?.transportPrecautions || "",
            bulkTransport: "",
            safetyRegulations: parsed.sections?.regulatory?.safetyRegulations || "",
            chemicalSafetyAssessment: parsed.sections?.regulatory?.chemicalSafetyAssessment || "",
            otherInformation: parsed.sections?.other?.additionalInfo || "",
          }

          setSdsData(extractedData)
        } else {
          // Redirect if no submission data found
          router.replace("/add-product/form")
        }
      } catch (error) {
        console.error("Error loading SDS data:", error)
        router.replace("/add-product/form")
      } finally {
        setIsLoading(false)
      }
    }

    loadSDSData()
  }, [router])

  if (isLoading || !sdsData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading workflow...</p>
        </div>
      </div>
    )
  }

  return <SDSWorkflowComponent sdsData={sdsData} />
}
