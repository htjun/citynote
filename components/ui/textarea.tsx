import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-subtle bg-raised text-foreground placeholder:text-quieter focus-visible:border-super/45 focus-visible:ring-super/30 aria-invalid:border-destructive aria-invalid:ring-destructive/25 flex field-sizing-content min-h-20 w-full rounded-lg border px-3 py-2 text-xs transition-[background-color,border-color,color,box-shadow] duration-normal ease-fluid outline-none hover:bg-subtle focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-subtle/60 disabled:opacity-60",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
