import { useState } from 'react';
import { Anchor, Menu, X, MessageSquare } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Crew', href: '#crew' },
    { name: 'Stats', href: '#stats' },
    { name: 'Join Us', href: '#join' },
  ];

  const discordUrl = 'https://discord.gg/Xd2Cmj28j5';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-none rounded-none">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-ocean-500 to-tide-600 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Anchor className="w-5 h-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold text-white tracking-wider">
              STC
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-ocean-200 hover:text-white transition-colors font-medium tracking-wide"
              >
                {link.name}
              </a>
            ))}
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#5865F2]/20 hover:bg-[#5865F2]/40 text-[#5865F2] hover:text-white rounded-lg text-sm font-medium transition-all border border-[#5865F2]/30"
            >
              <MessageSquare className="w-4 h-4" />
              Discord
            </a>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-ocean-200 hover:text-white transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-[#5865F2] hover:text-white transition-colors py-2"
            >
              <MessageSquare className="w-4 h-4" />
              Discord
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
