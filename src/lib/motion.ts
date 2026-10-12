import type { Transition, Variants } from 'motion/react'

/** Shared timing — keep durations short for perceived speed */
export const easeOut = [0.22, 1, 0.36, 1] as const
export const easeSnap = [0.16, 1, 0.3, 1] as const

export const transition: Transition = {
  duration: 0.6,
  ease: easeOut,
}

export const transitionFast: Transition = {
  duration: 0.35,
  ease: easeOut,
}

export const transitionSoft: Transition = {
  duration: 0.75,
  ease: easeSnap,
}

/** Named presets — pick per section so scrolling never feels identical */
export const presets = {
  fadeUp: {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -28 },
    visible: { opacity: 1, y: 0 },
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 1.06, y: 16 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  riseBlur: {
    hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  softPop: {
    hidden: { opacity: 0, scale: 0.88, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
  slideSkew: {
    hidden: { opacity: 0, x: -32, rotate: -1.5 },
    visible: { opacity: 1, x: 0, rotate: 0 },
  },
} as const satisfies Record<string, Variants>

export type MotionPreset = keyof typeof presets

export const fadeUp = presets.fadeUp
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
export const scaleIn = presets.scaleIn

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
}

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}
