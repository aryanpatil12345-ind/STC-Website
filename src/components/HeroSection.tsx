import { useEffect, useRef } from 'react';
import { Waves, Compass, Users, MessageSquare } from 'lucide-react';

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 px-6"
    >
      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Waves className="w-8 h-8 text-ocean-400 animate-wave" />
            <span className="text-ocean-300 text-sm font-medium tracking-widest uppercase">
              We Represent the Waves
            </span>
            <Waves className="w-8 h-8 text-ocean-400 animate-wave-slow" />
          </div>
        </div>

        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-200">
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-bold text-white mb-6 glow-text leading-tight">
            Shadow Tide
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ocean-400 to-tide-400">
              Crew
            </span>
          </h1>
        </div>

        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-300">
          <p className="text-lg md:text-xl text-ocean-200 max-w-2xl mx-auto mb-12 leading-relaxed">
            A legendary Blox Fruits crew forged in the deepest tides. We ride the shadows,
            command the waves, and conquer the seas together.
          </p>
        </div>

        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-500">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#join"
              className="btn-shine px-8 py-4 bg-gradient-to-r from-ocean-600 to-tide-600 text-white font-semibold rounded-xl hover:from-ocean-500 hover:to-tide-500 transition-all shadow-lg shadow-ocean-900/50"
            >
              <span className="flex items-center gap-2">
                <Compass className="w-5 h-5" />
                Join the Crew
              </span>
            </a>
            <a
              href="https://discord.gg/Xd2Cmj28j5"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#5865F2]/20 border border-[#5865F2]/40 text-white font-semibold rounded-xl hover:bg-[#5865F2]/40 hover:border-[#5865F2]/60 transition-all"
            >
              <span className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Join Discord
              </span>
            </a>
            <a
              href="#crew"
              className="px-8 py-4 border border-ocean-500/30 text-ocean-100 font-semibold rounded-xl hover:bg-ocean-500/10 hover:border-ocean-400/50 transition-all"
            >
              <span className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Meet the Crew
              </span>
            </a>
          </div>
        </div>

        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-700 mt-20">
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white font-display">50+</div>
              <div className="text-sm text-ocean-300 mt-1">Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white font-display">12</div>
              <div className="text-sm text-ocean-300 mt-1">Officers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white font-display">3</div>
              <div className="text-sm text-ocean-300 mt-1">Years</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
