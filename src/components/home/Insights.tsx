import { Container, SectionIntro } from '@/components/ui/Container'
import { Reveal } from '@/components/motion/Reveal'
import { Stagger, StaggerItem } from '@/components/motion/Stagger'
import { InCard, InCardItem } from '@/components/motion/InCard'
import { insights } from '@/data/content'
import type { MotionPreset } from '@/lib/motion'

const insightPresets: MotionPreset[] = ['scaleUp', 'fadeUp', 'fadeLeft']

export function Insights() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <Container>
        <Reveal preset="fadeLeft" soft>
          <SectionIntro
            badge="Blog"
            title="Legal Insights & Resources"
            description="Practical notes on property, disputes, and estates  written for clients who want clarity before they act."
          />
        </Reveal>

        <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
          {insights.map((post, i) => (
            <StaggerItem
              key={post.title}
              as="article"
              preset={insightPresets[i % insightPresets.length]}
            >
              <InCard className="lift overflow-hidden rounded-[1.75rem] border border-line bg-canvas shadow-card">
                <InCardItem preset="scaleUp" className="overflow-hidden">
                  <img
                    src={post.image}
                    alt=""
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                  />
                </InCardItem>
                <InCardItem as="h3" preset="fadeLeft" className="px-6 pt-6 text-lg font-extrabold text-ink">
                  {post.title}
                </InCardItem>
                <InCardItem
                  as="p"
                  preset="fadeRight"
                  className="px-6 pt-2 text-sm leading-relaxed text-muted"
                >
                  {post.excerpt}
                </InCardItem>
                <InCardItem preset="softPop" className="flex items-center gap-3 p-6 pt-6">
                  <span className="flex size-10 items-center justify-center rounded-full bg-navy text-xs font-bold text-gold">
                    {post.author
                      .split(' ')
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink">{post.author}</p>
                    <p className="text-xs text-muted">{post.role}</p>
                  </div>
                </InCardItem>
              </InCard>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
