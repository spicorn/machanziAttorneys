import type { ReactNode } from 'react'
import { m, type Variants } from 'motion/react'
import { cn } from '@/lib/cn'
import {
  presets,
  staggerContainer,
  staggerFast,
  transition,
  type MotionPreset,
} from '@/lib/motion'

type StaggerProps = {
  children: ReactNode
  className?: string
  /** Replay when scrolling back up */
  once?: boolean
  fast?: boolean
  as?: 'div' | 'ul' | 'section'
}

/**
 * Parent sets stagger; wrap each child in <StaggerItem preset="…">.
 */
export function Stagger({
  children,
  className,
  once = false,
  fast = false,
  as = 'div',
}: StaggerProps) {
  const Comp = m[as]

  return (
    <Comp
      className={cn(className)}
      variants={fast ? staggerFast : staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.12, margin: '0px 0px -5% 0px' }}
    >
      {children}
    </Comp>
  )
}

export function StaggerItem({
  children,
  className,
  preset = 'fadeUp',
  variants,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  preset?: MotionPreset
  variants?: Variants
  as?: 'div' | 'li' | 'article'
}) {
  const Comp = m[as]

  return (
    <Comp
      className={cn(className)}
      variants={variants ?? presets[preset]}
      transition={transition}
    >
      {children}
    </Comp>
  )
}
