"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
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
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-6"}`}
      >
        <div className="container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                <div className="w-3 h-3 bg-black rounded-sm" />
              </div>
              <span className="text-xl font-display tracking-tight text-white font-medium">Buildora</span>
            </Link>
            
            {/* Desktop Links (Centered) */}
            <ul className="hidden md:flex items-center space-x-10">
              <li><Link href="#home" className="text-sm font-medium text-white/60 hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="#services" className="text-sm font-medium text-white/60 hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="#work" className="text-sm font-medium text-white/60 hover:text-accent transition-colors">Process</Link></li>
              <li><Link href="#faqs" className="text-sm font-medium text-white/60 hover:text-accent transition-colors">FAQs</Link></li>
              <li><Link href="#support" className="text-sm font-medium text-white/60 hover:text-accent transition-colors">Support</Link></li>
            </ul>

            {/* CTA */}
            <div className="hidden md:block">
              <Link href="#contact" className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#000_0%,#8b5cf6_50%,#000_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-accent/20 px-6 py-1 text-sm font-medium text-white backdrop-blur-3xl transition-all hover:bg-accent hover:text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]">
                  Let&apos;s talk
                </span>
              </Link>
            </div>

            <button 
              className="md:hidden text-white" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[72px] p-4 bg-[#050505]/95 backdrop-blur-xl border-b border-white/10 z-40 flex flex-col space-y-4 shadow-xl"
          >
            <Link href="#home" className="text-lg font-medium text-gray-300 p-2" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="#services" className="text-lg font-medium text-gray-300 p-2" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link href="#work" className="text-lg font-medium text-gray-300 p-2" onClick={() => setMobileMenuOpen(false)}>Process</Link>
            <Link href="#contact" className="bg-accent text-white text-center p-3 rounded-full font-medium mt-4" onClick={() => setMobileMenuOpen(false)}>
              Let&apos;s talk
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
