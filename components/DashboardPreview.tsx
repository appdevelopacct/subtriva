'use client';

import React from 'react';
import { Search, Filter, AlertCircle, AlertTriangle, Clock, FileCheck } from 'lucide-react';

export default function DashboardPreview() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0F172A] overflow-hidden text-slate-900 dark:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            See Your Compliance Status at a Glance
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            Easily filter, track, and take action on subcontractor compliance all in one simple view.
          </p>
        </div>

        <div 
          
          
          
          
          className="max-w-6xl mx-auto relative px-2 sm:px-6"
        >
          {/* MacBook Screen Container (Fixed 16:10 Ratio) */}
          <div className="relative w-full aspect-[16/10] rounded-t-lg sm:rounded-t-2xl lg:rounded-t-3xl border-gray-800 border-[3px] sm:border-[8px] lg:border-[12px] bg-gray-900 shadow-2xl flex flex-col overflow-hidden">
            {/* Camera Notch */}
            <div className="absolute top-0 inset-x-0 flex justify-center z-20">
              <div className="w-12 sm:w-20 lg:w-24 h-1.5 sm:h-2.5 lg:h-3.5 bg-gray-800 rounded-b-md lg:rounded-b-lg"></div>
            </div>
            
            {/* Screen Content Wrapper */}
            <div className="relative bg-white dark:bg-[#1E293B] flex flex-col w-full h-full">
              
              {/* macOS Browser Title Bar */}
              <div className="bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 flex items-center border-b border-slate-200/60 dark:border-slate-700/50">
                <div className="flex gap-1 sm:gap-1.5 w-1/3">
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full bg-rose-400"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full bg-amber-400"></div>
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-3 lg:h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="w-1/3 flex justify-center">
                  <div className="text-[6px] sm:text-[9px] lg:text-xs font-medium text-slate-400 bg-slate-200/50 px-2 sm:px-3 py-0.5 sm:py-1 rounded max-w-full truncate">
                    app.subtriva.com/dashboard
                  </div>
                </div>
                <div className="w-1/3"></div>
              </div>

              {/* Header */}
              <div className="border-b border-slate-200/60 dark:border-slate-700/50 p-2 sm:p-4 lg:p-6 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm">
                <h3 className="font-bold text-[8px] sm:text-sm lg:text-xl text-slate-800 dark:text-slate-100">Compliance Dashboard</h3>
                
                <div className="flex bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm p-0.5 sm:p-1 rounded lg:rounded-lg">
                  <button className="px-1.5 sm:px-3 py-0.5 sm:py-1.5 text-[6px] sm:text-[9px] lg:text-sm font-medium rounded sm:rounded-md bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50 shadow-sm text-slate-800 dark:text-slate-100">All</button>
                  <button className="px-1.5 sm:px-3 py-0.5 sm:py-1.5 text-[6px] sm:text-[9px] lg:text-sm font-medium rounded sm:rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:text-slate-100">Compliant</button>
                  <button className="px-1.5 sm:px-3 py-0.5 sm:py-1.5 text-[6px] sm:text-[9px] lg:text-sm font-medium rounded sm:rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:text-slate-100">Expiring</button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-5 border-b border-slate-200 dark:border-slate-700/60 divide-x divide-slate-100 dark:divide-slate-800 bg-white dark:bg-[#1E293B]">
                <div className="p-1.5 sm:p-4 lg:p-6 relative flex flex-col justify-center">
                  <div className="text-[5px] sm:text-[9px] lg:text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5 sm:mb-2 truncate">Total Subs</div>
                  <div className="text-[10px] sm:text-xl lg:text-3xl font-bold text-slate-900 dark:text-white">37</div>
                </div>
                <div className="p-1.5 sm:p-4 lg:p-6 relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-emerald-500"></div>
                  <div className="text-[5px] sm:text-[9px] lg:text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5 sm:mb-2 truncate">Compliant</div>
                  <div className="text-[10px] sm:text-xl lg:text-3xl font-bold text-slate-900 dark:text-white">24</div>
                </div>
                <div className="p-1.5 sm:p-4 lg:p-6 relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-amber-500"></div>
                  <div className="text-[5px] sm:text-[9px] lg:text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5 sm:mb-2 truncate">Expiring Soon</div>
                  <div className="text-[10px] sm:text-xl lg:text-3xl font-bold text-slate-900 dark:text-white">8</div>
                </div>
                <div className="p-1.5 sm:p-4 lg:p-6 relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-rose-500"></div>
                  <div className="text-[5px] sm:text-[9px] lg:text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5 sm:mb-2 truncate">Expired</div>
                  <div className="text-[10px] sm:text-xl lg:text-3xl font-bold text-slate-900 dark:text-white">3</div>
                </div>
                <div className="p-1.5 sm:p-4 lg:p-6 relative overflow-hidden flex flex-col justify-center">
                  <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-slate-400"></div>
                  <div className="text-[5px] sm:text-[9px] lg:text-sm text-slate-500 dark:text-slate-400 font-medium mb-0.5 sm:mb-2 truncate">Missing Docs</div>
                  <div className="text-[10px] sm:text-xl lg:text-3xl font-bold text-slate-900 dark:text-white">2</div>
                </div>
              </div>

              {/* Desktop Table - Fully Fluid */}
              <div className="flex-1 min-h-0 bg-white dark:bg-[#1E293B]">
                <table className="w-full text-left table-fixed h-full">
                  <thead className="text-[5px] sm:text-[9px] lg:text-xs text-slate-500 dark:text-slate-400 uppercase bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm border-b border-slate-200/60 dark:border-slate-700/50 block w-full">
                    <tr className="flex w-full">
                      <th className="px-2 sm:px-4 lg:px-6 py-1 sm:py-3 lg:py-4 font-semibold tracking-wider truncate w-[28%]">Company</th>
                      <th className="px-2 sm:px-4 lg:px-6 py-1 sm:py-3 lg:py-4 font-semibold tracking-wider truncate w-[28%]">Document</th>
                      <th className="px-2 sm:px-4 lg:px-6 py-1 sm:py-3 lg:py-4 font-semibold tracking-wider w-[18%]">Status</th>
                      <th className="px-2 sm:px-4 lg:px-6 py-1 sm:py-3 lg:py-4 font-semibold tracking-wider truncate w-[16%]">Expiration</th>
                      <th className="px-2 sm:px-4 lg:px-6 py-1 sm:py-3 lg:py-4 font-semibold tracking-wider text-right w-[10%]">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-[6px] sm:text-xs lg:text-sm block w-full">
                    <tr className="hover:bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm transition-colors flex w-full items-center">
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 font-medium text-slate-900 dark:text-white truncate w-[28%]">BuildRight Pros</td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 text-slate-600 dark:text-slate-300 truncate w-[28%]">Contractor License</td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 w-[18%]">
                        <span className="inline-flex items-center gap-0.5 sm:gap-1.5 px-1 sm:px-3 py-0.5 sm:py-1 rounded-full text-[4px] sm:text-[9px] lg:text-xs font-semibold bg-rose-100 text-rose-700 truncate">
                          <AlertCircle className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 lg:w-3.5 lg:h-3.5 shrink-0" /> Expired
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 text-slate-600 dark:text-slate-300 truncate w-[16%]">Sep 15, 2025</td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 text-right w-[10%]">
                        <button className="text-[#FF6B35] font-semibold hover:text-[#e55a29] transition-colors bg-[#FF6B35]/10 px-1 sm:px-3 py-0.5 sm:py-1.5 rounded lg:rounded-lg">Remind</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm transition-colors flex w-full items-center">
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 font-medium text-slate-900 dark:text-white truncate w-[28%]">Steel & Stone Inc.</td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 text-slate-600 dark:text-slate-300 truncate w-[28%]">Gen. Liability</td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 w-[18%]">
                        <span className="inline-flex items-center gap-0.5 sm:gap-1.5 px-1 sm:px-3 py-0.5 sm:py-1 rounded-full text-[4px] sm:text-[9px] lg:text-xs font-semibold bg-amber-100 text-amber-700 truncate">
                          <AlertTriangle className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 lg:w-3.5 lg:h-3.5 shrink-0" /> Expiring
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 text-slate-600 dark:text-slate-300 truncate w-[16%]">In 3 Days</td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 text-right w-[10%]">
                        <button className="text-[#FF6B35] font-semibold hover:text-[#e55a29] transition-colors bg-[#FF6B35]/10 px-1 sm:px-3 py-0.5 sm:py-1.5 rounded lg:rounded-lg">Remind</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm transition-colors flex w-full items-center">
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 font-medium text-slate-900 dark:text-white truncate w-[28%]">Vanguard Electric</td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 text-slate-600 dark:text-slate-300 truncate w-[28%]">W-9 Form</td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 w-[18%]">
                        <span className="inline-flex items-center gap-0.5 sm:gap-1.5 px-1 sm:px-3 py-0.5 sm:py-1 rounded-full text-[4px] sm:text-[9px] lg:text-xs font-semibold bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm text-slate-700 dark:text-slate-200 truncate">
                          <Clock className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 lg:w-3.5 lg:h-3.5 shrink-0" /> Missing
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 text-slate-400 truncate w-[16%]">—</td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 text-right w-[10%]">
                        <button className="text-[#FF6B35] font-semibold hover:text-[#e55a29] transition-colors bg-[#FF6B35]/10 px-1 sm:px-3 py-0.5 sm:py-1.5 rounded lg:rounded-lg">Request</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm transition-colors flex w-full items-center">
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 font-medium text-slate-900 dark:text-white truncate w-[28%]">National HVAC</td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 text-slate-600 dark:text-slate-300 truncate w-[28%]">Workers Comp</td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 w-[18%]">
                        <span className="inline-flex items-center gap-0.5 sm:gap-1.5 px-1 sm:px-3 py-0.5 sm:py-1 rounded-full text-[4px] sm:text-[9px] lg:text-xs font-semibold bg-emerald-100 text-emerald-700 truncate">
                          <FileCheck className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 lg:w-3.5 lg:h-3.5 shrink-0" /> Compliant
                        </span>
                      </td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 text-slate-600 dark:text-slate-300 truncate w-[16%]">Dec 01, 2026</td>
                      <td className="px-2 sm:px-4 lg:px-6 py-1.5 sm:py-3 lg:py-4 text-right w-[10%]">
                        <button className="text-slate-400 font-medium hover:text-slate-600 dark:text-slate-300 transition-colors px-1 sm:px-3 py-0.5 sm:py-1.5">View</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
