import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HomePage } from '@/pages/HomePage'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ensureGsap } from '@/lib/gsap'

const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const ExpertisePage = lazy(() =>
  import('@/pages/ExpertisePage').then((m) => ({ default: m.ExpertisePage })),
)
const PeoplePage = lazy(() =>
  import('@/pages/PeoplePage').then((m) => ({ default: m.PeoplePage })),
)
const ContactPage = lazy(() =>
  import('@/pages/ContactPage').then((m) => ({ default: m.ContactPage })),
)

function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center bg-canvas">
      <div className="h-1 w-16 overflow-hidden rounded-full bg-soft">
        <div className="h-full w-1/2 animate-pulse rounded-full bg-gold" />
      </div>
      <span className="sr-only">Loading</span>
    </div>
  )
}

function AppShell() {
  const location = useLocation()
  const mainRef = useRef<HTMLElement>(null)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    window.scrollTo(0, 0)
    ensureGsap()
    if (reduced || !mainRef.current) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' },
      )
    }, mainRef)

    return () => ctx.revert()
  }, [location.pathname, reduced])

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main ref={mainRef} className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="expertise" element={<ExpertisePage />} />
            <Route path="people" element={<PeoplePage />} />
            <Route path="contact" element={<ContactPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  )
}
