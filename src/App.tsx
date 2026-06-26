import OceanBackground from './components/OceanBackground';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CrewSection from './components/CrewSection';
import StatsSection from './components/StatsSection';
import JoinSection from './components/JoinSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen">
      <OceanBackground />
      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <AboutSection />
        <CrewSection />
        <StatsSection />
        <JoinSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
