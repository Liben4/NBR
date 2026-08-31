import React, { useState } from 'react';
import { X, Mail, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryType } from '../types';

export const NewsletterModal: React.FC = () => {
  const { isNewsletterModalOpen, setIsNewsletterModalOpen, addSubscriber } = useApp();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [selectedInterests, setSelectedInterests] = useState<CategoryType[]>(['Economy', 'Finance', 'Technology']);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isNewsletterModalOpen) return null;

  const categories: CategoryType[] = ['Business', 'Economy', 'Finance', 'Technology', 'Entrepreneurship', 'Opinion'];

  const toggleInterest = (cat: CategoryType) => {
    setSelectedInterests(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={() => setIsNewsletterModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-editorial text-2xl font-bold text-slate-100">
              Welcome to Negarit Executive
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed max-w-sm mx-auto">
              Your subscription is active. You will receive Ethiopia's most critical financial and economic intelligence briefing straight to your inbox.
            </p>
            <button
              onClick={() => {
                setIsSuccess(false);
                setIsNewsletterModalOpen(false);
              }}
              className="mt-6 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-blue-400 font-brand text-xs uppercase tracking-widest font-bold mb-1">
              <Mail className="w-4 h-4" />
              <span>Executive Dispatch</span>
            </div>

            <h3 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-100">
              Subscribe to Negarit
            </h3>

            <p className="text-xs text-slate-400 mt-1 mb-5">
              Authoritative business insights, macroeconomic indicators, and investment analysis delivered to 28,000+ senior leaders.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Full Name & Title (Optional)
                </label>
                <input 
                  type="text"
                  placeholder="e.g., Bethlehem Tadesse, Managing Partner"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                  Email Address *
                </label>
                <input 
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-300 block mb-1.5">
                  Editorial Preferences
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleInterest(cat)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                        selectedInterests.includes(cat)
                          ? 'bg-blue-600/30 text-blue-300 border-blue-500'
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold text-xs shadow-lg flex items-center justify-center gap-2 mt-2"
              >
                <span>Confirm Free Subscription</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 text-center">
                <Shield className="w-3 h-3 text-slate-400" />
                <span>Zero spam. Strict data privacy. Unsubscribe anytime.</span>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
