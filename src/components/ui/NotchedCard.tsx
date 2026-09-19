import type { ElementType, ReactNode } from 'react'
import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/cn'
import { ensureGsap } from '@/lib/gsap'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

/** Rounded frame with stepped bottom-right notch (design language, not theme). */
const NOTCH_PATH =
  'M 14 1.5 H 386 Q 398.5 1.5 398.5 14 V 292 H 268 Q 255.5 292 255.5 304.5 V 386 Q 255.5 398.5 243 398.5 H 14 Q 1.5 398.5 1.5 386 V 14 Q 1.5 1.5 14 1.5 Z'

type Tone = 'dark' | 'light'

type NotchedCardProps = {
  children: ReactNode
  label: string
  accent: string
  tone?: Tone
  className?: string
  bodyClassName?: string
  drawOnView?: boolean
  as?: ElementType
}

export function NotchedCard({
  children,
  label,
  accent,
  tone = 'dark',
  className,
  bodyClassName,
  drawOnView = true,
  as: Tag = 'article',
}: NotchedCardProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const reduced = usePrefersReducedMotion()
  const dark = tone === 'dark'

  useLayoutEffect(() => {
    if (!drawOnView || reduced || !rootRef.current || !pathRef.current) return
    ensureGsap()
    const path = pathRef.current
    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`

    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.35,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: rootRef.current,
        start: 'top 85%',
        once: true,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [drawOnView, reduced])

  return (
    <Tag
      ref={rootRef}
      className={cn(
        'group relative isolate aspect-square overflow-hidden',
        dark ? 'bg-navy text-white' : 'bg-surface text-ink',
        className,
      )}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          ref={pathRef}
          d={NOTCH_PATH}
          fill="none"
          stroke={dark ? 'rgba(255,255,255,0.28)' : 'rgba(11,18,32,0.18)'}
          strokeWidth="1.25"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div
        className={cn(
          'relative flex h-[72%] items-center justify-center px-8 pt-8',
          bodyClassName,
        )}
      >
        {children}
      </div>

      <div className="absolute right-5 bottom-5 z-10 max-w-[46%] text-right leading-tight">
        <p
          className={cn(
            'text-sm font-extrabold tracking-tight md:text-base',
            dark ? 'text-white' : 'text-ink',
          )}
        >
          {label}
        </p>
        <p className="mt-0.5 text-sm font-bold text-gold md:text-[0.95rem]">
          {accent}
        </p>
      </div>
    </Tag>
  )
}
