import { useTranslations } from "next-intl"

import type { PriceItem } from "@/data/types"

interface PriceTableProps {
  rows: PriceItem[]
}

export function PriceTable({ rows }: PriceTableProps) {
  const t = useTranslations("city.tables.price")

  return (
    <div className="border-border/80 overflow-hidden border">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-muted/40">
          <tr>
            <th className="px-3 py-2 text-left font-medium">{t("item")}</th>
            <th className="px-3 py-2 text-left font-medium">{t("value")}</th>
            <th className="px-3 py-2 text-left font-medium">{t("note")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.item} className="border-border/70 border-t">
              <td className="px-3 py-2 align-top">{row.item}</td>
              <td className="font-geist-mono px-3 py-2 align-top">
                {row.price}
              </td>
              <td className="text-muted-foreground px-3 py-2 align-top">
                {row.note ?? t("notAvailable")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
