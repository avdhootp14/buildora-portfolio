"use client";

import { Reveal } from "./animations/Reveal";
import { Mail } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

export const Footer = () => {
  return (
    <footer className="relative bg-[#050505] pt-24 pb-12 border-t border-white/5 overflow-hidden" id="contact">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#8b5cf6]/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10 px-6 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Col */}
          <div className="col-span-1 lg:col-span-4 flex flex-col">
            <Reveal direction="up">
              <span className="text-3xl font-display font-bold text-white tracking-tight mb-6 block">
                Buildora
              </span>
              <p className="text-white/60 font-sans leading-relaxed mb-8 max-w-sm">
                We design and build digital experiences that help businesses scale faster, look better, and convert more effectively.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#8b5cf6] hover:text-white hover:border-[#8b5cf6] transition-all duration-300">
                  <FaTwitter size={18} />
                </a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#8b5cf6] hover:text-white hover:border-[#8b5cf6] transition-all duration-300">
                  <FaLinkedin size={18} />
                </a>
                <a href="#" aria-label="GitHub" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:bg-[#8b5cf6] hover:text-white hover:border-[#8b5cf6] transition-all duration-300">
                  <FaGithub size={18} />
                </a>
              </div>
            </Reveal>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 lg:col-span-2">
            <Reveal direction="up" delay={0.1}>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Explore</h4>
              <ul className="space-y-4 flex flex-col">
                <li><a href="#services" className="text-white/60 hover:text-[#8b5cf6] transition-colors font-sans text-sm">Services</a></li>
                <li><a href="#process" className="text-white/60 hover:text-[#8b5cf6] transition-colors font-sans text-sm">Our Process</a></li>
                <li><a href="#work" className="text-white/60 hover:text-[#8b5cf6] transition-colors font-sans text-sm">Case Studies</a></li>
                <li><a href="#faq" className="text-white/60 hover:text-[#8b5cf6] transition-colors font-sans text-sm">FAQ</a></li>
              </ul>
            </Reveal>
          </div>

          {/* Legal Links (SEO) */}
          <div className="col-span-1 lg:col-span-2">
            <Reveal direction="up" delay={0.2}>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Legal</h4>
              <ul className="space-y-4 flex flex-col">
                <li><a href="/privacy-policy" className="text-white/60 hover:text-[#8b5cf6] transition-colors font-sans text-sm">Privacy Policy</a></li>
                <li><a href="/terms-of-service" className="text-white/60 hover:text-[#8b5cf6] transition-colors font-sans text-sm">Terms of Service</a></li>
                <li><a href="/cookie-policy" className="text-white/60 hover:text-[#8b5cf6] transition-colors font-sans text-sm">Cookie Policy</a></li>
                <li><a href="/sitemap.xml" className="text-white/60 hover:text-[#8b5cf6] transition-colors font-sans text-sm">Sitemap</a></li>
              </ul>
            </Reveal>
          </div>

          {/* Contact / CTA */}
          <div className="col-span-1 lg:col-span-4">
            <Reveal direction="up" delay={0.3}>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Ready to scale?</h4>
              <p className="text-white/60 font-sans leading-relaxed mb-6">
                Let's discuss how we can transform your digital presence. No strings attached.
              </p>
              <a href="mailto:hello@buildora.agency" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-white hover:bg-[#8b5cf6] hover:border-[#8b5cf6] transition-all duration-300 font-medium group">
                <Mail size={18} className="group-hover:scale-110 transition-transform" />
                hello@buildora.agency
              </a>
            </Reveal>
          </div>

        </div>

        {/* Bottom Bar */}
        <Reveal direction="up" delay={0.4}>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm font-sans">
              &copy; {new Date().getFullYear()} Buildora Agency. All rights reserved.
            </p>
            <p className="text-white/40 text-sm font-sans flex items-center gap-1">
              Crafted with passion in <span className="text-white/60">Next.js & Tailwind</span>
            </p>
          </div>
        </Reveal>
      </div>
    </footer>
  );
};
