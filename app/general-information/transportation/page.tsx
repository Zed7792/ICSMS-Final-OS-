"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useLanguage } from "@/context/language-context"

const transportationContent = {
  en: {
    title: "GHS Transportation Classes",
    classes: [
      {
        class: "Class 1: Explosives",
        divisions: [
          {
            division: "Division 1.1, 1.2, 1.3",
            pictogram: "/images/adr/ADR_1.png",
            category: "Explosives",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>Division 1.1: Substances and articles which have a mass explosion hazard</li>
                <li>
                  Division 1.2: Substances and articles which have a projection hazard but not a mass explosion hazard
                </li>
                <li>
                  Division 1.3: Substances and articles which have a fire hazard and either a minor blast hazard or a
                  minor projection hazard or both, but not a mass explosion hazard
                </li>
              </ul>
            ),
          },
          {
            division: "Division 1.4",
            pictogram: "/images/adr/ADR_1.4.png",
            category: "Explosives",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Substances and articles which are classified as explosives but which present no significant hazard
                </li>
              </ul>
            ),
          },
          {
            division: "Division 1.5",
            pictogram: "/images/adr/ADR_1.5.png",
            category: "Explosives",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>Very insensitive substances which have a mass explosion hazard</li>
              </ul>
            ),
          },
          {
            division: "Division 1.6",
            pictogram: "/images/adr/ADR_1.6.png",
            category: "Explosives",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>No hazard statement</li>
              </ul>
            ),
          },
        ],
      },
      {
        class: "Class 2: Gases",
        divisions: [
          {
            division: "Division 2.1",
            pictogram: "/images/adr/ADR_2.1.png",
            category: "Flammable Gas",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>Gases which at 20 °C and a standard pressure of 101.3 kPa:</li>
                <ul className="list-disc list-inside ml-4">
                  <li>are ignitable when in a mixture of 13 per cent or less by volume with air; or</li>
                  <li>
                    have a flammable range with air of at least 12 percentage points regardless of the lower flammable
                    limit.
                  </li>
                </ul>
              </ul>
            ),
          },
          {
            division: "Division 2.2",
            pictogram: "/images/adr/ADR_2.2.png",
            category: "Non-Flammable Non-toxic Gases",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Gases which are asphyxiant — gases which dilute or replace the oxygen normally in the atmosphere.
                </li>
                <li>
                  Gases which are oxidizing — gases which may, generally by providing oxygen, cause or contribute to the
                  combustion of other material more than air does.
                </li>
                <li>Gases which do not come under the other Divisions.</li>
              </ul>
            ),
          },
          {
            division: "Division 2.3",
            pictogram: "/images/adr/ADR_2.3.png",
            category: "Toxic Gases",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>Gases which are known to be so toxic or corrosive to humans as to pose a hazard to health.</li>
                <li>
                  Gases which are presumed to be toxic or corrosive to humans because they have an LC50 value equal to
                  or less than 5000 ml/m3 (ppm).
                </li>
              </ul>
            ),
          },
        ],
      },
      {
        class: "Classes 3 and 4: Flammable Liquids and Solids",
        divisions: [
          {
            division: "Class 3",
            pictogram: "/images/adr/ADR_3.png",
            category: "Flammable Liquids",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Liquids which have a flash point of less than 60 °C and which are capable of sustaining combustion.
                </li>
              </ul>
            ),
          },
          {
            division: "Division 4.1",
            pictogram: "/images/adr/ADR_4.1.webp",
            category: "Flammable Solids, Self-reactive Substances and Solid Desensitized Explosives",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Solids which, under conditions encountered in transport, are readily combustible or may cause or
                  contribute to fire through friction; self-reactive substances which are liable to undergo a strongly
                  exothermic reaction; solid desensitized explosives which may explode if not diluted sufficiently.
                </li>
              </ul>
            ),
          },
          {
            division: "Division 4.2",
            pictogram: "/images/adr/ADR_4.2.png",
            category: "Substances Liable to Spontaneous Combustion",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Substances which are liable to spontaneous heating under normal conditions encountered in transport,
                  or to heating up in contact with air, and being then liable to catch fire.
                </li>
              </ul>
            ),
          },
          {
            division: "Division 4.3",
            pictogram: "/images/adr/ADR_4.3.png",
            category: "Substances Which in Contact with Water Emit Flammable Gases",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Substances which, by interaction with water, are liable to become spontaneously flammable or to give
                  off flammable gases in dangerous quantities.
                </li>
              </ul>
            ),
          },
        ],
      },
      {
        class: "Other GHS Transport Classes",
        divisions: [
          {
            division: "Division 5.1",
            pictogram: "/images/adr/ADR_5.1.png",
            category: "Oxidizing Substances",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Substances which, while in themselves not necessarily combustible, may, generally by yielding oxygen,
                  cause, or contribute to, the combustion of other material.
                </li>
              </ul>
            ),
          },
          {
            division: "Division 5.2",
            pictogram: "/images/adr/UN_transport_5.2.png",
            category: "Organic Peroxides",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Organic substances which contain the bivalent –O–O– structure and may be considered derivatives of
                  hydrogen peroxide, where one or both of the hydrogen atoms have been replaced by organic radicals.
                </li>
              </ul>
            ),
          },
          {
            division: "Division 6.1",
            pictogram: "/images/adr/UN_transport_6.png",
            category: "Toxic Substances",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Substances with an LD50 value ≤ 300 mg/kg (oral) or ≤ 1000 mg/kg (dermal) or an LC50 value ≤ 4000
                  ml/m3 (inhalation of dusts or mists)
                </li>
              </ul>
            ),
          },
          {
            division: "Division 6.2",
            pictogram: "/images/adr/ADR_6.2_new.png",
            category: "Infectious Substances",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Substances known or reasonably expected to contain pathogens that can cause disease in humans or
                  animals.
                </li>
              </ul>
            ),
          },
        ],
      },
      {
        class: "Class 7: Radioactive Material",
        divisions: [
          {
            division: "Category I (White)",
            pictogram: "/images/adr/ADR_7A.png",
            category: "Radioactive Material - Category I",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Radioactive material with the lowest level of radioactivity. Transport Index = 0, surface dose rate ≤
                  0.005 mSv/h.
                </li>
              </ul>
            ),
          },
          {
            division: "Category II (Yellow)",
            pictogram: "/images/adr/ADR_7B.png",
            category: "Radioactive Material - Category II",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Radioactive material with moderate level of radioactivity. Transport Index ≤ 1, surface dose rate ≤
                  0.5 mSv/h.
                </li>
              </ul>
            ),
          },
          {
            division: "Category III (Yellow)",
            pictogram: "/images/adr/ADR_7C.png",
            category: "Radioactive Material - Category III",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Radioactive material with the highest level of radioactivity. Transport Index ≤ 10, surface dose rate
                  ≤ 2 mSv/h.
                </li>
              </ul>
            ),
          },
          {
            division: "Fissile",
            pictogram: "/images/adr/ADR_7E.png",
            category: "Fissile Radioactive Material",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Radioactive material containing fissile nuclides that require criticality safety controls during
                  transport.
                </li>
              </ul>
            ),
          },
        ],
      },
      {
        class: "Class 8 and 9: Corrosive and Miscellaneous",
        divisions: [
          {
            division: "Class 8",
            pictogram: "/images/adr/UN_transport_8.png",
            category: "Corrosive Substances",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Substances which cause full thickness destruction of intact skin tissue on exposure time of less than
                  4 hours.
                </li>
                <li>
                  Substances which exhibit a corrosion rate of more than 6.25 mm per year on either steel or aluminium
                  surfaces at 55 °C.
                </li>
              </ul>
            ),
          },
          {
            division: "Class 9",
            pictogram: "/images/adr/ADR_9_new.png",
            category: "Miscellaneous Dangerous Substances and Articles",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>Substances and articles which, during transport, present a danger not covered by other classes.</li>
              </ul>
            ),
          },
        ],
      },
    ],
  },
  ar: {
    title: "فئات النقل وفقًا لنظام GHS",
    classes: [
      {
        class: "الفئة 1: المتفجرات",
        divisions: [
          {
            division: "القسم 1.1، 1.2، 1.3",
            pictogram: "/images/adr/ADR_1.png",
            category: "متفجرات",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>القسم 1.1: مواد ومواد لها خطر انفجار جماعي</li>
                <li>القسم 1.2: مواد ومواد لها خطر قذف ولكن ليس خطر انفجار جماعي</li>
                <li>
                  القسم 1.3: مواد ومواد لها خطر حريق وخطر انفجار طفيف أو خطر قذف طفيف أو كلاهما، ولكن ليس خطر انفجار
                  جماعي
                </li>
              </ul>
            ),
          },
          {
            division: "القسم 1.4",
            pictogram: "/images/adr/ADR_1.4.png",
            category: "متفجرات",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>مواد ومواد مصنفة كمتفجرات ولكنها لا تشكل خطرًا كبيرًا</li>
              </ul>
            ),
          },
          {
            division: "القسم 1.5",
            pictogram: "/images/adr/ADR_1.5.png",
            category: "متفجرات",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>مواد شديدة الحساسية ولها خطر انفجار جماعي</li>
              </ul>
            ),
          },
          {
            division: "القسم 1.6",
            pictogram: "/images/adr/ADR_1.6.png",
            category: "متفجرات",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>لا يوجد بيان خطر</li>
              </ul>
            ),
          },
        ],
      },
      {
        class: "الفئة 2: الغازات",
        divisions: [
          {
            division: "القسم 2.1",
            pictogram: "/images/adr/ADR_2.1.png",
            category: "غاز قابل للاشتعال",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>الغازات التي عند 20 درجة مئوية وضغط قياسي 101.3 كيلو باسكال:</li>
                <ul className="list-disc list-inside ml-4">
                  <li>قابلة للاشتعال عندما تكون في خليط بنسبة 13 بالمائة أو أقل من حيث الحجم مع الهواء؛ أو</li>
                  <li>
                    لديها نطاق قابلية للاشتعال مع الهواء لا يقل عن 12 نقطة مئوية بغض النظر عن الحد الأدنى للاشتعال.
                  </li>
                </ul>
              </ul>
            ),
          },
          {
            division: "القسم 2.2",
            pictogram: "/images/adr/ADR_2.2.png",
            category: "غازات غير قابلة للاشتعال وغير سامة",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>الغازات الخانقة — الغازات التي تخفف أو تحل محل الأكسجين الموجود عادة في الغلاف الجوي.</li>
                <li>
                  الغازات المؤكسدة — الغازات التي قد تسبب أو تساهم في احتراق مواد أخرى أكثر من الهواء، عادة عن طريق
                  توفير الأكسجين.
                </li>
                <li>الغازات التي لا تندرج تحت الأقسام الأخرى.</li>
              </ul>
            ),
          },
          {
            division: "القسم 2.3",
            pictogram: "/images/adr/ADR_2.3.png",
            category: "غازات سامة",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>الغازات المعروفة بأنها سامة أو أكالة للبشر لدرجة تشكل خطرًا على الصحة.</li>
                <li>
                  الغازات التي يُفترض أنها سامة أو أكالة للبشر لأن لديها قيمة LC50 تساوي أو تقل عن 5000 مل/م3 (جزء في
                  المليون).
                </li>
              </ul>
            ),
          },
        ],
      },
      {
        class: "الفئات 3 و 4: السوائل والمواد الصلبة القابلة للاشتعال",
        divisions: [
          {
            division: "الفئة 3",
            pictogram: "/images/adr/ADR_3.png",
            category: "سوائل قابلة للاشتعال",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>السوائل التي لديها نقطة وميض أقل من 60 درجة مئوية والتي تكون قادرة على استمرار الاحتراق.</li>
              </ul>
            ),
          },
          {
            division: "القسم 4.1",
            pictogram: "/images/adr/ADR_4.1.webp",
            category: "مواد صلبة قابلة للاشتعال، مواد ذاتية التفاعل ومتفجرات منزوعة الحساسية صلبة",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  المواد الصلبة التي، في الظروف التي تواجهها في النقل، تكون قابلة للاحتراق بسهولة أو قد تسبب أو تساهم في
                  الحريق عن طريق الاحتكاك؛ المواد ذاتية التفاعل التي تكون عرضة للخضوع لتفاعل طارد للحرارة بقوة؛
                  المتفجرات الصلبة منزوعة الحساسية التي قد تنفجر إذا لم يتم تخفيفها بشكل كافٍ.
                </li>
              </ul>
            ),
          },
          {
            division: "القسم 4.2",
            pictogram: "/images/adr/ADR_4.2.png",
            category: "مواد عرضة للاحتراق التلقائي",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  المواد التي تكون عرضة للتسخين التلقائي في الظروف العادية التي تواجهها في النقل، أو للتسخين عند
                  ملامستها للهواء، وبالتالي تكون عرضة للاشتعال.
                </li>
              </ul>
            ),
          },
          {
            division: "القسم 4.3",
            pictogram: "/images/adr/ADR_4.3.png",
            category: "مواد تنبعث منها غازات قابلة للاشتعال عند ملامستها للماء",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  المواد التي، بالتفاعل مع الماء، تكون عرضة للاشتعال التلقائي أو لإطلاق غازات قابلة للاشتعال بكميات
                  خطيرة.
                </li>
              </ul>
            ),
          },
        ],
      },
      {
        class: "فئات النقل الأخرى وفقًا لنظام GHS",
        divisions: [
          {
            division: "القسم 5.1",
            pictogram: "/images/adr/ADR_5.1.png",
            category: "مواد مؤكسدة",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  المواد التي، على الرغم من أنها ليست بالضرورة قابلة للاحتراق بحد ذاتها، قد تسبب أو تساهم في احتراق مواد
                  أخرى، عادة عن طريق إطلاق الأكسجين.
                </li>
              </ul>
            ),
          },
          {
            division: "القسم 5.2",
            pictogram: "/images/adr/UN_transport_5.2.png",
            category: "بيروكسيدات عضوية",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  المواد العضوية التي تحتوي على بنية –O–O– ثنائية التكافؤ ويمكن اعتبارها مشتقات من بيروكسيد الهيدروجين،
                  حيث تم استبدال ذرة هيدروجين واحدة أو كلتاهما بجذور عضوية.
                </li>
              </ul>
            ),
          },
          {
            division: "القسم 6.1",
            pictogram: "/images/adr/UN_transport_6.png",
            category: "مواد سامة",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  المواد التي لديها قيمة LD50 ≤ 300 ملغم/كغم (عن طريق الفم) أو ≤ 1000 ملغم/كغم (عن طريق الجلد) أو قيمة
                  LC50 ≤ 4000 مل/م3 (استنشاق الغبار أو الضباب)
                </li>
              </ul>
            ),
          },
          {
            division: "القسم 6.2",
            pictogram: "/images/adr/ADR_6.2_new.png",
            category: "مواد معدية",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  المواد المعروفة أو المتوقع بشكل معقول أن تحتوي على مسببات الأمراض التي يمكن أن تسبب المرض في البشر أو
                  الحيوانات.
                </li>
              </ul>
            ),
          },
        ],
      },
      {
        class: "الفئة 7: المواد المشعة",
        divisions: [
          {
            division: "الفئة الأولى (أبيض)",
            pictogram: "/images/adr/ADR_7A.png",
            category: "مواد مشعة - الفئة الأولى",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  مواد مشعة بأقل مستوى من النشاط الإشعاعي. مؤشر النقل = 0، معدل الجرعة السطحية ≤ 0.005 مللي سيفرت/ساعة.
                </li>
              </ul>
            ),
          },
          {
            division: "الفئة الثانية (أصفر)",
            pictogram: "/images/adr/ADR_7B.png",
            category: "مواد مشعة - الفئة الثانية",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  مواد مشعة بمستوى متوسط من النشاط الإشعاعي. مؤشر النقل ≤ 1، معدل الجرعة السطحية ≤ 0.5 مللي سيفرت/ساعة.
                </li>
              </ul>
            ),
          },
          {
            division: "الفئة الثالثة (أصفر)",
            pictogram: "/images/adr/ADR_7C.png",
            category: "مواد مشعة - الفئة الثالثة",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>
                  مواد مشعة بأعلى مستوى من النشاط الإشعاعي. مؤشر النقل ≤ 10، معدل الجرعة السطحية ≤ 2 مللي سيفرت/ساعة.
                </li>
              </ul>
            ),
          },
          {
            division: "انشطارية",
            pictogram: "/images/adr/ADR_7E.png",
            category: "مواد مشعة انشطارية",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>مواد مشعة تحتوي على نويدات انشطارية تتطلب ضوابط أمان الحرجية أثناء النقل.</li>
              </ul>
            ),
          },
        ],
      },
      {
        class: "الفئة 8 و 9: المواد الأكالة والمتنوعة",
        divisions: [
          {
            division: "الفئة 8",
            pictogram: "/images/adr/UN_transport_8.png",
            category: "مواد أكالة",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>المواد التي تسبب تدميرًا كاملاً لسمك الأنسجة الجلدية السليمة عند التعرض لمدة تقل عن 4 ساعات.</li>
                <li>
                  المواد التي تظهر معدل تآكل يزيد عن 6.25 مم سنويًا على أسطح الصلب أو الألومنيوم عند 55 درجة مئوية.
                </li>
              </ul>
            ),
          },
          {
            division: "الفئة 9",
            pictogram: "/images/adr/ADR_9_new.png",
            category: "مواد ومواد خطيرة متنوعة",
            description: (
              <ul className="list-disc list-inside space-y-1">
                <li>المواد والمواد التي، أثناء النقل، تشكل خطرًا لا تغطيه الفئات الأخرى.</li>
              </ul>
            ),
          },
        ],
      },
    ],
  },
}

export default function TransportationPage() {
  const { currentLanguage } = useLanguage()
  const content = transportationContent[currentLanguage]

  return (
    <Card dir={currentLanguage === "ar" ? "rtl" : "ltr"} className="bg-white text-gray-900 border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">{content.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {content.classes.map((ghsClass) => (
          <div key={ghsClass.class}>
            <h2 className="text-xl font-bold text-gray-900 mb-4">{ghsClass.class}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ghsClass.divisions.map((division) => (
                <div key={division.division} className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={division.pictogram || "/placeholder.svg"}
                      alt={`${division.division} pictogram`}
                      width={64}
                      height={64}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{division.division}</h3>
                    <p className="text-sm font-semibold text-gray-600">{division.category}</p>
                    <div className="text-sm mt-1">{division.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
