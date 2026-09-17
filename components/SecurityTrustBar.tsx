import { ShieldCheck, Lock, Cloud } from 'lucide-react';

export default function SecurityTrustBar() {
  return (
    <div className="w-full bg-white dark:bg-[#0B132B] border-y border-slate-200 dark:border-slate-800 py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 mb-6 tracking-[0.2em] uppercase">
          Enterprise-Grade Security & Trust
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 lg:gap-32">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <ShieldCheck className="w-6 h-6 text-[#FF6B35]" />
            </div>
            <span className="text-slate-700 dark:text-slate-200 font-semibold tracking-wide">SOC2 Compliant</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <Lock className="w-6 h-6 text-[#FF6B35]" />
            </div>
            <span className="text-slate-700 dark:text-slate-200 font-semibold tracking-wide">Encrypted Data</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <Cloud className="w-6 h-6 text-[#FF6B35]" />
            </div>
            <span className="text-slate-700 dark:text-slate-200 font-semibold tracking-wide">Cloud Secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}
