import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  Mail, 
  ArrowLeft, 
  KeyRound, 
  Eye, 
  EyeOff, 
  AlertCircle,
  Building2,
  CheckCircle2,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminLogin: React.FC = () => {
  const { loginAdmin, setCurrentView } = useApp();

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
      setErrorMessage('Please provide your authorized editorial email address.');
      return;
    }
    if (!password.trim()) {
      setErrorMessage('Please enter your newsroom access passphrase.');
      return;
    }

    setIsLoading(true);

    // Authenticate securely
    setTimeout(() => {
      const result = loginAdmin(email, password, rememberMe);
      setIsLoading(false);

      if (!result.success) {
        setErrorMessage(result.message || 'Authentication failed. Please verify your credentials.');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 450);
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-12 bg-slate-950 text-slate-100">
      <div className="w-full max-w-md">
        
        {/* Top Back Navigation Bar */}
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
            TLS 1.3 Encrypted
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
              Staff & Editorial Sign In
            </h1>
            
            <p className="text-xs text-slate-400 mt-1.5 max-w-sm mx-auto leading-relaxed">
              Restricted portal for authorized editors and newsroom administrators.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-300 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">{errorMessage}</div>
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
                  placeholder="editor@domain.et"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                  Access Passphrase
                </label>
                <span className="text-[11px] text-slate-500 font-mono">Protected</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-slate-100 placeholder-slate-600 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors font-mono"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 p-1"
                  aria-label={showPassword ? "Hide passphrase" : "Show passphrase"}
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
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white font-bold text-sm shadow-lg shadow-blue-900/40 transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <KeyRound className="w-4 h-4 text-amber-300" />
                  <span>Authenticate & Enter Admin Desk</span>
                </>
              )}
            </button>
          </form>

          {/* Editorial Security Notice */}
          <div className="mt-8 pt-4 border-t border-slate-800/60 flex items-start gap-2 text-[10px] text-slate-500 leading-relaxed">
            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              All editorial actions, article publications, and market adjustments are recorded in the Negarit Security Audit Registry.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
