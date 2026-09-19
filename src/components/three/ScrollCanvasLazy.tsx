import { lazy, Suspense } from 'react'
import { cn } from '@/lib/cn'

const Canvas = lazy(() =>
  import('@/components/three/ScrollCanvas').then((m) => ({
    default: m.ScrollCanvas,
  })),
)

export function ScrollCanvasLazy({ className }: { className?: string }) {
  return (
    <Suspense
      fallback={
        <div
          className={cn('h-full w-full animate-pulse rounded-full bg-white/5', className)}
          aria-hidden
        />
      }
    >
      <Canvas className={className} />
    </Suspense>
  )
}
