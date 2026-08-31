import React, { useState } from 'react';
import { Mail, CheckCircle2, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType } from '../types';

export const NewsletterSection: React.FC = () => {
  const { addSubscriber } = useApp();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<CategoryType[]>(['Economy', 'Finance', 'Technology']);
  const [isSuccess, setIsSuccess] = useState(false);

  const interestOptions: { label: string; value: CategoryType }[] = [
    { label: 'Macro & Policy', value: 'Economy' },
    { label: 'Banking & ESX', value: 'Finance' },
    { label: 'Tech & Telecom', value: 'Technology' },
    { label: 'Startups & SMEs', value: 'Entrepreneurship' },
    { label: 'Corporate M&A', value: 'Business' },
  ];

  const toggleInterest = (val: CategoryType) => {
    setSelectedInterests(prev => 
      prev.includes(val) ? prev.filter(v => v !== val) : [...prev, val]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    const ok = addSubscriber(email, selectedInterests, name);
    if (ok) {
      setIsSuccess(true);
      setEmail('');
      setName('');
    }
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-10">
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950/60 to-slate-950 border border-blue-500/30 p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl">
        
        {/* Subtle background graphics */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-brand font-bold uppercase tracking-wider mb-3">
              <Mail className="w-3.5 h-3.5" />
              <span>Negarit Executive Briefing</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 tracking-tight leading-tight">
              Stay Ahead of Business
            </h2>

            <p className="font-sans text-slate-300 text-sm sm:text-base leading-relaxed mt-3 max-w-xl">
              Get Ethiopia's most important business stories, market insights, and economic developments delivered directly to your inbox every weekday morning.
            </p>

            {/* Interest Tags */}
            <div className="mt-5">
              <label className="text-xs font-semibold text-slate-400 block mb-2">
                Select your editorial focus areas:
              </label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map(opt => {
                  const active = selectedInterests.includes(opt.value);
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => toggleInterest(opt.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                        active 
                          ? 'bg-blue-600/30 text-blue-300 border-blue-400' 
                          : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column / Subscription Box (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            {isSuccess ? (
              <div className="text-center py-6 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-editorial text-xl font-bold text-slate-100">
                  Subscription Confirmed
                </h3>
                <p className="text-xs text-slate-300 mt-2">
                  Thank you for subscribing to Negarit Business Review. Your premier morning briefing begins tomorrow at 6:30 AM EAT.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Subscribe another colleague
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <h3 className="font-brand text-xs font-bold uppercase tracking-wider text-slate-200 mb-1">
                  Join 28,000+ Decision Makers
                </h3>

                <div>
                  <input 
                    type="text"
                    placeholder="Full Name / Title (Optional)"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div>
                  <input 
                    type="email"
                    required
                    placeholder="Corporate email address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-1 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-xs shadow-lg shadow-blue-900/40 flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  <span>Subscribe to Free Daily Edition</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 mt-2">
                  <Shield className="w-3 h-3 text-slate-400" />
                  <span>Strict privacy. No spam. One-click unsubscribe.</span>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
