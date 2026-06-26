import { Anchor, Heart, Waves, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-ocean-500/10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-ocean-500 to-tide-600 flex items-center justify-center mb-6">
            <Anchor className="w-7 h-7 text-white" />
          </div>

          <h3 className="font-display text-2xl font-bold text-white mb-2">
            Shadow Tide Crew
          </h3>
          <p className="text-ocean-300 mb-6 flex items-center gap-2">
            <Waves className="w-4 h-4" />
            We Represent the Waves
            <Waves className="w-4 h-4" />
          </p>

          <div className="flex items-center gap-6 mb-8">
            <a href="#home" className="text-ocean-400 hover:text-white transition-colors text-sm">Home</a>
            <a href="#about" className="text-ocean-400 hover:text-white transition-colors text-sm">About</a>
            <a href="#crew" className="text-ocean-400 hover:text-white transition-colors text-sm">Crew</a>
            <a href="#stats" className="text-ocean-400 hover:text-white transition-colors text-sm">Stats</a>
            <a href="#join" className="text-ocean-400 hover:text-white transition-colors text-sm">Join</a>
            <a
              href="https://discord.gg/Xd2Cmj28j5"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#5865F2] hover:text-white transition-colors text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              Discord
            </a>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-ocean-500/30 to-transparent mb-6" />

          <p className="text-ocean-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> for the Blox Fruits community
          </p>
          <p className="text-ocean-600 text-xs mt-2">
            Shadow Tide Crew — Est. 2022
          </p>
        </div>
      </div>
    </footer>
  );
}
