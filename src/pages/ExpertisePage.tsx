import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Container, SectionBadge } from '@/components/ui/Container'
import { LinkButton } from '@/components/ui/Button'
import { practiceAreas } from '@/data/expertise'

export function ExpertisePage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const el = document.getElementById(location.hash.replace('#', ''))
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [location.hash])

  return (
    <>
      <section className="bg-canvas pt-16 pb-10 md:pt-24">
        <Container>
          <SectionBadge>Expertise</SectionBadge>
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
            Practice areas with room to breathe.
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            Eight focused disciplines  so you can find the right path without
            wading through marketing noise.
          </p>
        </Container>
      </section>

      <section className="bg-surface py-16 md:py-20">
        <Container>
          <ul>
            {practiceAreas.map((area, index) => {
              const Icon = area.icon
              return (
                <li
                  key={area.slug}
                  id={area.slug}
                  className="scroll-mt-28 border-t border-line py-10 first:border-t-0 first:pt-0"
                >
                  <div className="grid gap-6 lg:grid-cols-[auto_1fr_1.1fr] lg:gap-10">
                    <span className="text-3xl font-extrabold text-gold/50 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="mb-4 flex size-11 items-center justify-center rounded-full bg-soft text-gold-deep">
                        <Icon className="size-5" strokeWidth={1.5} />
                      </span>
                      <h2 className="text-2xl font-extrabold text-ink md:text-3xl">
                        {area.title}
                      </h2>
                      <p className="mt-2 text-muted">{area.summary}</p>
                    </div>
                    <p className="leading-relaxed text-muted">{area.detail}</p>
                  </div>
                </li>
              )
            })}
          </ul>
          <div className="mt-6 border-t border-line pt-10">
            <LinkButton href="/contact" withArrow>
              Discuss your matter
            </LinkButton>
          </div>
        </Container>
      </section>
    </>
  )
}
