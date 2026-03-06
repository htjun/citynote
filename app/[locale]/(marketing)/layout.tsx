import { TopNav } from "@/components/top-nav"
import type { Locale } from "@/i18n/locales"
import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"

interface MarketingLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function MarketingLayout({
  children,
  params,
}: Readonly<MarketingLayoutProps>) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <div className="bg-base min-h-screen lg:grid lg:grid-cols-[272px_minmax(0,1fr)]">
      <TopNav locale={locale as Locale} />
      <div className="min-w-0">{children}</div>
    </div>
  )
}
