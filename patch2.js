const fs = require('fs');
let code = fs.readFileSync('app/dashboard/documents/page.tsx', 'utf8');

const search = `              ) : (
                <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                      <File className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{file.name}</p>
                      <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  {!isUploading && (
                    <button type="button" onClick={() => setFile(null)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-colors shrink-0">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              )}`;

const replace = `              ) : (
                <div className="space-y-3">
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400 shrink-0">
                        <File className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{file.name}</p>
                        <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    {!isUploading && (
                      <button type="button" onClick={() => setFile(null)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-md transition-colors shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  <button
                    type="button"
                    disabled={isScanning || isUploading}
                    onClick={() => handleAIScan(file)}
                    className="w-full py-2.5 px-4 flex items-center justify-center gap-2 rounded-lg border border-[#F25900] text-[#F25900] hover:bg-[#F25900]/10 transition-colors font-medium text-sm disabled:opacity-50"
                  >
                    {isScanning ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Scanning with AI...</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> Auto-fill details with AI Scan</>
                    )}
                  </button>
                </div>
              )}`;

code = code.replace(search, replace);
fs.writeFileSync('app/dashboard/documents/page.tsx', code);
