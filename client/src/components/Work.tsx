"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./animations/Reveal";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Oya Kekars",
    tag: "E-Commerce Web App",
    desc: "A premium luxury cake ordering platform built for Pune's most beloved European bakery.",
    url: "https://oya-kekars.vercel.app/",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Vanguard FinTech",
    tag: "Mobile App",
    desc: "A completely redesigned mobile banking experience prioritizing speed and user trust.",
    url: "#",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff0f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    title: "Luminary AI",
    tag: "SaaS Platform",
    desc: "A cutting-edge generative AI dashboard tailored for enterprise marketing teams.",
    url: "#",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop"
  }
];

export const Work = () => {
  return (
    <section className="py-32 bg-[#111] border-t border-[#222]" id="work">
      <div className="container relative z-10 px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/50 mb-4 block">
                Selected Work
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight">
                Our Showcase.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-[#0a0a0a] text-white border border-[#222] font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300">
              View All Projects <ArrowUpRight size={18} />
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Reveal key={index} delay={index * 0.1} direction="up" className="h-full">
              <motion.div 
                whileHover={{ y: -5 }}
                className="group relative flex flex-col h-full bg-[#0a0a0a] rounded-2xl border border-[#222] overflow-hidden shadow-xl"
              >
                <div className="relative h-64 overflow-hidden bg-[#1a1a1a]">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-black font-semibold rounded-full shadow-lg hover:scale-105 transition-transform duration-300">
                      Visit Website
                    </a>
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <span className="text-xs uppercase tracking-widest text-white/50 font-semibold mb-3">
                    {project.tag}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-white/60 font-sans leading-relaxed flex-grow">
                    {project.desc}
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
