import { useState } from 'react';
import { Send, CheckCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FormData {
  username: string;
  level: string;
  bounty: string;
  build: string;
  division: string;
  reason: string;
}

const divisionOptions = [
  { value: 'division-1', label: 'Division 1' },
  { value: 'division-2', label: 'Division 2' },
  { value: 'division-3', label: 'Division 3' },
];

export default function JoinSection() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    level: '',
    bounty: '',
    build: '',
    division: '',
    reason: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      const { error } = await supabase.from('applications').insert({
        username: formData.username,
        level: formData.level,
        bounty: formData.bounty,
        build: formData.build,
        division: formData.division,
        reason: formData.reason,
      });

      if (error) {
        setStatus('error');
        setErrorMsg(error.message);
        return;
      }

      // Send Discord notification
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/discord-notify`;
      const response = await fetch(functionUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          level: formData.level,
          bounty: formData.bounty,
          build: formData.build,
          division: formData.division,
          reason: formData.reason,
        }),
      });

      if (!response.ok) {
        console.error('Discord notification failed');
      }

      setStatus('success');
      setFormData({ username: '', level: '', bounty: '', build: '', division: '', reason: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Something went wrong. Please try again.');
    }
  };

  const inputClasses =
    'w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-ocean-400 transition-colors';

  return (
    <section id="join" className="py-20 px-6 relative">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-4">Join the Crew</h2>
          <p className="text-ocean-200">
            Think you have what it takes to ride the waves? Apply now and become part of the Shadow Tide.
          </p>
        </div>

        <div className="glass-card p-8 md:p-10">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-ocean-500/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-ocean-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Application Submitted!</h3>
              <p className="text-ocean-200 mb-6">
                Our officers will review your application. Expect a response within 24-48 hours.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-6 py-3 bg-ocean-500 hover:bg-ocean-400 text-white rounded-lg font-medium transition-colors"
              >
                Submit Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-ocean-300 mb-2">Roblox Username *</label>
                  <input
                    type="text"
                    required
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className={inputClasses}
                    placeholder="Enter your username"
                  />
                </div>
                <div>
                  <label className="block text-sm text-ocean-300 mb-2">Current Level *</label>
                  <input
                    type="text"
                    required
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                    className={inputClasses}
                    placeholder="e.g. 2300"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-ocean-300 mb-2">Bounty Amount *</label>
                  <input
                    type="text"
                    required
                    value={formData.bounty}
                    onChange={(e) => setFormData({ ...formData, bounty: e.target.value })}
                    className={inputClasses}
                    placeholder="e.g. 15M, 25M+"
                  />
                </div>
                <div>
                  <label className="block text-sm text-ocean-300 mb-2">Your Build *</label>
                  <input
                    type="text"
                    required
                    value={formData.build}
                    onChange={(e) => setFormData({ ...formData, build: e.target.value })}
                    className={inputClasses}
                    placeholder="e.g. Sword, Fruit, Gun, Hybrid..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-ocean-300 mb-2">Division You Want to Join *</label>
                <select
                  required
                  value={formData.division}
                  onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                  className={inputClasses}
                >
                  <option value="" className="bg-[#0f172a]" disabled>
                    Select a division
                  </option>
                  {divisionOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} className="bg-[#0f172a]">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-ocean-300 mb-2">
                  Why Should We Accept You? *
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  className={inputClasses + ' resize-none'}
                  placeholder="Tell us about your skills, experience, why you want to join, and what you can bring to STC..."
                />
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-2 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full px-8 py-4 bg-gradient-to-r from-ocean-500 to-tide-500 hover:from-ocean-400 hover:to-tide-400 text-white rounded-xl font-semibold transition-all shadow-lg shadow-ocean-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {status === 'submitting' ? 'Submitting...' : 'Submit Application'}
              </button>

              <div className="text-center">
                <p className="text-white/50 text-sm mb-3">Or reach us directly</p>
                <a
                  href="https://discord.gg/Xd2Cmj28j5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2]/20 hover:bg-[#5865F2]/40 border border-[#5865F2]/30 hover:border-[#5865F2]/60 text-white rounded-xl font-medium transition-all"
                >
                  <MessageSquare className="w-5 h-5" />
                  Join Our Discord
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
