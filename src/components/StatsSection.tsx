import { useEffect, useRef } from 'react';
import { Trophy, Skull, Map, Clock } from 'lucide-react';

interface StatItem {
  icon: typeof Trophy;
  value: string;
  label: string;
  description: string;
}

const stats: StatItem[] = [
  {
    icon: Trophy,
    value: '500+',
    label: 'Raids Cleared',
    description: 'From Darkbeard to Rip_Indra, no raid is too tough',
  },
  {
    icon: Skull,
    value: '10K+',
    label: 'PvP Wins',
    description: 'Dominating the seas one battle at a time',
  },
  {
    icon: Map,
    value: '200+',
    label: 'Sea Events',
    description: 'Leviathans, Sea Beasts, and Terror Sharks slain',
  },
  {
    icon: Clock,
    value: '50K+',
    label: 'Hours Played',
    description: 'Dedication that runs deeper than the ocean',
  },
];

const achievements = [
  'Cleared every raid at least 50 times',
  'Defeated 100+ Sea Beasts together',
  'Maxed out 30+ members to level 2550',
  'Held a server PvP tournament with 32 entrants',
  'Completed 3 full crew fruit awakenings',
  'Won a cross-crew alliance war',
];

export default function StatsSection() {
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
    <section ref={sectionRef} id="stats" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out text-center mb-16">
          <span className="text-ocean-400 text-sm font-medium tracking-widest uppercase">
            Our Legacy
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mt-4 glow-text">
            Crew Stats
          </h2>
          <p className="text-ocean-200 max-w-2xl mx-auto mt-6 leading-relaxed">
            Numbers that tell the story of our journey through the Blox Fruits seas.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out glass-card p-6 text-center"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-ocean-500/20 to-tide-500/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-ocean-400" />
                </div>
                <div className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white font-medium mb-2">{stat.label}</div>
                <div className="text-ocean-400 text-sm">{stat.description}</div>
              </div>
            );
          })}
        </div>

        <div className="animate-on-scroll opacity-0 translate-y-8 transition-all duration-700 ease-out glass-card p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-6">
                Major Achievements
              </h3>
              <ul className="space-y-4">
                {achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-ocean-500 to-tide-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Trophy className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-ocean-200">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/10 to-tide-500/10 rounded-xl blur-xl" />
              <div className="relative grid grid-cols-2 gap-4">
                {[
                  { label: 'Total Bounty', value: '800M+' },
                  { label: 'Mythical Fruits', value: '15' },
                  { label: 'Awakenings', value: '25+' },
                  { label: 'Crew Wars Won', value: '12' },
                ].map((item) => (
                  <div key={item.label} className="glass-card p-4 text-center">
                    <div className="font-display text-2xl font-bold text-white">{item.value}</div>
                    <div className="text-ocean-400 text-sm mt-1">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
