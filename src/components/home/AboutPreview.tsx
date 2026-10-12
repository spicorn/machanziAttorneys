import { LinkButton } from '@/components/ui/Button'
import { Container, SectionBadge } from '@/components/ui/Container'
import { TeamGroupPhoto } from '@/components/ui/TeamGroupPhoto'
import { Reveal } from '@/components/motion/Reveal'
import { GsapReveal } from '@/components/motion/GsapReveal'

export function AboutPreview() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal preset="fadeLeft" soft>
          <SectionBadge>About us</SectionBadge>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
            Personalized legal solutions delivered expertly.
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">
            Maruwa Machanzi Attorneys is a full-service firm registered with the
            Law Society of Zimbabwe. We listen first, frame the mandate clearly,
            and move with precision whether the matter is a transfer, a
            commercial agreement, or a dispute.
          </p>
          <LinkButton href="/about" variant="primary" withArrow className="mt-8">
            Learn more about us
          </LinkButton>
        </Reveal>

        <GsapReveal direction="right" delay={0.05}>
          <TeamGroupPhoto parallax />
        </GsapReveal>
      </Container>
    </section>
  )
}
