import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RefundPolicy() {
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
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6">Refund & Cancellation Policy</h1>
          <div className="space-y-6 text-slate-600 dark:text-slate-400">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            
            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">1. Cancellation Policy</h2>
              <p>
                We believe in providing a seamless experience. You can cancel your Subtriva subscription at any time directly from your account's dashboard settings. Once canceled, you will retain access to your account and documents until the end of your current paid billing cycle. We do not lock you into long-term commitments against your will.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">2. 14-Day Money-Back Guarantee</h2>
              <p>
                We want you to be fully satisfied with our compliance platform. If you are a first-time subscriber and you decide that Subtriva is not the right fit for your business, we offer a 14-day money-back guarantee. If you cancel within the first 14 days of your initial paid subscription, please contact our support team to request a full refund.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">3. Non-Refundable Scenarios</h2>
              <p>
                Except for the 14-day money-back guarantee on initial subscriptions, all subscription charges are non-refundable. We do not provide refunds or credits for partially used billing periods, mid-cycle downgrades, or forgotten cancellations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">4. How to Request a Refund</h2>
              <p>
                To request a refund under our 14-day guarantee, please reach out to our team at <a href="mailto:hello@mail.subtriva.com" className="text-[#FF6B35] hover:underline">hello@mail.subtriva.com</a> within the applicable timeframe. Our billing support team processes these requests within 2-5 business days.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
