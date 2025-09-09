"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useLanguage } from "@/context/language-context"

const nfpaContent = {
  en: {
    title: "NFPA Hazard Awareness Chart",
    description: `The National Fire Protection Association (NFPA) 704 standard system for the identification of the hazards of materials for emergency response. It uses a diamond-shaped symbol with four colored sections to quickly identify the health, flammability, reactivity, and special hazards of materials.`,
    sections: {
      healthHazard: {
        title: "Health Hazard (Blue)",
        color: "Blue",
        ratings: [
          "4 - Deadly: Materials that on very short exposure could cause death or major residual injury",
          "3 - Extremely Hazardous: Materials that on short exposure could cause serious temporary or moderate residual injury",
          "2 - Hazardous: Materials that on intense or continued but not chronic exposure could cause temporary incapacitation or possible residual injury",
          "1 - Slightly Hazardous: Materials that on exposure would cause irritation with only minor residual injury",
          "0 - Normal Material: Materials that on exposure under fire conditions would offer no hazard beyond that of ordinary combustible material",
        ],
      },
      fireHazard: {
        title: "Fire Hazard (Red)",
        color: "Red",
        ratings: [
          "4 - Below 73°F / 22°C: Materials that will rapidly or completely vaporize at atmospheric pressure and normal ambient temperature",
          "3 - Below 100°F / 37°C: Liquids and solids that can be ignited under almost all ambient temperature conditions",
          "2 - Below 200°F / 93°C: Materials that must be moderately heated or exposed to relatively high ambient temperature before ignition can occur",
          "1 - Above 200°F / 93°C: Materials that must be preheated before ignition can occur",
          "0 - Will not burn: Materials that will not burn under typical fire conditions",
        ],
      },
      reactivity: {
        title: "Reactivity (Yellow)",
        color: "Yellow",
        ratings: [
          "4 - May Detonate: Materials that in themselves are readily capable of detonation or explosive decomposition at normal temperatures and pressures",
          "3 - May Detonate with Heat or Shock: Materials that in themselves are capable of detonation or explosive decomposition but require a strong initiating source",
          "2 - Violent Chemical Change: Materials that readily undergo violent chemical change at elevated temperatures and pressures",
          "1 - Not Stable if Heated: Materials that in themselves are normally stable, but which can become unstable at elevated temperatures and pressures",
          "0 - Stable: Materials that in themselves are normally stable, even under fire exposure conditions",
        ],
      },
      specificHazard: {
        title: "Specific Hazard (White)",
        color: "White",
        symbols: [
          "OXY - Oxidizer: Materials that possess oxidizing properties",
          "ACID - Acid: Materials that are acidic",
          "ALK - Alkali: Materials that are alkaline",
          "COR - Corrosive: Materials that are corrosive",
          "W - Use no water: Materials that are water-reactive",
          "☢ - Radiation: Materials that are radioactive",
        ],
      },
    },
  },
  ar: {
    title: "مخطط الوعي بمخاطر NFPA",
    description: `نظام معيار الجمعية الوطنية لحماية الحرائق (NFPA) 704 لتحديد مخاطر المواد للاستجابة للطوارئ. يستخدم رمزًا على شكل معين بأربعة أقسام ملونة لتحديد المخاطر الصحية وقابلية الاشتعال والتفاعلية والمخاطر الخاصة للمواد بسرعة.`,
    sections: {
      healthHazard: {
        title: "الخطر الصحي (أزرق)",
        color: "أزرق",
        ratings: [
          "4 - مميت: مواد يمكن أن تسبب الموت أو إصابة متبقية كبيرة عند التعرض لفترة قصيرة جداً",
          "3 - خطر شديد: مواد يمكن أن تسبب إصابة مؤقتة خطيرة أو إصابة متبقية متوسطة عند التعرض القصير",
          "2 - خطر: مواد يمكن أن تسبب عجزاً مؤقتاً أو إصابة متبقية محتملة عند التعرض المكثف أو المستمر",
          "1 - خطر طفيف: مواد يمكن أن تسبب تهيجاً مع إصابة متبقية طفيفة فقط عند التعرض",
          "0 - مادة عادية: مواد لا تشكل خطراً يتجاوز خطر المواد القابلة للاحتراق العادية في ظروف الحريق",
        ],
      },
      fireHazard: {
        title: "خطر الحريق (أحمر)",
        color: "أحمر",
        ratings: [
          "4 - أقل من 73 درجة فهرنهايت / 22 درجة مئوية: مواد تتبخر بسرعة أو بالكامل عند الضغط الجوي ودرجة الحرارة المحيطة العادية",
          "3 - أقل من 100 درجة فهرنهايت / 37 درجة مئوية: سوائل ومواد صلبة يمكن إشعالها في جميع ظروف درجة الحرارة المحيطة تقريباً",
          "2 - أقل من 200 درجة فهرنهايت / 93 درجة مئوية: مواد يجب تسخينها بشكل معتدل أو تعريضها لدرجة حرارة محيطة عالية نسبياً قبل حدوث الاشتعال",
          "1 - أعلى من 200 درجة فهرنهايت / 93 درجة مئوية: مواد يجب تسخينها مسبقاً قبل حدوث الاشتعال",
          "0 - لن تحترق: مواد لن تحترق في ظروف الحريق النموذجية",
        ],
      },
      reactivity: {
        title: "التفاعلية (أصفر)",
        color: "أصفر",
        ratings: [
          "4 - قد تنفجر: مواد قادرة بسهولة على الانفجار أو التحلل المتفجر في درجات الحرارة والضغوط العادية",
          "3 - قد تنفجر بالحرارة أو الصدمة: مواد قادرة على الانفجار أو التحلل المتفجر لكنها تتطلب مصدر تفجير قوي",
          "2 - تغيير كيميائي عنيف: مواد تخضع بسهولة لتغيير كيميائي عنيف في درجات الحرارة والضغوط المرتفعة",
          "1 - غير مستقرة إذا سُخنت: مواد مستقرة عادة بحد ذاتها، لكنها قد تصبح غير مستقرة في درجات الحرارة والضغوط المرتفعة",
          "0 - مستقرة: مواد مستقرة عادة بحد ذاتها، حتى في ظروف التعرض للحريق",
        ],
      },
      specificHazard: {
        title: "الخطر المحدد (أبيض)",
        color: "أبيض",
        symbols: [
          "OXY - مؤكسد: مواد تمتلك خصائص مؤكسدة",
          "ACID - حمض: مواد حمضية",
          "ALK - قلوي: مواد قلوية",
          "COR - أكال: مواد أكالة",
          "W - لا تستخدم الماء: مواد تتفاعل مع الماء",
          "☢ - إشعاع: مواد مشعة",
        ],
      },
    },
  },
}

export default function NFPAHazardAwarenessPage() {
  const { currentLanguage } = useLanguage()
  const content = nfpaContent[currentLanguage]

  return (
    <Card dir={currentLanguage === "ar" ? "rtl" : "ltr"} className="bg-white text-gray-900 border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">{content.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p>{content.description}</p>

        {/* NFPA Chart Image */}
        <div className="flex justify-center my-6">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-O2MffgusOYrXU23eOtSaTulC2OJm4z.png"
            alt="NFPA Hazard Awareness Chart"
            width={600}
            height={400}
            className="border border-gray-300 rounded-lg"
          />
        </div>

        {/* Detailed Explanations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Health Hazard */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-blue-600 flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded"></div>
              {content.sections.healthHazard.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {content.sections.healthHazard.ratings.map((rating, index) => (
                <li key={index} className="flex">
                  <span className="font-bold mr-2">{4 - index}:</span>
                  <span>{rating.split(": ")[1] || rating}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fire Hazard */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-red-600 flex items-center gap-2">
              <div className="w-4 h-4 bg-red-600 rounded"></div>
              {content.sections.fireHazard.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {content.sections.fireHazard.ratings.map((rating, index) => (
                <li key={index} className="flex">
                  <span className="font-bold mr-2">{4 - index}:</span>
                  <span>{rating.split(": ")[1] || rating}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Reactivity */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-yellow-600 flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-600 rounded"></div>
              {content.sections.reactivity.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {content.sections.reactivity.ratings.map((rating, index) => (
                <li key={index} className="flex">
                  <span className="font-bold mr-2">{4 - index}:</span>
                  <span>{rating.split(": ")[1] || rating}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specific Hazard */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-600 flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 border border-gray-600 rounded"></div>
              {content.sections.specificHazard.title}
            </h3>
            <ul className="space-y-2 text-sm">
              {content.sections.specificHazard.symbols.map((symbol, index) => (
                <li key={index} className="flex">
                  <span className="font-bold mr-2">•</span>
                  <span>{symbol}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
