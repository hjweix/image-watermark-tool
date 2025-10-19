"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { useTranslations } from 'next-intl'

export default function HelpPage() {
  const t = useTranslations()
  const helpT = useTranslations('help')

  const faqs = [
    {
      question: helpT('faq1Question'),
      answer: helpT('faq1Answer'),
    },
    {
      question: helpT('faq2Question'),
      answer: helpT('faq2Answer'),
    },
    {
      question: helpT('faq3Question'),
      answer: helpT('faq3Answer'),
    },
    {
      question: helpT('faq4Question'),
      answer: helpT('faq4Answer'),
    },
    {
      question: helpT('faq5Question'),
      answer: helpT('faq5Answer'),
    },
    {
      question: helpT('faq6Question'),
      answer: helpT('faq6Answer'),
    },
  ]

  const steps = [
    {
      step: 1,
      title: helpT('uploadStepTitle'),
      description: helpT('uploadStepDesc'),
      tips: helpT('uploadStepTips'),
    },
    {
      step: 2,
      title: helpT('selectTemplateStepTitle'),
      description: helpT('selectTemplateStepDesc'),
      tips: helpT('selectTemplateStepTips'),
    },
    {
      step: 3,
      title: helpT('setContentStepTitle'),
      description: helpT('setContentStepDesc'),
      tips: helpT('setContentStepTips'),
    },
    {
      step: 4,
      title: helpT('adjustStyleStepTitle'),
      description: helpT('adjustStyleStepDesc'),
      tips: helpT('adjustStyleStepTips'),
    },
    {
      step: 5,
      title: helpT('batchProcessStepTitle'),
      description: helpT('batchProcessStepDesc'),
      tips: helpT('batchProcessStepTips'),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 使用教程 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{helpT('tutorialTitle')}</h2>

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
                    <Badge variant="outline" className="text-xs">
                      {step.tips}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 常见问题 */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">{helpT('faqTitle')}</h2>

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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{helpT('moreHelpTitle')}</h3>
              <p className="text-gray-600 mb-6">{helpT('moreHelpDesc')}</p>
              <div className="flex justify-center space-x-4">
                <a href="https://x.com/hjwwei" target="_blank" rel="noopener noreferrer">
                  <Badge variant="outline" className="px-4 py-2 hover:bg-blue-50 transition-colors cursor-pointer">
                    🐦 Twitter
                  </Badge>
                </a>
                {/* <Badge variant="outline" className="px-4 py-2">
                  💬 {t.onlineService}
                </Badge> */}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
