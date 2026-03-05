import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex h-6 w-fit shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-medium transition-[background-color,border-color,color,opacity] duration-normal ease-fluid has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&>svg]:pointer-events-none [&>svg]:size-3! focus-visible:border-super/45 focus-visible:ring-2 focus-visible:ring-super/30",
  {
    defaultVariants: {
      variant: "default",
    },
    variants: {
      variant: {
        default: "border-super/30 bg-super/12 text-super [a]:hover:bg-super/18",
        destructive:
          "border-destructive/25 bg-destructive/12 text-destructive [a]:hover:bg-destructive/18",
        ghost: "border-subtle bg-subtle text-quiet hover:text-foreground",
        link: "border-transparent px-0 text-super underline-offset-4 hover:underline",
        outline:
          "border-subtle bg-raised text-foreground [a]:hover:bg-subtle [a]:hover:text-foreground",
        secondary: "border-subtle bg-quiet text-foreground [a]:hover:bg-subtle",
      },
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}: useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps<"span">(
      {
        className: cn(badgeVariants({ variant }), className),
      },
      props
    ),
    render,
    state: {
      slot: "badge",
      variant,
    },
  })
}

export { Badge, badgeVariants }
