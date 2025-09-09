"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useLanguage } from "@/context/language-context"

const ghsCommunicationPictograms = {
  en: [
    {
      hazard: "Flame over Circle (Oxidizing)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QHNs9gDp72NgGcldS7ZXZ5XTMNLdZH.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>Oxidizing Gases, Category 1</li>
          <li>Oxidizing Liquids, Categories 1, 2, 3</li>
          <li>Oxidizing Solids, Categories 1, 2, 3</li>
        </ul>
      ),
    },
    {
      hazard: "Flame (Flammable)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BqSUSEfIEAOblBI9GYbmg93UXEkkyi.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>Flammable gases, category 1</li>
          <li>Flammable aerosols, categories 1, 2</li>
          <li>Flammable liquids, categories 1, 2, 3</li>
          <li>Flammable solids, categories 1, 2</li>
          <li>Self-reactive substances and mixtures, types B, C, D, E, F</li>
          <li>Pyrophoric liquids, category 1</li>
          <li>Pyrophoric solids, category 1</li>
          <li>Self-heating substances and mixtures, categories 1, 2</li>
          <li>Substances and mixtures which, in contact with water, emit flammable gases, categories 1, 2, 3</li>
          <li>Organic peroxides, types B, C, D, E, F</li>
        </ul>
      ),
    },
    {
      hazard: "Skull/Crossbones (Toxic)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kj0AM6GcGjya3NDjdBr7Hw4An8dLa1.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>Acute Toxicity (oral, dermal, inhalation), Categories 1, 2, 3</li>
        </ul>
      ),
    },
    {
      hazard: "Gas Cylinder (Compressed Gas)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zN4DbQltdfLgI5IVnhFY96elUxfuiV.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>Compressed Gases</li>
          <li>Liquefied Gases</li>
          <li>Refrigerated Liquefied Gases</li>
          <li>Dissolved Gases</li>
        </ul>
      ),
    },
    {
      hazard: "Exclamation Mark (Harmful)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fMQrYZagKChCQJEIQVGdqO5dFhRlh0.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>Acute Toxicity (oral, dermal, inhalation), Category 4</li>
          <li>Skin Irritation, Categories 2, 3</li>
          <li>Eye Irritation, Category 2A</li>
          <li>Skin Sensitization, Category 1</li>
          <li>Specific Target Organ Toxicity Following Single Exposure, Category 3</li>
          <li>Respiratory Tract Irritation</li>
          <li>Narcotic Effects</li>
        </ul>
      ),
    },
    {
      hazard: "Environment (Environmental Hazard)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UXJan1K0ptjvUxCOsfTBx3Zc1Sr2ir.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>Acute hazards to the aquatic environment, category 1</li>
          <li>Chronic hazards to the aquatic environment, categories 1, 2</li>
        </ul>
      ),
    },
    {
      hazard: "Health Hazard (Serious Health Hazard)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XriQ8bZ0YRNc0JJta5ylJdwSwXFt5z.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>Respiratory Sensitization, Category 1</li>
          <li>Germ Cell Mutagenicity, Categories 1A, 1B, 2</li>
          <li>Carcinogenicity, Categories 1A, 1B, 2</li>
          <li>Reproductive toxicity, categories 1A, 1B, 2</li>
          <li>Specific Target Organ Toxicity Following Single Exposure, Categories 1, 2</li>
          <li>Specific Target Organ Toxicity Following Repeated Exposure, Categories 1, 2</li>
          <li>Aspiration Hazard, Categories 1, 2</li>
        </ul>
      ),
    },
    {
      hazard: "Exploding Bomb (Explosive)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vYtSuuKga3kCMjuIbxfGphJjAFik1l.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>Unstable Explosives</li>
          <li>Explosives, Divisions 1.1, 1.2, 1.3, 1.4</li>
          <li>Self-reactive Substances and Mixtures, Types A, B</li>
          <li>Organic peroxides, types A, B</li>
        </ul>
      ),
    },
    {
      hazard: "Corrosion (Corrosive)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yfvZVqCBTxzo6MfyVY4CQwY1nSuLDD.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>Corrosive to Metals, Category 1</li>
          <li>Skin Corrosion, Categories 1A, 1B, 1C</li>
          <li>Serious Eye Damage, Category 1</li>
        </ul>
      ),
    },
  ],
  ar: [
    {
      hazard: "لهب فوق دائرة (مؤكسد)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QHNs9gDp72NgGcldS7ZXZ5XTMNLdZH.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>غازات مؤكسدة، الفئة 1</li>
          <li>سوائل مؤكسدة، الفئات 1، 2، 3</li>
          <li>مواد صلبة مؤكسدة، الفئات 1، 2، 3</li>
        </ul>
      ),
    },
    {
      hazard: "لهب (قابل للاشتعال)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BqSUSEfIEAOblBI9GYbmg93UXEkkyi.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>غازات قابلة للاشتعال، الفئة 1</li>
          <li>هباءات قابلة للاشتعال، الفئات 1، 2</li>
          <li>سوائل قابلة للاشتعال، الفئات 1، 2، 3</li>
          <li>مواد صلبة قابلة للاشتعال، الفئات 1، 2</li>
          <li>مواد ومخاليط ذاتية التفاعل، أنواع B، C، D، E، F</li>
          <li>سوائل بيروفورية، الفئة 1</li>
          <li>مواد صلبة بيروفورية، الفئة 1</li>
          <li>مواد ومخاليط ذاتية التسخين، الفئات 1، 2</li>
          <li>مواد ومخاليط تنبعث منها غازات قابلة للاشتعال عند ملامستها للماء، الفئات 1، 2، 3</li>
          <li>بيروكسيدات عضوية، أنواع B، C، D، E، F</li>
        </ul>
      ),
    },
    {
      hazard: "جمجمة/عظمتان متقاطعتان (سام)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kj0AM6GcGjya3NDjdBr7Hw4An8dLa1.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>سمية حادة (عن طريق الفم، الجلد، الاستنشاق)، الفئات 1، 2، 3</li>
        </ul>
      ),
    },
    {
      hazard: "أسطوانة غاز (غاز مضغوط)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zN4DbQltdfLgI5IVnhFY96elUxfuiV.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>غازات مضغوطة</li>
          <li>غازات مسالة</li>
          <li>غازات مسالة مبردة</li>
          <li>غازات مذابة</li>
        </ul>
      ),
    },
    {
      hazard: "علامة تعجب (ضار)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fMQrYZagKChCQJEIQVGdqO5dFhRlh0.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>سمية حادة (عن طريق الفم، الجلد، الاستنشاق)، الفئة 4</li>
          <li>تهيج الجلد، الفئات 2، 3</li>
          <li>تهيج العين، الفئة 2A</li>
          <li>تحسس الجلد، الفئة 1</li>
          <li>سمية عضوية مستهدفة محددة تعرض واحد، الفئة 3</li>
          <li>تهيج الجهاز التنفسي</li>
          <li>تأثيرات مخدرة</li>
        </ul>
      ),
    },
    {
      hazard: "بيئة (خطر بيئي)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UXJan1K0ptjvUxCOsfTBx3Zc1Sr2ir.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>مخاطر حادة للبيئة المائية، الفئة 1</li>
          <li>مخاطر مزمنة للبيئة المائية، الفئات 1، 2</li>
        </ul>
      ),
    },
    {
      hazard: "خطر صحي (خطر صحي خطير)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-XriQ8bZ0YRNc0JJta5ylJdwSwXFt5z.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>تحسس الجهاز التنفسي، الفئة 1</li>
          <li>تطفير الخلايا الجرثومية، الفئات 1A، 1B، 2</li>
          <li>السرطان، الفئات 1A، 1B، 2</li>
          <li>السمية التناسلية، الفئات 1A، 1B، 2</li>
          <li>سمية عضوية مستهدفة محددة بعد التعرض الفردي، الفئات 1، 2</li>
          <li>سمية عضوية مستهدفة محددة بعد التعرض المتكرر، الفئات 1، 2</li>
          <li>خطر الشفط، الفئات 1، 2</li>
        </ul>
      ),
    },
    {
      hazard: "قنبلة متفجرة (متفجر)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vYtSuuKga3kCMjuIbxfGphJjAFik1l.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>متفجرات غير مستقرة</li>
          <li>متفجرات، الأقسام 1.1، 1.2، 1.3، 1.4</li>
          <li>مواد ومخاليط ذاتية التفاعل، أنواع A، B</li>
          <li>بيروكسيدات عضوية، أنواع A، B</li>
        </ul>
      ),
    },
    {
      hazard: "تآكل (أكال)",
      pictogram: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yfvZVqCBTxzo6MfyVY4CQwY1nSuLDD.png",
      description: (
        <ul className="list-disc list-inside space-y-1">
          <li>مادة أكالة للمعادن، الفئة 1</li>
          <li>تآكل الجلد، الفئات 1A، 1B، 1C</li>
          <li>تلف خطير للعين، الفئة 1</li>
        </ul>
      ),
    },
  ],
}

export default function GHSPage() {
  const { currentLanguage } = useLanguage()
  const pictograms = ghsCommunicationPictograms[currentLanguage]

  return (
    <Card dir={currentLanguage === "ar" ? "rtl" : "ltr"} className="bg-white text-gray-900 border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">
          {currentLanguage === "en" ? "Hazard Communication Standard Pictogram" : "رموز معيار توصيل المخاطر التوضيحية"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p>
          {currentLanguage === "en"
            ? `The Hazard Communication Standard (HCS) requires pictograms on labels to alert users of the chemical hazards
        to which they may be exposed. The pictogram on the label is determined by the chemical hazard classification.
        The pictogram consists of a symbol on a white background framed within a red border and represents a distinct
        hazard(s).`
            : `يتطلب معيار توصيل المخاطر (HCS) وجود رموز توضيحية على الملصقات لتنبيه المستخدمين إلى المخاطر الكيميائية
        التي قد يتعرضون لها. يتم تحديد الرمز التوضيحي على الملصق بناءً على تصنيف الخطر الكيميائي. يتكون الرمز التوضيحي
        من رمز على خلفية بيضاء محاطة بحد أحمر ويمثل خطرًا أو مخاطر مميزة.`}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pictograms.map((item) => (
            <div key={item.hazard} className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={item.pictogram || "/placeholder.svg"}
                  alt={`${item.hazard} pictogram`}
                  width={64}
                  height={64}
                />
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">{item.hazard}</h3>
                <div className="text-sm mt-1">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
