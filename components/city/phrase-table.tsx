import type { Phrase } from "@/data/types"

interface PhraseTableProps {
  rows: Phrase[]
}

export function PhraseTable({ rows }: PhraseTableProps) {
  return (
    <div className="border-border/80 overflow-hidden border">
      <table className="w-full border-collapse text-sm">
        <thead className="bg-muted/40">
          <tr>
            <th className="px-3 py-2 text-left font-medium">Local</th>
            <th className="px-3 py-2 text-left font-medium">Romanization</th>
            <th className="px-3 py-2 text-left font-medium">English</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={`${row.local}-${row.english}`}
              className="border-border/70 border-t"
            >
              <td className="px-3 py-2 align-top">{row.local}</td>
              <td className="text-muted-foreground px-3 py-2 align-top">
                {row.romanization}
              </td>
              <td className="px-3 py-2 align-top">{row.english}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
