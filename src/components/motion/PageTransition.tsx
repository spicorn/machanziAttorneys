import type { ReactNode } from 'react'
import { m } from 'motion/react'
import { pageTransition, transitionFast } from '@/lib/motion'

/** Lightweight route enter — opacity + small y only */
export function PageTransition({
  children,
  routeKey,
}: {
  children: ReactNode
  routeKey: string
}) {
  return (
    <m.div
      key={routeKey}
      variants={pageTransition}
      initial="initial"
      animate="animate"
      transition={transitionFast}
    >
      {children}
    </m.div>
  )
}
