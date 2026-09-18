'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { openEarlyAccessPopup } from '@/lib/tally';

export default function FAQ() {
  const faqs = [
    {
      question: "Do subcontractors need an account?",
      answer: "No. For basic document submission, a GC can simply send a secure upload link."
    },
    {
      question: "Do subcontractors have to pay?",
      answer: "No. Subcontractor document submission is free."
    },
    {
      question: "Can I use Subtriva outside of the USA?",
      answer: "Absolutely. Subtriva is designed for a global audience. You can track trade licenses, insurance certificates, and any other local compliance document your region requires."
    },
    {
      question: "What documents can I track?",
      answer: "Licenses, insurance certificates, W-9s and other requested compliance documents."
    },
    {
      question: "Will subcontractors have a dashboard?",
      answer: "Basic document submission does not require a complicated subcontractor dashboard."
    },
    {
      question: "Do you support SMS reminders?",
      answer: "Yes, SMS reminders can be configured along with email reminders to ensure your subcontractors never miss a deadline."
    },
    {
      question: "Is Subtriva available now?",
      answer: "Yes! Subtriva is live and ready for General Contractors globally to start tracking compliance documents."
    }
  ];

  return (
    <section id="faq" className="py-24 ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4 mb-20">
          {faqs.map((faq, i) => (
            <FAQItem key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        
        {/* Final CTA */}
        <div className="text-center bg-transparent p-12 rounded-3xl border border-slate-200/60 dark:border-slate-700/50">
          <h2 className="text-3xl font-bold text-[#0F172A] dark:text-white mb-4">Ready to Stop Chasing Documents?</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 font-medium">Collect. Track. Stay Compliant.</p>
          <button
            type="button"
            data-tally-open="PdQkeb"
            data-tally-emoji-text="👋"
            data-tally-emoji-animation="wave"
            onClick={openEarlyAccessPopup}
            className="bg-[#FF6B35] hover:bg-[#E05928] text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg shadow-[#FF6B35]/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#FF6B35]/30 inline-block cursor-pointer"
          >
            Join Early Access
          </button>
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-slate-200/60 dark:border-slate-700/50 rounded-xl overflow-hidden bg-white dark:bg-slate-800/40 backdrop-blur-xl shadow-md hover:shadow-lg transition-all duration-300">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none focus:bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm transition-colors"
      >
        <span className="font-semibold text-[#0F172A] dark:text-white">{question}</span>
        <ChevronDown className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", isOpen && "rotate-180")} />
      </button>
      <div 
        className={cn(
          "px-6 text-slate-600 dark:text-slate-300 leading-relaxed overflow-hidden transition-all duration-300",
          isOpen ? "py-4 border-t border-slate-100/60 dark:border-slate-700/30 max-h-40" : "max-h-0 opacity-0"
        )}
      >
        {answer}
      </div>
    </div>
  );
}
