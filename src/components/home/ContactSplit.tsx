import { useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { site } from '@/data/site'
import { sendContactInquiry } from '@/lib/sendContact'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ensureGsap, revealBatch } from '@/lib/gsap'
import { asset } from '@/lib/asset'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function ContactSplit() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  useLayoutEffect(() => {
    if (reduced || !rootRef.current) return
    ensureGsap()
    return revealBatch(rootRef.current, '[data-reveal]', { y: 28, stagger: 0.12 })
  }, [reduced])

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
    <section ref={rootRef} className="bg-canvas py-20 md:py-28">
      <Container>
        <div
          data-reveal
          className="overflow-hidden rounded-[2rem] border border-line bg-surface shadow-soft lg:grid lg:grid-cols-2"
        >
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
              className="absolute bottom-10 left-36 inline-flex items-center gap-2 rounded-[var(--radius-pill)] bg-white/90 px-4 py-2 text-sm font-bold text-ink backdrop-blur"
            >
              Learn more
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <form onSubmit={onSubmit} className="p-7 md:p-10" noValidate>
            <h2 className="text-3xl font-extrabold text-ink md:text-4xl">
              Get in touch
            </h2>
            <p className="mt-2 text-sm text-muted md:text-base">
              Share a brief outline of your matter. We will reply to the email
              you provide.
            </p>

            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
              className="pointer-events-none absolute h-0 w-0 opacity-0"
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-bold text-ink">
                First name
                <input
                  required
                  name="first"
                  autoComplete="given-name"
                  disabled={status === 'sending'}
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 font-medium outline-none focus:border-gold disabled:opacity-60"
                />
              </label>
              <label className="block text-sm font-bold text-ink">
                Last name
                <input
                  required
                  name="last"
                  autoComplete="family-name"
                  disabled={status === 'sending'}
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 font-medium outline-none focus:border-gold disabled:opacity-60"
                />
              </label>
              <label className="block text-sm font-bold text-ink sm:col-span-2">
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
              <label className="block text-sm font-bold text-ink sm:col-span-2">
                Phone
                <input
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  disabled={status === 'sending'}
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 font-medium outline-none focus:border-gold disabled:opacity-60"
                />
              </label>
              <label className="block text-sm font-bold text-ink sm:col-span-2">
                Message
                <textarea
                  required
                  name="message"
                  rows={4}
                  disabled={status === 'sending'}
                  className="mt-2 w-full resize-y rounded-xl border border-line bg-canvas px-4 py-3 font-medium outline-none focus:border-gold disabled:opacity-60"
                />
              </label>
            </div>

            <p className="mt-4 text-xs text-muted">
              By sending, you agree we may contact you about this enquiry.
            </p>

            <Button
              type="submit"
              withArrow
              disabled={status === 'sending'}
              className="mt-6 w-full justify-between"
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
        </div>
      </Container>
    </section>
  )
}
