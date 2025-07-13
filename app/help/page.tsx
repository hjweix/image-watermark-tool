import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "使用帮助 - 图片水印工具使用教程和常见问题 | PhotoStamper",
  description:
    "详细的使用教程和常见问题解答，帮助您快速掌握图片水印工具的使用方法。包含操作步骤、模板选择、参数设置等完整指南。",
  keywords: "水印工具教程,使用帮助,常见问题,操作指南,水印制作教程,图片处理帮助",
}

export default function HelpPage() {
  const faqs = [
    {
      question: "如何批量处理多张图片？",
      answer:
        "您可以通过拖拽或点击上传区域选择多张图片，然后在右侧设置好水印样式和内容，最后点击应用到所有图片按钮即可批量处理。",
    },
    {
      question: "支持哪些图片格式？",
      answer: "支持常见的图片格式包括：JPG、JPEG、PNG、WebP、BMP等。推荐使用JPG或PNG格式以获得最佳效果。",
    },
    {
      question: "图片会上传到服务器吗？",
      answer: "不会。所有图片处理都在您的浏览器本地完成，图片数据不会上传到我们的服务器，完全保护您的隐私安全。",
    },
    {
      question: "如何自定义水印内容？",
      answer:
        "选择模板后，在内容设置标签页中可以自定义各种信息，如时间、地点、项目名称等。不同模板有不同的可设置字段。",
    },
    {
      question: "处理后的图片质量会下降吗？",
      answer: "我们采用高质量的图片处理算法，尽可能保持原图质量。您也可以在设置中调整输出质量参数。",
    },
    {
      question: "可以保存自定义的模板设置吗？",
      answer: "目前暂不支持保存自定义模板，但您可以使用浏览器的书签功能保存当前页面状态，下次访问时会保留部分设置。",
    },
  ]

  const steps = [
    {
      step: 1,
      title: "上传图片",
      description: "拖拽图片到上传区域或点击选择文件，支持批量上传多张图片",
      tips: ["支持JPG、PNG等常见格式", "建议图片大小不超过10MB", "可同时上传多张图片"],
    },
    {
      step: 2,
      title: "选择模板",
      description: "根据使用场景选择合适的水印模板，如工程记录、打卡签到等",
      tips: ["每个模板有不同的样式风格", "模板针对特定场景优化", "可实时预览效果"],
    },
    {
      step: 3,
      title: "设置内容",
      description: "在内容设置中填写相关信息，如项目名称、地点、时间等",
      tips: ["必填字段用红色星号标记", "支持自定义时间和地点", "可添加备注信息"],
    },
    {
      step: 4,
      title: "调整样式",
      description: "在样式设置中调整字体、颜色、位置等参数，实时预览效果",
      tips: ["支持多种字体选择", "可调整透明度和圆角", "位置支持9个方向"],
    },
    {
      step: 5,
      title: "批量处理",
      description: "点击应用到所有图片开始批量处理，处理完成后可下载结果",
      tips: ["显示处理进度", "支持单张下载", "可打包下载所有图片"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">使用帮助</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              详细的使用教程和常见问题解答，帮助您快速上手图片水印工具
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 使用教程 */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">使用教程</h2>

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
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">常见问题</h2>

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
              <h3 className="text-2xl font-bold text-gray-900 mb-4">需要更多帮助？</h3>
              <p className="text-gray-600 mb-6">如果您遇到其他问题或有功能建议，欢迎联系我们</p>
              <div className="flex justify-center space-x-4">
                <Badge variant="outline" className="px-4 py-2">
                  📧 support@PhotoStamper.com
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  💬 在线客服
                </Badge>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
