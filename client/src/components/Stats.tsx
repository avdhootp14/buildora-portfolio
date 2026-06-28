"use client";

import { Reveal } from "./animations/Reveal";

export const Stats = () => {
  return (
    <div className="relative py-16 mt-[-4rem] z-20">
      <div className="container relative z-10 px-6 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 sm:divide-x divide-white/10 p-8 rounded-3xl bg-[#111] border border-[#222] shadow-2xl">
          <Reveal delay={0.1} direction="up" className="flex flex-col items-center text-center px-4">
            <span className="text-4xl md:text-5xl font-display font-bold text-white mb-2">1</span>
            <span className="text-xs tracking-widest uppercase text-white/50 font-semibold">Project Delivered</span>
          </Reveal>

          <Reveal delay={0.2} direction="up" className="flex flex-col items-center text-center px-4">
            <span className="text-4xl md:text-5xl font-display font-bold text-white mb-2">100%</span>
            <span className="text-xs tracking-widest uppercase text-white/50 font-semibold">Custom Built</span>
          </Reveal>

          <Reveal delay={0.3} direction="up" className="flex flex-col items-center text-center px-4">
            <span className="text-4xl md:text-5xl font-display font-bold text-white mb-2">End</span>
            <span className="text-xs tracking-widest uppercase text-white/50 font-semibold">To End Service</span>
          </Reveal>

          <Reveal delay={0.4} direction="up" className="flex flex-col items-center text-center px-4">
            <span className="text-4xl md:text-5xl font-display font-bold text-white mb-2">24/7</span>
            <span className="text-xs tracking-widest uppercase text-white/50 font-semibold">Support & Maintenance</span>
          </Reveal>
        </div>
      </div>
    </div>
  );
};
