import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Download, Palette, MapPin, Clock, Star, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "功能特色 - 专业图片水印工具功能介绍 | PhotoStamper",
  description:
    "了解PhotoStamper的强大功能：批量水印处理、多种专业模板、EXIF信息提取、自定义样式、隐私保护等。适用于工程记录、打卡签到、旅行日志等多种场景。",
  keywords: "水印工具功能,批量水印,专业模板,EXIF提取,自定义水印,隐私保护,工程水印,打卡水印",
}

export default function FeaturesPage() {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "批量处理",
      description: "一次上传多张图片，批量添加水印，大幅提升工作效率",
      details: ["支持同时处理100+张图片", "智能队列管理", "进度实时显示", "一键下载所有结果"],
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      title: "专业模板",
      description: "10+种专业模板，覆盖工程、打卡、旅行、成长等多种场景",
      details: ["工程记录模板", "打卡签到模板", "旅行日志模板", "宝贝成长模板", "专业标记模板"],
    },
    {
      icon: <MapPin className="w-8 h-8 text-green-500" />,
      title: "EXIF信息提取",
      description: "自动提取图片的拍摄时间、地理位置等元数据信息",
      details: ["拍摄时间自动识别", "GPS坐标提取", "相机参数读取", "智能信息填充"],
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: "隐私保护",
      description: "所有处理在本地完成，图片不上传服务器，保护您的隐私安全",
      details: ["本地处理技术", "零数据上传", "即用即走", "安全可靠"],
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: "实时预览",
      description: "所见即所得的实时预览，调整参数立即看到效果",
      details: ["实时渲染预览", "参数即时调整", "效果立即可见", "高清预览支持"],
    },
    {
      icon: <Download className="w-8 h-8 text-indigo-500" />,
      title: "高质量输出",
      description: "支持高分辨率图片处理，保持原图质量不损失",
      details: ["4K分辨率支持", "无损质量处理", "多格式输出", "压缩比可调"],
    },
  ]

  const useCases = [
    {
      title: "工程建设",
      description: "为施工现场照片添加工程信息、时间地点水印",
      icon: "🏗️",
      scenarios: ["建筑施工记录", "工程进度跟踪", "质量检查记录", "安全监督文档"],
    },
    {
      title: "企业打卡",
      description: "员工打卡签到，添加时间地点部门信息",
      icon: "⏰",
      scenarios: ["上下班打卡", "外勤签到", "会议签到", "培训记录"],
    },
    {
      title: "旅行记录",
      description: "为旅行照片添加目的地、天气、心情等信息",
      icon: "✈️",
      scenarios: ["旅行日记", "景点打卡", "美食记录", "住宿体验"],
    },
    {
      title: "成长记录",
      description: "记录宝贝成长的每个重要时刻",
      icon: "👶",
      scenarios: ["成长里程碑", "日常记录", "亲子时光", "纪念相册"],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">功能特色</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              专业的图片水印工具，为不同行业和场景提供完整的水印解决方案
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 核心功能 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">核心功能</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">强大而易用的功能集合，满足您的各种水印需求</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-500">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 应用场景 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">应用场景</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">覆盖多个行业和使用场景，满足不同用户的专业需求</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{useCase.icon}</span>
                    <div>
                      <CardTitle className="text-xl">{useCase.title}</CardTitle>
                      <p className="text-gray-600 mt-1">{useCase.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {useCase.scenarios.map((scenario, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {scenario}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* 技术优势 */}
        <section className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">技术优势</h2>
            <p className="text-gray-600">基于现代Web技术，提供流畅、安全、高效的使用体验</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">高性能处理</h3>
              <p className="text-gray-600 text-sm">采用Canvas技术和Web Workers，实现高效的图片处理和渲染</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">隐私保护</h3>
              <p className="text-gray-600 text-sm">所有处理在浏览器本地完成，图片数据不会上传到服务器</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">用户体验</h3>
              <p className="text-gray-600 text-sm">响应式设计，支持桌面和移动设备，操作简单直观</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
