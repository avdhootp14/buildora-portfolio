"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background pt-32 pb-8 border-t border-card-border overflow-hidden" id="contact">
      <div className="container px-6 md:px-12 mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          <div className="lg:col-span-2">
            <h3 className="text-4xl md:text-5xl font-display font-semibold text-foreground mb-6 leading-tight">
              Let's create something <br />
              <span className="italic text-muted">extraordinary.</span>
            </h3>
            <a href="mailto:hello@weblinq.agency" className="inline-flex items-center gap-3 text-xl md:text-2xl text-foreground hover:text-muted transition-colors border-b-2 border-foreground pb-2 font-medium">
              hello@weblinq.agency <ArrowUpRight size={24} />
            </a>
          </div>

          <div>
            <h4 className="text-muted font-bold mb-6 uppercase tracking-wider text-sm">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="/#services" className="text-foreground/70 hover:text-foreground transition-colors text-lg">Services</a></li>
              <li><a href="/#work" className="text-foreground/70 hover:text-foreground transition-colors text-lg">Case Studies</a></li>
              <li><a href="/about" className="text-foreground/70 hover:text-foreground transition-colors text-lg">Our Team</a></li>
              <li><a href="/#faq" className="text-foreground/70 hover:text-foreground transition-colors text-lg">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-muted font-bold mb-6 uppercase tracking-wider text-sm">Socials & Legal</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors text-lg">LinkedIn</a></li>
              <li><a href="#" className="text-foreground/70 hover:text-foreground transition-colors text-lg">Instagram</a></li>
              <li><a href="/privacy-policy" className="text-foreground/70 hover:text-foreground transition-colors text-lg">Privacy Policy</a></li>
              <li><a href="/terms-of-service" className="text-foreground/70 hover:text-foreground transition-colors text-lg">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Massive Brand Name (Interactive Outline to Gradient Fill) */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full flex justify-center mt-12 mb-4 group cursor-default"
        >
          <h2 className="text-[18vw] leading-[0.75] font-display font-bold text-center tracking-tighter w-full select-none relative">
            {/* Hollow Stroke (Always visible, subtly shifts color on hover) */}
            <span className="absolute inset-0 text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.15)] md:[-webkit-text-stroke:2px_rgba(255,255,255,0.15)] group-hover:[-webkit-text-stroke:2px_transparent] transition-all duration-700">
              WEBLINQ
            </span>
            {/* Solid Gradient Fill (Fades in smoothly on hover) */}
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-[#00c6ff] to-[#d946ef] drop-shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              WEBLINQ
            </span>
          </h2>
        </motion.div>

        <div className="pt-8 border-t border-card-border flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-muted text-xs">
            &copy; {new Date().getFullYear()} Weblinq Agency. All rights reserved.
          </p>
          <p className="text-muted text-xs">
            Based in New York, working globally.
          </p>
        </div>
      </div>
    </footer>
  );
};
