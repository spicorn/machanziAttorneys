import type { ReactNode } from 'react'
import { m, type Variants } from 'motion/react'
import { cn } from '@/lib/cn'
import {
  presets,
  transition,
  transitionSoft,
  type MotionPreset,
} from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Named motion language for this block */
  preset?: MotionPreset
  variants?: Variants
  /**
   * When false (default), reverse on scroll-up so revisiting a section feels alive.
   */
  once?: boolean
  soft?: boolean
  as?: 'div' | 'section' | 'article' | 'li' | 'header' | 'footer'
}

/**
 * Bidirectional scroll reveal — transform/opacity (and optional blur) only.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  preset = 'fadeUp',
  variants,
  once = false,
  soft = false,
  as = 'div',
}: RevealProps) {
  const Comp = m[as]
  const resolved = variants ?? presets[preset]

  return (
    <Comp
      className={cn(className)}
      variants={resolved}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: '0px 0px -8% 0px' }}
      transition={{ ...(soft ? transitionSoft : transition), delay }}
    >
      {children}
    </Comp>
  )
}
