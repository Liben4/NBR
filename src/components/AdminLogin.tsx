import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowLeft, 
  KeyRound, 
  Eye, 
  EyeOff, 
  Sparkles, 
  AlertCircle,
  Building2,
  CheckCircle2,
  HelpCircle,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEFAULT_ADMIN_ACCOUNTS } from '../context/AppContext';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setCurrentView, showToast } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please provide your editorial corporate email.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your newsroom access passphrase.');
      return;
    }

    setIsLoading(true);

    // Simulate authenticating against editorial directory
    setTimeout(() => {
      const result = loginAdmin(email, password, rememberMe);
      setIsLoading(false);

      if (!result.success) {
        setErrorMessage(result.message || 'Invalid credentials.');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 400);
  };

  const handleQuickLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setErrorMessage(null);
    setIsLoading(true);

    setTimeout(() => {
      const result = loginAdmin(demoEmail, demoPass, true);
      setIsLoading(false);
      if (!result.success) {
        setErrorMessage(result.message || 'Authentication error.');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 bg-slate-950 text-slate-100">
      <div className="w-full max-w-lg">
        
        {/* Back link to Customer View */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Reader View</span>
          </button>

          <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            Security Gateway v2.4
          </span>
        </div>

        {/* Main Authentication Box */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          {/* Subtle gold accent light */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 border border-blue-400/40 shadow-xl shadow-blue-900/30 mb-3.5">
              <ShieldCheck className="w-7 h-7 text-amber-400" />
            </div>
            
            <div className="flex items-center justify-center gap-2 text-amber-400 font-brand text-xs uppercase tracking-widest font-bold">
              <span>Negarit Editorial Desk</span>
            </div>

            <h1 className="font-editorial text-2xl sm:text-3xl font-bold text-slate-100 mt-1">
              Staff & Newsroom Sign In
            </h1>
            
            <p className="text-xs text-slate-400 mt-1.5 max-w-sm mx-auto">
              Secure administration portal to manage articles, edit market benchmarks, review commentary, and oversee subscribers.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium">{errorMessage}</div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="liben457@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Access Passphrase / Password
                </label>
                <span className="text-[11px] text-slate-400">Passphrase: <span className="text-amber-400 font-mono font-bold">Liben@2026NBR</span></span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Liben@2026NBR"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-700 bg-slate-950 text-blue-600 focus:ring-0"
                />
                <span>Maintain active session on this device</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Administrator Credentials...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-amber-300" />
                  <span>Authenticate & Enter Admin Desk</span>
                </>
              )}
            </button>
          </form>

          {/* 1-Click Quick Fill for Admin */}
          <div className="mt-8 pt-6 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Authorized Admin Identity</span>
              </span>
              <span className="text-[10px] text-slate-500">1-Click Sign In</span>
            </div>

            <button
              type="button"
              onClick={() => handleQuickLogin('liben457@gmail.com', 'Liben@2026NBR')}
              className="w-full p-3.5 rounded-2xl bg-slate-950 hover:bg-slate-800/90 border border-slate-800 hover:border-amber-400/60 text-left transition-all group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center font-bold text-amber-300 text-sm font-editorial">
                  L
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-amber-300">
                    Liben (Chief Administrator & Editor)
                  </div>
                  <div className="text-[11px] text-slate-400 font-mono">liben457@gmail.com</div>
                </div>
              </div>

              <span className="text-xs font-bold text-blue-400 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all">
                Sign In →
              </span>
            </button>
          </div>

          {/* Editorial Security Notice */}
          <div className="mt-6 pt-4 border-t border-slate-800/40 flex items-start gap-2 text-[10px] text-slate-500 leading-relaxed">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              All publication edits, currency adjustments, and commentary moderation actions are recorded under the Negarit Editorial Audit Register.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
