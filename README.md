# PhotoStamper - 专业图片水印工具

PhotoStamper 是一个免费的在线工具，专为需要为图片添加专业时间、日期和地点水印的用户设计。它特别适用于工程记录、现场打卡、旅行日志、宝贝成长记录等场景。本工具能够智能提取图片的 EXIF 信息，支持批量处理，并提供多种可定制的模板，以提升您工作文档的规范性和可信度。

所有图片处理均在您的浏览器本地完成，确保您的隐私安全。

## ✨ 主要功能

*   **智能EXIF提取**: 自动读取并使用照片的拍摄时间、GPS地理位置等元数据。
*   **批量处理**: 支持一次性上传多张图片，并一键应用相同的水印设置。
*   **多种专业模板**: 内置多种水印模板，包括现代简约、工程记录、打卡记录、旅行日志、宝贝成长等。
*   **高度自定义**: 允许用户自由调整水印的位置、字体、颜色、背景、透明度等样式。
*   **纯前端处理**: 所有图片处理都在浏览器端完成，您的图片文件不会被上传到任何服务器，保护您的隐私。
*   **完全免费**: 无需注册，无需付费，所有功能完全免费使用。
*   **多语言支持**: 支持中文和英文界面。

## 🛠️ 技术栈

本项目使用现代 Web 技术构建，以提供流畅和响应迅速的用户体验。

*   **框架**: [Next.js](https://nextjs.org/) (React 框架)
*   **语言**: [TypeScript](https://www.typescriptlang.org/)
*   **UI组件**: [shadcn/ui](https://ui.shadcn.com/)，基于 [Radix UI](https://www.radix-ui.com/) 和 [Tailwind CSS](https://tailwindcss.com/)
*   **样式**: [Tailwind CSS](https://tailwindcss.com/)
*   **表单**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
*   **图标**: [Lucide React](https://lucide.dev/)
*   **包管理器**: [pnpm](https://pnpm.io/)

## 🚀 快速开始

请按照以下步骤在本地运行此项目。

### 1. 克隆仓库

```bash
git clone <your-repository-url>
cd image-watermark-tool
```

### 2. 安装依赖

本项目使用 `pnpm` 作为包管理器。请先确保您已安装 pnpm。

```bash
pnpm install
```

### 3. 启动开发服务器

执行以下命令来启动本地开发服务器：

```bash
pnpm dev
```

现在，您可以在浏览器中打开 `http://localhost:3000` 查看项目。

### 4. 其他可用脚本

*   **构建生产版本**: `pnpm build`
*   **启动生产服务器**: `pnpm start`
*   **代码检查**: `pnpm lint`

## 许可证

本项目原创代码与文档采用 MIT License，详见 [LICENSE](./LICENSE)。第三方依赖和资源仍分别遵循其各自的许可证。
