import { useTranslations } from "next-intl"

import { PhraseTable } from "@/components/city/phrase-table"
import { RatingBadge } from "@/components/city/rating-badge"
import { SectionHeader } from "@/components/city/section-header"
import type { City } from "@/data/types"

interface LanguageCultureProps {
  city: City
}

export function LanguageCulture({ city }: LanguageCultureProps) {
  const t = useTranslations("city.sections.languageCulture")

  return (
    <section className="space-y-3">
      <SectionHeader
        id="language-culture"
        title={t("title")}
        description={t("description")}
      />
      <div className="flex items-center gap-2 text-sm">
        <span className="text-muted-foreground">{t("englishUsability")}</span>
        <RatingBadge level={city.languageCulture.englishLevel} />
      </div>
      <PhraseTable rows={city.languageCulture.phrases} />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-medium">{t("do")}</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {city.languageCulture.dos.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-medium">{t("avoid")}</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm">
            {city.languageCulture.donts.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
