'use client';

import React from 'react';
import { UserPlus, FileSearch, Send, Smartphone, BellRing } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserPlus className="w-5 h-5 text-white" />,
      num: "01",
      title: "Add Subcontractor",
      desc: "Add a subcontractor to your compliance list."
    },
    {
      icon: <FileSearch className="w-5 h-5 text-white" />,
      num: "02",
      title: "Request Documents",
      desc: "Choose the documents you need."
    },
    {
      icon: <Send className="w-5 h-5 text-white" />,
      num: "03",
      title: "Send Secure Link",
      desc: "Send the subcontractor a simple upload link."
    },
    {
      icon: <Smartphone className="w-5 h-5 text-white" />,
      num: "04",
      title: "Subcontractor Uploads",
      desc: "They upload documents directly from their phone."
    },
    {
      icon: <BellRing className="w-5 h-5 text-white" />,
      num: "05",
      title: "Track & Remind",
      desc: "Track expiration dates and send reminders."
    }
  ];

  return (
    <section id="how-it-works" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] dark:text-white">
            From Document Request to Compliance in Minutes
          </h2>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Connecting Line */}
          <div className="absolute top-6 left-[5%] right-[5%] h-0.5 bg-slate-200 -z-10"></div>
          
          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#FF6B35] border-4 border-white shadow-sm flex items-center justify-center mb-6 z-10">
                  {step.icon}
                </div>
                <div className="text-sm font-bold text-[#FF6B35] tracking-widest mb-2">{step.num}</div>
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed px-2">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="lg:hidden relative pl-6 space-y-12">
          {/* Connecting Line */}
          <div className="absolute top-2 bottom-2 left-[21px] w-0.5 bg-slate-200"></div>
          
          {steps.map((step, i) => (
            <div key={i} className="relative flex items-start gap-6">
              <div className="w-10 h-10 rounded-full bg-[#FF6B35] border-4 border-white shadow-sm flex items-center justify-center flex-shrink-0 z-10 -ml-[19px]">
                {step.icon}
              </div>
              <div>
                <div className="text-sm font-bold text-[#FF6B35] tracking-widest mb-1">{step.num}</div>
                <h3 className="text-lg font-bold text-[#0F172A] dark:text-white mb-1">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
