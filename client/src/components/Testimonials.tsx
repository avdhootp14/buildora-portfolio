"use client";

import { Quote } from "lucide-react";
import { Reveal } from "./animations/Reveal";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Weblinq didn't just build a website; they transformed our digital presence. Our conversion rate increased by 140% in the first month alone.",
    author: "Sarah Jenkins",
    role: "CMO, Vanguard FinTech",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop"
  },
  {
    quote: "The attention to detail and level of craftsmanship is unmatched. They understood our vision perfectly and delivered beyond expectations.",
    author: "Marcus Chen",
    role: "Founder, Luminary AI",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop"
  },
  {
    quote: "Working with this team felt like having an in-house luxury design studio. They are incredibly responsive, deeply talented, and genuinely care.",
    author: "Elena Rodriguez",
    role: "Director, Oya Kekars",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop"
  }
];

export const Testimonials = () => {
  return (
    <section className="py-32 bg-[#050505] overflow-hidden relative">
      {/* Violet Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[400px] bg-gradient-to-r from-[#a855f7]/15 to-[#d946ef]/15 blur-[150px] pointer-events-none" />
      <div className="container relative z-10 px-6 mx-auto">
        <div className="text-center mb-24">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/50 mb-4 block">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight">
              Client Stories.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Reveal key={index} delay={index * 0.15} direction="up" className="h-full">
              <motion.div 
                whileHover={{ y: -5 }}
                className="flex flex-col h-full bg-[#0a0a0a] p-10 rounded-2xl border border-white/5 hover:border-[#a855f7]/40 shadow-xl relative group transition-colors duration-500"
              >
                <Quote size={40} className="text-[#a855f7]/30 absolute top-8 right-8 group-hover:text-[#a855f7]/80 transition-colors duration-500" />
                
                <p className="text-white/70 font-serif italic text-lg leading-relaxed mb-8 flex-grow relative z-10">
                  "{testimonial.quote}"
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#333]">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.author}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-bold font-display">{testimonial.author}</h4>
                    <p className="text-white/40 text-sm font-sans">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
