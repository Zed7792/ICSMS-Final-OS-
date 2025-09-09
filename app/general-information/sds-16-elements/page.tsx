"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useLanguage } from "@/context/language-context"

const sds16ElementsContent = {
  en: {
    title: "SDS 16 Elements",
    description: `Safety Data Sheets (SDS) are structured into 16 standardized sections to provide comprehensive information
      on hazardous substances and mixtures. This structure ensures consistency and ease of access to critical data for
      safe handling, storage, and emergency response.`,
    tableHeaders: {
      mainSections: "Main Sections",
      subSections: "Sub-Sections",
    },
    sections: [
      {
        main: "1. Identification of the substance/mixture and of the company/undertaking.",
        sub: [
          "1. Product Identifier.",
          "2. Relevant identified uses of the substance or mixture and uses advised against.",
          "3. Details of the supplier of the safety data sheet.",
          "4. Emergency telephone number.",
        ],
      },
      {
        main: "2. Hazards identification.",
        sub: ["1. Classification of the substance or mixture.", "2. Label elements.", "3. Other hazards."],
      },
      {
        main: "3. Composition/information on ingredients.",
        sub: ["1. Substances.", "2. Mixtures."],
      },
      {
        main: "4. First-aid measures.",
        sub: [
          "1. Description of first-aid measures.",
          "2. Most important symptoms and effects, both acute and delayed.",
          "3. Indication of any immediate medical attention and special treatment needed.",
        ],
      },
      {
        main: "5. Firefighting measures.",
        sub: [
          "1. Extinguishing media.",
          "2. Special hazards arising from the substance or mixture.",
          "3. Advice for firefighters.",
        ],
      },
      {
        main: "6. Accidental release measures.",
        sub: [
          "1. Personal precautions, protective equipment and emergency procedures.",
          "2. Environmental precautions.",
          "3. Methods and material for containment and cleaning up.",
          "4. Reference to other sections.",
        ],
      },
      {
        main: "7. Handling and storage.",
        sub: [
          "1. Precautions for safe handling.",
          "2. Conditions for safe storage, including any incompatibilities.",
          "3. Specific end use(s).",
        ],
      },
      {
        main: "8. Exposure controls/personal protection.",
        sub: ["1. Control parameters.", "2. Exposure controls."],
      },
      {
        main: "9. Physical and chemical properties.",
        sub: ["1. Information on basic physical and chemical properties.", "2. Other information."],
      },
      {
        main: "10. Stability and reactivity.",
        sub: [
          "1. Reactivity.",
          "2. Chemical stability.",
          "3. Possibility of hazardous reactions.",
          "4. Conditions to avoid.",
          "5. Incompatible materials.",
          "6. Hazardous decomposition products.",
        ],
      },
      {
        main: "11. Toxicological information.",
        sub: ["1. Information on toxicological effects."],
      },
      {
        main: "12. Ecological information.",
        sub: [
          "1. Toxicity.",
          "2. Persistence and degradability.",
          "3. Bio-accumulative potential.",
          "4. Mobility in soil.",
          "5. Results of PBT and vPvB assessment.",
          "6. Other adverse effects.",
        ],
      },
      {
        main: "13. Disposal considerations.",
        sub: ["1. Waste treatment methods."],
      },
      {
        main: "14. Transport information.",
        sub: [
          "1. UN number.",
          "2. UN proper shipping name.",
          "3. Transport hazard class(es).",
          "4. Packing group.",
          "5. Environmental hazards.",
          "6. Special precautions for the user.",
          "7. Transport in bulk according to Annex II of MARPOL73/78 and the IBC Code.",
        ],
      },
      {
        main: "15. Regulatory information.",
        sub: [
          "1. Safety, health and environmental regulations/legislation specific for the substance or mixture.",
          "2. Chemical safety assessment.",
        ],
      },
      {
        main: "16. Other information.",
        sub: [],
      },
    ],
  },
  ar: {
    title: "عناصر صحيفة بيانات السلامة الـ 16",
    description: `تُصمم صحائف بيانات السلامة (SDS) في 16 قسمًا موحدًا لتوفير معلومات شاملة
      عن المواد والمخاليط الخطرة. يضمن هذا الهيكل الاتساق وسهولة الوصول إلى البيانات الهامة لـ
      المناولة والتخزين والاستجابة للطوارئ بشكل آمن.`,
    tableHeaders: {
      mainSections: "الأقسام الرئيسية",
      subSections: "الأقسام الفرعية",
    },
    sections: [
      {
        main: "1. تحديد المادة/الخليط والشركة/المؤسسة.",
        sub: [
          "1. معرف المنتج.",
          "2. الاستخدامات المحددة ذات الصلة للمادة أو الخليط والاستخدامات الموصى بها.",
          "3. تفاصيل مورد صحيفة بيانات السلامة.",
          "4. رقم هاتف الطوارئ.",
        ],
      },
      {
        main: "2. تحديد المخاطر.",
        sub: ["1. تصنيف المادة أو الخليط.", "2. عناصر الملصق.", "3. مخاطر أخرى."],
      },
      {
        main: "3. التركيب/معلومات عن المكونات.",
        sub: ["1. المواد.", "2. المخاليط."],
      },
      {
        main: "4. تدابير الإسعافات الأولية.",
        sub: [
          "1. وصف تدابير الإسعافات الأولية.",
          "2. أهم الأعراض والآثار، الحادة والمتأخرة.",
          "3. إشارة إلى أي عناية طبية فورية وعلاج خاص مطلوب.",
        ],
      },
      {
        main: "5. تدابير مكافحة الحرائق.",
        sub: ["1. وسائط الإطفاء.", "2. مخاطر خاصة تنشأ عن المادة أو الخليط.", "3. نصائح لرجال الإطفاء."],
      },
      {
        main: "6. تدابير الإطلاق العرضي.",
        sub: [
          "1. الاحتياطات الشخصية، معدات الحماية وإجراءات الطوارئ.",
          "2. الاحتياطات البيئية.",
          "3. طرق ومواد الاحتواء والتنظيف.",
          "4. الإشارة إلى أقسام أخرى.",
        ],
      },
      {
        main: "7. المناولة والتخزين.",
        sub: [
          "1. احتياطات المناولة الآمنة.",
          "2. شروط التخزين الآمن، بما في ذلك أي تعارضات.",
          "3. استخدامات نهائية محددة.",
        ],
      },
      {
        main: "8. ضوابط التعرض/الحماية الشخصية.",
        sub: ["1. معايير التحكم.", "2. ضوابط التعرض."],
      },
      {
        main: "9. الخصائص الفيزيائية والكيميائية.",
        sub: ["1. معلومات عن الخصائص الفيزيائية والكيميائية الأساسية.", "2. معلومات أخرى."],
      },
      {
        main: "10. الاستقرار والتفاعلية.",
        sub: [
          "1. التفاعلية.",
          "2. الاستقرار الكيميائي.",
          "3. إمكانية حدوث تفاعلات خطرة.",
          "4. الظروف التي يجب تجنبها.",
          "5. المواد غير المتوافقة.",
          "6. منتجات التحلل الخطرة.",
        ],
      },
      {
        main: "11. معلومات السمية.",
        sub: ["1. معلومات عن الآثار السمية."],
      },
      {
        main: "12. معلومات بيئية.",
        sub: [
          "1. السمية.",
          "2. الثباتية والقابلية للتحلل.",
          "3. إمكانية التراكم البيولوجي.",
          "4. الحركة في التربة.",
          "5. نتائج تقييم PBT و vPvB assessment.",
          "6. آثار سلبية أخرى.",
        ],
      },
      {
        main: "13. اعتبارات التخلص.",
        sub: ["1. طرق معالجة النفايات."],
      },
      {
        main: "14. معلومات النقل.",
        sub: [
          "1. UN number.",
          "2. UN proper shipping name.",
          "3. Transport hazard class(es).",
          "4. Packing group.",
          "5. Environmental hazards.",
          "6. Special precautions for the user.",
          "7. Transport in bulk according to Annex II of MARPOL73/78 and the IBC Code.",
        ],
      },
      {
        main: "15. Regulatory information.",
        sub: [
          "1. Safety, health and environmental regulations/legislation specific for the substance or mixture.",
          "2. Chemical safety assessment.",
        ],
      },
      {
        main: "16. Other information.",
        sub: [],
      },
    ],
  },
}

export default function SDS16ElementsPage() {
  const { currentLanguage } = useLanguage()
  const content = sds16ElementsContent[currentLanguage]

  return (
    <Card dir={currentLanguage === "ar" ? "rtl" : "ltr"} className="bg-white text-gray-900 border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">{content.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{content.description}</p>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-amber-900">
                <TableHead className="min-w-[250px] font-bold text-white">
                  {content.tableHeaders.mainSections}
                </TableHead>
                <TableHead className="min-w-[350px] font-bold text-white">{content.tableHeaders.subSections}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.sections.map((section, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <TableCell className="font-semibold text-gray-900 align-top py-3">{section.main}</TableCell>
                  <TableCell className="py-3 text-gray-700">
                    {section.sub.length > 0 ? (
                      <ul className="list-decimal list-inside space-y-1">
                        {section.sub.map((subItem, subIndex) => (
                          <li key={subIndex}>{subItem}</li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-500">N/A</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
