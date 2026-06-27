import { lazy, Suspense } from 'react';
import OceanBackground from './components/OceanBackground';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';

const AboutSection = lazy(() => import('./components/AboutSection'));
const CrewSection = lazy(() => import('./components/CrewSection'));
const StatsSection = lazy(() => import('./components/StatsSection'));
const JoinSection = lazy(() => import('./components/JoinSection'));
const Footer = lazy(() => import('./components/Footer'));

/** Minimal invisible placeholder to prevent layout shift while lazy sections load */
function SectionFallback({ id, className = 'py-24 px-6' }: { id: string; className?: string }) {
  return <section id={id} className={`relative ${className}`} />;
}

function App() {
  return (
    <div className="relative min-h-screen">
      <OceanBackground />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <Suspense fallback={<SectionFallback id="about" />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback id="crew" className="py-20 px-6" />}>
          <CrewSection />
        </Suspense>
        <Suspense fallback={<SectionFallback id="stats" />}>
          <StatsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback id="join" className="py-20 px-6" />}>
          <JoinSection />
        </Suspense>
      </main>
      <Suspense fallback={<SectionFallback id="footer" className="py-16 px-6" />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
