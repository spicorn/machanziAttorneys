import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type ContainerProps = {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'header' | 'footer'
}

export function Container({
  children,
  className,
  as: Tag = 'div',
}: ContainerProps) {
  return (
    <Tag className={cn('mx-auto w-full max-w-6xl px-5 md:px-8', className)}>
      {children}
    </Tag>
  )
}

export function SectionBadge({ children }: { children: ReactNode }) {
  return <span className="pill">{children}</span>
}

export function SectionIntro({
  badge,
  title,
  description,
  className,
}: {
  badge: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className="max-w-xl">
        <SectionBadge>{badge}</SectionBadge>
        <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-md text-sm leading-relaxed text-muted md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  )
}
