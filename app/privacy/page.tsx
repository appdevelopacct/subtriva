import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B1120] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-[#FF6B35] hover:text-[#E05928]">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 sm:p-12">
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">Privacy Policy</h1>
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Information We Collect</h2>
              <p>
                Subtriva collects user profile data necessary for account creation and management, including your name, email address, and company details. We also collect and process data you upload to the platform, such as subcontractor licenses, Certificates of Insurance (COIs), and other compliance documents.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. How We Store Your Data</h2>
              <p>
                Security is our top priority. All uploaded documents and sensitive data are stored securely using Supabase Private Storage. Access to these files is strictly authenticated and governed by Row Level Security (RLS) to ensure that only authorized personnel within your organization can view or manage them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. How We Use Your Data</h2>
              <p>
                The information we collect is used solely to provide, maintain, and improve the Subtriva platform. This includes sending automated compliance reminders, processing e-signatures, and managing team access.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Data Sharing and Third Parties</h2>
              <p>
                <strong>We never sell your personal data or uploaded documents to third parties.</strong> We may share data only with trusted service providers (such as hosting and payment processors) strictly for the purpose of operating our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@mail.subtriva.com" className="text-[#FF6B35] hover:underline">hello@mail.subtriva.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
