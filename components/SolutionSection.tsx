'use client';

import React from 'react';
import { Link as LinkIcon, Folders, PieChart, BellRing } from 'lucide-react';

export default function SolutionSection() {
  const features = [
    {
      icon: <LinkIcon className="w-8 h-8 text-[#FF6B35]" />,
      title: "COLLECT",
      description: "Send a secure upload link and collect required documents."
    },
    {
      icon: <Folders className="w-8 h-8 text-[#FF6B35]" />,
      title: "TRACK",
      description: "Keep licenses, Compliance Documents and other compliance documents organized."
    },
    {
      icon: <PieChart className="w-8 h-8 text-[#FF6B35]" />,
      title: "MONITOR",
      description: "Quickly see what's compliant, expiring, expired or missing."
    },
    {
      icon: <BellRing className="w-8 h-8 text-[#FF6B35]" />,
      title: "REMIND",
      description: "Send email reminders before important documents expire."
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-50 dark:bg-[#0F172A] text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            One Simple Place to Manage Subcontractor Compliance
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl bg-white dark:bg-slate-800/40 backdrop-blur-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/60 dark:border-slate-700/50">
              <div className="mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
