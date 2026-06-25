"use client";

import { Reveal } from "./animations/Reveal";
import { motion } from "framer-motion";
import { Search, PenTool, Code2, Rocket } from "lucide-react";

const processes = [
  {
    step: "01",
    title: "Discovery & Strategy",
    desc: "We start by deeply understanding your business goals, target audience, and market landscape to formulate a winning strategy.",
    icon: <Search size={24} className="text-[#8b5cf6]" />
  },
  {
    step: "02",
    title: "UI/UX Design",
    desc: "Our designers craft beautiful, intuitive interfaces and prototypes that ensure a frictionless and engaging user experience.",
    icon: <PenTool size={24} className="text-[#8b5cf6]" />
  },
  {
    step: "03",
    title: "Development",
    desc: "We build scalable, high-performance architecture using modern technologies like Next.js, ensuring speed and reliability.",
    icon: <Code2 size={24} className="text-[#8b5cf6]" />
  },
  {
    step: "04",
    title: "Launch & Scale",
    desc: "Rigorous testing precedes deployment. Once live, we provide ongoing support and optimization to help you scale seamlessly.",
    icon: <Rocket size={24} className="text-[#8b5cf6]" />
  }
];

export const Process = () => {
  return (
    <section className="relative py-32 bg-[#111] overflow-hidden border-t border-[#222]" id="process">
      <div className="container relative z-10 px-6 mx-auto">
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

        <div className="relative max-w-5xl mx-auto">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-[3rem] left-8 w-[calc(100%-4rem)] h-[1px] bg-white/10" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-8">
            {processes.map((process, index) => (
              <Reveal key={index} delay={index * 0.15} direction="up" className="relative group">
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                  <div className="w-24 h-24 rounded-full bg-[#0a0a0a] border-4 border-[#111] flex items-center justify-center mb-8 z-10 text-white/50 group-hover:text-white transition-colors duration-500 shadow-xl">
                    {process.icon}
                  </div>
                  
                  <h3 className="text-2xl font-display font-bold text-white mb-4 flex flex-col gap-2">
                    <span className="text-white/30 text-sm font-sans tracking-widest uppercase">Phase {process.step}</span>
                    {process.title}
                  </h3>
                  
                  <p className="text-white/50 leading-relaxed font-sans text-sm">
                    {process.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
