'use client'

import { useTranslations } from 'next-intl'
import Header from '@/components/header'

export default function CookiesPage() {
  const t = useTranslations('cookies')
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
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('essentialCookiesTitle')}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t('essentialCookiesContent')}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('analyticsCookiesTitle')}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t('analyticsCookiesContent')}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t('functionalCookiesTitle')}</h3>
                <p className="text-gray-700 dark:text-gray-300">{t('functionalCookiesContent')}</p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('section3Title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{t('section3Content')}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('section4Title')}</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">{t('section4Content')}</p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>{t('section4Item1')}</li>
                <li>{t('section4Item2')}</li>
                <li>{t('section4Item3')}</li>
              </ul>
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
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{t('contactTitle')}</h2>
              <p className="text-gray-700 dark:text-gray-300">{t('contactContent')}</p>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}