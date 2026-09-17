'use client';

import React from 'react';
import { 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Send, 
  Link2, 
  Camera, 
  CalendarClock, 
  Mail, 
  Activity, 
  FolderTree, 
  Bell, 
  LayoutDashboard 
} from 'lucide-react';

export default function Features() {
  const features = [
    { icon: <FileText className="w-5 h-5" />, title: "Contractor License Tracking" },
    { icon: <ShieldCheck className="w-5 h-5" />, title: "Insurance / Compliance Tracking" },
    { icon: <FileText className="w-5 h-5" />, title: "W-9 Tracking" },
    { icon: <Send className="w-5 h-5" />, title: "Document Requests" },
    { icon: <Link2 className="w-5 h-5" />, title: "Secure Upload Links" },
    { icon: <Camera className="w-5 h-5" />, title: "Mobile Camera Upload" },
    { icon: <CalendarClock className="w-5 h-5" />, title: "Expiration Tracking" },
    { icon: <Mail className="w-5 h-5" />, title: "Email Reminders" },
    { icon: <Activity className="w-5 h-5" />, title: "Compliance Status" },
    { icon: <FolderTree className="w-5 h-5" />, title: "Document Organization" },
    { icon: <Bell className="w-5 h-5" />, title: "Manual Reminders" },
    { icon: <LayoutDashboard className="w-5 h-5" />, title: "Compliance Dashboard" },
  ];

  return (
    <section className="py-24 border-t border-slate-100/60 dark:border-slate-700/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] dark:text-white mb-4">
            Everything You Need for Compliance
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-6">
          {features.map((feature, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-slate-800/40 backdrop-blur-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-200/60 dark:border-slate-700/50 hover:border-[#FF6B35]/50">
              <div className="w-10 h-10 rounded-lg bg-[#FF6B35]/10 text-[#FF6B35] flex items-center justify-center flex-shrink-0">
                {feature.icon}
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{feature.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
