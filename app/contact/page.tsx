import Link from "next/link";
import { ArrowLeft, Mail, Clock, Building2 } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-[#FF6B35] hover:text-[#E05928]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">Contact Us</h1>
          <p className="text-slate-600 dark:text-slate-400 mb-12 max-w-lg mx-auto">
            Need help with your compliance management? Our support team is here to assist you with any questions or technical issues.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-200 dark:border-slate-700">
                <Building2 className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Company</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Suptriva</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-200 dark:border-slate-700">
                <Mail className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Support Email</h3>
              <a href="mailto:hello@mail.subtriva.com" className="text-sm text-[#FF6B35] hover:underline">
                hello@mail.subtriva.com
              </a>
            </div>

            <div className="flex flex-col items-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 shadow-sm border border-slate-200 dark:border-slate-700">
                <Clock className="w-6 h-6 text-[#FF6B35]" />
              </div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Response Time</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Within 24-48 hours</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
