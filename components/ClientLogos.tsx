import React from 'react';
import { Building2, Home, Landmark, Factory, Castle, Hotel } from 'lucide-react';

const logos = [
  { name: 'Apex Builders LLC', icon: Building2 },
  { name: 'Summit Electric', icon: Factory },
  { name: 'Pacific Plumbing', icon: Home },
  { name: 'Horizon Framing', icon: Landmark },
  { name: 'Global Constructors', icon: Castle },
  { name: 'Emirates Real Estate', icon: Hotel },
];

export default function ClientLogos() {
  return (
    <section className="py-12 bg-white dark:bg-[#0B1120] border-t border-b border-slate-100 dark:border-slate-800/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <p className="text-center text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          Trusted by General Contractors Worldwide
        </p>
      </div>
      <div className="relative w-full flex overflow-x-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-16 py-4">
          {[...logos, ...logos, ...logos].map((logo, index) => {
            const Icon = logo.icon;
            return (
              <div key={index} className="flex items-center gap-3 text-slate-400 dark:text-slate-500 mx-4 opacity-70 hover:opacity-100 transition-opacity">
                <Icon className="w-8 h-8" />
                <span className="text-xl font-bold tracking-tight">{logo.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
