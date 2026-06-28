"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-8"}`}
      >
        <div className="container px-6 md:px-12 mx-auto">
          <div className="flex items-center justify-between">
            {/* Left Logo */}
            <Link href="/" className="text-2xl font-display font-bold tracking-tight text-foreground flex items-center gap-2 group">
              <span className="italic font-medium">Weblinq</span>
            </Link>
            
            {/* Center Pill Nav */}
            <div className="hidden md:flex items-center bg-[#111]/80 backdrop-blur-lg border border-white/5 rounded-full px-8 py-3 space-x-10 shadow-2xl">
              <Link href="/#services" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors duration-300">Services</Link>
              <Link href="/about" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors duration-300">About Us</Link>
              <Link href="/#work" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors duration-300">Projects</Link>
              <Link href="/#faq" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors duration-300">FAQ</Link>
              <Link href="/#contact" className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors duration-300">Contact</Link>
            </div>

            {/* Right CTA */}
            <div className="hidden md:flex items-center">
              <Link href="/#contact" className="group relative bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-colors shadow-lg overflow-hidden">
                <div className="absolute inset-0 bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                <div className="relative flex flex-col h-5 overflow-hidden">
                  <div className="flex flex-col transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:-translate-y-5">
                    <span className="flex items-center gap-2 h-5 leading-none">
                      Let&apos;s Chat! <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="flex items-center gap-2 h-5 leading-none">
                      Let&apos;s Chat! <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            </div>

            <button 
              className="md:hidden text-foreground bg-white/5 p-2 rounded-full border border-white/10" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 top-[70px] p-6 bg-background/95 backdrop-blur-2xl border-b border-white/5 z-40 flex flex-col space-y-6"
          >
            <Link href="/#services" className="text-2xl font-display text-foreground" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link href="/about" className="text-2xl font-display text-foreground" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/#work" className="text-2xl font-display text-foreground" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
            <Link href="/#faq" className="text-2xl font-display text-foreground" onClick={() => setMobileMenuOpen(false)}>FAQ</Link>
            <Link href="/#contact" className="text-2xl font-display text-foreground opacity-50" onClick={() => setMobileMenuOpen(false)}>Let&apos;s Chat</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
