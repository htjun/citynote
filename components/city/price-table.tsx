import type { PriceItem } from "@/data/types"

interface PriceTableProps {
  rows: PriceItem[]
}

export function PriceTable({ rows }: PriceTableProps) {
  return (
    <div className="border-border/80 overflow-hidden border">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-muted/40">
          <tr>
            <th className="px-3 py-2 text-left font-medium">Item</th>
            <th className="px-3 py-2 text-left font-medium">Value</th>
            <th className="px-3 py-2 text-left font-medium">Note</th>
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
                {row.note ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
