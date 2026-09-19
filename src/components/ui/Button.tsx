import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/cn'

const base =
  'inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] px-6 py-3.5 text-sm font-bold tracking-wide transition-transform duration-300 focus-visible:outline-none active:scale-[0.98]'

const variants = {
  primary: 'bg-navy text-white hover:bg-ink',
  secondary: 'border border-line bg-surface text-ink hover:border-ink/30',
  gold: 'bg-gold text-ink hover:brightness-105',
  ghost: 'bg-transparent text-ink hover:text-gold-deep',
} as const

type Variant = keyof typeof variants

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  withArrow?: boolean
}

export function Button({
  className,
  variant = 'primary',
  withArrow,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], className)} {...props}>
      <span>{children}</span>
      {withArrow ? (
        <span className="flex size-8 items-center justify-center rounded-full bg-white/15">
          <ArrowUpRight className="size-4" strokeWidth={2} />
        </span>
      ) : null}
    </button>
  )
}

type LinkButtonProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  variant?: Variant
  href: string
  withArrow?: boolean
}

export function LinkButton({
  className,
  variant = 'primary',
  href,
  withArrow,
  children,
}: LinkButtonProps) {
  const classes = cn(base, variants[variant], withArrow && 'pr-2 pl-6', className)
  const content = (
    <>
      <span>{children}</span>
      {withArrow ? (
        <span
          className={cn(
            'ml-1 flex size-9 items-center justify-center rounded-full',
            variant === 'primary' || variant === 'gold'
              ? 'bg-white text-navy'
              : 'bg-navy text-white',
          )}
        >
          <ArrowUpRight className="size-4" strokeWidth={2.2} />
        </span>
      ) : null}
    </>
  )

  if (href.startsWith('/')) {
    return (
      <Link to={href} className={classes}>
        {content}
      </Link>
    )
  }

  return (
    <a href={href} className={classes}>
      {content}
    </a>
  )
}
