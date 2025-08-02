"use client"

import { useState, useEffect } from "react"
import { generateTemplateText } from "@/lib/watermark"
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
      
      fetch(config.svgTemplate)
        .then(response => response.text())
        .then(data => {
          // 获取模板文本内容
          const templateLines = generateTemplateText(selectedTemplate, config.content, exifData);
          
          // 将模板内容应用到SVG中
          let modifiedSvgContent = data;
          
          // 根据不同模板类型，将内容插入到SVG中
          switch (selectedTemplate) {
            case "modern":
              // 替换日期、时间和位置
              if (templateLines.length > 0) {
                // 收集时间和日期信息
                let timeInfo = "";
                let locationInfo = "";
                
                for (let i = 0; i < templateLines.length; i++) {
                  const line = templateLines[i];
                  if (line.includes("🕐")) {
                    timeInfo = line.replace("🕐 ", "");
                  } else if (line.includes("📅")) {
                    // 如果有日期信息，将其添加到时间信息中
                    if (timeInfo) {
                      timeInfo = `${timeInfo} | ${line.replace("📅 ", "")}`;
                    } else {
                      timeInfo = line.replace("📅 ", "");
                    }
                  } else if (line.includes("📍")) {
                    locationInfo = line.replace("📍 ", "");
                  }
                }
                
                // 替换时间信息
                if (timeInfo && modifiedSvgContent.includes("id=\"time\"")) {
                  modifiedSvgContent = modifiedSvgContent.replace(/<tspan id="time"[^>]*>[^<]*<\/tspan>/, `<tspan id="time" x="30" dy="0">${timeInfo}</tspan>`);
                }
                
                // 替换位置信息
                if (locationInfo && modifiedSvgContent.includes("id=\"location\"")) {
                  modifiedSvgContent = modifiedSvgContent.replace(/<tspan id="location"[^>]*>[^<]*<\/tspan>/, `<tspan id="location" x="30" dy="30">${locationInfo}</tspan>`);
                }
              }
              break;
              
            case "professional":
            case "engineering":
            case "baby":
            case "punch":
            case "travel":
              // 为其他模板类型，尝试查找通用的内容占位符
              if (templateLines.length > 0) {
                // 查找SVG中的文本元素并替换内容
                for (let i = 0; i < templateLines.length; i++) {
                  const lineId = `line${i+1}`;
                  if (modifiedSvgContent.includes(`id=\"${lineId}\"`)) {
                    const line = templateLines[i];
                    // 移除表情符号前缀
                    const cleanLine = line.replace(/^[^\w\s]*\s*/, "");
                    modifiedSvgContent = modifiedSvgContent.replace(new RegExp(`<tspan id="${lineId}"[^>]*>[^<]*<\/tspan>`, 'g'), `<tspan id="${lineId}" x="25" dy="${i === 0 ? '0' : '25'}">${cleanLine}</tspan>`);
                  }
                }
              }
              break;
              
            default:
              // 默认情况下不修改SVG内容
              break;
          }
          
          setSvgContent(modifiedSvgContent);
          
          // 创建一个包含修改后SVG内容的对象URL
          const svgBlob = new Blob([modifiedSvgContent], { type: 'image/svg+xml' });
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
  // 只在初始加载、模板变更、SVG配置变更或强制更新时重新渲染SVG
  // 移除 config.content 依赖，使其不会在内容更新时重新渲染
  }, [config.useSvg, config.svgTemplate, selectedTemplate, exifData, config._forceUpdate]);

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
          alignItems: "center",
          overflow: "hidden",
          pointerEvents: "none",
          userSelect: "none"
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
