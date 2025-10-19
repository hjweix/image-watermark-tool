'use client'

import { useTranslations } from 'next-intl'
import Header from '@/components/header'

export default function PrivacyPage() {
  const t = useTranslations('privacy')
  const tHeader = useTranslations('header')

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{t('title')}</h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {t('lastUpdated')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('section1Title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{t('section1Content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('section2Title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{t('section2Content')}</p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>{t('section2Item1')}</li>
                <li>{t('section2Item2')}</li>
                <li>{t('section2Item3')}</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('section3Title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{t('section3Content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('section4Title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{t('section4Content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('section5Title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{t('section5Content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('section6Title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{t('section6Content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('section7Title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{t('section7Content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('contactTitle')}</h2>
              <p className="text-gray-700 dark:text-gray-300">{t('contactContent')}</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}