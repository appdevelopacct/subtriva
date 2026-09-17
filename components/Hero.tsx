'use client';

import React from 'react';
import Link from 'next/link';
import { FileCheck, AlertTriangle, AlertCircle, Clock, Search, Filter } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          
          
          
        >
          <p className="text-xs sm:text-sm font-semibold tracking-widest text-[#FF6B35] uppercase mb-6 flex items-center justify-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF6B35] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF6B35]"></span>
            </span>
            Trusted by Global General Contractors
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0F172A] dark:text-white leading-tight mb-6 max-w-4xl mx-auto">
            Stop Chasing Subcontractors for <span className="text-[#FF6B35]">Expired Compliance Documents</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Collect subcontractor documents, track trade licenses, insurance certificates, and automatically remind your team and subcontractors before compliance issues become a problem.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3">
            <Link href="/login" className="w-full sm:w-auto bg-[#FF6B35] hover:bg-[#E05928] text-white text-lg px-8 py-4 rounded-lg font-medium transition-colors shadow-lg shadow-[#FF6B35]/20 focus:ring-4 focus:ring-[#FF6B35]/30 focus:outline-none flex items-center justify-center">
              Get Started
            </Link>
            <a 
              href="#how-it-works"
              className="w-full sm:w-auto bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/50 hover:border-slate-300 text-slate-700 dark:text-slate-200 px-8 py-4 rounded-lg font-medium transition-colors text-lg inline-block focus:ring-4 focus:ring-slate-100 focus:outline-none"
            >
              See How It Works
            </a>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mb-16">
            1 month free trial • No credit card required • Cancel anytime
          </p>
          
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Built for small and mid-sized General Contractors
          </p>
        </div>

        {/* Hero Dashboard Mockup (MacBook Style) */}
        <div 
          
          
          
          className="mt-16 lg:mt-24 max-w-5xl mx-auto px-2 sm:px-6 relative z-10"
        >
                    {/* MacBook Screen Container (Fixed 16:10 Ratio) */}
          <div className="relative w-full aspect-[16/10] rounded-t-lg sm:rounded-t-2xl lg:rounded-t-3xl border-gray-800 border-[4px] sm:border-[8px] lg:border-[12px] bg-gray-900 shadow-2xl flex flex-col overflow-hidden">
            {/* Camera Notch */}
            <div className="absolute top-0 inset-x-0 flex justify-center z-20">
              <div className="w-12 sm:w-20 lg:w-24 h-1.5 sm:h-2.5 lg:h-3.5 bg-gray-800 rounded-b-md lg:rounded-b-lg"></div>
            </div>
            
            {/* Screen Content Wrapper */}
            <div className="relative bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50 flex flex-col w-full h-full">
              
              {/* macOS Browser Title Bar */}
              <div className="bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 flex items-center border-b border-slate-200/60 dark:border-slate-700/50">
                <div className="flex gap-1 sm:gap-1.5 w-1/3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full bg-rose-400"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full bg-amber-400"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="w-1/3 flex justify-center">
                  <div className="text-[6px] sm:text-[9px] lg:text-xs font-medium text-slate-400 bg-slate-200/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded max-w-full truncate">
                    app.subtriva.com
                  </div>
                </div>
                <div className="w-1/3"></div>
              </div>

              <div className="bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50 flex flex-col text-left h-full overflow-hidden">
                {/* Dashboard Header */}
                <div className="border-b border-slate-100/60 dark:border-slate-700/30 p-2 sm:p-4 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm">
                  <h3 className="font-semibold text-[8px] sm:text-xs lg:text-lg text-slate-800 dark:text-slate-100">Compliance Overview</h3>
                  <div className="flex gap-1 sm:gap-2">
                    <div className="relative">
                      <Search className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 absolute left-1.5 sm:left-2 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="text" placeholder="Search..." className="w-16 sm:w-32 lg:w-48 pl-4 sm:pl-6 lg:pl-8 pr-1 sm:pr-2 lg:pr-4 py-0.5 sm:py-1 lg:py-1.5 border border-slate-200/60 dark:border-slate-700/50 rounded lg:rounded-md text-[6px] sm:text-[9px] lg:text-sm outline-none" readOnly />
                    </div>
                    <button className="p-0.5 sm:p-1 lg:p-1.5 border border-slate-200/60 dark:border-slate-700/50 rounded lg:rounded-md text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50">
                      <Filter className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4" />
                    </button>
                  </div>
                </div>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-5 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm border-b border-slate-100/60 dark:border-slate-700/30 gap-[1px]">
                  <div className="bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50 p-1.5 sm:p-3 lg:p-4 flex flex-col justify-center">
                    <div className="text-[5px] sm:text-[8px] lg:text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5 lg:mb-1 truncate">Total Subs</div>
                    <div className="text-[10px] sm:text-lg lg:text-2xl font-bold text-slate-800 dark:text-slate-100">37</div>
                  </div>
                  <div className="bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50 p-1.5 sm:p-3 lg:p-4 flex flex-col justify-center">
                    <div className="text-[5px] sm:text-[8px] lg:text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5 lg:mb-1 flex items-center gap-0.5 lg:gap-1 truncate">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 rounded-full bg-emerald-500"></span> Compliant
                    </div>
                    <div className="text-[10px] sm:text-lg lg:text-2xl font-bold text-slate-800 dark:text-slate-100">24</div>
                  </div>
                  <div className="bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50 p-1.5 sm:p-3 lg:p-4 flex flex-col justify-center">
                    <div className="text-[5px] sm:text-[8px] lg:text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5 lg:mb-1 flex items-center gap-0.5 lg:gap-1 truncate">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 rounded-full bg-amber-500"></span> Expiring
                    </div>
                    <div className="text-[10px] sm:text-lg lg:text-2xl font-bold text-slate-800 dark:text-slate-100">8</div>
                  </div>
                  <div className="bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50 p-1.5 sm:p-3 lg:p-4 flex flex-col justify-center">
                    <div className="text-[5px] sm:text-[8px] lg:text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5 lg:mb-1 flex items-center gap-0.5 lg:gap-1 truncate">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 rounded-full bg-rose-500"></span> Expired
                    </div>
                    <div className="text-[10px] sm:text-lg lg:text-2xl font-bold text-slate-800 dark:text-slate-100">3</div>
                  </div>
                  <div className="bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50 p-1.5 sm:p-3 lg:p-4 flex flex-col justify-center">
                    <div className="text-[5px] sm:text-[8px] lg:text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5 lg:mb-1 flex items-center gap-0.5 lg:gap-1 truncate">
                      <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 lg:w-2 lg:h-2 rounded-full bg-slate-400"></span> Missing
                    </div>
                    <div className="text-[10px] sm:text-lg lg:text-2xl font-bold text-slate-800 dark:text-slate-100">2</div>
                  </div>
                </div>

                {/* Table - Fully Fluid */}
                <div className="flex-1 min-h-0 bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50">
                  <table className="w-full text-left table-fixed h-full">
                    <thead className="text-[5px] sm:text-[8px] lg:text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm block w-full">
                      <tr className="flex w-full">
                        <th className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-4 font-medium truncate w-[28%]">Company</th>
                        <th className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-4 font-medium truncate w-[28%]">Document</th>
                        <th className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-4 font-medium truncate w-[18%]">Status</th>
                        <th className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-4 font-medium truncate w-[16%]">Expiration</th>
                        <th className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-4 font-medium text-right truncate w-[10%]">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-[6px] sm:text-[9px] lg:text-sm block w-full">
                      <tr className="hover:bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm flex w-full items-center">
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 font-medium text-slate-900 dark:text-white truncate w-[28%]">Apex Builders LLC</td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 text-slate-600 dark:text-slate-300 truncate w-[28%]">Gen. Liability</td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 w-[18%]">
                          <span className="inline-flex items-center gap-0.5 sm:gap-1 lg:gap-1.5 px-1 sm:px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full text-[4px] sm:text-[7px] lg:text-xs font-medium bg-rose-50 text-rose-700 border border-rose-100 truncate">
                            <AlertCircle className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3.5 lg:h-3.5 shrink-0" /> Expired
                          </span>
                        </td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 text-slate-600 dark:text-slate-300 truncate w-[16%]">Oct 12, 2025</td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 text-right w-[10%]">
                          <button className="text-[#FF6B35] font-medium hover:underline">Remind</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm flex w-full items-center">
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 font-medium text-slate-900 dark:text-white truncate w-[28%]">Summit Electric</td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 text-slate-600 dark:text-slate-300 truncate w-[28%]">Contractor License</td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 w-[18%]">
                          <span className="inline-flex items-center gap-0.5 sm:gap-1 lg:gap-1.5 px-1 sm:px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full text-[4px] sm:text-[7px] lg:text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100 truncate">
                            <AlertTriangle className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3.5 lg:h-3.5 shrink-0" /> Expiring
                          </span>
                        </td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 text-slate-600 dark:text-slate-300 truncate w-[16%]">Next Week</td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 text-right w-[10%]">
                          <button className="text-[#FF6B35] font-medium hover:underline">Remind</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm flex w-full items-center">
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 font-medium text-slate-900 dark:text-white truncate w-[28%]">Pacific Plumbing</td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 text-slate-600 dark:text-slate-300 truncate w-[28%]">W-9 Form</td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 w-[18%]">
                          <span className="inline-flex items-center gap-0.5 sm:gap-1 lg:gap-1.5 px-1 sm:px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full text-[4px] sm:text-[7px] lg:text-xs font-medium bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-700 dark:text-slate-200 border border-slate-200/60 dark:border-slate-700/50 truncate">
                            <Clock className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3.5 lg:h-3.5 shrink-0" /> Missing
                          </span>
                        </td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 text-slate-400 truncate w-[16%]">—</td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 text-right w-[10%]">
                          <button className="text-[#FF6B35] font-medium hover:underline">Request</button>
                        </td>
                      </tr>
                      <tr className="hover:bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm flex w-full items-center">
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 font-medium text-slate-900 dark:text-white truncate w-[28%]">Horizon Framing</td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 text-slate-600 dark:text-slate-300 truncate w-[28%]">Workers Comp</td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 w-[18%]">
                          <span className="inline-flex items-center gap-0.5 sm:gap-1 lg:gap-1.5 px-1 sm:px-2 lg:px-2.5 py-0.5 lg:py-1 rounded-full text-[4px] sm:text-[7px] lg:text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 truncate">
                            <FileCheck className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3.5 lg:h-3.5 shrink-0" /> Compliant
                          </span>
                        </td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 text-slate-600 dark:text-slate-300 truncate w-[16%]">Mar 15, 2027</td>
                        <td className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-3 text-right w-[10%]">
                          <button className="text-slate-400 hover:text-slate-600 dark:text-slate-300">View</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          {/* MacBook Base */}
          <div className="relative mx-auto w-[105%] h-2 sm:h-4 lg:h-5 bg-gray-400 dark:bg-slate-300 rounded-b-lg sm:rounded-b-2xl shadow-xl z-10 flex justify-center -translate-x-[2.5%]">
             <div className="w-1/4 h-1 sm:h-1.5 bg-gray-300 dark:bg-white rounded-b-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
