'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '/#features' },
    { name: 'How It Works', href: '/#how-it-works' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'FAQ', href: '/#faq' },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-t-4 border-t-[#FF6B35]",
        isScrolled 
          ? "bg-white/90 dark:bg-[#0B1120]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-3 shadow-sm" 
          : "bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-4 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-2">
            <img src="/subtriva-logo.png" alt="Subtriva Logo" className="h-8 w-auto object-contain" />
            <span className="tracking-tight mt-1">
              <span className="text-[#FF6B35] text-xl font-bold">Subtriva</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-700 dark:text-slate-300 hover:text-[#FF6B35] dark:hover:text-[#FF6B35] text-sm font-medium transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/login" 
              className="bg-[#FF6B35] hover:bg-[#E05928] text-white font-medium text-sm px-5 py-2.5 rounded-full transition-all shadow-md shadow-[#FF6B35]/20 focus:outline-none focus:ring-4 focus:ring-[#FF6B35]/30 inline-flex items-center justify-center gap-2"
            >
              Get Started
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/90 dark:bg-[#0B1120]/95 backdrop-blur-xl border-b border-slate-200/60 dark:border-slate-800/50 shadow-lg py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 dark:text-slate-300 hover:text-[#FF6B35] font-medium py-2"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-2 flex flex-col gap-3">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="w-full bg-[#FF6B35] text-white text-center rounded-full font-medium py-3">
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
