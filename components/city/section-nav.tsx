interface NavItem {
  id: string
  label: string
}

interface SectionNavProps {
  items: NavItem[]
}

export function SectionNav({ items }: SectionNavProps) {
  return (
    <nav className="bg-background/90 border-border sticky top-0 z-20 border-y backdrop-blur">
      <ul className="mx-auto flex w-full max-w-6xl gap-2 overflow-x-auto px-4 py-2 md:px-6">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-muted-foreground hover:text-foreground border-border inline-flex whitespace-nowrap border px-2 py-1 text-xs transition-colors"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
