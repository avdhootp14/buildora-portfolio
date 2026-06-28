"use client";

import { useState } from "react";
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
    <section id="faq" className="relative py-32 bg-[#050505] border-t border-[#222] overflow-hidden">
      {/* Violet Background Glow */}
      <div className="absolute bottom-0 right-0 w-full max-w-3xl h-[500px] bg-gradient-to-r from-[#a855f7]/15 to-[#d946ef]/15 blur-[150px] pointer-events-none" />
      <div className="container relative z-10 px-6 md:px-12 mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">
          
          <div className="md:w-1/3">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-[1.1] mb-6"
            >
              Common <br />
              <span className="italic text-muted">Questions.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-foreground/60"
            >
              Everything you need to know about how we work, pricing, and our process.
            </motion.p>
          </div>

          <div className="md:w-2/3 border-t border-[#222]">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="border-b border-[#222]"
                >
                  <button 
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full text-left py-8 flex items-center justify-between focus:outline-none group"
                    suppressHydrationWarning
                  >
                    <span className="font-display font-semibold text-xl md:text-2xl text-foreground pr-8 group-hover:text-[#c084fc] transition-colors duration-300">
                      {faq.question}
                    </span>
                    <span className={`flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#c084fc]' : 'text-foreground/50'} group-hover:text-[#c084fc]`}>
                      {isOpen ? <Minus size={20} strokeWidth={2} /> : <Plus size={20} strokeWidth={2} />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 text-foreground/60 font-sans leading-relaxed max-w-2xl">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
