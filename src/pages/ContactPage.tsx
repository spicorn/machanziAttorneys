import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Container, SectionBadge } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { site } from '@/data/site'
import { sendContactInquiry } from '@/lib/sendContact'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    setStatus('sending')
    setError('')

    try {
      await sendContactInquiry({
        name: String(data.get('name') ?? ''),
        email: String(data.get('email') ?? ''),
        phone: String(data.get('phone') ?? ''),
        message: String(data.get('message') ?? ''),
        company: String(data.get('company') ?? ''),
      })
      setStatus('sent')
      form.reset()
    } catch (err) {
      setStatus('error')
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to send your message. Please try again or email us directly.',
      )
    }
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
            Messages are delivered securely to{' '}
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
            {/* Honeypot — hidden from people, traps bots */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="pointer-events-none absolute h-0 w-0 opacity-0"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-bold text-ink sm:col-span-2">
                Full name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  disabled={status === 'sending'}
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 outline-none focus:border-gold disabled:opacity-60"
                />
              </label>
              <label className="block text-sm font-bold text-ink">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  disabled={status === 'sending'}
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 outline-none focus:border-gold disabled:opacity-60"
                />
              </label>
              <label className="block text-sm font-bold text-ink">
                Phone
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  disabled={status === 'sending'}
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 outline-none focus:border-gold disabled:opacity-60"
                />
              </label>
              <label className="block text-sm font-bold text-ink sm:col-span-2">
                Message
                <textarea
                  required
                  name="message"
                  rows={5}
                  disabled={status === 'sending'}
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 outline-none focus:border-gold disabled:opacity-60"
                />
              </label>
            </div>

            <Button
              type="submit"
              withArrow
              disabled={status === 'sending'}
              className="mt-6 justify-between sm:min-w-[240px]"
            >
              {status === 'sending' ? 'Sending…' : 'Contact us today'}
            </Button>

            {status === 'sent' ? (
              <p className="mt-3 text-sm font-semibold text-gold-deep" role="status">
                Thank you — your message was sent to {site.email}.
              </p>
            ) : null}
            {status === 'error' ? (
              <p className="mt-3 text-sm font-semibold text-red-700" role="alert">
                {error}{' '}
                <a href={`mailto:${site.email}`} className="underline">
                  Email us directly
                </a>
              </p>
            ) : null}
          </form>
        </Container>
      </section>
    </>
  )
}
