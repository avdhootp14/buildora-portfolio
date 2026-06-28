"use client";

import { useState } from "react";
import { Reveal } from "./animations/Reveal";
import { Send, CheckCircle2, Calendar } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { API_URL } from "../utils/api";

export const Contact = () => {
  const [activeTab, setActiveTab] = useState<"message" | "meeting">("message");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    website: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      const res = await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          website: formData.website
        })
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ firstName: "", lastName: "", email: "", phone: "", message: "", website: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("idle");
        toast.error("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus("idle");
      toast.error("Failed to send message. Please check your connection.");
    }
  };

  const titleWords = "Let's Build Something".split(" ");

  return (
    <section id="contact" className="relative py-32 bg-[#111] overflow-hidden border-t border-[#222]">
      {/* Violet Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-[600px] bg-gradient-to-r from-[#a855f7]/10 to-[#d946ef]/10 blur-[150px] pointer-events-none" />
      <div className="container relative z-10 px-6 md:px-12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div className="flex flex-col relative z-10">
            <Reveal>
              <span className="inline-block py-1.5 px-4 rounded-full bg-[#1a1a1a] border border-[#333] text-xs uppercase tracking-[0.2em] font-semibold text-white/60 mb-6 w-max shadow-xl">
                Start a Conversation
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-medium text-white tracking-tight mb-6 leading-tight flex flex-wrap gap-x-4">
                {titleWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                  >
                    {word}
                  </motion.span>
                ))}
                <motion.span
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "backOut" }}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#d946ef] italic font-serif pr-2 block w-full mt-2"
                >
                  Extraordinary.
                </motion.span>
              </h2>
              <p className="text-lg text-white/50 font-sans leading-relaxed mb-12 max-w-md">
                Have a project in mind? Fill out the form or schedule a discovery call instantly. We'll discuss your goals and how we can help.
              </p>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center shrink-0 group-hover:border-[#a855f7]/50 group-hover:bg-[#a855f7]/10 transition-all duration-500 shadow-xl">
                    <span className="text-white/40 font-bold text-lg group-hover:text-[#c084fc] transition-colors">01</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg group-hover:text-[#c084fc] transition-colors">Discovery Call</h4>
                    <p className="text-white/40 text-sm mt-1">We'll discuss your goals and requirements.</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 group cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-[#1a1a1a] border border-[#333] flex items-center justify-center shrink-0 group-hover:border-[#a855f7]/50 group-hover:bg-[#a855f7]/10 transition-all duration-500 shadow-xl">
                    <span className="text-white/40 font-bold text-lg group-hover:text-[#c084fc] transition-colors">02</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg group-hover:text-[#c084fc] transition-colors">Proposal & Strategy</h4>
                    <p className="text-white/40 text-sm mt-1">You receive a tailored execution plan.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Form / Scheduler */}
          <Reveal delay={0.2} className="relative z-10 w-full">
            <div className="bg-[#0f0f0f] border border-[#222] rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group/card">
              
              {/* Inner Glow hidden by default, visible on hover over card */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-[#a855f7]/30 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
              
              {/* Tabs */}
              <div className="relative z-10 flex items-center gap-2 mb-10 bg-[#1a1a1a] p-1.5 rounded-2xl w-max mx-auto border border-[#333] shadow-inner">
                <button 
                  onClick={() => setActiveTab("message")}
                  suppressHydrationWarning
                  className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === "message" ? "bg-gradient-to-r from-[#a855f7] to-[#d946ef] text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]" : "text-white/50 hover:text-white"}`}
                >
                  <Send size={16} />
                  Send Message
                </button>
                <button 
                  onClick={() => setActiveTab("meeting")}
                  suppressHydrationWarning
                  className={`px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === "meeting" ? "bg-gradient-to-r from-[#a855f7] to-[#d946ef] text-white shadow-[0_0_20px_rgba(168,85,247,0.3)]" : "text-white/50 hover:text-white"}`}
                >
                  <Calendar size={16} />
                  Schedule Call
                </button>
              </div>

              {activeTab === "meeting" ? (
                <div className="relative z-10 flex flex-col min-h-[440px] animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex-1 w-full rounded-2xl overflow-hidden bg-[#0a0a0a] border border-[#222] flex items-center justify-center flex-col text-center p-8 shadow-inner group hover:border-[#a855f7]/30 transition-colors duration-500">
                    <div className="w-20 h-20 bg-[#1a1a1a] border border-[#333] rounded-full flex items-center justify-center mb-6 text-white/50 group-hover:text-[#c084fc] group-hover:scale-110 group-hover:bg-[#a855f7]/10 transition-all duration-500 shadow-xl">
                      <Calendar size={32} />
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-white mb-2">Book a Discovery Call</h3>
                    <p className="text-white/40 text-sm mb-10 max-w-xs leading-relaxed">
                      Pick a 30-minute slot that works best for you. We look forward to speaking with you!
                    </p>
                    <a href="https://calendly.com/k88t" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-white text-black font-semibold rounded-xl hover:scale-105 transition-transform duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                      Open Calendar
                    </a>
                  </div>
                </div>
              ) : status === "success" ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[440px] text-center animate-in fade-in zoom-in duration-500 bg-[#0a0a0a] border border-[#222] rounded-2xl">
                  <div className="w-24 h-24 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                    <CheckCircle2 size={48} className="text-green-400" />
                  </div>
                  <h3 className="text-3xl font-display font-semibold text-white mb-3">Message Sent!</h3>
                  <p className="text-white/50 text-lg">We'll be in touch with you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6 min-h-[440px] animate-in fade-in slide-in-from-left-4 duration-500">
                  
                  {/* Honeypot field */}
                  <div className="absolute opacity-0 -z-50 pointer-events-none" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
                    <label>Website</label>
                    <input 
                      type="text" 
                      name="website" 
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2.5 group">
                      <label className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold ml-1 group-focus-within:text-[#c084fc] transition-colors">First Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John"
                        suppressHydrationWarning
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full bg-[#050505] border border-[#222] rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a855f7]/50 focus:bg-[#0a0a0a] transition-all duration-300 shadow-inner"
                      />
                    </div>
                    <div className="flex flex-col gap-2.5 group">
                      <label className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold ml-1 group-focus-within:text-[#c084fc] transition-colors">Last Name</label>
                      <input 
                        type="text" 
                        placeholder="Doe"
                        suppressHydrationWarning
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full bg-[#050505] border border-[#222] rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a855f7]/50 focus:bg-[#0a0a0a] transition-all duration-300 shadow-inner"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2.5 group">
                      <label className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold ml-1 group-focus-within:text-[#c084fc] transition-colors">Work Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="john@company.com"
                        suppressHydrationWarning
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#050505] border border-[#222] rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a855f7]/50 focus:bg-[#0a0a0a] transition-all duration-300 shadow-inner"
                      />
                    </div>
                    <div className="flex flex-col gap-2.5 group">
                      <label className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold ml-1 group-focus-within:text-[#c084fc] transition-colors">Mobile Number</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="+1 (555) 000-0000"
                        suppressHydrationWarning
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-[#050505] border border-[#222] rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a855f7]/50 focus:bg-[#0a0a0a] transition-all duration-300 shadow-inner"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 group">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold ml-1 group-focus-within:text-[#c084fc] transition-colors">Project Details</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Tell us about your goals, timeline, and budget..."
                      suppressHydrationWarning
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-[#050505] border border-[#222] rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a855f7]/50 focus:bg-[#0a0a0a] transition-all duration-300 shadow-inner resize-none"
                    ></textarea>
                  </div>

                  <button 
                    disabled={status === "submitting"}
                    type="submit"
                    suppressHydrationWarning
                    className="group relative w-full h-14 mt-4 bg-gradient-to-r from-[#a855f7] to-[#d946ef] text-white font-semibold rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 disabled:opacity-70 disabled:hover:scale-100 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {status === "submitting" ? "Sending..." : "Send Message"} 
                      {status !== "submitting" && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
};
