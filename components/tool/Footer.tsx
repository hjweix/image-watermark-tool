"use client"

import { useTranslations, useLocale } from 'next-intl'
import { ImageIcon, Heart, Github, Twitter, Mail } from "lucide-react"
import { useRouter } from '@/src/i18n/routing'
import { useParams } from 'next/navigation'
import { motion } from "framer-motion"

export default function Footer() {
  const t = useTranslations('footer')
  const tHeader = useTranslations('header')
  const router = useRouter()
  const params = useParams()
  const locale = (typeof params.locale === 'string' ? params.locale : useLocale()) as string

  const footerLinks = {
    product: [
      { label: t('batchProcessing'), href: '/features' },
      { label: t('customStyles'), href: '/features' },
      { label: t('exifExtraction'), href: '/features' },
      { label: t('highResSupport'), href: '/features' },
    ],
    support: [
      { label: t('tutorial'), href: '/help' },
      { label: t('faq'), href: '/help' },
      { label: t('contact'), href: '#' },
      { label: t('feedback'), href: '#' },
    ],
    legal: [
      { label: t('privacy'), href: '/privacy' },
      { label: t('terms'), href: '/terms' },
      { label: t('cookies'), href: '/cookies' },
    ],
  }

  return (
    <footer className="bg-charcoal text-white mt-24 w-full" itemScope itemType="https://schema.org/WPFooter">
      {/* 顶部装饰线 */}
      <div className="h-1 bg-gradient-to-r from-warm via-terracotta to-sage" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* 品牌介绍 */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 mb-6"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-warm to-warm-dark rounded-xl flex items-center justify-center shadow-lg">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-display font-semibold">{tHeader('brand')}</span>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-charcoal-muted mb-6 max-w-md leading-relaxed"
            >
              {t('description')}
            </motion.p>

            {/* 社交媒体图标 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <SocialIcon href="#" icon={Github} />
              <SocialIcon href="#" icon={Twitter} />
              <SocialIcon href="#" icon={Mail} />
            </motion.div>
          </div>

          {/* 产品功能 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold mb-5 text-warm-light uppercase tracking-wider">{t('productFeatures')}</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => router.push(link.href as any, { locale })}
                    className="text-charcoal-muted hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 帮助支持 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold mb-5 text-warm-light uppercase tracking-wider">{t('helpSupport')}</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => router.push(link.href as any, { locale })}
                    className="text-charcoal-muted hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 法律信息 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-semibold mb-5 text-warm-light uppercase tracking-wider">{t('legal') || 'Legal'}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => router.push(link.href as any, { locale })}
                    className="text-charcoal-muted hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 分隔线 */}
        <div className="border-t border-charcoal-light/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-charcoal-muted text-sm flex items-center gap-1"
            >
              {t('copyright').replace('2024', new Date().getFullYear().toString())}
              <span className="inline-flex items-center">
                <Heart className="w-3.5 h-3.5 text-warm mx-1 fill-warm" />
              </span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              <span className="text-xs text-charcoal-muted">
                Made with care for photographers
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// 社交媒体图标组件
function SocialIcon({ href, icon: Icon }: { href: string; icon: React.ElementType }) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className="w-10 h-10 bg-charcoal-light/30 rounded-xl flex items-center justify-center text-charcoal-muted hover:text-white hover:bg-warm/20 transition-colors"
    >
      <Icon className="w-5 h-5" />
    </motion.a>
  )
}
