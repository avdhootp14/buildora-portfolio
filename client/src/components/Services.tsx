"use client";

import { MonitorSmartphone, LayoutTemplate, Smartphone, Gauge } from "lucide-react";
import { Reveal } from "./animations/Reveal";
import { motion } from "framer-motion";

const services = [
  {
    title: "Web Development",
    desc: "Lightning-fast, highly scalable web applications built with modern frameworks like Next.js and React.",
    icon: <MonitorSmartphone size={32} className="text-white" />
  },
  {
    title: "UI/UX Design",
    desc: "Beautiful, intuitive interfaces that guide users effortlessly toward conversion.",
    icon: <LayoutTemplate size={32} className="text-white" />
  },
  {
    title: "Mobile Apps",
    desc: "Cross-platform mobile experiences that feel native, built with Flutter.",
    icon: <Smartphone size={32} className="text-white" />
  },
  {
    title: "Performance Optimization",
    desc: "We audit and rebuild existing platforms to achieve 99+ Lighthouse scores.",
    icon: <Gauge size={32} className="text-white" />
  }
];

export const Services = () => {
  return (
    <section className="relative py-32 bg-[#0a0a0a] overflow-hidden" id="services">
      <div className="container relative z-10 px-6 lg:px-12 xl:px-24 mx-auto">
        
        {/* Centered Heading Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/50 mb-4 block">
              Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight mb-6">
              What We Do.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg text-white/50 font-sans leading-relaxed">
              We don't offer everything. We specialize in four core pillars of digital product creation and execute them flawlessly.
            </p>
          </Reveal>
        </div>

        {/* Simple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Reveal key={index} delay={index * 0.1} direction="up">
              <motion.div 
                whileHover={{ y: -5 }}
                className="group h-full bg-[#111] rounded-2xl border border-[#222] flex flex-col p-8 transition-colors duration-300 hover:border-white/20 hover:bg-[#151515]"
              >
                <div className="w-16 h-16 rounded-xl bg-[#1a1a1a] flex items-center justify-center border border-[#333] mb-8 transition-transform duration-500 group-hover:scale-110">
                  {service.icon}
                </div>
                
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/60 font-sans leading-relaxed text-lg">
                    {service.desc}
                  </p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
