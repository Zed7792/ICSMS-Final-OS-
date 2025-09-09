"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"

const sdsOverviewContent = {
  en: {
    title: "What is a Safety Data Sheet (SDS)?",
    paragraph1: `A Safety Data Sheet (SDS), or Material Safety Data Sheet (MSDS), is a standardized document that contains
          crucial occupational safety and health information. It is mandated by the International Hazard Communication
          Standard (HCS). According to this standard, chemical manufacturers must communicate the hazard information of
          their chemicals to those who handle them, and one way to achieve this is by providing a Safety Data Sheet.
          These sheets are comprehensive and cover essential details such as chemical properties, potential health and
          environmental hazards, recommended protective measures, as well as safety precautions for proper storage,
          handling, and transportation of chemicals.`,
    ghsTitle: "Globally Harmonized System",
    ghsParagraph: `The Globally Harmonized System (GHS) is a comprehensive set of international guidelines developed by the
          United Nations. Its primary objective is to ensure the safe manufacturing, handling, use, disposal, and
          transportation of hazardous materials. The GHS system serves several key purposes:`,
    ghsList: [
      `Classification of Chemical Data and Hazard Criteria: The GHS provides a standardized approach to classifying
            chemical substances and mixtures based on their inherent hazards. This classification helps in identifying
            and communicating the potential risks associated with specific chemicals.`,
      `Identification of Health, Physical, and Environmental Hazards: By utilizing the GHS, it becomes possible to
            identify and understand the health, physical, and environmental hazards posed by a particular chemical. This
            information is crucial for ensuring proper handling, storage, and disposal practices.`,
      `Communication of Hazard Information and Protective Measures: The GHS establishes a well-defined system that
            enables chemical manufacturers and distributors to effectively communicate the hazards associated with their
            products. This includes providing clear information on recommended protective measures to minimize risks.`,
    ],
    sdsStructureTitle: "SDS Structure and Format",
    sdsStructureParagraph: `Safety Data Sheets (SDS) follow a standardized structure consisting of sixteen sections. These sections are
          designed to provide quick access to essential information necessary for chemical handlers to ensure safe
          handling practices and to aid emergency response personnel. Here is an overview of the different sections:`,
    sdsStructureList: [
      `Sections 1-8: These early sections focus on providing key information that may be required urgently. They
            cover topics such as identification, hazards, composition, first aid measures, and firefighting measures.`,
      `Sections 9-11: These sections contain technical and scientific data related to the chemical substance or
            mixture. Information regarding stability, reactivity, physical and chemical properties, and other relevant
            data is included here.`,
      `Sections 12-15: While not mandatory, these sections are necessary to achieve full compliance with the
            Globally Harmonized System (GHS). They typically cover additional information on ecological, disposal
            considerations, transportation, and regulatory information.`,
      `Section 16: The final section provides details about the SDS itself. It includes information such as the
            revision date and any changes made since the previous version.`,
    ],
    oshaLinkText: "OSHA's Hazard Communication Standard for Safety Data Sheets",
    sdsEmployersTitle: "SDS Information for Employers",
    sdsEmployersParagraph: `Employers must ensure that employees have access to safety data sheets for all of the hazardous chemicals they
          handle. Employers may fulfill this requirement in a variety of ways. For example, SDS binders are quite common
          as are computer-based SDS databases. What's important is that employees have access to the safety data sheets
          for all of the chemicals that they are using. If the employer does not have an SDS for one of these chemicals
          they should contact the manufacturer to obtain the current version of the SDS for that chemical. In this
          sense, the online SDS databases have a clear advantage over binder-based systems since the database vendor
          usually takes care of indexing and updating the safety data sheets.`,
  },
  ar: {
    title: "ما هي صحيفة بيانات السلامة (SDS)؟",
    paragraph1: `صحيفة بيانات السلامة (SDS)، أو صحيفة بيانات سلامة المواد (MSDS)، هي وثيقة موحدة تحتوي على معلومات حاسمة حول السلامة والصحة المهنية. وهي إلزامية بموجب معيار توصيل المخاطر الدولي (HCS). ووفقًا لهذا المعيار، يجب على مصنعي المواد الكيميائية توصيل معلومات المخاطر الخاصة بموادهم الكيميائية إلى من يتعاملون معها، وإحدى طرق تحقيق ذلك هي توفير صحيفة بيانات السلامة. هذه الصحائف شاملة وتغطي تفاصيل أساسية مثل الخصائص الكيميائية، والمخاطر الصحية والبيئية المحتملة، وتدابير الحماية الموصى بها، بالإضافة إلى احتياطات السلامة للتخزين والمناولة والنقل الصحيح للمواد الكيميائية.`,
    ghsTitle: "النظام المنسق عالمياً",
    ghsParagraph: `النظام المنسق عالمياً (GHS) هو مجموعة شاملة من المبادئ التوجيهية الدولية التي وضعتها الأمم المتحدة. هدفه الأساسي هو ضمان التصنيع الآمن، والمناولة، والاستخدام، والتخلص، ونقل المواد الخطرة. يخدم نظام GHS عدة أغراض رئيسية:`,
    ghsList: [
      `تصنيف البيانات الكيميائية ومعايير المخاطر: يوفر نظام GHS نهجًا موحدًا لتصنيف المواد الكيميائية والمخاليط بناءً على مخاطرها الكامنة. يساعد هذا التصنيف في تحديد وتوصيل المخاطر المحتملة المرتبطة بمواد كيميائية محددة.`,
      `تحديد المخاطر الصحية والفيزيائية والبيئية: باستخدام نظام GHS، يصبح من الممكن تحديد وفهم المخاطر الصحية والفيزيائية والبيئية التي تشكلها مادة كيميائية معينة. هذه المعلومات حاسمة لضمان ممارسات المناولة والتخزين والتخلص الصحيحة.`,
      `توصيل معلومات المخاطر وتدابير الحماية: ينشئ نظام GHS نظامًا محددًا جيدًا يمكّن مصنعي وموزعي المواد الكيميائية من توصيل المخاطر المرتبطة بمنتجاتهم بفعالية. يتضمن ذلك توفير معلومات واضحة حول تدابير الحماية الموصى بها لتقليل المخاطر.`,
    ],
    sdsStructureTitle: "هيكل وتنسيق صحيفة بيانات السلامة",
    sdsStructureParagraph: `تتبع صحائف بيانات السلامة (SDS) هيكلاً موحدًا يتكون من ستة عشر قسمًا. تم تصميم هذه الأقسام لتوفير وصول سريع إلى المعلومات الأساسية اللازمة لمتعاملي المواد الكيميائية لضمان ممارسات المناولة الآمنة ومساعدة موظفي الاستجابة للطوارئ. فيما يلي نظرة عامة على الأقسام المختلفة:`,
    sdsStructureList: [
      `الأقسام 1-8: تركز هذه الأقسام المبكرة على توفير المعلومات الرئيسية التي قد تكون مطلوبة بشكل عاجل. وهي تغطي مواضيع مثل التعريف، والمخاطر، والتركيب، وتدابير الإسعافات الأولية، وتدابير مكافحة الحرائق.`,
      `الأقسام 9-11: تحتوي هذه الأقسام على بيانات فنية وعلمية تتعلق بالمادة الكيميائية أو الخليط. يتم تضمين معلومات حول الاستقرار، والتفاعلية، والخصائص الفيزيائية والكيميائية، وغيرها من البيانات ذات الصلة هنا.`,
      `الأقسام 12-15: على الرغم من أنها ليست إلزامية، إلا أن هذه الأقسام ضرورية لتحقيق الامتثال الكامل للنظام المنسق عالمياً (GHS). وهي تغطي عادةً معلومات إضافية حول الاعتبارات البيئية، والتخلص، والنقل، والمعلومات التنظيمية.`,
      `القسم 16: يوفر القسم الأخير تفاصيل حول صحيفة بيانات السلامة نفسها. ويتضمن معلومات مثل تاريخ المراجعة وأي تغييرات تم إجراؤها منذ الإصدار السابق.`,
    ],
    oshaLinkText: "OSHA's Hazard Communication Standard for Safety Data Sheets", // Link text remains English
    sdsEmployersTitle: "معلومات صحيفة بيانات السلامة لأصحاب العمل",
    sdsEmployersParagraph: `يجب على أصحاب العمل التأكد من أن الموظفين لديهم إمكانية الوصول إلى صحائف بيانات السلامة لجميع المواد الكيميائية الخطرة التي يتعاملون معها. يمكن لأصحاب العمل تلبية هذا الشرط بطرق متنوعة. على سبيل المثال، تعتبر مجلدات صحائف بيانات السلامة شائعة جدًا وكذلك قواعد بيانات صحائف بيانات السلامة القائمة على الكمبيوتر. المهم هو أن يكون لدى الموظفين إمكانية الوصول إلى صحائف بيانات السلامة لجميع المواد الكيميائية التي يستخدمونها. إذا لم يكن لدى صاحب العمل صحيفة بيانات سلامة لإحدى هذه المواد الكيميائية، فيجب عليه الاتصال بالشركة المصنعة للحصول على الإصدار الحالي من صحيفة بيانات السلامة لتلك المادة الكيميائية. وبهذا المعنى، تتمتع قواعد بيانات صحائف بيانات السلامة عبر الإنترنت بميزة واضحة على الأنظمة القائمة على المجلدات حيث يتولى بائع قاعدة البيانات عادةً فهرسة وتحديث صحائف بيانات السلامة.`,
  },
}

export default function SDSOverviewPage() {
  const { currentLanguage } = useLanguage()
  const content = sdsOverviewContent[currentLanguage]

  return (
    <Card dir={currentLanguage === "ar" ? "rtl" : "ltr"} className="bg-white text-gray-900 border-gray-200">
      <CardHeader>
        <CardTitle className="text-gray-900">{content.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>{content.paragraph1}</p>

        <h3 className="text-lg font-semibold text-gray-900">{content.ghsTitle}</h3>
        <p>{content.ghsParagraph}</p>
        <ol className="list-decimal list-inside space-y-1">
          {content.ghsList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>

        <h3 className="text-lg font-semibold text-gray-900">{content.sdsStructureTitle}</h3>
        <p>{content.sdsStructureParagraph}</p>
        <ul className="list-disc list-inside space-y-1">
          {content.sdsStructureList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <p>
          {currentLanguage === "en" ? "You may visit " : "يمكنك زيارة "}
          <a
            href="https://www.osha.gov/hazcom/sds"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            {content.oshaLinkText}
          </a>
          {currentLanguage === "en" ? ", for more information." : "، لمزيد من المعلومات."}
        </p>

        <h3 className="text-lg font-semibold text-gray-900">{content.sdsEmployersTitle}</h3>
        <p>{content.sdsEmployersParagraph}</p>
      </CardContent>
    </Card>
  )
}
