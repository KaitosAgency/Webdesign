import { Input } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex h-10 w-full min-w-0 rounded-lg border border-input bg-background px-3 py-2 text-base text-foreground shadow-xs transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30",
)

function InputField({
  className,
  ...props
}: React.ComponentProps<typeof Input> & VariantProps<typeof inputVariants>) {
  return (
    <Input
      data-slot="input"
      className={cn(inputVariants(), className)}
      {...props}
    />
  )
}

export { InputField as Input }
