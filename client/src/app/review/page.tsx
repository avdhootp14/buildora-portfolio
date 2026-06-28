"use client";

import { useState } from "react";
import { Send, CheckCircle2, Star } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { API_URL } from "@/utils/api";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function ReviewPage() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [formData, setFormData] = useState({
    clientName: "",
    clientRole: "",
    quote: "",
    rating: 5
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    try {
      const res = await fetch(`${API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ clientName: "", clientRole: "", quote: "", rating: 5 });
      } else {
        setStatus("idle");
        toast.error("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error sending review:", error);
      setStatus("idle");
      toast.error("Failed to submit review. Please check your connection.");
    }
  };

  return (
    <main className="min-h-screen bg-background pt-32 selection:bg-[#a855f7]/30">
      <Navbar />
      
      <section className="relative py-20 overflow-hidden">
        {/* Violet Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-r from-[#a855f7]/15 to-[#d946ef]/15 blur-[150px] pointer-events-none" />
        
        <div className="container relative z-10 px-6 md:px-12 mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <span className="inline-block py-1.5 px-4 rounded-full bg-[#1a1a1a] border border-[#333] text-xs uppercase tracking-[0.2em] font-semibold text-white/60 mb-6 shadow-xl">
              Client Feedback
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight mb-6">
              Rate your <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#d946ef]">experience.</span>
            </h1>
            <p className="text-lg text-white/50 font-sans max-w-xl mx-auto">
              Your feedback is incredibly valuable to us. Please share your thoughts on the project we delivered!
            </p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0f0f0f] border border-[#222] rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden group/card"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] text-center animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-green-500/10 border border-green-500/30 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                  <CheckCircle2 size={48} className="text-green-400" />
                </div>
                <h3 className="text-3xl font-display font-semibold text-white mb-3">Thank You!</h3>
                <p className="text-white/50 text-lg">Your review has been successfully submitted and helps us grow.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
                
                {/* Rating Stars */}
                <div className="flex flex-col items-center gap-4">
                  <label className="text-sm uppercase tracking-[0.2em] text-white/40 font-semibold">Overall Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        className={`transition-all duration-300 ${formData.rating >= star ? 'text-yellow-400 scale-110 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]' : 'text-[#333] hover:text-yellow-400/50'}`}
                      >
                        <Star size={40} fill={formData.rating >= star ? "currentColor" : "none"} strokeWidth={1.5} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2.5 group">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold ml-1 group-focus-within:text-[#c084fc] transition-colors">Your Name</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Jane Doe"
                      value={formData.clientName}
                      onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                      className="w-full bg-[#050505] border border-[#222] rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a855f7]/50 focus:bg-[#0a0a0a] transition-all duration-300 shadow-inner"
                    />
                  </div>
                  <div className="flex flex-col gap-2.5 group">
                    <label className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold ml-1 group-focus-within:text-[#c084fc] transition-colors">Role / Company (Optional)</label>
                    <input 
                      type="text" 
                      placeholder="CEO at Luminary AI"
                      value={formData.clientRole}
                      onChange={(e) => setFormData({...formData, clientRole: e.target.value})}
                      className="w-full bg-[#050505] border border-[#222] rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a855f7]/50 focus:bg-[#0a0a0a] transition-all duration-300 shadow-inner"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 group">
                  <label className="text-[11px] uppercase tracking-[0.2em] text-white/40 font-semibold ml-1 group-focus-within:text-[#c084fc] transition-colors">Your Review</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="Tell us what you thought about working with Weblinq..."
                    value={formData.quote}
                    onChange={(e) => setFormData({...formData, quote: e.target.value})}
                    className="w-full bg-[#050505] border border-[#222] rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-[#a855f7]/50 focus:bg-[#0a0a0a] transition-all duration-300 shadow-inner resize-none"
                  ></textarea>
                </div>

                <button 
                  disabled={status === "submitting"}
                  type="submit"
                  className="group relative w-full h-14 mt-4 bg-gradient-to-r from-[#a855f7] to-[#d946ef] text-white font-semibold rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 disabled:opacity-70 disabled:hover:scale-100 shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {status === "submitting" ? "Submitting..." : "Submit Review"} 
                    {status !== "submitting" && <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
