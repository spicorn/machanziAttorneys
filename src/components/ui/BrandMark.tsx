import { Link } from 'react-router-dom'
import { Scale } from 'lucide-react'
import { cn } from '@/lib/cn'

export function BrandMark({
  className,
  tone = 'dark',
}: {
  className?: string
  tone?: 'dark' | 'light'
}) {
  const light = tone === 'light'

  return (
    <Link
      to="/"
      className={cn('group inline-flex items-center gap-3', className)}
      aria-label="Maruwa Machanzi Attorneys home"
    >
      <span
        className={cn(
          'flex size-10 items-center justify-center rounded-full border',
          light ? 'border-gold/50 text-gold' : 'border-navy/15 text-navy',
        )}
      >
        <Scale className="size-4" strokeWidth={1.7} aria-hidden />
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            'block font-display text-lg font-semibold tracking-[0.04em] uppercase',
            light ? 'text-white' : 'text-ink',
          )}
        >
          Maruwa Machanzi
        </span>
        <span
          className={cn(
            'block text-[10px] font-bold tracking-[0.28em] uppercase',
            light ? 'text-gold' : 'text-gold-deep',
          )}
        >
          Attorneys
        </span>
      </span>
    </Link>
  )
}
