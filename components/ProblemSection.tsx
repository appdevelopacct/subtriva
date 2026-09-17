'use client';

import React from 'react';
import { FileSpreadsheet, MailWarning, CalendarX, FolderKanban } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      icon: <FileSpreadsheet className="w-6 h-6 text-[#FF6B35]" />,
      title: "SPREADSHEETS",
      description: "License and insurance dates scattered across spreadsheets."
    },
    {
      icon: <MailWarning className="w-6 h-6 text-[#FF6B35]" />,
      title: "ENDLESS EMAILS",
      description: "Constantly asking subcontractors for updated documents."
    },
    {
      icon: <CalendarX className="w-6 h-6 text-[#FF6B35]" />,
      title: "MISSED RENEWALS",
      description: "Expired documents can easily slip through the cracks."
    },
    {
      icon: <FolderKanban className="w-6 h-6 text-[#FF6B35]" />,
      title: "SCATTERED FILES",
      description: "Important documents spread across email, folders and cloud storage."
    }
  ];

  return (
    <section className="py-24 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] dark:text-white mb-4">
            Still Tracking Subcontractor Documents Manually?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Spreadsheets and email may work at first. But as your subcontractor list grows, keeping licenses and insurance current becomes harder to manage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white dark:bg-slate-800/40 backdrop-blur-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/60 dark:border-slate-700/50 hover:border-[#FF6B35]/50">
              <div className="w-12 h-12 rounded-xl bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50 border border-slate-200/60 dark:border-slate-700/50 flex items-center justify-center mb-6 shadow-sm">
                {problem.icon}
              </div>
              <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-wider mb-3">
                {problem.title}
              </h3>
              <p className="text-[#0F172A] dark:text-white font-medium leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
