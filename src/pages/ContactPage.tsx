import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Container, SectionBadge } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { site } from '@/data/site'

export function ContactPage() {
  const [sent, setSent] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '')
    const email = String(data.get('email') ?? '')
    const phone = String(data.get('phone') ?? '')
    const message = String(data.get('message') ?? '')
    const subject = encodeURIComponent(`Consultation request from ${name}`)
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <section className="bg-canvas pt-16 pb-10 md:pt-24">
        <Container>
          <SectionBadge>Contact</SectionBadge>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Get in touch
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Write, call, or visit chambers at {site.address.line1}, Eastlea.
            Form messages are sent to{' '}
            <a
              href={`mailto:${site.email}`}
              className="font-semibold text-gold-deep hover:text-ink"
            >
              {site.email}
            </a>
            .
          </p>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <aside className="rounded-[1.75rem] border border-line bg-canvas p-7 shadow-card">
            <h2 className="text-xs font-bold tracking-[0.2em] text-gold-deep uppercase">
              Chambers
            </h2>
            <ul className="mt-6 space-y-5 text-sm text-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}, {site.address.country}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                <span className="space-y-1">
                  {site.phones.map((p) => (
                    <a key={p.value} href={p.href} className="block hover:text-ink">
                      {p.label}: {p.value}
                    </a>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-ink">
                  {site.email}
                </a>
              </li>
            </ul>
          </aside>

          <form
            onSubmit={onSubmit}
            className="rounded-[1.75rem] border border-line bg-surface p-7 shadow-card md:p-9"
            noValidate
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-bold text-ink sm:col-span-2">
                Full name
                <input
                  required
                  name="name"
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm font-bold text-ink">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm font-bold text-ink">
                Phone
                <input
                  name="phone"
                  type="tel"
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm font-bold text-ink sm:col-span-2">
                Message
                <textarea
                  required
                  name="message"
                  rows={5}
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 outline-none focus:border-gold"
                />
              </label>
            </div>
            <Button type="submit" withArrow className="mt-6 justify-between sm:min-w-[240px]">
              Contact us today
            </Button>
            {sent ? (
              <p className="mt-3 text-sm font-semibold text-gold-deep" role="status">
                Opening your email client…
              </p>
            ) : null}
          </form>
        </Container>
      </section>
    </>
  )
}
