import { useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { GsapReveal } from '@/components/motion/GsapReveal'
import { InCard, InCardItem } from '@/components/motion/InCard'
import { site } from '@/data/site'
import { sendContactInquiry } from '@/lib/sendContact'
import { asset } from '@/lib/asset'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactSplit() {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const first = String(data.get('first') ?? '')
    const last = String(data.get('last') ?? '')

    setStatus('sending')
    setError('')

    try {
      await sendContactInquiry({
        name: `${first} ${last}`.trim(),
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
    <section className="bg-canvas py-20 md:py-28">
      <Container>
        <GsapReveal direction="up">
          <div className="overflow-hidden rounded-[2rem] border border-line bg-surface shadow-soft lg:grid lg:grid-cols-2">
            <div className="relative min-h-[320px] bg-soft">
              <img
                src={asset('images/contact.jpg')}
                alt="Counsel ready to assist"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 max-w-[220px] overflow-hidden rounded-2xl border-4 border-white shadow-card">
                <img
                  src={asset('images/meeting.jpg')}
                  alt=""
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <Link
                to="/about"
                className="absolute bottom-10 left-36 inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-white/90 px-4 py-2 text-sm font-bold text-ink backdrop-blur transition-transform duration-300 hover:scale-[1.02]"
              >
                Learn more
                <ArrowUpRight className="size-4" />
              </Link>
            </div>

            <InCard
              as="form"
              onSubmit={onSubmit}
              noValidate
              className="grid grid-cols-1 gap-4 p-7 sm:grid-cols-2 md:p-10"
            >
              <InCardItem
                as="h2"
                preset="fadeDown"
                className="text-3xl font-extrabold text-ink sm:col-span-2 md:text-4xl"
              >
                Get in touch
              </InCardItem>
              <InCardItem
                as="p"
                preset="fadeUp"
                className="text-sm text-muted sm:col-span-2 md:text-base"
              >
                Share a brief outline of your matter. We will reply to the email
                you provide.
              </InCardItem>

              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="pointer-events-none absolute h-0 w-0 opacity-0"
              />

              <InCardItem preset="fadeLeft" className="block text-sm font-bold text-ink">
                <label className="block">
                  First name
                  <input
                    required
                    name="first"
                    autoComplete="given-name"
                    disabled={status === 'sending'}
                    className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 font-medium outline-none focus:border-gold disabled:opacity-60"
                  />
                </label>
              </InCardItem>
              <InCardItem preset="fadeRight" className="block text-sm font-bold text-ink">
                <label className="block">
                  Last name
                  <input
                    required
                    name="last"
                    autoComplete="family-name"
                    disabled={status === 'sending'}
                    className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 font-medium outline-none focus:border-gold disabled:opacity-60"
                  />
                </label>
              </InCardItem>
              <InCardItem
                preset="fadeUp"
                className="block text-sm font-bold text-ink sm:col-span-2"
              >
                <label className="block">
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    disabled={status === 'sending'}
                    className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 font-medium outline-none focus:border-gold disabled:opacity-60"
                  />
                </label>
              </InCardItem>
              <InCardItem
                preset="fadeLeft"
                className="block text-sm font-bold text-ink sm:col-span-2"
              >
                <label className="block">
                  Phone
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    disabled={status === 'sending'}
                    className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 font-medium outline-none focus:border-gold disabled:opacity-60"
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
                    rows={4}
                    disabled={status === 'sending'}
                    className="mt-2 w-full resize-y rounded-xl border border-line bg-canvas px-4 py-3 font-medium outline-none focus:border-gold disabled:opacity-60"
                  />
                </label>
              </InCardItem>

              <InCardItem
                as="p"
                preset="fadeUp"
                className="text-xs text-muted sm:col-span-2"
              >
                By sending, you agree we may contact you about this enquiry.
              </InCardItem>

              <InCardItem preset="softPop" className="sm:col-span-2">
                <Button
                  type="submit"
                  withArrow
                  disabled={status === 'sending'}
                  className="w-full justify-between"
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
          </div>
        </GsapReveal>
      </Container>
    </section>
  )
}
