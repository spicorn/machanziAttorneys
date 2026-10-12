import { type ReactNode } from 'react'
import { LazyMotion, domAnimation, MotionConfig } from 'motion/react'

/**
 * Loads only the DOM animation feature set (smaller than full motion).
 * Reduced-motion users get instant / opacity-only behaviour via MotionConfig.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  )
}
