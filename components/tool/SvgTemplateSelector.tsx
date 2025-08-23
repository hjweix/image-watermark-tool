import React from 'react';
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";
import Image from 'next/image';
import { templateConfigs } from '@/lib/templates';
import { useTranslations } from 'next-intl';

interface SvgTemplateSelectorProps {
  selectedTemplate: string;
  useSvg: boolean;
  onUseSvgChange: (value: boolean) => void;
}

export function SvgTemplateSelector({ 
  selectedTemplate, 
  useSvg, 
  onUseSvgChange 
}: SvgTemplateSelectorProps) {
  const t = useTranslations('settings');
  const tTemplates = useTranslations('templates');
  const template = templateConfigs[selectedTemplate];
  
  if (!template || !template.svgPath) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-4 p-4 border rounded-lg bg-background/50">
      <div className="flex items-center justify-between">
        <Label htmlFor="use-svg" className="text-base font-medium">{t('useSvgTemplate')}</Label>
        <Switch 
          id="use-svg" 
          checked={useSvg} 
          onCheckedChange={onUseSvgChange} 
        />
      </div>
      
      {useSvg && (
        <div className="mt-2">
          <div className="relative w-full h-32 overflow-hidden rounded-md border bg-muted/50">
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={template.svgPath} 
                alt={`${tTemplates(selectedTemplate) || template.name} ${t('svgTemplatePreview')}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {t('svgTemplateDescription')}
          </p>
        </div>
      )}
    </div>
  );
}