import { useTranslations } from "next-intl"

import type { PriceItem } from "@/data/types"

interface PriceTableProps {
  rows: PriceItem[]
}

export function PriceTable({ rows }: PriceTableProps) {
  const t = useTranslations("city.tables.price")

  return (
    <div className="border-subtlest overflow-hidden rounded-[24px] border shadow-[var(--shadow-subtle)]">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-subtle/80">
          <tr>
            <th className="px-4 py-3 text-left font-medium">{t("item")}</th>
            <th className="px-4 py-3 text-left font-medium">{t("value")}</th>
            <th className="px-4 py-3 text-left font-medium">{t("note")}</th>
          </tr>
        </thead>
        <tbody className="bg-base">
          {rows.map((row) => (
            <tr key={row.item} className="border-subtlest border-t">
              <td className="px-4 py-3 align-top">{row.item}</td>
              <td className="font-geist-mono px-4 py-3 align-top">
                {row.price}
              </td>
              <td className="text-quiet px-4 py-3 align-top">
                {row.note ?? t("notAvailable")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
