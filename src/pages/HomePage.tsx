import { Hero } from '@/components/home/Hero'
import { AboutPreview } from '@/components/home/AboutPreview'
import { ExpertiseCards } from '@/components/home/ExpertiseCards'
import { TeamPreview } from '@/components/home/TeamPreview'
import { Testimonials } from '@/components/home/Testimonials'
import { Insights } from '@/components/home/Insights'
import { ContactSplit } from '@/components/home/ContactSplit'

export function HomePage() {
  return (
    <>
      <Hero />
      <AboutPreview />
      <ExpertiseCards />
      <TeamPreview />
      <Testimonials />
      <Insights />
      <ContactSplit />
    </>
  )
}
