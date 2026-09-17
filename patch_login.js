const fs = require('fs');
let code = fs.readFileSync('app/login/page.tsx', 'utf8');

const oldButton = `                <button
                  type="button"
                  onClick={async () => {
                    setLoading(true)
                    setError('')
                    try {
                      const supabase = createClient()
                      const { error: signInError } = await supabase.auth.signInWithPassword({
                        email: 'demo@subtriva.com',
                        password: 'DemoPassword123!'
                      })
                      
                      if (signInError) {
                        const { error: signUpError } = await supabase.auth.signUp({
                          email: 'demo@subtriva.com',
                          password: 'DemoPassword123!',
                          options: {
                            data: { first_name: 'Demo', last_name: 'GC' }
                          }
                        })
                        if (signUpError) throw signUpError
                        
                        await new Promise(r => setTimeout(r, 1000))
                        
                        const { error: retrySignInError } = await supabase.auth.signInWithPassword({
                          email: 'demo@subtriva.com',
                          password: 'DemoPassword123!'
                        })
                        
                        if (retrySignInError) throw new Error("Please check your email to confirm the demo account. Or configure Supabase to disable email confirmations.")
                      }
                      
                      window.location.href='/dashboard'
                    } catch (e: any) {
                      setError(e.message || 'Failed to enter test mode.')
                    } finally {
                      setLoading(false)
                    }
                  }}
                  disabled={loading}
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35] transition-colors disabled:opacity-50"
                >
                  Quick Test (Demo Mode)
                </button>`;

const newButton = `                <button
                  type="button"
                  onClick={() => {
                    document.cookie = "demo_mode=true; path=/; max-age=86400";
                    window.location.href = '/dashboard';
                  }}
                  className="w-full flex justify-center items-center gap-2 py-2.5 px-4 border border-slate-300 dark:border-slate-600 rounded-lg shadow-sm text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF6B35] transition-colors"
                >
                  Quick Test (Demo Mode)
                </button>`;

code = code.replace(oldButton, newButton);
fs.writeFileSync('app/login/page.tsx', code);
console.log('Patched Quick Test button');
