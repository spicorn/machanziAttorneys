import { useEffect, useRef } from 'react'
import { LottieLight as Lottie, type LottieHandle } from 'lottie-react'
import { Container, SectionBadge } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'
import { site, credentials } from '@/data/site'
import { credentialIcons } from '@/data/expertise'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import scalesAnimation from '@/assets/lottie/scales.json'

export function AboutPage() {
  const lottieRef = useRef<LottieHandle>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (!reduced) return
    const id = window.setTimeout(() => {
      lottieRef.current?.pause()
      lottieRef.current?.seek(24)
    }, 120)
    return () => window.clearTimeout(id)
  }, [reduced])

  return (
    <>
      <section className="bg-canvas pt-16 pb-12 md:pt-24 md:pb-16">
        <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <SectionBadge>About the firm</SectionBadge>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Built for trust, measured in results.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              Maruwa Machanzi Attorneys is a full-service practice advising
              clients across property, commerce, family, estates, and
              contentious work  with the composure of a chambers that values
              clarity over spectacle.
            </p>
          </div>
          <div className="mx-auto flex h-[260px] w-full max-w-sm items-center justify-center rounded-[1.75rem] border border-line bg-surface p-4 shadow-card">
            <Lottie
              lottieRef={lottieRef}
              src={scalesAnimation}
              loop={!reduced}
              autoplay={!reduced}
              className="h-full w-full"
              aria-hidden
            />
          </div>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold text-ink">How we work</h2>
            <div className="mt-6 space-y-5 text-base leading-relaxed text-muted">
              <p>
                We begin by listening. Mandates are framed around what you need
                to protect, decide, or resolve  then executed with transparent
                timelines and plain language.
              </p>
              <p>
                As a firm registered with the Law Society of Zimbabwe, we hold
                ourselves to professional standards that keep counsel ethical,
                confidential, and practical.
              </p>
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-line bg-canvas p-8 shadow-card">
            <p className="text-xs font-bold tracking-[0.2em] text-gold-deep uppercase">
              Our credentials
            </p>
            <ul className="mt-6 space-y-4">
              {credentials.map((item) => {
                const Icon = credentialIcons[item.key]
                return (
                  <li key={item.key} className="flex items-center gap-4">
                    <span className="flex size-10 items-center justify-center rounded-full bg-soft text-gold-deep">
                      <Icon className="size-4" strokeWidth={1.6} />
                    </span>
                    <span className="font-semibold text-ink">{item.title}</span>
                  </li>
                )
              })}
            </ul>
            <p className="mt-8 text-sm text-muted">{site.society}</p>
          </div>
        </Container>
      </section>

      <section className="bg-canvas py-16">
        <Container className="flex flex-col items-start justify-between gap-6 rounded-[2rem] bg-navy p-8 md:flex-row md:items-center md:p-10">
          <div>
            <h2 className="text-2xl font-extrabold text-white md:text-3xl">
              Experience. Integrity  Results.
            </h2>
            <p className="mt-2 max-w-lg text-white/70">
              Meet the practitioners who carry every mandate with care.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <LinkButton href="/people" variant="gold" withArrow>
              Our people
            </LinkButton>
            <LinkButton href="/contact" variant="secondary" withArrow>
              Contact us
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  )
}
