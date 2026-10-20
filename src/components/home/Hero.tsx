import { m } from 'motion/react'
import { LinkButton } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { site } from '@/data/site'
import { asset } from '@/lib/asset'
import {
  easeOut,
  presets,
  staggerContainer,
  transition,
} from '@/lib/motion'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-canvas pt-6 pb-16 md:pt-10 md:pb-24">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <m.div
          className="max-w-xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <m.span
            className="pill"
            variants={presets.fadeDown}
            transition={transition}
          >
            {site.society}
          </m.span>
          <m.h1
            className="mt-6 font-display text-[clamp(2.4rem,5.5vw,4.2rem)] leading-[1.02] font-semibold tracking-tight text-ink"
            variants={presets.riseBlur}
            transition={{ ...transition, duration: 0.7 }}
          >
            {site.name}
          </m.h1>
          <m.p
            className="mt-4 text-lg font-semibold text-ink/80 md:text-xl"
            variants={presets.fadeUp}
            transition={transition}
          >
            Your trusted legal advisors in Harare.
          </m.p>
          <m.p
            className="mt-3 max-w-md text-base leading-relaxed text-muted md:text-lg"
            variants={presets.fadeLeft}
            transition={transition}
          >
            A full-service law firm in Eastlea providing tailored legal
            solutions across conveyancing, commercial, family and dispute work.
          </m.p>
          <m.div
            className="mt-8 flex flex-wrap items-center gap-3"
            variants={presets.softPop}
            transition={transition}
          >
            <LinkButton href="/contact" withArrow>
              Schedule your consultation
            </LinkButton>
            <LinkButton href="/expertise" variant="secondary" withArrow>
              Our expertise
            </LinkButton>
          </m.div>
        </m.div>

        <m.div
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
          variants={presets.scaleIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, ease: easeOut, delay: 0.12 }}
        >
          <div className="relative overflow-hidden rounded-[2rem] bg-soft shadow-soft">
            <img
              src={asset('images/home.jpg')}
              alt="Legal counsel at Maruwa Machanzi Attorneys"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
          <m.div
            className="absolute -bottom-6 -left-2 w-[46%] overflow-hidden clover-mask border-4 border-canvas shadow-card md:-left-6 md:w-[42%]"
            initial={{ opacity: 0, x: -24, rotate: -4 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.65, ease: easeOut, delay: 0.4 }}
          >
            <img
              src={asset('images/hero-scales.jpg')}
              alt="Scales of justice"
              className="aspect-square w-full object-cover"
            />
          </m.div>
        </m.div>
      </Container>
    </section>
  )
}
