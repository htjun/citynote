import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "border-subtle bg-raised text-foreground placeholder:text-quieter focus-visible:border-super/45 focus-visible:ring-super/30 aria-invalid:border-destructive aria-invalid:ring-destructive/25 flex h-9 w-full min-w-0 rounded-lg border px-3 py-1.5 text-xs transition-[background-color,border-color,color,box-shadow] duration-normal ease-fluid outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground hover:bg-subtle focus-visible:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-subtle/60 disabled:opacity-60",
        className
      )}
      {...props}
    />
  )
}

export { Input }
