import {
  motion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion"
import type { ReactNode } from "react"

import { useReducedMotion } from "@/hooks/use-reduced-motion"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  direction?: "up" | "down" | "left" | "right" | "none"
} & Omit<HTMLMotionProps<"div">, "children">

const offsets = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
} as const

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  ...props
}: RevealProps) {
  const reduced = useReducedMotion()

  const variants: Variants = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, ...offsets[direction] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: {
            duration: 0.7,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      {...props}
    >
      {children}
    </motion.div>
  )
}
