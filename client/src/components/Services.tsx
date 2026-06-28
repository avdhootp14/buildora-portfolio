"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Sparkles, MonitorSmartphone, ShoppingBag, Smartphone, Code2, PenTool, Activity } from "lucide-react";

const Hover3DCard = ({ service, index }: { service: any, index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // 3D Tilt Effect Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-[#0a0a0a] border border-white/5 rounded-[2rem] p-8 hover:bg-[#0f0f0f] transition-colors duration-500 flex flex-col h-full min-h-[420px] shadow-2xl"
    >
      {/* Intense Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#a855f7]/10 via-transparent to-[#00c6ff]/10 group-hover:from-[#a855f7]/30 group-hover:to-[#00c6ff]/20 transition-colors duration-700 opacity-100 rounded-[2rem] pointer-events-none" />
      
      {/* Top: Glassy Icon Graphic */}
      <div 
        style={{ transform: "translateZ(40px)" }}
        className="relative z-10 pointer-events-none w-full mb-10"
      >
        <div className="relative w-28 h-28 flex items-center justify-center transition-transform duration-700 ease-out group-hover:-translate-y-2 mx-auto md:mx-0">
          {/* Glass backdrop */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-[1.5rem] backdrop-blur-xl border border-white/10 group-hover:border-[#a855f7]/50 transition-colors duration-500 shadow-2xl" />
          <div className="absolute inset-1.5 bg-[#111]/90 rounded-2xl shadow-inner border border-black/50" />
          
          <service.icon 
            size={36} 
            strokeWidth={1.5} 
            className="text-white/60 group-hover:text-white drop-shadow-2xl z-10 transition-colors duration-500" 
          />
        </div>
      </div>

      {/* Bottom: Text Content */}
      <div 
        style={{ transform: "translateZ(30px)" }}
        className="relative z-10 flex-1 flex flex-col border-t border-white/5 pt-8 group-hover:border-[#a855f7]/40 transition-colors duration-500 text-center md:text-left"
      >
        <span className="text-[11px] font-bold tracking-[0.2em] text-foreground/40 block mb-4 font-sans group-hover:text-[#00c6ff] transition-colors">{service.num}</span>
        
        <h3 className="text-2xl font-syne font-bold text-foreground mb-4">{service.title}</h3>
        
        <ul className="text-sm text-foreground/50 leading-relaxed group-hover:text-foreground/80 transition-colors duration-300 space-y-2">
          {service.desc.map((point: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-[#a855f7] mt-1 text-[10px]">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

const services = [
  {
    num: "/01",
    title: "Website Development",
    icon: Code2,
    desc: [
      "Next.js & React ecosystems",
      "Robust Node.js & Express backends",
      "End-to-end TypeScript architecture"
    ]
  },
  {
    num: "/02",
    title: "Website Audits",
    icon: Activity,
    desc: [
      "SEO & ranking optimization",
      "Deep UI/UX heuristic evaluation",
      "Performance & speed tuning"
    ]
  },
  {
    num: "/03",
    title: "UI/UX Design",
    icon: PenTool,
    desc: [
      "Pixel-perfect interface design",
      "Interactive prototyping",
      "Brand identity & design systems"
    ]
  },
  {
    num: "/04",
    title: "Mobile Apps",
    icon: Smartphone,
    desc: [
      "Native iOS and Android",
      "Fluid 60fps user experiences",
      "Cross-platform scalability"
    ]
  }
];

export const Services = () => {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden" id="services" style={{ perspective: 1000 }}>
      {/* Stronger background glow to tie into the Hero's violet lighting */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] bg-gradient-to-b from-[#a855f7]/25 via-[#d946ef]/15 to-transparent blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#00c6ff]/10 blur-[150px] pointer-events-none" />

      <div className="container px-6 md:px-12 mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12 mb-24 border-b border-white/5 pb-16">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-[#111] border border-white/10 px-4 py-2 rounded-full w-max shadow-xl">
              <Sparkles size={14} className="text-[#a855f7]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-white/70">Our Services</span>
            </div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl lg:text-7xl font-sans font-bold text-foreground leading-[1.1]"
            >
              <span className="font-display italic font-medium pr-3 tracking-tight text-white/50">What</span>We Do
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-foreground/60 max-w-sm lg:text-right font-medium leading-relaxed"
          >
            We craft digital experiences from idea to launch — blending strategy, design, and engineering to build products that perform.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Hover3DCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
