import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import gsap from 'gsap'
import { BrandMark } from '@/components/ui/BrandMark'
import { Container } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'
import { navLinks, site } from '@/data/site'
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
    if (reduced || !open) return
    const items = gsap.utils.toArray<HTMLElement>('[data-mobile-link]')
    gsap.fromTo(
      items,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.35, ease: 'power2.out' },
    )
  }, [open, reduced])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 border-b transition-[background,box-shadow,border-color] duration-300',
        scrolled
          ? 'border-line bg-surface/90 shadow-soft backdrop-blur-xl'
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
          className="inline-flex size-11 items-center justify-center rounded-[var(--radius-pill)] bg-soft text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open ? (
        <div id="mobile-nav" className="border-t border-line bg-surface lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                data-mobile-link
                className={({ isActive }) =>
                  cn(
                    'rounded-2xl px-4 py-3 text-base font-semibold text-muted',
                    isActive && 'bg-soft text-ink',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
            <LinkButton href="/contact" withArrow className="mt-3 w-full justify-between">
              Book a consultation
            </LinkButton>
            <p className="mt-3 px-4 text-xs text-muted">{site.phones[0].value}</p>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
