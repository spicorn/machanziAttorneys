import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { BrandMark } from '@/components/ui/BrandMark'
import { Container } from '@/components/ui/Container'
import { navLinks, site } from '@/data/site'

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <Container className="grid gap-12 py-16 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <BrandMark tone="light" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/65">
            {site.blurb}
          </p>
          <p className="mt-4 text-xs font-bold tracking-[0.22em] text-gold uppercase">
            {site.credential}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.22em] text-gold uppercase">
            Navigate
          </h3>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-white/70 hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.22em] text-gold uppercase">
            Chambers
          </h3>
          <ul className="mt-4 space-y-4 text-sm text-white/70">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.6} />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}, {site.address.country}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.6} />
              <span className="space-y-1">
                {site.phones.map((p) => (
                  <a key={p.value} href={p.href} className="block hover:text-white">
                    {p.value}
                  </a>
                ))}
              </span>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={1.6} />
              <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>{site.society}</p>
        </Container>
      </div>
    </footer>
  )
}
