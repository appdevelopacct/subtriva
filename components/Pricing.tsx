'use client';
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "STARTER",
      monthlyPrice: "$49",
      annualPrice: "$588",
      period: "/month",
      description: "Active subcontractors up to 20 • Active projects up to 2",
      features: [
        "License tracking",
        "Compliance & Insurance Tracking",
        "W-9 tracking",
        "Document requests",
        "Secure upload links",
        "Mobile uploads",
        "Expiration tracking",
        "Email reminders",
        "Basic compliance dashboard",
        "1 team member"
      ]
    },
    {
      name: "GROWTH",
      monthlyPrice: "$99",
      annualPrice: "$1188",
      period: "/month",
      description: "Active subcontractors up to 60 • Active projects up to 10",
      popular: true,
      features: [
        "Everything in Starter, plus:",
        "Custom reminder schedules",
        "Advanced compliance dashboard",
        "Bulk document requests",
        "Bulk reminders",
        "PDF reports",
        "Advanced document extraction",
        "5 team members",
        "Audit history"
      ]
    },
    {
      name: "BUSINESS",
      monthlyPrice: "$199",
      annualPrice: "$2388",
      period: "/month",
      description: "Active subcontractors up to 200 • Active projects up to unlimited",
      features: [
        "Everything in Growth, plus:",
        "Advanced reports",
        "10 team members",
        "Priority support",
        "Advanced audit history",
        "Additional business controls"
      ]
    }
  ];

  return (
    <section id="pricing" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] dark:text-white mb-4">
            Simple Pricing for Growing GCs
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">
            Start simple. Scale as your subcontractor list grows.
          </p>
          <div className="text-base font-bold text-[#FF6B35] mb-8">
            1 Month Free Trial • No Credit Card Required • Cancel Anytime
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-[#0F172A] dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#FF6B35] transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2"
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? 'text-[#0F172A] dark:text-white' : 'text-slate-500 dark:text-slate-400'}`}>
              Annually
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          {plans.map((plan, i) => (
            <div 
               key={i} 
               className={`relative bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50 rounded-2xl ${plan.popular ? 'border-[#FF6B35] shadow-xl md:-translate-y-4' : 'border-slate-200/60 dark:border-slate-700/50 shadow-sm'} p-8 flex flex-col h-full transition-transform hover:-translate-y-1`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#FF6B35] text-white text-xs font-bold uppercase tracking-widest py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-widest mb-4">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-[#0F172A] dark:text-white">{isAnnual ? plan.annualPrice : plan.monthlyPrice}</span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">{isAnnual ? '/year' : '/month'}</span>
                </div>
                {isAnnual && (
                  <div className="text-sm text-emerald-600 font-medium mb-2">Billed annually</div>
                )}
                <p className="text-sm text-slate-600 dark:text-slate-300 font-medium pb-6 border-b border-slate-100/60 dark:border-slate-700/30">{plan.description}</p>
              </div>
              
              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
                    <Check className={`w-5 h-5 shrink-0 ${j === 0 && plan.name !== "STARTER" ? 'text-[#FF6B35]' : 'text-emerald-500'}`} />
                    <span className={j === 0 && plan.name !== "STARTER" ? "font-semibold text-slate-900 dark:text-white" : ""}>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/login" className={`w-full block text-center bg-[#FF6B35] hover:bg-[#E05928] text-white font-medium text-sm px-5 py-3.5 rounded-full transition-all shadow-md focus:outline-none focus:ring-4 ${plan.popular ? 'shadow-[#FF6B35]/20 focus:ring-[#FF6B35]/30' : 'bg-slate-800 hover:bg-slate-900 focus:ring-slate-800/20 shadow-slate-800/20'}`}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
