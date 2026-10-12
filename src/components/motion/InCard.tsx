import type { FormEvent, ReactNode } from 'react'
import { m, type Variants } from 'motion/react'
import { cn } from '@/lib/cn'
import {
  presets,
  staggerContainer,
  staggerFast,
  transition,
  type MotionPreset,
} from '@/lib/motion'

/**
 * Staggers every direct child inside a card when it enters (reverses on scroll-up).
 */
export function InCard({
  children,
  className,
  fast = false,
  id,
  as = 'div',
  onSubmit,
  noValidate,
}: {
  children: ReactNode
  className?: string
  fast?: boolean
  id?: string
  as?: 'div' | 'form'
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
  noValidate?: boolean
}) {
  const variants = fast ? staggerFast : staggerContainer
  const motionProps = {
    id,
    className: cn(className),
    variants,
    initial: 'hidden' as const,
    whileInView: 'visible' as const,
    viewport: { once: false, amount: 0.35, margin: '0px 0px -4% 0px' },
  }

  if (as === 'form') {
    return (
      <m.form {...motionProps} onSubmit={onSubmit} noValidate={noValidate}>
        {children}
      </m.form>
    )
  }

  return <m.div {...motionProps}>{children}</m.div>
}

export function InCardItem({
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
  as?: 'div' | 'span' | 'p' | 'h3' | 'h2' | 'h4' | 'img' | 'label'
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
