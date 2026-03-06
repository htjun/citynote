interface SectionHeaderProps {
  id: string
  title: string
  description?: string
}

export function SectionHeader({ id, title, description }: SectionHeaderProps) {
  return (
    <header id={id} className="scroll-mt-28">
      <h2 className="font-editorial text-3xl tracking-[-0.03em]">{title}</h2>
      {description ? (
        <p className="text-quiet mt-2 max-w-3xl text-sm leading-relaxed">
          {description}
        </p>
      ) : null}
    </header>
  )
}
