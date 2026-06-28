"use client";

import { Quote } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { Reveal } from "./animations/Reveal";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { API_URL } from "@/utils/api";

type Review = {
  _id: string;
  clientName: string;
  clientRole: string;
  quote: string;
  rating: number;
};

const defaultReview: Review = {
  _id: "default",
  clientName: "Oya Kekars",
  clientRole: "@oyakekars_3jewels",
  quote: "Thank you so much team Weblinq! 🙌 You guys did an incredible job bringing our vision to life. The site looks amazing and so premium! Highly recommend these talented folks. ✨🍰",
  rating: 5
};

export const Testimonials = () => {
  const [reviews, setReviews] = useState<Review[]>([defaultReview]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`${API_URL}/reviews`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setReviews(data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, []);

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

        <div className={reviews.length === 1 ? "max-w-2xl mx-auto" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"}>
          {reviews.map((testimonial, index) => (
            <Reveal key={testimonial._id} delay={index * 0.15} direction="up" className="h-full">
              <motion.div 
                whileHover={{ y: -5 }}
                className="flex flex-col h-full bg-[#0a0a0a] p-10 rounded-2xl border border-white/5 hover:border-[#a855f7]/40 shadow-xl relative group transition-colors duration-500"
              >
                <Quote size={40} className="text-[#a855f7]/30 absolute top-8 right-8 group-hover:text-[#a855f7]/80 transition-colors duration-500" />
                
                <p className="text-white/70 font-serif italic text-xl leading-relaxed mb-8 flex-grow relative z-10">
                  &quot;{testimonial.quote}&quot;
                </p>
                
                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 shrink-0 rounded-full overflow-hidden border border-[#333] bg-gradient-to-tr from-[#a855f7] to-[#d946ef] flex items-center justify-center text-white font-bold text-xl uppercase">
                    {testimonial.clientName.charAt(0)}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-white font-bold font-display text-lg truncate">{testimonial.clientName}</h4>
                    {testimonial.clientRole && (
                      <p className="text-[#a855f7] text-sm font-sans flex items-center gap-1.5 mt-0.5 truncate">
                        {testimonial.clientRole.includes('@') && <FaInstagram size={14} className="shrink-0" />}
                        <span className="truncate">{testimonial.clientRole}</span>
                      </p>
                    )}
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
