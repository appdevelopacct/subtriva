'use client';

import React from 'react';
import { ArrowRight, ArrowDown, Shield, FileUp, UploadCloud, Smartphone } from 'lucide-react';

export default function SubcontractorSection() {
  return (
    <section className="py-24 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto lg:text-center mb-10 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F172A] dark:text-white mb-6 leading-tight">
            Your Subcontractors Don&apos;t Need Another Complicated Dashboard
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Send a secure upload link. Your subcontractor can open it from their phone, take a photo or upload a file, and submit the requested documents.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 max-w-5xl mx-auto">
          <div className="flex flex-col gap-6 w-full lg:w-[380px] shrink-0">
            
            <div className="bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50 p-6 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 shadow-sm w-full max-w-sm mx-auto">
              <div className="flex flex-col gap-4 text-center items-center font-medium text-slate-700 dark:text-slate-200">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </div>
                  <span>GC</span>
                </div>
                <ArrowDown className="w-4 h-4 text-slate-300" />
                <div className="text-[#FF6B35] bg-orange-50 px-4 py-2 rounded-full text-sm font-bold border border-orange-100">
                  Secure Upload Link
                </div>
                <ArrowDown className="w-4 h-4 text-slate-300" />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Smartphone className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </div>
                  <span>Subcontractor Phone</span>
                </div>
                <ArrowDown className="w-4 h-4 text-slate-300" />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-[#FF6B35]/10 rounded-full flex items-center justify-center">
                    <FileUp className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <span>Upload Documents</span>
                </div>
                <ArrowDown className="w-4 h-4 text-slate-300" />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-500" />
                  </div>
                  <span>GC Gets Updated</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0F172A] text-white rounded-xl p-4 flex items-start gap-3 w-full max-w-sm mx-auto">
              <div className="mt-0.5">
                <UploadCloud className="w-5 h-5 text-[#FF6B35]" />
              </div>
              <p className="text-sm font-medium">No complicated dashboard required for basic document submission.</p>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-start w-full lg:w-[340px] shrink-0 mx-auto lg:mx-0">
            {/* iPhone 16 Pro Max Mockup */}
            <div className="relative w-full max-w-[340px] aspect-[9/19.5] bg-black rounded-[48px] sm:rounded-[56px] border-[6px] sm:border-[8px] border-slate-800 dark:border-slate-200 shadow-2xl flex flex-col z-10 ring-1 ring-slate-700/50 dark:ring-white/50">
              
              {/* Hardware Buttons */}
              <div className="absolute -left-[8px] sm:-left-[10px] top-[100px] w-1 h-8 bg-slate-700 dark:bg-slate-300 rounded-l-md"></div>
              <div className="absolute -left-[8px] sm:-left-[10px] top-[140px] w-1 h-12 bg-slate-700 dark:bg-slate-300 rounded-l-md"></div>
              <div className="absolute -left-[8px] sm:-left-[10px] top-[200px] w-1 h-12 bg-slate-700 dark:bg-slate-300 rounded-l-md"></div>
              <div className="absolute -right-[8px] sm:-right-[10px] top-[160px] w-1 h-16 bg-slate-700 dark:bg-slate-300 rounded-r-md"></div>

              {/* Screen */}
              <div className="relative flex-1 bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm rounded-[40px] sm:rounded-[48px] overflow-hidden flex flex-col border border-slate-800 dark:border-slate-200/50">
                
                {/* Dynamic Island */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[110px] h-[32px] bg-black rounded-full z-50 flex items-center justify-between px-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-800/80 border border-slate-700/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-900/40 relative">
                    <div className="absolute inset-0 m-auto w-1 h-1 bg-emerald-400 rounded-full blur-[1px]"></div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="h-12 bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm shrink-0 flex justify-between items-center px-6 pt-3 text-[11px] font-semibold text-slate-800 dark:text-slate-100">
                   <span>9:41</span>
                   <div className="flex gap-1.5 items-center pb-0.5">
                      <div className="w-4 h-3 bg-slate-800 rounded-sm"></div>
                   </div>
                </div>
              
              {/* Phone Content */}
              <div className="flex-1 bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm px-5 sm:px-6 pb-6 flex flex-col gap-4 overflow-y-auto hide-scrollbar">
                <div className="mb-2">
                  <h3 className="font-bold text-slate-800 dark:text-slate-100 text-xl sm:text-2xl mb-2">Upload Documents</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Please upload the required documents for Apex Builders LLC.</p>
                </div>
                
                <div className="bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm">Contractor License</div>
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Required</span>
                  </div>
                  <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 dark:text-slate-400 text-xs font-medium hover:bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm hover:border-slate-400 transition-colors flex items-center justify-center gap-2">
                    <FileUp className="w-4 h-4" /> Choose File
                  </button>
                </div>

                <div className="bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm">Insurance / Compliance</div>
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Required</span>
                  </div>
                  <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 dark:text-slate-400 text-xs font-medium hover:bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm hover:border-slate-400 transition-colors flex items-center justify-center gap-2">
                    <FileUp className="w-4 h-4" /> Choose File
                  </button>
                </div>

                <div className="bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm">W-9</div>
                    <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Required</span>
                  </div>
                  <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 dark:text-slate-400 text-xs font-medium hover:bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm hover:border-slate-400 transition-colors flex items-center justify-center gap-2">
                    <FileUp className="w-4 h-4" /> Choose File
                  </button>
                </div>
                
                <div className="bg-white/60 dark:bg-[#1E293B]/40 backdrop-blur-xl shadow-lg border border-white/50 dark:border-slate-700/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-700/50 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <div className="font-semibold text-slate-800 dark:text-slate-100 text-sm">Other Document</div>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100/50 dark:bg-slate-800/50 backdrop-blur-sm px-2.5 py-1 rounded-full uppercase tracking-wider">Optional</span>
                  </div>
                  <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 dark:text-slate-400 text-xs font-medium hover:bg-slate-50/50 dark:bg-slate-800/30 backdrop-blur-sm hover:border-slate-400 transition-colors flex items-center justify-center gap-2">
                    <FileUp className="w-4 h-4" /> Choose File
                  </button>
                </div>

                <div className="mt-2 pb-8">
                  <button className="w-full bg-[#FF6B35] hover:bg-[#e55a29] transition-colors text-white font-semibold py-3.5 rounded-xl shadow-md shadow-[#FF6B35]/20 text-sm flex justify-center items-center gap-2">
                    Submit Documents <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* iPhone Home Bar */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-slate-300 rounded-full"></div>
              
              </div>
            </div>
            
            {/* Decorative background circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-[#FF6B35]/10 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>
      </div>
    </section>
  );
}
