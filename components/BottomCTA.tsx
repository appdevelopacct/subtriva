'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function BottomCTA() {
  const benefits = [
    'No credit card required',
    'Cancel anytime',
    '14-day free trial'
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0B1120] relative overflow-hidden">
      <div className="absolute inset-0 bg-[#FF6B35]/5 dark:bg-[#FF6B35]/10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 
          
          
          
          className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6"
        >
          Ready to simplify your compliance?
        </h2>
        
        <p 
          
          
          
          
          className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto"
        >
          Join hundreds of General Contractors who have eliminated compliance headaches and risk.
        </p>
        
        <div 
          
          
          
          
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
        >
          <Link 
            href="/login" 
            className="w-full sm:w-auto bg-[#FF6B35] hover:bg-[#E05928] text-white font-semibold text-lg px-8 py-4 rounded-full transition-all shadow-lg shadow-[#FF6B35]/25 focus:outline-none focus:ring-4 focus:ring-[#FF6B35]/30 flex items-center justify-center gap-2 group"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="#pricing" 
            className="w-full sm:w-auto bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-medium text-lg px-8 py-4 rounded-full transition-all border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-700 flex items-center justify-center"
          >
            View Pricing
          </Link>
        </div>
        
        <div 
          
          
          
          
          className="flex flex-wrap justify-center gap-4 sm:gap-8"
        >
          {benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B35]" />
              {benefit}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
