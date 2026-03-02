interface NavItem {
  id: string
  label: string
}

interface SectionNavProps {
  items: NavItem[]
}

export function SectionNav({ items }: SectionNavProps) {
  return (
    <nav className="bg-card border-border rounded-lg border p-2">
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-foreground hover:bg-muted inline-flex w-full rounded-md px-3 py-2 text-sm transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
