"use client"

import type React from "react"
import { Settings, RotateCcw, ChevronRight, Palette, Type } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from 'next-intl'
import { templateConfigs, TemplateConfig } from "@/lib/templates"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

type SettingsSectionProps = {
  selectedTemplate: string
  templateConfig: TemplateConfig
  applyTemplate: (templateKey: string) => void
  updateTemplateContent: (key: string, value: any) => void
  setTemplateConfig: (config: TemplateConfig) => void
}

export default function SettingsSection({
  selectedTemplate,
  templateConfig,
  applyTemplate,
  updateTemplateContent,
  setTemplateConfig,
}: SettingsSectionProps) {
  const t = useTranslations("settings");
  const tFields = useTranslations("fields");
  const tActions = useTranslations("actions");
  const tPlaceholders = useTranslations('placeholders');
  const tPunchTypes = useTranslations('punchTypes');
  const tWeather = useTranslations('weather');
  const tMood = useTranslations('mood');
  const tTemplates = useTranslations('templates');
  const currentTemplateConfig = templateConfigs[selectedTemplate as keyof typeof templateConfigs]
  const [activeTab, setActiveTab] = useState("templates")

  // Render template-specific content fields
  const renderContentFields = () => {
    if (!currentTemplateConfig) return null

    return currentTemplateConfig.contentFields.map((field) => {
      const value = templateConfig.content[field.key] ?? field.default
      const displayLabel = tFields(field.label) || field.label

      switch (field.type) {
        case "input":
          return (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-charcoal flex items-center gap-1">
                {displayLabel}
                {field.required && <span className="text-warm-dark">*</span>}
              </Label>
              <Input
                type={field.inputType || "text"}
                step={field.step}
                placeholder={field.placeholder ? (tPlaceholders as any)[field.placeholder] || field.placeholder : field.placeholder}
                value={value || ""}
                onChange={(e) => updateTemplateContent(field.key, e.target.value)}
                className="h-10 bg-warm-50/50 border-warm-200 focus:border-warm focus:ring-warm/20 rounded-lg transition-all"
                required={field.required}
              />
              {field.suffix && <span className="text-xs text-charcoal-muted">{field.suffix}</span>}
            </motion.div>
          )

        case "textarea":
          return (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-charcoal flex items-center gap-1">
                {displayLabel}
                {field.required && <span className="text-warm-dark">*</span>}
              </Label>
              <Textarea
                placeholder={field.placeholder ? (tPlaceholders as any)[field.placeholder] || field.placeholder : field.placeholder}
                value={value || ""}
                onChange={(e) => updateTemplateContent(field.key, e.target.value)}
                className="min-h-[80px] text-sm bg-warm-50/50 border-warm-200 focus:border-warm focus:ring-warm/20 rounded-lg transition-all resize-none"
                required={field.required}
              />
            </motion.div>
          )

        case "select":
          return (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-charcoal flex items-center gap-1">
                {displayLabel}
                {field.required && <span className="text-warm-dark">*</span>}
              </Label>
              <Select value={value || field.default} onValueChange={(val) => updateTemplateContent(field.key, val)}>
                <SelectTrigger className="h-10 bg-warm-50/50 border-warm-200 focus:border-warm focus:ring-warm/20 rounded-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-lg">
                  {field.options?.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="rounded-md">
                      {field.type === 'select' && field.label === 'punchType'
                         ? (tPunchTypes as any)[option.label] || option.label
                         : field.type === 'select' && field.label === 'weather'
                         ? (tWeather as any)[option.label] || option.label
                         : field.type === 'select' && field.label === 'mood'
                         ? (tMood as any)[option.label] || option.label
                         : option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </motion.div>
          )

        case "checkbox":
          return (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-3 p-3 bg-warm-50/50 rounded-lg border border-warm-200/50"
            >
              <input
                type="checkbox"
                id={field.key}
                checked={value ?? field.default}
                onChange={(e) => updateTemplateContent(field.key, e.target.checked)}
                className="w-5 h-5 rounded border-warm-300 text-warm focus:ring-warm"
              />
              <Label htmlFor={field.key} className="text-sm text-charcoal cursor-pointer">
                {displayLabel}
              </Label>
            </motion.div>
          )

        case "date":
          return (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-charcoal flex items-center gap-1">
                {displayLabel}
                {field.required && <span className="text-warm-dark">*</span>}
              </Label>
              <Input
                type="date"
                value={value || ""}
                onChange={(e) => updateTemplateContent(field.key, e.target.value)}
                className="h-10 bg-warm-50/50 border-warm-200 focus:border-warm focus:ring-warm/20 rounded-lg"
                required={field.required}
              />
            </motion.div>
          )

        case "time":
          return (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-charcoal">{displayLabel}</Label>
              <Input
                type="time"
                step="1"
                value={value || ""}
                onChange={(e) => updateTemplateContent(field.key, e.target.value)}
                className="h-10 bg-warm-50/50 border-warm-200 focus:border-warm focus:ring-warm/20 rounded-lg"
              />
            </motion.div>
          )

        case "datetime-local":
          return (
            <motion.div
              key={field.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-2"
            >
              <Label className="text-sm font-medium text-charcoal">{displayLabel}</Label>
              <Input
                type="datetime-local"
                step="1"
                value={value || ""}
                onChange={(e) => updateTemplateContent(field.key, e.target.value)}
                className="h-10 bg-warm-50/50 border-warm-200 focus:border-warm focus:ring-warm/20 rounded-lg"
              />
            </motion.div>
          )

        default:
          return null
      }
    })
  }

  return (
    <div className="xl:col-span-1">
      <Card className="border-warm-200/50 shadow-sm overflow-hidden">
        <CardHeader className="pb-4 border-b border-warm-100">
          <CardTitle className="flex items-center gap-2 text-base font-semibold text-charcoal">
            <div className="w-8 h-8 bg-warm-100 rounded-lg flex items-center justify-center">
              <Settings className="w-4 h-4 text-warm-dark" />
            </div>
            {t('settings')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-warm-50/50 p-0 rounded-none border-b border-warm-100">
              <TabsTrigger
                value="templates"
                className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-warm data-[state=active]:shadow-none py-3 text-sm font-medium transition-all"
              >
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  {t('templates')}
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="content"
                className="rounded-none data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-warm data-[state=active]:shadow-none py-3 text-sm font-medium transition-all"
              >
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  {t('content')}
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="p-4 space-y-3 mt-0">
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(templateConfigs).map(([key, template], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => applyTemplate(key)}
                    whileHover={{ scale: 1.01, y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    className={`
                      relative cursor-pointer rounded-xl border-2 transition-all duration-300 overflow-hidden
                      ${selectedTemplate === key
                        ? "border-warm bg-warm-50 shadow-warm"
                        : "border-warm-200 hover:border-warm hover:shadow-sm bg-white"
                      }
                    `}
                  >
                    {/* Template Preview */}
                    <div className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-charcoal">{tTemplates(key) || template.name}</span>
                        {selectedTemplate === key && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-5 h-5 bg-warm rounded-full flex items-center justify-center"
                          >
                            <ChevronRight className="w-3 h-3 text-white" />
                          </motion.div>
                        )}
                      </div>

                      {/* SVG template preview */}
                      <div
                        className="relative bg-warm-100 rounded-lg p-2 min-h-[70px] flex items-center justify-center overflow-hidden"
                        style={{
                          background: "linear-gradient(135deg, #FAFAF8 0%, #F5F4F2 100%)",
                        }}
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <img
                            src={template.svgPath}
                            alt={`${template.name} preview`}
                            className="max-w-full max-h-full object-contain"
                            style={{
                              width: "200px",
                              height: "100px",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="content" className="p-4 space-y-4 mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTemplate}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {renderContentFields()}
                </motion.div>
              </AnimatePresence>

              <Separator className="bg-warm-200/50" />

              <div className="space-y-2.5">
                <Button
                  onClick={() => {
                    setTemplateConfig({
                      ...templateConfig,
                      _forceUpdate: Date.now(),
                    })
                  }}
                  className="w-full bg-warm hover:bg-warm-dark text-white shadow-warm hover:shadow-warm-lg transition-all duration-300 h-10"
                >
                  {tActions('applyAll')}
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
                  className="w-full border-warm-200 hover:border-warm hover:bg-warm-50 text-charcoal transition-all duration-300 h-10"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {tActions('reset')}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
