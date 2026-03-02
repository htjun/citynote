interface SectionHeaderProps {
  id: string
  title: string
  description?: string
}

export function SectionHeader({ id, title, description }: SectionHeaderProps) {
  return (
    <header id={id} className="scroll-mt-8">
      <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      {description ? (
        <p className="text-muted-foreground mt-1 text-sm">{description}</p>
      ) : null}
    </header>
  )
}
