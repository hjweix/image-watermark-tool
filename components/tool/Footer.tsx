"use client"

import { useTranslations, useLocale } from 'next-intl'
import { ImageIcon } from "lucide-react"
import { useRouter } from '@/src/i18n/routing'
import { useParams } from 'next/navigation'

export default function Footer() {
  const t = useTranslations('footer')
  const tHeader = useTranslations('header')
  const router = useRouter()
  const params = useParams()
  const locale = (typeof params.locale === 'string' ? params.locale : useLocale()) as string

  return (
    <footer className="bg-gray-900 text-white mt-20 w-full" itemScope itemType="https://schema.org/WPFooter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 热门关键词部分 */}
        <div className="mb-12">
          {/* <h3 className="text-lg font-semibold mb-6">{t('hotSearchTitle')}</h3> */}
          <div className="flex flex-wrap gap-3">
            {/* Note: keywords array needs to be handled differently in next-intl */}
            {/* Temporarily commenting out until we implement proper array handling */}
            {/* {t('keywords').map((keyword: string) => (
              <span
                key={keyword}
                className="bg-gray-800 text-gray-300 px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition-colors"
              >
                {keyword}
              </span>
            ))} */}
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">{tHeader('brand')}</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-lg leading-relaxed">{t('description')}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t('productFeatures')}</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <button onClick={() => router.push('/features', { locale })} className="hover:text-white transition-colors cursor-pointer">
                  {t('batchProcessing')}
                </button>
              </li>
              <li>
                <button onClick={() => router.push('/features', { locale })} className="hover:text-white transition-colors cursor-pointer">
                  {t('customStyles')}
                </button>
              </li>
              <li>
                <button onClick={() => router.push('/features', { locale })} className="hover:text-white transition-colors cursor-pointer">
                  {t('exifExtraction')}
                </button>
              </li>
              <li>
                <button onClick={() => router.push('/features', { locale })} className="hover:text-white transition-colors cursor-pointer">
                  {t('highResSupport')}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">{t('helpSupport')}</h3>
            <ul className="space-y-3 text-gray-400">
              <li>
                <button onClick={() => router.push('/help', { locale })} className="hover:text-white transition-colors cursor-pointer">
                  {t('tutorial')}
                </button>
              </li>
              <li>
                <button onClick={() => router.push('/help', { locale })} className="hover:text-white transition-colors cursor-pointer">
                  {t('faq')}
                </button>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('contact')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  {t('feedback')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">{t('copyright')}</p>
          <div className="flex flex-wrap gap-6">
            <button 
              onClick={() => router.push('/privacy', { locale })} 
              className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"
            >
              {t('privacy')}
            </button>
            <button 
              onClick={() => router.push('/terms', { locale })} 
              className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"
            >
              {t('terms')}
            </button>
            <button 
              onClick={() => router.push('/cookies', { locale })} 
              className="text-gray-400 hover:text-white text-sm transition-colors cursor-pointer"
            >
              {t('cookies')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
