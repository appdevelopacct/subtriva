import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


export default function Footer() {
  const links = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Refund Policy', href: '/refund-policy' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-white dark:bg-[#0F172A] pt-16 pb-8 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          
          <div className="flex items-center gap-2">
            <img src="/subtriva-logo.png" alt="Subtriva Logo" className="h-8 w-auto object-contain" />
            <span className="tracking-tight mt-1">
              <span className="text-[#FF6B35] text-xl font-bold">Subtriva</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-[#FF6B35] dark:hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

        </div>
        
        <div className="text-center md:text-left border-t border-slate-800 dark:border-slate-800/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            © 2026 Subtriva. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-slate-400 hover:text-[#FF6B35] transition-colors font-medium text-sm" aria-label="LinkedIn">
              LinkedIn
            </a>
            <a href="#" className="text-slate-400 hover:text-[#FF6B35] transition-colors font-medium text-sm" aria-label="Facebook">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
