"use client";

import { motion } from "framer-motion";

const teamMembers = [
  {
    name: "Atharva",
    role: "Strategy & Growth Lead",
    image: "/atharv.png"
  },
  {
    name: "Avdhoot",
    role: "Lead Digital Architect",
    image: "/avdhoot.png"
  }
];

export const Team = () => {
  return (
    <section className="relative py-32 bg-[#050505] border-t border-[#222]" id="team">
      {/* Violet Background Glow */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-r from-[#a855f7]/15 to-[#d946ef]/15 blur-[150px] pointer-events-none" />
      <div className="container relative z-10 px-6 md:px-12 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-[1.1] mb-6"
            >
              Meet the <br />
              <span className="italic text-muted">Minds.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-foreground/60 text-lg max-w-md"
            >
              A small, highly focused team of designers and engineers building premium digital experiences.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-4xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-[#0a0a0a] mb-8 border border-white/5 group-hover:border-[#a855f7]/40 transition-colors duration-500">
                <div className="absolute inset-0 bg-gradient-to-t from-[#a855f7]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-display font-semibold text-foreground mb-1 group-hover:text-[#c084fc] transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-foreground/50 text-sm">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
