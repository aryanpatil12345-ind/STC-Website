import { useState, useEffect } from 'react';
import { Crown, Shield, User, Star, Search, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CrewMember {
  id: string;
  name: string;
  rank: 'leader' | 'officer' | 'member' | 'recruit';
  role: string;
  bounty: string;
  fruit: string;
  status: 'legendary' | 'active' | 'rising';
  display_order: number;
}

const rankConfig = {
  leader: { icon: Crown, label: 'Leader', color: 'bg-amber-500' },
  officer: { icon: Shield, label: 'Officer', color: 'bg-ocean-500' },
  member: { icon: User, label: 'Member', color: 'bg-tide-500' },
  recruit: { icon: Star, label: 'Recruit', color: 'bg-gray-500' },
};

export default function CrewSection() {
  const [members, setMembers] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    const { data } = await supabase
      .from('crew_members')
      .select('*')
      .order('display_order', { ascending: true });
    setMembers(data || []);
    setLoading(false);
  }

  const filtered = members.filter((m) => {
    const matchesFilter = filter === 'all' || m.rank === filter;
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.fruit.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section id="crew" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-4">Crew Roster</h2>
          <p className="text-ocean-200 max-w-2xl mx-auto">
            Meet the warriors who represent the waves. Each member brings their own strength to the tide.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or fruit..."
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-ocean-400 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-white/30" />
            {['all', 'leader', 'officer', 'member', 'recruit'].map((r) => (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  filter === r
                    ? 'bg-ocean-500 text-white'
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-ocean-300">Loading crew roster...</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((member) => {
              const rank = rankConfig[member.rank];
              const RankIcon = rank.icon;
              return (
                <div
                  key={member.id}
                  className="glass-card p-6 group hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg ${rank.color} flex items-center justify-center`}>
                      <RankIcon className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                      member.status === 'legendary' ? 'bg-amber-500/20 text-amber-400' :
                      member.status === 'active' ? 'bg-ocean-500/20 text-ocean-400' :
                      'bg-tide-500/20 text-tide-400'
                    }`}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-ocean-300 text-sm mb-4">{member.role}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/50">Bounty</span>
                      <span className="text-white font-medium">{member.bounty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Fruit</span>
                      <span className="text-white font-medium">{member.fruit}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
