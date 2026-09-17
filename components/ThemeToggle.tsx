'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[104px] h-9" />;
  }

  return (
    <div className="flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm p-1 rounded-lg border border-slate-200/50 dark:border-slate-700/50">
      <button
        onClick={() => setTheme('light')}
        className={cn(
          "p-1.5 rounded-md transition-colors",
          theme === 'light' ? "bg-white text-slate-800 shadow-sm dark:bg-slate-600 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        )}
        aria-label="Light theme"
        title="Light theme"
      >
        <Sun className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={cn(
          "p-1.5 rounded-md transition-colors",
          theme === 'dark' ? "bg-white text-slate-800 shadow-sm dark:bg-[#1E293B] dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        )}
        aria-label="Dark theme"
        title="Dark theme"
      >
        <Moon className="w-4 h-4" />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={cn(
          "p-1.5 rounded-md transition-colors",
          theme === 'system' ? "bg-white text-slate-800 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        )}
        aria-label="System theme"
        title="System theme"
      >
        <Monitor className="w-4 h-4" />
      </button>
    </div>
  );
}
