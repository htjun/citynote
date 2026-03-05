import type { Metadata } from "next"
import { geistMono, geistSans } from "@/lib/fonts"
import { NextIntlClientProvider, hasLocale } from "next-intl"
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
import "remixicon/fonts/remixicon.css"
import "./globals.css"

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: LocaleLayoutProps): Promise<Metadata> {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  const t = await getTranslations({ locale, namespace: "home.metadata" })

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        en: "/",
        ko: "/ko",
        "x-default": "/",
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<LocaleLayoutProps>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  const messages = await getMessages()

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
