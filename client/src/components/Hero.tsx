"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Reveal } from "./animations/Reveal";
import { ArrowRight, Play } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 lg:pt-28 lg:pb-16 overflow-hidden bg-[#0a0a0a]" id="home">
      <div className="container relative z-10 px-6 lg:px-12 xl:px-24 mx-auto mt-12 lg:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="col-span-1 lg:col-span-6 lg:pr-8 xl:pr-16">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 lg:mb-8">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] sm:text-xs font-medium text-white/70 uppercase tracking-widest">Accepting New Projects</span>
              </div>
            </Reveal>
            
            <Reveal delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tight mb-6 lg:mb-8 leading-[1.1]">
                Digital Experiences That <br className="hidden md:block"/>
                <span className="text-white/40 italic font-serif">Drive Growth</span>
              </h1>
            </Reveal>
            
            <Reveal delay={0.2}>
              <p className="text-base sm:text-lg md:text-xl text-white/60 font-sans leading-relaxed mb-8 lg:mb-10 max-w-xl">
                We are a human-first digital agency. We don't just write code—we craft tactile, premium web experiences that connect with your audience and elevate your brand.
              </p>
            </Reveal>
            
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <a href="#work" className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 bg-white text-black font-semibold rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-300">
                  View Our Work <ArrowRight size={18} />
                </a>
                <a href="#contact" className="w-full sm:w-auto px-6 lg:px-8 py-3 lg:py-4 bg-transparent border border-white/20 text-white font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-colors duration-300">
                  <Play size={18} /> Our Process
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right Imagery (Humanized) - Single Image Only */}
          <div className="col-span-1 lg:col-span-6 relative">
            <Reveal delay={0.4} className="relative z-10">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] md:aspect-video lg:aspect-[4/3] xl:aspect-[3/2] bg-neutral-900 border border-white/10 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop" 
                  alt="Buildora Team working" 
                  className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700"
                />
                {/* Subtle Overlay to ensure dark mode consistency */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 right-6 sm:right-8">
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 p-4 sm:p-6 rounded-xl inline-flex flex-col gap-1">
                    <span className="text-2xl sm:text-3xl font-display font-bold text-white">40+</span>
                    <span className="text-white/60 text-xs sm:text-sm font-medium uppercase tracking-wider">Happy Clients Worldwide</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>

    </section>
  );
}
