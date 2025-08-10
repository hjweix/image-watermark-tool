"use client"

import type React from "react"
import { Settings, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"
import { templateConfigs, TemplateConfig } from "@/lib/templates"
import { SvgTemplateSelector } from "./SvgTemplateSelector"

type SettingsSectionProps = {
  selectedTemplate: string
  templateConfig: TemplateConfig
  applyTemplate: (templateKey: string) => void

  updateTemplateContent: (key: string, value: any) => void
  setTemplateConfig: (config: TemplateConfig) => void
  useSvg?: boolean
  onUseSvgChange?: (value: boolean) => void
}

export default function SettingsSection({
  selectedTemplate,
  templateConfig,
  applyTemplate,

  updateTemplateContent,
  setTemplateConfig,
  useSvg = false,
  onUseSvgChange,
}: SettingsSectionProps) {
  const { t } = useLanguage()
  const currentTemplateConfig = templateConfigs[selectedTemplate as keyof typeof templateConfigs]

  // Render template-specific content fields
  const renderContentFields = () => {
    if (!currentTemplateConfig) return null

    return currentTemplateConfig.contentFields.map((field) => {
      const value = templateConfig.content[field.key] ?? field.default
      // 检查是否是i18n key，如果是则使用翻译，否则使用原始标签
      const displayLabel = (t as any)[field.label] || field.label

      switch (field.type) {
        case "input":
          return (
            <div key={field.key}>
              <Label className="text-xs">
                {displayLabel} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Input
                type={field.inputType || "text"}
                step={field.step}
                placeholder={field.placeholder}
                value={value || ""}
                onChange={(e) => updateTemplateContent(field.key, e.target.value)}
                className="h-8"
                required={field.required}
              />
              {field.suffix && <span className="text-xs text-gray-500 ml-1">{field.suffix}</span>}
            </div>
          )

        case "textarea":
          return (
            <div key={field.key}>
              <Label className="text-xs">
                {displayLabel} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Textarea
                placeholder={field.placeholder}
                value={value || ""}
                onChange={(e) => updateTemplateContent(field.key, e.target.value)}
                className="min-h-[60px] text-xs"
                required={field.required}
              />
            </div>
          )

        case "select":
          return (
            <div key={field.key}>
              <Label className="text-xs">
                {displayLabel} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Select value={value || field.default} onValueChange={(val) => updateTemplateContent(field.key, val)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )

        case "checkbox":
          return (
            <div key={field.key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={field.key}
                checked={value ?? field.default}
                onChange={(e) => updateTemplateContent(field.key, e.target.checked)}
                className="w-4 h-4"
              />
              <Label htmlFor={field.key} className="text-xs">
                {displayLabel}
              </Label>
            </div>
          )

        case "date":
          return (
            <div key={field.key}>
              <Label className="text-xs">
                {displayLabel} {field.required && <span className="text-red-500">*</span>}
              </Label>
              <Input
                type="date"
                value={value || ""}
                onChange={(e) => updateTemplateContent(field.key, e.target.value)}
                className="h-8"
                required={field.required}
              />
            </div>
          )

        case "time":
          return (
            <div key={field.key}>
              <Label className="text-xs">{displayLabel}</Label>
              <Input
                type="time"
                step="1"
                value={value || ""}
                onChange={(e) => updateTemplateContent(field.key, e.target.value)}
                className="h-8"
              />
            </div>
          )

        case "datetime-local":
          return (
            <div key={field.key}>
              <Label className="text-xs">{displayLabel}</Label>
              <Input
                type="datetime-local"
                step="1"
                value={value || ""}
                onChange={(e) => updateTemplateContent(field.key, e.target.value)}
                className="h-8"
              />
            </div>
          )

        default:
          return null
      }
    })
  }



  return (
    <div className="xl:col-span-1">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            {t.settings}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="templates" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="templates" className="text-xs">
                {t.templates}
              </TabsTrigger>
              <TabsTrigger value="content" className="text-xs">
                {t.content}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {Object.entries(templateConfigs).map(([key, template]) => (
                  <div
                    key={key}
                    className={`relative cursor-pointer rounded-lg border-2 transition-all duration-200 ${
                      selectedTemplate === key
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 bg-white"
                    }`}
                    onClick={() => applyTemplate(key)}
                  >
                    {/* Template Preview */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-gray-700">{template.name}</span>
                        {selectedTemplate === key && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      </div>

                      {/* SVG template preview */}
                      <div
                        className="relative bg-gray-100 rounded-md p-2 min-h-[60px] flex items-center justify-center"
                        style={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <img
                            src={template.svgPath}
                            alt={`${template.name} preview`}
                            className="max-w-full max-h-full object-contain"
                            style={{
                              width: "220px",
                              height: "110px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div className="space-y-4">{renderContentFields()}</div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <Button
                  onClick={() => {
                    // 强制更新模板配置，触发水印重新渲染
                    setTemplateConfig({
                      ...templateConfig,
                      _forceUpdate: Date.now(), // 添加一个时间戳强制更新
                    })
                  }}
                  variant="default"
                  size="sm"
                  className="w-full mb-2"
                >
                  {t.applySettings}
                </Button>
                <Button
                  onClick={() => {
                    const template = templateConfigs[selectedTemplate as keyof typeof templateConfigs]
                    if (template) {
                      setTemplateConfig({
                        ...template.defaultStyle,
                        content: {},
                      })
                    }
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <RotateCcw className="w-3 h-3 mr-2" />
                  {t.reset}
                </Button>
              </div>
            </TabsContent>
          </Tabs>

        </CardContent>
      </Card>
    </div>
  )
}
