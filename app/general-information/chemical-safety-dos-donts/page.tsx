"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useLanguage } from "@/context/language-context"

const chemicalSafetyContent = {
  en: {
    title: "Chemical Safety Dos and Don'ts",
    dosHeader: "Dos",
    dontsHeader: "Don't",
    items: [
      {
        do: "Read the product label and follow directions, as instructed.",
        dont: "Assume a safety data sheet can be used as a chemical risk assessment. It can't!",
      },
      {
        do: "Store chemicals in a cool, dry, well-ventilated area.",
        dont: "Mix different chemical products together - unless you know, for certain, that it is safe to do so.",
      },
      {
        do: "Wear appropriate personal protective equipment as listed on the label.",
        dont: "Dispose of chemical products, or their containers, in standard waste bins.",
      },
      {
        do: "Keep spilt materials isolated, and follow label directions for clean-up and disposal.",
        dont: "Dispose of spilt materials or unused products in the trash or sewer.",
      },
      {
        do: "Always follow the product label and safety data sheet instructions regarding disposal.",
        dont: "Put spilt materials back into their original container.",
      },
      {
        do: "Keep containers covered to protect chemical products from moisture and other contaminants.",
        dont: "Overstock chemicals.",
      },
      {
        do: "Ensure you have emergency plans and conduct regular drills.",
        dont: "Keep leaking or damaged containers.",
      },
      {
        do: "Where possible, buy only the amount of a substance you will need and use.",
        dont: "Remove chemicals from their original containers.",
      },
      {
        do: "Use up any leftover materials you have before buying new.",
        dont: "", // No direct "don't" for this "do" in the screenshot
      },
    ],
  },
  ar: {
    title: "إرشادات السلامة الكيميائية: ما يجب فعله وما لا يجب فعله",
    dosHeader: "ما يجب فعله",
    dontsHeader: "ما لا يجب فعله",
    items: [
      {
        do: "اقرأ ملصق المنتج واتبع التعليمات، كما هو موضح.",
        dont: "لا تفترض أن صحيفة بيانات السلامة يمكن استخدامها كتقييم للمخاطر الكيميائية. لا يمكن ذلك!",
      },
      {
        do: "قم بتخزين المواد الكيميائية في منطقة باردة وجافة وجيدة التهوية.",
        dont: "لا تخلط منتجات كيميائية مختلفة معًا - إلا إذا كنت متأكدًا من أنها آمنة للقيام بذلك.",
      },
      {
        do: "ارتدِ معدات الوقاية الشخصية المناسبة كما هو مذكور على الملصق.",
        dont: "لا تتخلص من المنتجات الكيميائية، أو حاوياتها، في صناديق النفايات العادية.",
      },
      {
        do: "حافظ على المواد المنسكبة معزولة، واتبع تعليمات الملصق للتنظيف والتخلص.",
        dont: "لا تتخلص من المواد المنسكبة أو المنتجات غير المستخدمة في سلة المهملات أو المجاري.",
      },
      {
        do: "اتبع دائمًا ملصق المنتج وتعليمات صحيفة بيانات السلامة فيما يتعلق بالتخلص.",
        dont: "لا تعيد المواد المنسكبة إلى حاويتها الأصلية.",
      },
      {
        do: "حافظ على الحاويات مغطاة لحماية المنتجات الكيميائية من الرطوبة والملوثات الأخرى.",
        dont: "لا تفرط في تخزين المواد الكيميائية.",
      },
      {
        do: "تأكد من وجود خطط طوارئ وإجراء تدريبات منتظمة.",
        dont: "لا تحتفظ بحاويات متسربة أو تالفة.",
      },
      {
        do: "حيثما أمكن، اشترِ فقط الكمية التي ستحتاجها وتستخدمها من المادة.",
        dont: "لا تقم بإزالة المواد الكيميائية من حاوياتها الأصلية.",
      },
      {
        do: "استخدم أي مواد متبقية لديك قبل شراء مواد جديدة.",
        dont: "",
      },
    ],
  },
}

export default function ChemicalSafetyDosDontsPage() {
  const { currentLanguage } = useLanguage()
  const content = chemicalSafetyContent[currentLanguage]

  return (
    <Card dir={currentLanguage === "ar" ? "rtl" : "ltr"} className="bg-white text-gray-900 border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">{content.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="bg-green-700 text-white font-bold text-center min-w-[250px]">
                  {content.dosHeader}
                </TableHead>
                <TableHead className="bg-red-700 text-white font-bold text-center min-w-[250px]">
                  {content.dontsHeader}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {content.items.map((item, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                  <TableCell className="py-3 align-top">
                    <ul className="list-disc list-inside space-y-1">
                      <li>{item.do}</li>
                    </ul>
                  </TableCell>
                  <TableCell className="py-3 align-top">
                    {item.dont ? (
                      <ul className="list-disc list-inside space-y-1">
                        <li>
                          {item.dont.includes("It can't!") ? (
                            <>
                              {item.dont.split("It can't!")[0]}
                              <span className="font-bold text-red-400">{"It can't!"}</span>
                            </>
                          ) : (
                            item.dont
                          )}
                        </li>
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
