import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function TermsOfService() {
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
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">Terms of Service</h1>
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p>Last updated: September 18, 2026</p>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Subtriva ("the Service"), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our platform. Subtriva is a B2B SaaS platform designed for General Contractors to manage compliance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. Account Creation and Responsibilities</h2>
              <p>
                To use the Service, you must register for an account. You agree to provide accurate and complete information during the registration process. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Subscription Billing and Payments</h2>
              <p>
                Subtriva is a paid service billed on a subscription basis. By subscribing, you agree to pay all applicable fees associated with the plan you select. Our payment processing is handled securely via Lemon Squeezy as our Merchant of Record. Subscriptions automatically renew unless canceled prior to the end of the current billing cycle.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. Platform Usage and Acceptable Use</h2>
              <p>
                You agree to use Subtriva solely for lawful business purposes related to compliance document management. You shall not upload any malicious code, attempt to breach our security, or use the platform to store unlawful content. We reserve the right to suspend or terminate accounts that violate these guidelines.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">5. Limitation of Liability</h2>
              <p>
                Subtriva is a software tool designed to assist with tracking subcontractor compliance, licenses, and insurance documents. It does not constitute legal or professional advice. We make no guarantees regarding the legal validity of the documents you upload. Subtriva shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from your use or inability to use the service, including lapses in compliance or expired documentation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">6. Contact</h2>
              <p>
                For any questions regarding these Terms, please contact us at <a href="mailto:hello@mail.subtriva.com" className="text-[#FF6B35] hover:underline">hello@mail.subtriva.com</a>.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
