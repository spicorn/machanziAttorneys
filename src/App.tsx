import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { SmoothScroll } from '@/components/layout/SmoothScroll'
import { MotionProvider } from '@/components/motion/MotionProvider'
import { PageTransition } from '@/components/motion/PageTransition'
import { HomePage } from '@/pages/HomePage'

const AboutPage = lazy(() =>
  import('@/pages/AboutPage').then((m) => ({ default: m.AboutPage })),
)
const ExpertisePage = lazy(() =>
  import('@/pages/ExpertisePage').then((m) => ({ default: m.ExpertisePage })),
)
const TeamPage = lazy(() =>
  import('@/pages/TeamPage').then((m) => ({ default: m.TeamPage })),
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

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main className="flex-1">
        <PageTransition routeKey={location.pathname}>
          <Suspense fallback={<PageFallback />}>
            <Routes location={location}>
              <Route index element={<HomePage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="expertise" element={<ExpertisePage />} />
              <Route path="team" element={<TeamPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Routes>
          </Suspense>
        </PageTransition>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, '')
  return (
    <BrowserRouter basename={basename || undefined}>
      <MotionProvider>
        <SmoothScroll>
          <AppShell />
        </SmoothScroll>
      </MotionProvider>
    </BrowserRouter>
  )
}
