"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Background3D } from "./Background3D";
import { ArrowDownRight, Play } from "lucide-react";
import { useRef } from "react";

export const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transforms for the hero elements
  const yText = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yBg = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-screen min-h-[800px] flex flex-col justify-center overflow-hidden bg-gradient-to-br from-[#1a0b2e] via-[#050505] to-[#0b0c26]" id="home">
      
      {/* Ambient glowing orbs for extra color */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gradient-to-br from-[#a855f7] to-[#d946ef] rounded-full mix-blend-screen filter blur-[150px] opacity-20" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#00c6ff] rounded-full mix-blend-screen filter blur-[150px] opacity-10" />
      </div>

      {/* 3D Background with Parallax */}
      <motion.div style={{ y: yBg }} className="absolute inset-0 z-0">
        <Background3D />
      </motion.div>
      
      <motion.div style={{ y: yText, opacity }} className="container relative z-10 px-6 md:px-12 mx-auto h-full flex flex-col justify-between py-32">
        
        {/* Top Content Row */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 pt-10">
          
          {/* Left: Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="w-full md:w-3/5"
          >
            <h1 className="text-5xl md:text-7xl lg:text-[7.5rem] font-display font-bold leading-[1] text-foreground tracking-tighter">
              Experiences <br />
              That Drive <br />
              <span className="italic font-medium text-foreground/90">Growth.</span>
            </h1>
          </motion.div>

          {/* Right: Agency Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="w-full md:w-1/3 flex flex-col pt-4"
          >
            <p className="text-lg md:text-xl font-sans font-medium text-foreground/70 leading-relaxed mb-8">
              We are a human-first digital agency. We craft tactile, premium web experiences that connect with your audience and elevate your brand.
            </p>
            
            <a href="#work" className="group inline-flex items-center gap-4 text-sm uppercase tracking-widest font-bold text-foreground">
              <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors duration-300">
                <ArrowDownRight size={16} />
              </span>
              Discover our work
            </a>
          </motion.div>
        </div>

        {/* Bottom Elements Row */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 relative z-20 mt-auto">
          
          {/* Bottom Left: Process CTA */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <a href="#process" className="group flex items-center gap-4 bg-[#111]/80 backdrop-blur-md border border-white/10 px-6 py-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
              <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-90 transition-transform">
                <Play size={16} fill="black" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-foreground/50 font-bold mb-1">Our Approach</p>
                <p className="text-sm font-semibold text-foreground">See how we build products</p>
              </div>
            </a>
          </motion.div>

          {/* Bottom Right: Quick Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex items-center gap-8 bg-[#111]/80 backdrop-blur-md border border-white/10 px-8 py-6 rounded-2xl"
          >
            <div className="flex flex-col">
              <span className="text-3xl font-display font-bold text-foreground">1</span>
              <span className="text-xs tracking-widest uppercase text-foreground/50 font-semibold mt-1">Happy Client</span>
            </div>
            <div className="w-[1px] h-12 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-3xl font-display font-bold text-foreground">2</span>
              <span className="text-xs tracking-widest uppercase text-foreground/50 font-semibold mt-1">Upcoming Projects</span>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};
