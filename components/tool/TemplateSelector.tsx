"use client"

import { motion } from "framer-motion"
import { Check, LayoutGrid } from "lucide-react"
import { useTranslations } from 'next-intl'
import { templateConfigs } from "@/lib/templates"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (templateKey: string) => void
}

export default function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
}: TemplateSelectorProps) {
  const tTemplates = useTranslations('templates')
  const t = useTranslations('tool')

  return (
    <Card className="border-warm-200/50 shadow-sm overflow-hidden">
      <CardHeader className="pb-3 border-b border-warm-100">
        <CardTitle className="flex items-center gap-2 text-base font-semibold text-charcoal">
          <div className="w-8 h-8 bg-warm-100 rounded-lg flex items-center justify-center">
            <LayoutGrid className="w-4 h-4 text-warm-dark" />
          </div>
          {t('templateTitle')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        {/* 网格布局 - 每行2个，更大的模板卡片 */}
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(templateConfigs).map(([key, template], index) => {
            const isSelected = selectedTemplate === key

            return (
              <motion.button
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onSelectTemplate(key)}
                className={`
                  relative group/item cursor-pointer rounded-xl border-2 transition-all duration-300
                  ${isSelected
                    ? "border-warm bg-warm-50/80 shadow-warm"
                    : "border-warm-200/60 hover:border-warm hover:bg-white/60 bg-white/40 hover:shadow-sm"
                  }
                `}
              >
                {/* 选中指示器 */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-warm rounded-full flex items-center justify-center shadow-md z-10"
                  >
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </motion.div>
                )}

                {/* 模板预览区域 */}
                <div className="p-3">
                  <div
                    className="relative bg-gradient-to-br from-warm-50 to-cream rounded-lg overflow-hidden mb-2 aspect-[16/10] flex items-center justify-center"
                  >
                    {/* 模板缩略图 */}
                    <img
                      src={template.svgPath}
                      alt={`${template.name} preview`}
                      className="w-full h-full object-contain p-2 transition-transform duration-300 group-hover/item:scale-105"
                    />
                  </div>

                  {/* 模板名称 */}
                  <div className="text-center">
                    <span className={`
                      text-xs font-medium block truncate transition-colors
                      ${isSelected ? "text-warm-dark" : "text-charcoal group-hover/item:text-charcoal"}
                    `}>
                      {tTemplates(key) || template.name}
                    </span>
                  </div>
                </div>

                {/* Hover 高亮边框效果 */}
                <div className={`
                  absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300
                  ${isSelected ? "ring-2 ring-warm/30" : "ring-1 ring-inset ring-warm-100 opacity-0 group-hover/item:opacity-100"}
                `} />
              </motion.button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
