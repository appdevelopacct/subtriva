import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ToastContainer } from '@/components/ui/ToastContainer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Subtriva | Subcontractor License & Insurance Tracking for GCs',
  description: 'Subtriva helps General Contractors collect subcontractor documents, track license and insurance expiration dates, and send timely reminders.',
  openGraph: {
    title: 'Subtriva | Subcontractor License & Insurance Tracking for GCs',
    description: 'Subtriva helps General Contractors collect subcontractor documents, track license and insurance expiration dates, and send timely reminders.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subtriva | Subcontractor License & Insurance Tracking for GCs',
    description: 'Subtriva helps General Contractors collect subcontractor documents, track license and insurance expiration dates, and send timely reminders.',
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased text-slate-900 bg-[#FAFAFA] dark:text-slate-100 dark:bg-[#0B1120] transition-colors duration-300`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          
          {children}
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
}
