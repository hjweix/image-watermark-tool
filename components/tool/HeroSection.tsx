"use client"

import { useTranslations } from 'next-intl'
import { motion } from "framer-motion"
import { Sparkles, Shield, Zap, Palette } from "lucide-react"

export default function HeroSection() {
  const t = useTranslations('hero')
  const tFeatures = useTranslations('features')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  const features = [
    {
      icon: Zap,
      title: tFeatures('batchProcessingTitle'),
      desc: tFeatures('batchProcessingDesc'),
      color: "text-warm",
      bgColor: "bg-warm-100/50",
    },
    {
      icon: Sparkles,
      title: tFeatures('completelyFreeTitle'),
      desc: tFeatures('completelyFreeDesc'),
      color: "text-sage",
      bgColor: "bg-sage-100/30",
    },
    {
      icon: Shield,
      title: tFeatures('privacySecureTitle'),
      desc: tFeatures('privacySecureDesc'),
      color: "text-terracotta",
      bgColor: "bg-terracotta-100/30",
    },
    {
      icon: Palette,
      title: tFeatures('professionalTemplatesTitle'),
      desc: tFeatures('professionalTemplatesDesc'),
      color: "text-warm-dark",
      bgColor: "bg-warm-100/50",
    },
  ]

  return (
    <section
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-cream via-warm-50/30 to-cream"
      itemScope
      itemType="https://schema.org/WebApplication"
    >
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-warm-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-terracotta/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        {/* 主标题 */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-warm-100/80 text-warm-dark text-xs font-medium mb-6 border border-warm-200/50">
            <Sparkles className="w-3 h-3 mr-1.5" />
            {t('badge') || '免费专业工具'}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-charcoal mb-6 tracking-tight leading-tight"
          itemProp="name"
        >
          {t('mainTitle')}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-charcoal-light mb-4 leading-relaxed max-w-2xl mx-auto"
          itemProp="description"
        >
          {t('mainSubtitle')}
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-base text-charcoal-muted mb-12 max-w-xl mx-auto"
        >
          {t('mainDescription')}
        </motion.p>

        {/* 功能特性卡片 */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-warm-200/50 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className={`w-10 h-10 ${feature.bgColor} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="text-sm font-semibold text-charcoal mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
