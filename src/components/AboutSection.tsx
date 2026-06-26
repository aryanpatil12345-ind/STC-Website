import { useEffect, useRef } from 'react';
import { Shield, Swords, Target, Sparkles } from 'lucide-react';

export default function AboutSection() {
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

  const features = [
    {
      icon: Shield,
      title: 'Elite Protection',
      description: 'We guard our own. No crew member sails alone — the Tide protects its own.',
    },
    {
      icon: Swords,
      title: 'PvP Dominance',
      description: 'From sea battles to bounty hunts, we fight as one and win as one.',
    },
    {
      icon: Target,
      title: 'Goal Oriented',
      description: 'Max level grinds, raid clears, fruit hunting — we set targets and crush them.',
    },
    {
      icon: Sparkles,
      title: 'Family First',
      description: 'More than a crew — we are a family. Respect, loyalty, and fun above all.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out text-center mb-16">
          <span className="text-ocean-400 text-sm font-medium tracking-widest uppercase">
            Who We Are
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 glow-text">
            About the Tide
          </h2>
          <p className="text-ocean-200 max-w-2xl mx-auto mt-6 leading-relaxed">
            Shadow Tide Crew was born from the deep — a group of dedicated Blox Fruits players
            who believe that together, we can conquer anything the seas throw at us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out glass-card p-8"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-ocean-500/20 to-tide-500/20 flex items-center justify-center mb-5">
                <feature.icon className="w-6 h-6 text-ocean-400" />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-ocean-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out delay-500 mt-16 glass-card p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
                Our Code
              </h3>
              <ul className="space-y-4">
                {[
                  'Respect every crew member, no matter rank',
                  'Help each other with raids, grinds, and PvP',
                  'No toxicity — we are here to have fun',
                  'Stay active and participate in crew events',
                  'Represent STC with pride in every server',
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-3 text-ocean-200">
                    <span className="w-6 h-6 rounded-full bg-ocean-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-ocean-400 text-xs font-bold">{i + 1}</span>
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/10 to-tide-500/10 rounded-xl blur-xl" />
              <div className="relative glass-card p-6 text-center">
                <div className="text-6xl mb-4">⚓</div>
                <p className="font-display text-lg text-white italic">
                  "The tide rises together. Sink alone, or swim with the crew."
                </p>
                <p className="text-ocean-400 text-sm mt-4">— STC Motto</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
