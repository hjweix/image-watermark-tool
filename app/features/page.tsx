"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Download, Palette, MapPin, Clock, Star, CheckCircle } from "lucide-react"
import Header from "@/components/header"
import { useLanguage } from "@/contexts/language-context"

export default function FeaturesPage() {
  const { t } = useLanguage()

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: t.featuresBatchProcessing,
      description: t.batchProcessingDetails,
      details: t.batchProcessingDetailsList,
    },
    {
      icon: <Palette className="w-8 h-8 text-purple-500" />,
      title: t.professionalTemplates,
      description: t.professionalTemplatesDetails,
      details: t.professionalTemplatesDetailsList,
    },
    {
      icon: <MapPin className="w-8 h-8 text-green-500" />,
      title: t.featuresExifExtraction,
      description: t.exifExtractionDetails,
      details: t.exifExtractionDetailsList,
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: t.privacyProtection,
      description: t.privacyProtectionDetails,
      details: t.privacyProtectionDetailsList,
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: t.livePreview,
      description: t.livePreviewDetails,
      details: t.livePreviewDetailsList,
    },
    {
      icon: <Download className="w-8 h-8 text-indigo-500" />,
      title: t.highQualityOutput,
      description: t.highQualityOutputDetails,
      details: t.highQualityOutputDetailsList,
    },
  ]

  const useCases = [
    {
      title: t.engineeringUseCase,
      description: t.engineeringUseCaseDetails,
      icon: "🏗️",
      scenarios: t.engineeringUseCaseScenarios,
    },
    {
      title: t.checkInUseCase,
      description: t.checkInUseCaseDetails,
      icon: "⏰",
      scenarios: t.checkInUseCaseScenarios,
    },
    {
      title: t.travelLogUseCase,
      description: t.travelLogUseCaseDetails,
      icon: "✈️",
      scenarios: t.travelLogUseCaseScenarios,
    },
    {
      title: t.growthLogUseCase,
      description: t.growthLogUseCaseDetails,
      icon: "👶",
      scenarios: t.growthLogUseCaseScenarios,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 核心功能 */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.coreFeaturesTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.coreFeaturesSubtitle}</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.useCasesTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{t.useCasesSubtitle}</p>
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
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.techAdvantagesTitle}</h2>
            <p className="text-gray-600">{t.techAdvantagesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t.highPerformance}</h3>
              <p className="text-gray-600 text-sm">{t.highPerformanceDetails}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t.privacyAdvantage}</h3>
              <p className="text-gray-600 text-sm">{t.privacyAdvantageDetails}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t.userExperience}</h3>
              <p className="text-gray-600 text-sm">{t.userExperienceDetails}</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
