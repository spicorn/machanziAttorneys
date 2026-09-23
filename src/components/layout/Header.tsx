import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { BrandMark } from '@/components/ui/BrandMark'
import { Container } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'
import { navLinks } from '@/data/site'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (reduced || !open) return
    const items = gsap.utils.toArray<HTMLElement>('[data-mobile-link]')
    const cta = document.querySelector<HTMLElement>('[data-mobile-cta]')
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.fromTo(
      items,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, stagger: 0.06, duration: 0.42 },
    )
    if (cta) {
      tl.fromTo(
        cta,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35 },
        '-=0.18',
      )
    }
    return () => {
      tl.kill()
    }
  }, [open, reduced])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background,box-shadow,border-color] duration-300',
        scrolled || open
          ? 'border-line bg-surface/95 shadow-soft backdrop-blur-xl'
          : 'border-transparent bg-canvas/80 backdrop-blur-md',
      )}
    >
      <Container className="flex h-[4.25rem] items-center justify-between gap-4">
        <BrandMark />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-[var(--radius-pill)] px-4 py-2 text-sm font-semibold text-muted transition-colors hover:text-ink',
                  isActive && 'bg-soft text-ink',
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <LinkButton href="/contact" withArrow>
            Book a consultation
          </LinkButton>
        </div>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-[var(--radius-pill)] bg-soft text-ink transition-colors hover:bg-navy hover:text-white lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" strokeWidth={1.75} /> : <Menu className="size-5" strokeWidth={1.75} />}
        </button>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-surface lg:hidden"
          style={{ height: 'calc(100dvh - 4.25rem)' }}
        >
          <Container className="flex h-full flex-col pt-6 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <nav
              className="flex flex-1 flex-col justify-center gap-0 overflow-y-auto"
              aria-label="Mobile"
            >
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  data-mobile-link
                  className={({ isActive }) =>
                    cn(
                      'group relative flex items-center gap-3.5 py-3.5 font-display text-[clamp(1.85rem,8vw,2.35rem)] leading-none tracking-tight transition-colors',
                      isActive
                        ? 'font-semibold text-ink'
                        : 'font-medium text-ink/55 hover:text-ink',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        aria-hidden
                        className={cn(
                          'block size-1.5 shrink-0 rounded-full bg-gold transition-opacity duration-300',
                          isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-40',
                        )}
                      />
                      {link.label}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div
              data-mobile-cta
              className="shrink-0 border-t border-line pt-5"
            >
              <LinkButton href="/contact" withArrow className="w-full justify-between">
                Book a consultation
              </LinkButton>
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
