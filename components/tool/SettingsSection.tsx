"use client"

import type React from "react"
import { Settings, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/language-context"
import { templateConfigs, TemplateConfig } from "@/lib/templates"

type SettingsSectionProps = {
  selectedTemplate: string
  templateConfig: TemplateConfig
  applyTemplate: (templateKey: string) => void
  updateTemplateStyle: (key: string, value: any) => void
  updateTemplateContent: (key: string, value: any) => void
  setTemplateConfig: (config: TemplateConfig) => void
}

export default function SettingsSection({
  selectedTemplate,
  templateConfig,
  applyTemplate,
  updateTemplateStyle,
  updateTemplateContent,
  setTemplateConfig,
}: SettingsSectionProps) {
  const { t } = useLanguage()
  const currentTemplateConfig = templateConfigs[selectedTemplate as keyof typeof templateConfigs]

  // Render template-specific content fields
  const renderContentFields = () => {
    if (!currentTemplateConfig) return null

    return currentTemplateConfig.contentFields.map((field) => {
      const value = templateConfig.content[field.key] ?? field.default

      switch (field.type) {
        case "input":
          return (
            <div key={field.key}>
              <Label className="text-xs">
                {field.label} {field.required && <span className="text-red-500">*</span>}
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
                {field.label} {field.required && <span className="text-red-500">*</span>}
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
                {field.label} {field.required && <span className="text-red-500">*</span>}
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
                {field.label}
              </Label>
            </div>
          )

        case "date":
          return (
            <div key={field.key}>
              <Label className="text-xs">
                {field.label} {field.required && <span className="text-red-500">*</span>}
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
              <Label className="text-xs">{field.label}</Label>
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
              <Label className="text-xs">{field.label}</Label>
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

  // Render template-specific style fields
  const renderStyleFields = () => {
    if (!currentTemplateConfig) return null

    return currentTemplateConfig.styleFields.map((fieldKey) => {
      switch (fieldKey) {
        case "position":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">{t.position}</Label>
              <Select value={templateConfig.position} onValueChange={(value) => updateTemplateStyle("position", value)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="top-left">{t.topLeft}</SelectItem>
                  <SelectItem value="top-center">{t.topCenter}</SelectItem>
                  <SelectItem value="top-right">{t.topRight}</SelectItem>
                  <SelectItem value="center-left">{t.centerLeft}</SelectItem>
                  <SelectItem value="center">{t.center}</SelectItem>
                  <SelectItem value="center-right">{t.centerRight}</SelectItem>
                  <SelectItem value="bottom-left">{t.bottomLeft}</SelectItem>
                  <SelectItem value="bottom-center">{t.bottomCenter}</SelectItem>
                  <SelectItem value="bottom-right">{t.bottomRight}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )

        case "fontSize":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">
                {t.fontSize}: {templateConfig.fontSize}px
              </Label>
              <Slider
                value={[templateConfig.fontSize]}
                onValueChange={([value]) => updateTemplateStyle("fontSize", value)}
                min={8}
                max={100}
                step={1}
                className="mt-2"
              />
            </div>
          )

        case "fontFamily":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">{t.font}</Label>
              <Select
                value={templateConfig.fontFamily}
                onValueChange={(value) => updateTemplateStyle("fontFamily", value)}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="serif">Serif</SelectItem>
                  <SelectItem value="monospace">Monospace</SelectItem>
                  <SelectItem value="sans-serif">Sans-serif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )

        case "textColor":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">{t.textColor}</Label>
              <Input
                type="color"
                value={templateConfig.textColor}
                onChange={(e) => updateTemplateStyle("textColor", e.target.value)}
                className="h-8"
              />
            </div>
          )

        case "backgroundColor":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">{t.backgroundColor}</Label>
              <Input
                type="color"
                value={templateConfig.backgroundColor}
                onChange={(e) => updateTemplateStyle("backgroundColor", e.target.value)}
                className="h-8"
              />
            </div>
          )

        case "backgroundOpacity":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">
                {t.backgroundOpacity}: {Math.round(templateConfig.backgroundOpacity * 100)}%
              </Label>
              <Slider
                value={[templateConfig.backgroundOpacity]}
                onValueChange={([value]) => updateTemplateStyle("backgroundOpacity", value)}
                min={0}
                max={1}
                step={0.1}
                className="mt-2"
              />
            </div>
          )

        case "borderRadius":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">
                {t.borderRadius}: {templateConfig.borderRadius}px
              </Label>
              <Slider
                value={[templateConfig.borderRadius]}
                onValueChange={([value]) => updateTemplateStyle("borderRadius", value)}
                min={0}
                max={20}
                step={1}
                className="mt-2"
              />
            </div>
          )

        case "padding":
          return (
            <div key={fieldKey}>
              <Label className="text-xs">
                {t.padding}: {templateConfig.padding}px
              </Label>
              <Slider
                value={[templateConfig.padding]}
                onValueChange={([value]) => updateTemplateStyle("padding", value)}
                min={0}
                max={30}
                step={1}
                className="mt-2"
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
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates" className="text-xs">
                {t.templates}
              </TabsTrigger>
              <TabsTrigger value="style" className="text-xs">
                {t.style}
              </TabsTrigger>
              <TabsTrigger value="content" className="text-xs">
                {t.content}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-3">
              <div className="grid grid-cols-1 gap-3">
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
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-700">{template.name}</span>
                        {selectedTemplate === key && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      </div>

                      {/* Mock watermark preview */}
                      <div
                        className="relative bg-gray-100 rounded-md p-2 min-h-[60px] flex items-end"
                        style={{
                          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        }}
                      >
                        <div
                          className="text-xs leading-tight whitespace-pre-line rounded px-2 py-1"
                          style={{
                            backgroundColor: template.defaultStyle.backgroundColor,
                            color: template.defaultStyle.textColor,
                            opacity: template.defaultStyle.backgroundOpacity + 0.6,
                            fontFamily: template.defaultStyle.fontFamily,
                            borderRadius: `${template.defaultStyle.borderRadius}px`,
                            fontSize: "10px",
                          }}
                        >
                          {template.preview}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="style" className="space-y-4">
              <div className="space-y-4">{renderStyleFields()}</div>
            </TabsContent>

            <TabsContent value="content" className="space-y-4">
              <div className="space-y-4">{renderContentFields()}</div>
            </TabsContent>
          </Tabs>

          <Separator className="my-4" />

          <div className="space-y-2">
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
        </CardContent>
      </Card>
    </div>
  )
}
