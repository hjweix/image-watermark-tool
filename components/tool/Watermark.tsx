"use client"

import { useState, useEffect } from "react"
import { generateTemplateText, processVariableTemplate } from "@/lib/watermark";
import type { TemplateConfig } from "@/lib/templates"

type WatermarkProps = {
  config: TemplateConfig
  selectedTemplate: string
  exifData: any
}

export default function Watermark({ config, selectedTemplate, exifData }: WatermarkProps) {
  const [svgContent, setSvgContent] = useState<string>("");
  const [svgUrl, setSvgUrl] = useState<string>("");
  const lines = generateTemplateText(selectedTemplate, config.content, exifData)

  useEffect(() => {
    // 如果启用了SVG模板并且有SVG模板路径，则加载SVG内容
    if (config.useSvg && config.svgTemplate) {
      // 清除之前的SVG URL
      if (svgUrl) {
        URL.revokeObjectURL(svgUrl);
        setSvgUrl("");
      }
      
      // 将预览模板路径转换为变量模板路径
      const variableTemplatePath = config.svgTemplate.replace('/preview/', '/variables/');
      
      fetch(variableTemplatePath)
        .then(response => response.text())
        .then(data => {
          // 使用新的变量替换系统处理SVG内容
          const processedSvgContent = processVariableTemplate(data, selectedTemplate, config.content);
          
          setSvgContent(processedSvgContent);
          
          // 创建一个包含修改后SVG内容的对象URL
          const svgBlob = new Blob([processedSvgContent], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(svgBlob);
          setSvgUrl(url);
        })
        .catch(error => {
          console.error("加载SVG模板失败:", error);
        });
    }
    
    // 清理函数，释放对象URL
    return () => {
      if (svgUrl) {
        URL.revokeObjectURL(svgUrl);
      }
    };
  // 依赖项包含config.content，确保内容变化时重新渲染
  }, [config.useSvg, config.svgTemplate, selectedTemplate, exifData, config.content, config._forceUpdate]);

  if (lines.length === 0) {
    return null
  }

  // 如果启用了SVG模板并且已加载SVG URL
  if (config.useSvg && svgUrl) {
    return (
      <div 
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
          overflow: "hidden"
        }}
      >
        <img 
          src={svgUrl} 
          alt="SVG Watermark" 
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            pointerEvents: "none",
            userSelect: "none"
          }}
        />
      </div>
    );
  }

  // 默认文本水印样式
  const containerStyle: React.CSSProperties = {
    backgroundColor: config.backgroundColor,
    opacity: config.backgroundOpacity,
    padding: `${config.padding}px`,
    borderRadius: `${config.borderRadius}px`,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    pointerEvents: "none",
    userSelect: "none",
    overflow: "hidden"
  }

  const textStyle: React.CSSProperties = {
    fontFamily: config.fontFamily,
    fontSize: `${config.fontSize}px`,
    fontWeight: config.fontWeight,
    fontStyle: config.fontStyle,
    color: config.textColor,
    opacity: config.textOpacity,
    whiteSpace: "pre",
    lineHeight: 1.2,
    pointerEvents: "none",
    userSelect: "none"
  }

  return (
    <div style={containerStyle}>
      {lines.map((line: string, index: number) => (
        <div key={index} style={textStyle}>
          {line}
        </div>
      ))}
    </div>
  )
}
