"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useLanguage } from "@/context/language-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const hazardsPrecautionaryContent = {
  en: {
    title: "Hazards & Precautionary Statements List",
    description:
      "Complete list of GHS Hazard Statements (H-statements) and Precautionary Statements (P-statements) organized by categories as per the latest regulations.",
    searchPlaceholder: "Search statements...",
    hStatementsTitle: "Hazard Statements (H-Statements)",
    pStatementsTitle: "Precautionary Statements (P-Statements)",
    codeHeader: "Code",
    statementHeader: "Statement",
    referenceTitle: "SDS Sections – Hazards identification",
    tip: "TIP – Important information to communicate and monitor",
    hGroups: {
      physical: {
        title: "200 - 299 Physical hazard",
        range: "200-299",
        statements: [
          { code: "H200", statement: "Unstable explosives." },
          { code: "H201", statement: "Explosive; mass explosion hazard." },
          { code: "H202", statement: "Explosive, severe projection hazard." },
          { code: "H203", statement: "Explosive; fire, blast or projection hazard." },
          { code: "H204", statement: "Fire or projection hazard." },
          { code: "H205", statement: "May mass explode in fire." },
          {
            code: "H206",
            statement:
              "Fire, blast or projection hazard; increased risk of explosion if desensitising agent is reduced.",
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
      health: {
        title: "300 - 399 Health hazard",
        range: "300-399",
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
      environmental: {
        title: "400 - 499 Environmental hazard",
        range: "400-499",
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
    },
    pGroups: {
      general: {
        title: "100 - 199 General",
        range: "100-199",
        statements: [
          { code: "P101", statement: "If medical advice is needed, have product container or label at hand." },
          { code: "P102", statement: "Keep out of reach of children." },
          { code: "P103", statement: "Read carefully and follow all instructions." },
        ],
      },
      prevention: {
        title: "200 - 299 Prevention",
        range: "200-299",
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
            statement:
              "Wear protective gloves/protective clothing/eye protection/face protection/hearing protection/...",
          },
          { code: "P282", statement: "Wear cold insulating gloves and either face shield or eye protection." },
          { code: "P283", statement: "Wear fire resistant or flame retardant clothing." },
          { code: "P284", statement: "[In case of inadequate ventilation] wear respiratory protection." },
        ],
      },
      response: {
        title: "300 - 399 Response",
        range: "300-399",
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
      storage: {
        title: "400 - 499 Storage",
        range: "400-499",
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
      disposal: {
        title: "500 - 599 Disposal",
        range: "500-599",
        statements: [
          { code: "P501", statement: "Dispose of contents/container to ..." },
          { code: "P502", statement: "Refer to manufacturer or supplier for information on recovery or recycling." },
          {
            code: "P503",
            statement: "Refer to manufacturer/ supplier/... for information on disposal/recovery/ recycling.",
          },
        ],
      },
    },
  },
  ar: {
    title: "قائمة بيانات المخاطر والاحتياطات",
    description:
      "قائمة كاملة ببيانات المخاطر (H-statements) وبيانات الاحتياطات (P-statements) منظمة حسب الفئات وفقاً لأحدث اللوائح.",
    searchPlaceholder: "البحث في البيانات...",
    hStatementsTitle: "بيانات المخاطر (H-Statements)",
    pStatementsTitle: "بيانات الاحتياطات (P-Statements)",
    codeHeader: "الرمز",
    statementHeader: "البيان",
    referenceTitle: "أقسام SDS – تحديد المخاطر",
    tip: "نصيحة – معلومات مهمة للتواصل والمراقبة",
    hGroups: {
      physical: {
        title: "200 - 299 مخاطر فيزيائية",
        range: "200-299",
        statements: [
          { code: "H200", statement: "متفجرات غير مستقرة." },
          { code: "H201", statement: "متفجر؛ خطر انفجار جماعي." },
          // ... existing Arabic H statements for physical hazards ...
        ],
      },
      health: {
        title: "300 - 399 مخاطر صحية",
        range: "300-399",
        statements: [
          { code: "H300", statement: "مميت إذا ابتُلع." },
          { code: "H301", statement: "سام إذا ابتُلع." },
          // ... existing Arabic H statements for health hazards ...
        ],
      },
      environmental: {
        title: "400 - 499 مخاطر بيئية",
        range: "400-499",
        statements: [
          { code: "H400", statement: "سام جداً للحياة المائية." },
          { code: "H410", statement: "سام جداً للحياة المائية مع آثار طويلة الأمد." },
          // ... existing Arabic H statements for environmental hazards ...
        ],
      },
    },
    pGroups: {
      general: {
        title: "100 - 199 عام",
        range: "100-199",
        statements: [
          {
            code: "P101",
            statement: "إذا كانت هناك حاجة لاستشارة طبية، احتفظ بحاوية المنتج أو الملصق في متناول اليد.",
          },
          { code: "P102", statement: "يُحفظ بعيداً عن متناول الأطفال." },
          { code: "P103", statement: "اقرأ بعناية واتبع جميع التعليمات." },
        ],
      },
      prevention: {
        title: "200 - 299 وقاية",
        range: "200-299",
        statements: [
          { code: "P201", statement: "احصل على تعليمات خاصة قبل الاستخدام." },
          { code: "P202", statement: "لا تتعامل مع المادة حتى يتم قراءة وفهم جميع احتياطات السلامة." },
          // ... existing Arabic P statements for prevention ...
        ],
      },
      response: {
        title: "300 - 399 استجابة",
        range: "300-399",
        statements: [
          { code: "P301", statement: "في حالة البلع:" },
          { code: "P302", statement: "في حالة ملامسة الجلد:" },
          // ... existing Arabic P statements for response ...
        ],
      },
      storage: {
        title: "400 - 499 تخزين",
        range: "400-499",
        statements: [
          { code: "P401", statement: "احفظ وفقاً لـ..." },
          { code: "P402", statement: "احفظ في مكان جاف." },
          // ... existing Arabic P statements for storage ...
        ],
      },
      disposal: {
        title: "500 - 599 تخلص",
        range: "500-599",
        statements: [
          { code: "P501", statement: "تخلص من المحتويات/الحاوية في ..." },
          {
            code: "P502",
            statement: "ارجع إلى الشركة المصنعة أو المورد للحصول على معلومات حول الاسترداد أو إعادة التدوير.",
          },
          {
            code: "P503",
            statement: "ارجع إلى الشركة المصنعة/المورد/... للحصول على معلومات حول التخلص/الاسترداد/إعادة التدوير.",
          },
        ],
      },
    },
  },
}

export default function HazardsPrecautionaryStatementsPage() {
  const { currentLanguage } = useLanguage()
  const content = hazardsPrecautionaryContent[currentLanguage]
  const [searchTerm, setSearchTerm] = useState("")
  const [activeSection, setActiveSection] = useState<"h" | "p">("h")

  const getFilteredStatements = (groups: any) => {
    const allStatements = Object.values(groups).flatMap((group: any) => group.statements)
    return allStatements.filter(
      (statement: any) =>
        statement.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        statement.statement.toLowerCase().includes(searchTerm.toLowerCase()),
    )
  }

  const renderGroupedStatements = (groups: any, colorClass: string) => {
    return Object.entries(groups).map(([key, group]: [string, any]) => {
      const filteredStatements = group.statements.filter(
        (statement: any) =>
          statement.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          statement.statement.toLowerCase().includes(searchTerm.toLowerCase()),
      )

      if (searchTerm && filteredStatements.length === 0) return null

      return (
        <Collapsible key={key} defaultOpen className="space-y-2">
          <CollapsibleTrigger asChild>
            <Button
              variant="outline"
              className={`w-full justify-between text-left p-4 h-auto ${colorClass} hover:opacity-80`}
            >
              <div>
                <div className="font-semibold text-white">{group.title}</div>
                <div className="text-sm text-white/80">
                  {searchTerm ? `${filteredStatements.length} statements` : `${group.statements.length} statements`}
                </div>
              </div>
              <span className="text-white">▼</span>
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className={colorClass}>
                    <TableHead className="text-white font-bold w-24">{content.codeHeader}</TableHead>
                    <TableHead className="text-white font-bold">{content.statementHeader}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {(searchTerm ? filteredStatements : group.statements).map((statement: any, index: number) => (
                    <TableRow
                      key={statement.code}
                      className={
                        index % 2 === 0 ? `${colorClass.replace("bg-", "bg-").replace("-600", "-50")}` : "bg-white"
                      }
                    >
                      <TableCell
                        className={`font-mono font-semibold ${colorClass.replace("bg-", "text-").replace("-600", "-700")}`}
                      >
                        {statement.code}
                      </TableCell>
                      <TableCell>{statement.statement}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )
    })
  }

  return (
    <Card dir={currentLanguage === "ar" ? "rtl" : "ltr"} className="bg-white text-gray-900 border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">{content.title}</CardTitle>
        <p className="text-gray-600">{content.description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Input */}
        <div className="flex gap-4 items-center">
          <Input
            placeholder={content.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          <div className="flex gap-2">
            <Button
              variant={activeSection === "h" ? "default" : "outline"}
              onClick={() => setActiveSection("h")}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              H-Statements
            </Button>
            <Button
              variant={activeSection === "p" ? "default" : "outline"}
              onClick={() => setActiveSection("p")}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              P-Statements
            </Button>
          </div>
        </div>

        {activeSection === "h" && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-blue-600">{content.hStatementsTitle}</h3>
            <div className="space-y-4">{renderGroupedStatements(content.hGroups, "bg-blue-600")}</div>
          </div>
        )}

        {activeSection === "p" && (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-green-600">{content.pStatementsTitle}</h3>
            <div className="space-y-4">{renderGroupedStatements(content.pGroups, "bg-green-600")}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
