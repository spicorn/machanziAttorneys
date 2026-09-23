import { useRef, useLayoutEffect } from 'react'
import { teamPhoto } from '@/data/team'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ensureGsap, parallaxY } from '@/lib/gsap'

type TeamGroupPhotoProps = {
  className?: string
  imgClassName?: string
  alt?: string
  /** Soft scrubbed parallax without cropping faces */
  parallax?: boolean
}

/**
 * Full-width team photograph — always shows the whole group (no edge crop).
 */
export function TeamGroupPhoto({
  className,
  imgClassName,
  alt = 'Maruwa Machanzi Attorneys team',
  parallax = true,
}: TeamGroupPhotoProps) {
  const frameRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const reduced = usePrefersReducedMotion()

  useLayoutEffect(() => {
    if (!parallax || reduced || !frameRef.current || !imgRef.current) return
    ensureGsap()
    return parallaxY(frameRef.current, imgRef.current, 28)
  }, [parallax, reduced])

  return (
    <div
      ref={frameRef}
      className={cn(
        'overflow-hidden rounded-[1.75rem] bg-soft shadow-card',
        className,
      )}
    >
      <img
        ref={imgRef}
        src={teamPhoto}
        alt={alt}
        className={cn(
          'h-auto w-full object-contain object-center will-change-transform',
          imgClassName,
        )}
      />
    </div>
  )
}
