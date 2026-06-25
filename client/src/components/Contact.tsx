"use client";

import { useState } from "react";
import { Reveal } from "./animations/Reveal";
import { Send, CheckCircle2, Calendar } from "lucide-react";

export const Contact = () => {
  const [activeTab, setActiveTab] = useState<"message" | "meeting">("message");
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus("success");
    // Reset after 5 seconds to allow another message
    setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <section className="relative py-32 bg-[#0a0a0a] border-t border-[#1a1a1a]" id="contact">
      <div className="container relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text */}
          <div className="flex flex-col">
            <Reveal>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-white/50 mb-4 block">
                Start a Conversation
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight mb-6 leading-tight">
                Let's Build Something <br className="hidden md:block"/>
                <span className="italic font-serif text-white/50">Extraordinary.</span>
              </h2>
              <p className="text-lg text-white/50 font-sans leading-relaxed mb-10 max-w-md">
                Have a project in mind? Fill out the form or schedule a discovery call instantly. We'll discuss your goals and how we can help.
              </p>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#111] border border-[#222] flex items-center justify-center shrink-0">
                    <span className="text-white/40 font-bold text-lg">01</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Discovery Call</h4>
                    <p className="text-white/40 text-sm mt-1">We'll discuss your goals and requirements.</p>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-full bg-[#111] border border-[#222] flex items-center justify-center shrink-0">
                    <span className="text-white/40 font-bold text-lg">02</span>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-lg">Proposal & Strategy</h4>
                    <p className="text-white/40 text-sm mt-1">You receive a tailored execution plan.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Form / Scheduler */}
          <Reveal delay={0.2}>
            <div className="bg-[#111] border border-[#222] rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              {/* Tabs */}
              <div className="relative z-10 flex items-center gap-2 mb-8 bg-[#1a1a1a] p-1.5 rounded-2xl w-max mx-auto border border-[#222]">
                <button 
                  onClick={() => setActiveTab("message")}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === "message" ? "bg-white text-black shadow-lg" : "text-white/50 hover:text-white"}`}
                >
                  <Send size={16} />
                  Send Message
                </button>
                <button 
                  onClick={() => setActiveTab("meeting")}
                  className={`px-5 py-2.5 rounded-xl font-medium text-sm transition-all duration-300 flex items-center gap-2 ${activeTab === "meeting" ? "bg-white text-black shadow-lg" : "text-white/50 hover:text-white"}`}
                >
                  <Calendar size={16} />
                  Schedule Call
                </button>
              </div>

              {activeTab === "meeting" ? (
                <div className="relative z-10 flex flex-col min-h-[440px] animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex-1 w-full rounded-xl overflow-hidden bg-[#0a0a0a] border border-[#222] flex items-center justify-center flex-col text-center p-8 shadow-inner">
                    <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-6 text-white/50">
                      <Calendar size={32} />
                    </div>
                    <h3 className="text-xl font-display font-semibold text-white mb-2">Book a Discovery Call</h3>
                    <p className="text-white/40 text-sm mb-8 max-w-xs">
                      Pick a 30-minute slot that works best for you. We look forward to speaking with you!
                    </p>
                    <a href="https://calendly.com/" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white text-black font-semibold rounded-xl hover:scale-105 transition-transform duration-300">
                      Open Calendar
                    </a>
                  </div>
                </div>
              ) : status === "success" ? (
                <div className="flex flex-col items-center justify-center h-full min-h-[440px] text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-green-900/20 border border-green-900/50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={48} className="text-green-500" />
                  </div>
                  <h3 className="text-3xl font-display font-semibold text-white mb-3">Message Sent!</h3>
                  <p className="text-white/50 text-lg">We'll be in touch with you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-6 min-h-[440px] animate-in fade-in slide-in-from-left-4 duration-500">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold ml-1">First Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="John"
                        className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-all duration-300"
                      />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <label className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold ml-1">Last Name</label>
                      <input 
                        type="text" 
                        placeholder="Doe"
                        className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-all duration-300"
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2.5">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold ml-1">Work Email</label>
                    <input 
                      required
                      type="email" 
                      placeholder="john@company.com"
                      className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-all duration-300"
                    />
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold ml-1">Project Details</label>
                    <textarea 
                      required
                      rows={4}
                      placeholder="Tell us about your goals, timeline, and budget..."
                      className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-white/40 transition-all duration-300 resize-none"
                    ></textarea>
                  </div>

                  <button 
                    disabled={status === "submitting"}
                    type="submit"
                    className="group relative w-full h-14 mt-2 bg-white text-black font-semibold rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 disabled:opacity-70 disabled:hover:scale-100"
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
