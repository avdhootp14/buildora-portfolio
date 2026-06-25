"use client";

import { motion } from "framer-motion";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiTailwindcss, 
  SiFlutter, 
  SiFirebase, 
  SiMongodb, 
  SiNodedotjs, 
  SiExpress 
} from "react-icons/si";

const technologies = [
  { name: "React", icon: <SiReact className="text-[#61DAFB] text-xl" /> },
  { name: "Next.js", icon: <SiNextdotjs className="text-white text-xl" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6] text-xl" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E] text-xl rounded-sm" /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-[#06B6D4] text-xl" /> },
  { name: "Flutter", icon: <SiFlutter className="text-[#02569B] text-xl" /> },
  { name: "Firebase", icon: <SiFirebase className="text-[#FFCA28] text-xl" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-[#47A248] text-xl" /> },
  { name: "Node.js", icon: <SiNodedotjs className="text-[#339933] text-xl" /> },
  { name: "Express.js", icon: <SiExpress className="text-white text-xl" /> },
];

// Duplicate the array to create a seamless loop
const duplicatedTech = [...technologies, ...technologies, ...technologies];

export const TechStack = () => {
  return (
    <section className="py-20 bg-[#0a0a0a] border-y border-[#1a1a1a] overflow-hidden relative">
      <div className="container relative z-10 text-center mb-10">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/40">
          Powered By Modern Technologies
        </span>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Left and Right Fade Gradients */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap gap-6 py-4 items-center pl-6"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 25, // Adjust speed here
          }}
        >
          {duplicatedTech.map((tech, index) => (
            <div 
              key={index}
              className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#111] border border-[#222] text-white/70 font-medium transition-all hover:bg-white hover:text-black cursor-default group"
            >
              <span className="text-lg grayscale group-hover:grayscale-0">{tech.icon}</span>
              <span>{tech.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
