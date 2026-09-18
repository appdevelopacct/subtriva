'use client';

import * as React from 'react';
import { Moon, Sun, Laptop } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={cn("w-[104px] h-9 rounded-lg bg-slate-100/50 dark:bg-slate-800/50 animate-pulse", className)} />;
  }

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-sm",
        className
      )}
      role="group"
      aria-label="Select color theme"
    >
      <button
        type="button"
        onClick={() => setTheme('light')}
        className={cn(
          "p-1.5 rounded-lg transition-all text-xs font-medium flex items-center justify-center cursor-pointer",
          theme === 'light'
            ? "bg-white dark:bg-slate-700 text-[#FF6B35] shadow-xs"
            : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
        )}
        aria-label="Light mode"
        title="Light mode"
      >
        <Sun className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => setTheme('dark')}
        className={cn(
          "p-1.5 rounded-lg transition-all text-xs font-medium flex items-center justify-center cursor-pointer",
          theme === 'dark'
            ? "bg-white dark:bg-slate-700 text-[#FF6B35] shadow-xs"
            : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
        )}
        aria-label="Dark mode"
        title="Dark mode"
      >
        <Moon className="w-4 h-4" />
      </button>

      <button
        type="button"
        onClick={() => setTheme('system')}
        className={cn(
          "p-1.5 rounded-lg transition-all text-xs font-medium flex items-center justify-center cursor-pointer",
          theme === 'system'
            ? "bg-white dark:bg-slate-700 text-[#FF6B35] shadow-xs"
            : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
        )}
        aria-label="Device theme (System default)"
        title="Device theme (System default)"
      >
        <Laptop className="w-4 h-4" />
      </button>
    </div>
  );
}
