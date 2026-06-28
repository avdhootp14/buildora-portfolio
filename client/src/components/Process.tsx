"use client";

import { Reveal } from "./animations/Reveal";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const processes = [
  {
    step: "01",
    title: "Discovery & Strategy",
    desc: "We start by deeply understanding your business goals, target audience, and market landscape to formulate a winning strategy.",
    icon: <Search size={24} className="text-[#a855f7]" />
  },
  {
    step: "02",
    title: "UI/UX Design",
    desc: "Our designers craft beautiful, intuitive interfaces and prototypes that ensure a frictionless and engaging user experience.",
    icon: <PenTool size={24} className="text-[#a855f7]" />
  },
  {
    step: "03",
    title: "Development",
    desc: "We build scalable, high-performance architecture using modern technologies like Next.js, ensuring speed and reliability.",
    icon: <Code2 size={24} className="text-[#a855f7]" />
  },
  {
    step: "04",
    title: "Launch & Scale",
    desc: "Rigorous testing precedes deployment. Once live, we provide ongoing support and optimization to help you scale seamlessly.",
    icon: <Rocket size={24} className="text-[#a855f7]" />
  }
];

export const Process = () => {
  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden border-t border-[#222]" id="process">
      {/* Violet Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-r from-[#a855f7]/15 to-[#d946ef]/15 blur-[150px] pointer-events-none" />
      
      <div className="container relative z-10 px-6 lg:px-12 xl:px-24 mx-auto">
        <div className="text-center mb-24">
          <Reveal>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight mb-6">
              Our Process.
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto font-sans leading-relaxed">
              A transparent, collaborative methodology designed to turn your vision into reality without the typical agency friction.
            </p>
          </Reveal>
        </div>

        <div className="relative w-full mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processes.map((process, index) => (
              <Reveal key={index} delay={index * 0.15} direction="up" className="h-full">
                <div className="group relative h-full min-h-[400px] bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden hover:border-[#a855f7]/40 transition-all duration-500 shadow-xl p-8 flex flex-col justify-end cursor-pointer">
                  
                  {/* Subtle Background Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#a855f7]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* Icon Area - Top Left */}
                  <div className="absolute top-8 left-8 w-14 h-14 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white/50 group-hover:text-white group-hover:scale-110 group-hover:border-[#a855f7]/40 group-hover:bg-[#a855f7]/10 transition-all duration-500 shadow-xl">
                    {process.icon}
                  </div>
                  
                  {/* Phase Number - Massive Background Watermark */}
                  <div className="absolute top-4 right-4 font-display font-bold text-8xl text-white/[0.02] group-hover:text-[#a855f7]/10 transition-colors duration-500 select-none pointer-events-none">
                    {process.step}
                  </div>

                  {/* Content Area - Animated Reveal */}
                  <div className="relative z-10 flex flex-col gap-4">
                    <h3 className="text-2xl font-display font-semibold text-white group-hover:text-[#c084fc] transition-colors duration-300">
                      {process.title}
                    </h3>
                    
                    {/* The description is visible on mobile, but uses a slide-up reveal effect on desktop hover */}
                    <div className="overflow-hidden">
                      <p className="text-white/60 text-sm leading-relaxed tracking-wide font-sans lg:opacity-0 lg:translate-y-8 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 transition-all duration-500 ease-out">
                        {process.desc}
                      </p>
                    </div>
                  </div>

                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
