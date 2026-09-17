import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "Project Manager, Apex Builders",
    content: "Subtriva completely changed how we handle compliance. We used to spend hours chasing expired trade licenses. Now the automated reminders do it for us.",
  },
  {
    name: "Omar Al-Fayed",
    role: "Operations Director, Emirates Real Estate",
    content: "The ability to track both global insurance certificates and local municipality permits in one place is fantastic. Highly recommended for international GCs.",
  },
  {
    name: "Michael Chen",
    role: "Compliance Officer, Summit Electric",
    content: "Before Subtriva, we were managing everything in spreadsheets. The dashboard gives us an instant view of who is missing documents. A lifesaver.",
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0B1120]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] dark:text-white mb-4">
            Loved by General Contractors
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            See how companies worldwide are saving time and reducing compliance risk.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800/40 p-8 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm relative">
              <div className="flex items-center gap-1 mb-6 text-[#FF6B35]">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-slate-700 dark:text-slate-300 mb-6 italic leading-relaxed">
                "{review.content}"
              </p>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{review.name}</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">{review.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
