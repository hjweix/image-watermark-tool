"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { useLanguage } from "@/contexts/language-context"

export default function HelpPage() {
  const { t } = useLanguage()

  const faqs = [
    {
      question: t.faq1Question,
      answer: t.faq1Answer,
    },
    {
      question: t.faq2Question,
      answer: t.faq2Answer,
    },
    {
      question: t.faq3Question,
      answer: t.faq3Answer,
    },
    {
      question: t.faq4Question,
      answer: t.faq4Answer,
    },
    {
      question: t.faq5Question,
      answer: t.faq5Answer,
    },
    {
      question: t.faq6Question,
      answer: t.faq6Answer,
    },
  ]

  const steps = [
    {
      step: 1,
      title: t.uploadStepTitle,
      description: t.uploadStepDesc,
      tips: t.uploadStepTips,
    },
    {
      step: 2,
      title: t.selectTemplateStepTitle,
      description: t.selectTemplateStepDesc,
      tips: t.selectTemplateStepTips,
    },
    {
      step: 3,
      title: t.setContentStepTitle,
      description: t.setContentStepDesc,
      tips: t.setContentStepTips,
    },
    {
      step: 4,
      title: t.adjustStyleStepTitle,
      description: t.adjustStyleStepDesc,
      tips: t.adjustStyleStepTips,
    },
    {
      step: 5,
      title: t.batchProcessStepTitle,
      description: t.batchProcessStepDesc,
      tips: t.batchProcessStepTips,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 使用教程 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.tutorialTitle}</h2>

          <div className="space-y-6">
            {steps.map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    <CardTitle className="text-xl">{step.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {step.tips.map((tip, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {tip}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 常见问题 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{t.faqTitle}</h2>

          <Card>
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* 联系支持 */}
        <section className="mt-16 text-center">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.moreHelpTitle}</h3>
              <p className="text-gray-600 mb-6">{t.moreHelpDesc}</p>
              <div className="flex justify-center space-x-4">
                <Badge variant="outline" className="px-4 py-2">
                  📧 support@PhotoStamper.com
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  💬 {t.onlineService}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
