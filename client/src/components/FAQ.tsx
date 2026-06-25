"use client";

import { useState } from "react";
import { Reveal } from "./animations/Reveal";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is your typical project timeline?",
    answer: "Most web development projects take between 4 to 8 weeks from discovery to launch. Mobile apps typically require 8 to 12 weeks depending on complexity. We provide a detailed timeline during the proposal phase."
  },
  {
    question: "Do you provide ongoing support after launch?",
    answer: "Yes, we offer comprehensive maintenance retainers. This includes priority bug fixes, security updates, server monitoring, and monthly strategy calls to ensure your product continues to scale."
  },
  {
    question: "What technologies do you specialize in?",
    answer: "Our core stack is Next.js and React for web applications, and Flutter for mobile apps. We also heavily utilize TypeScript, Tailwind CSS, Node.js, and Supabase/Firebase for backend architecture."
  },
  {
    question: "How do you handle project pricing?",
    answer: "We prefer transparent, value-based flat-fee pricing rather than hourly billing. Once we understand your requirements during the discovery call, we provide a fixed quote so there are no surprise costs."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-32 bg-[#111] border-y border-[#222]">
      <div className="container relative z-10 px-6 mx-auto">
        <div className="text-center mb-20">
          <Reveal>
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/50 mb-4 block">
              Common Questions
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight">
              What to Expect.
            </h2>
          </Reveal>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <Reveal key={index} delay={index * 0.1} direction="up">
                <motion.div 
                  className={`border ${isOpen ? 'border-white/20 bg-[#1a1a1a]' : 'border-[#222] bg-[#0a0a0a] hover:border-white/10'} rounded-2xl overflow-hidden transition-colors duration-300`}
                >
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left px-8 py-6 flex items-center justify-between focus:outline-none"
                  >
                    <span className="font-display font-semibold text-lg text-white pr-8">
                      {faq.question}
                    </span>
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors duration-300 ${isOpen ? 'border-white text-white bg-white/5' : 'border-[#333] text-white/40'}`}>
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-8 pb-6 text-white/60 font-sans leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
