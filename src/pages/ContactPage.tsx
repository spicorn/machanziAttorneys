import { useState, type FormEvent } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Container, SectionBadge } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'
import { InCard, InCardItem } from '@/components/motion/InCard'
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
          <Reveal preset="riseBlur" soft>
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
          </Reveal>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal as="div" preset="fadeLeft">
            <InCard className="rounded-[1.75rem] border border-line bg-canvas p-7 shadow-card">
              <InCardItem
                as="h2"
                preset="fadeDown"
                className="text-xs font-bold tracking-[0.2em] text-gold-deep uppercase"
              >
                Chambers
              </InCardItem>
              <InCardItem preset="fadeLeft" className="mt-6 flex gap-3 text-sm text-muted">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                <span>
                  {site.address.line1}
                  <br />
                  {site.address.line2}, {site.address.country}
                </span>
              </InCardItem>
              <InCardItem preset="fadeUp" className="mt-5 flex gap-3 text-sm text-muted">
                <Phone className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                <span className="space-y-1">
                  {site.phones.map((p) => (
                    <a key={p.value} href={p.href} className="block hover:text-ink">
                      {p.label}: {p.value}
                    </a>
                  ))}
                </span>
              </InCardItem>
              <InCardItem preset="fadeRight" className="mt-5 flex gap-3 text-sm text-muted">
                <Mail className="mt-0.5 size-4 shrink-0 text-gold-deep" />
                <a href={`mailto:${site.email}`} className="break-all hover:text-ink">
                  {site.email}
                </a>
              </InCardItem>
            </InCard>
          </Reveal>

          <Reveal delay={0.08} preset="fadeRight">
            <InCard
              as="form"
              onSubmit={onSubmit}
              noValidate
              className="grid grid-cols-1 gap-4 rounded-[1.75rem] border border-line bg-surface p-7 shadow-card sm:grid-cols-2 md:p-9"
            >
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="pointer-events-none absolute h-0 w-0 opacity-0"
              />

              <InCardItem
                preset="fadeUp"
                className="block text-sm font-bold text-ink sm:col-span-2"
              >
                <label className="block">
                  Full name
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    disabled={status === 'sending'}
                    className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 outline-none focus:border-gold disabled:opacity-60"
                  />
                </label>
              </InCardItem>
              <InCardItem preset="fadeLeft" className="block text-sm font-bold text-ink">
                <label className="block">
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
              </InCardItem>
              <InCardItem preset="fadeRight" className="block text-sm font-bold text-ink">
                <label className="block">
                  Phone
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    disabled={status === 'sending'}
                    className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 outline-none focus:border-gold disabled:opacity-60"
                  />
                </label>
              </InCardItem>
              <InCardItem
                preset="riseBlur"
                className="block text-sm font-bold text-ink sm:col-span-2"
              >
                <label className="block">
                  Message
                  <textarea
                    required
                    name="message"
                    rows={5}
                    disabled={status === 'sending'}
                    className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 outline-none focus:border-gold disabled:opacity-60"
                  />
                </label>
              </InCardItem>

              <InCardItem preset="softPop" className="sm:col-span-2">
                <Button
                  type="submit"
                  withArrow
                  disabled={status === 'sending'}
                  className="justify-between sm:min-w-[240px]"
                >
                  {status === 'sending' ? 'Sending…' : 'Contact us today'}
                </Button>
              </InCardItem>

              {status === 'sent' ? (
                <InCardItem
                  as="p"
                  preset="fadeUp"
                  className="text-sm font-semibold text-gold-deep sm:col-span-2"
                >
                  Thank you — your message was sent to {site.email}.
                </InCardItem>
              ) : null}
              {status === 'error' ? (
                <p
                  className="text-sm font-semibold text-red-700 sm:col-span-2"
                  role="alert"
                >
                  {error}{' '}
                  <a href={`mailto:${site.email}`} className="underline">
                    Email us directly
                  </a>
                </p>
              ) : null}
            </InCard>
          </Reveal>
        </Container>
      </section>
    </>
  )
}
