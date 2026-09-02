import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  KeyRound, 
  Smartphone, 
  Laptop, 
  MapPin, 
  Clock, 
  Activity, 
  LogOut, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  RefreshCw, 
  Copy, 
  Check, 
  QrCode, 
  Lock, 
  Key, 
  Shield, 
  AlertCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminSecurityTab: React.FC = () => {
  const { 
    adminUser, 
    securitySettings, 
    activeSessions, 
    loginActivities, 
    changeAdminPassword, 
    toggleTwoFactor, 
    generateNewBackupCodes, 
    revokeSession, 
    logoutAllDevices,
    showToast
  } = useApp();

  // Change password form state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // 2FA modal state
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [copiedCodes, setCopiedCodes] = useState(false);

  // Activity filter state
  const [activityFilter, setActivityFilter] = useState<'all' | 'success' | 'failed' | 'warning'>('all');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (newPassword !== confirmPassword) {
      setPasswordError('New password and confirmation do not match.');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('New password must contain at least 8 characters.');
      return;
    }

    const res = changeAdminPassword(currentPassword, newPassword);
    if (!res.success) {
      setPasswordError(res.message);
    } else {
      setPasswordSuccess('Master security passphrase updated successfully.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handle2FAToggleConfirm = () => {
    if (!securitySettings.twoFactorEnabled) {
      // Enabling
      const res = toggleTwoFactor(true, twoFactorCode);
      if (res.success) {
        setIs2FAModalOpen(false);
        setTwoFactorCode('');
      } else {
        showToast(res.message);
      }
    } else {
      // Disabling
      toggleTwoFactor(false);
      setIs2FAModalOpen(false);
    }
  };

  const handleCopyBackupCodes = () => {
    navigator.clipboard.writeText(securitySettings.backupCodes.join('\n'));
    setCopiedCodes(true);
    showToast('Emergency recovery backup codes copied to clipboard');
    setTimeout(() => setCopiedCodes(false), 3000);
  };

  const filteredActivities = loginActivities.filter(a => {
    if (activityFilter === 'all') return true;
    return a.status === activityFilter;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-editorial text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Admin Authentication, Access & Perimeter Security</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
            Manage administrative credentials, Two-Factor Authentication (2FA), connected devices, and audit trails.
          </p>
        </div>

        {/* Security Shield Level Badge */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-semibold flex items-center gap-1.5 shadow-2xs">
            <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Perimeter Security: Maximum (Enforced)</span>
          </div>
        </div>
      </div>

      {/* Grid: 2FA & Password Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 1: Change Master Password */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-900">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Change Master Access Passphrase
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Last changed on: {securitySettings.lastPasswordChange}
              </p>
            </div>
          </div>

          <form onSubmit={handlePasswordSubmit} className="space-y-3 pt-2">
            {passwordError && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}

            {passwordSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{passwordSuccess}</span>
              </div>
            )}

            <div>
              <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Current Password *
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  New Password *
                </label>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Min. 8 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Confirm New Password *
                </label>
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Re-type new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Update Access Password
              </button>
            </div>
          </form>
        </div>

        {/* Section 2: Two-Factor Authentication (2FA) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 border border-indigo-200 dark:border-indigo-900">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                    Two-Factor Authentication (2FA)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    TOTP Authenticator Protection (Google Authenticator / 1Password)
                  </p>
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                securitySettings.twoFactorEnabled
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                  : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
              }`}>
                {securitySettings.twoFactorEnabled ? 'Active & Protected' : 'Disabled'}
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Require a 6-digit TOTP verification code from your authenticator app whenever signing into the Negarit Editorial Desk from a new device or browser.
            </p>

            {/* Emergency Recovery Codes */}
            {securitySettings.twoFactorEnabled && (
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>Emergency Backup Recovery Codes</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyBackupCodes}
                      className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      {copiedCodes ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedCodes ? 'Copied' : 'Copy Codes'}</span>
                    </button>
                    <button
                      onClick={() => generateNewBackupCodes()}
                      className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1"
                      title="Generate fresh set of backup recovery codes"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Regenerate</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono text-[11px] text-slate-700 dark:text-slate-300">
                  {securitySettings.backupCodes.map((code, idx) => (
                    <span key={idx} className="p-1 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center">
                      {code}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">
              {securitySettings.twoFactorEnabled 
                ? 'Protected by RFC 6238 TOTP Standard'
                : 'Recommended for all newsroom administrators'}
            </span>

            <button
              onClick={() => setIs2FAModalOpen(true)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                securitySettings.twoFactorEnabled
                  ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:hover:bg-rose-900/50 dark:text-rose-300 border border-rose-300 dark:border-rose-800'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
              }`}
            >
              {securitySettings.twoFactorEnabled ? 'Disable 2FA' : 'Configure & Enable 2FA'}
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: Active Sessions & Connected Devices */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Laptop className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Active Connected Sessions ({activeSessions.length})</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Active browser sessions with authenticated administrative authorization.
            </p>
          </div>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to log out from all other devices? All other active sessions will be terminated immediately.')) {
                logoutAllDevices();
              }
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:hover:bg-rose-900/60 dark:text-rose-300 text-xs font-semibold border border-rose-300 dark:border-rose-800/80 transition-colors shadow-2xs self-start sm:self-auto"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout from All Devices</span>
          </button>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800">
          {activeSessions.map(session => (
            <div key={session.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                  {session.device.toLowerCase().includes('phone') || session.device.toLowerCase().includes('iphone') ? (
                    <Smartphone className="w-5 h-5" />
                  ) : (
                    <Laptop className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                      {session.device} • {session.browser}
                    </span>
                    {session.isCurrent && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                        This Device (Current)
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{session.location}</span>
                    </span>
                    <span className="font-mono text-[11px]">
                      IP: {session.ipAddress}
                    </span>
                    <span>• Logged in on {session.loginTime}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                      • Last active: {session.lastActive}
                    </span>
                  </div>
                </div>
              </div>

              {!session.isCurrent && (
                <button
                  onClick={() => {
                    if (confirm(`Revoke session on ${session.device}?`)) {
                      revokeSession(session.id);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors self-start sm:self-auto"
                >
                  Revoke Session
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Login Activity & Audit Logs */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-5 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>Login Activity & Security Audit Trail</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Immutable logging of administrative access events, authentication successes, and anomalies.
            </p>
          </div>

          {/* Activity status filter */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            {(['all', 'success', 'failed', 'warning'] as const).map(st => (
              <button
                key={st}
                onClick={() => setActivityFilter(st)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all ${
                  activityFilter === st
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="divide-y divide-slate-200 dark:divide-slate-800 max-h-96 overflow-y-auto">
          {filteredActivities.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No audit records match the selected filter.
            </div>
          ) : (
            filteredActivities.map(log => (
              <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      log.status === 'success' ? 'bg-emerald-500' : log.status === 'failed' ? 'bg-rose-500' : 'bg-amber-500'
                    }`} />
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {log.action}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      log.status === 'success' 
                        ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300' 
                        : log.status === 'failed' 
                        ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300' 
                        : 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300'
                    }`}>
                      {log.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-slate-500 dark:text-slate-400 pl-4">
                    <span>{log.device} • {log.browser}</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{log.location}</span>
                    </span>
                    <span className="font-mono text-[10px]">
                      IP: {log.ipAddress}
                    </span>
                  </div>
                </div>

                <span className="font-mono text-[11px] text-slate-500 shrink-0 pl-4 sm:pl-0">
                  {log.timestamp}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 2FA Setup / Invalidation Modal */}
      {is2FAModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">
                  {securitySettings.twoFactorEnabled ? 'Disable Two-Factor Authentication' : 'Setup Two-Factor Authentication'}
                </h3>
                <p className="text-xs text-slate-500">
                  {securitySettings.twoFactorEnabled 
                    ? 'Confirm turning off 2FA protection for this admin account.'
                    : 'Scan the QR code with Google Authenticator or 1Password.'}
                </p>
              </div>
            </div>

            {!securitySettings.twoFactorEnabled ? (
              <div className="space-y-4">
                {/* Simulated QR Code Box */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center space-y-3">
                  <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl border border-slate-200 shadow-xs flex items-center justify-center">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=otpauth://totp/Negarit:liben457@gmail.com?secret=HXDMVJECJJWSRB3HW&issuer=Negarit%20Business%20Review" 
                      alt="2FA QR Code"
                      className="w-full h-full"
                    />
                  </div>
                  <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400">
                    Secret Key: <strong className="text-slate-900 dark:text-slate-200">HXDM VJEC JJWS RB3H W</strong>
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Enter 6-Digit Authenticator Code
                  </label>
                  <input 
                    type="text"
                    maxLength={6}
                    placeholder="e.g. 583920"
                    value={twoFactorCode}
                    onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, ''))}
                    className="w-full px-3 py-2 text-center font-mono tracking-widest text-base rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-indigo-500"
                  />
                  <p className="text-[10px] text-slate-500 text-center">
                    (For initial testing, enter any 6 digits such as 123456)
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 space-y-2">
                <p className="font-bold">⚠️ Warning: Lowering Security Shield</p>
                <p>
                  Disabling 2FA removes the second layer of defense. Anyone with your password will be able to log directly into the Negarit editorial control desk.
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setIs2FAModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handle2FAToggleConfirm}
                className={`px-4 py-2 text-xs font-semibold rounded-xl text-white shadow-xs transition-colors ${
                  securitySettings.twoFactorEnabled
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {securitySettings.twoFactorEnabled ? 'Confirm Disable 2FA' : 'Verify & Enable 2FA'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
