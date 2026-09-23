import { useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { site } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ensureGsap, revealBatch } from '@/lib/gsap'
import { asset } from '@/lib/asset'

export function ContactSplit() {
  const rootRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()
  const [sent, setSent] = useState(false)

  useLayoutEffect(() => {
    if (reduced || !rootRef.current) return
    ensureGsap()
    return revealBatch(rootRef.current, '[data-reveal]', { y: 28, stagger: 0.12 })
  }, [reduced])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const first = String(data.get('first') ?? '')
    const last = String(data.get('last') ?? '')
    const email = String(data.get('email') ?? '')
    const phone = String(data.get('phone') ?? '')
    const message = String(data.get('message') ?? '')
    const subject = encodeURIComponent(`Consultation request from ${first} ${last}`)
    const body = encodeURIComponent(
      `Name: ${first} ${last}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`,
    )
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`
    setSent(true)
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
              Share a brief outline of your matter. 
              {/* <a
                href={`mailto:${site.email}`}
                className="font-semibold text-gold-deep hover:text-ink"
              >
                {site.email}
              </a>
              . */}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-bold text-ink">
                First name
                <input
                  required
                  name="first"
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 font-medium outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm font-bold text-ink">
                Last name
                <input
                  required
                  name="last"
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 font-medium outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm font-bold text-ink sm:col-span-2">
                Email
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 font-medium outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm font-bold text-ink sm:col-span-2">
                Phone
                <input
                  name="phone"
                  type="tel"
                  className="mt-2 w-full rounded-xl border border-line bg-canvas px-4 py-3 font-medium outline-none focus:border-gold"
                />
              </label>
              <label className="block text-sm font-bold text-ink sm:col-span-2">
                Message
                <textarea
                  required
                  name="message"
                  rows={4}
                  className="mt-2 w-full resize-y rounded-xl border border-line bg-canvas px-4 py-3 font-medium outline-none focus:border-gold"
                />
              </label>
            </div>

            <p className="mt-4 text-xs text-muted">
              By sending, you agree we may contact you about this enquiry.
            </p>

            <Button
              type="submit"
              withArrow
              className="mt-6 w-full justify-between"
            >
              Contact us today
            </Button>
            {sent ? (
              <p className="mt-3 text-sm font-semibold text-gold-deep" role="status">
                Opening your email client…
              </p>
            ) : null}
          </form>
        </div>
      </Container>
    </section>
  )
}
