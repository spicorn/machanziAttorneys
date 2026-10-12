import { Quote, Star } from 'lucide-react'
import { Container, SectionIntro } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { InCard, InCardItem } from '@/components/motion/InCard'
import { testimonials } from '@/data/content'
import type { MotionPreset } from '@/lib/motion'

const quotePresets: MotionPreset[] = ['slideSkew', 'softPop', 'fadeRight']

export function Testimonials() {
  return (
    <section className="bg-canvas py-20 md:py-28">
      <Container>
        <Reveal preset="fadeRight" soft>
          <SectionIntro
            badge="Testimonial"
            title="What Our Clients Say"
            description="Discreet counsel and dependable follow-through  the standard we hold on every mandate."
          />
        </Reveal>

        <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <StaggerItem
              key={item.name}
              as="article"
              preset={quotePresets[i % quotePresets.length]}
            >
              <InCard className="lift flex flex-col rounded-[1.75rem] border border-line bg-surface p-7 shadow-card">
                <InCardItem preset="softPop" className="flex items-center gap-2">
                  <div className="flex gap-0.5 text-ink" aria-hidden>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="size-4 fill-current" strokeWidth={0} />
                    ))}
                  </div>
                  <span className="text-sm font-extrabold text-ink">{item.rating}</span>
                </InCardItem>
                <InCardItem
                  as="p"
                  preset="fadeUp"
                  className="mt-5 flex-1 text-sm leading-relaxed text-ink/80 md:text-[0.95rem]"
                >
                  “{item.quote}”
                </InCardItem>
                <InCardItem
                  preset="fadeLeft"
                  className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-5"
                >
                  <div>
                    <p className="text-sm font-bold text-ink">{item.name}</p>
                    <p className="text-xs text-muted">{item.title}</p>
                  </div>
                  <Quote className="size-8 text-ink/15" strokeWidth={1.5} aria-hidden />
                </InCardItem>
              </InCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
