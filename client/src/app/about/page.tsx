"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Team } from "../../components/Team";
import { ArrowRight, Code2, Cpu, Globe2, Palette, Smartphone, Zap, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function AboutPage() {
  const [showFuture, setShowFuture] = useState(false);
  return (
    <main className="pt-32 pb-24 bg-background min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex flex-col justify-center mb-32 -mt-32 pt-32 pb-24 border-b border-white/5 overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60" style={{ backgroundImage: "url('/about-bg-minimal.png')" }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        </div>

        <div className="container px-6 md:px-12 mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Headline */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-[1px] bg-white/30" />
              <span className="text-sm font-semibold tracking-widest uppercase text-white/50">Who We Are</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-[6rem] font-display font-bold text-foreground tracking-tighter leading-[0.9]"
            >
              We engineer <br />
              <span className="italic font-medium text-foreground/50">digital</span> excellence.
            </motion.h1>
          </div>
          
          {/* Right Column: Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-6 text-lg md:text-xl lg:text-2xl text-foreground/80 font-display leading-relaxed tracking-wide"
          >
            <p>
              Weblinq is an <strong className="text-white">exclusive, high-impact digital agency</strong> run by just <strong>two passionate people</strong>. We design and develop premium websites, build robust mobile applications, and provide comprehensive website audits.
            </p>
            <p>
              By keeping our team small, we cut out the bloat. We ensure absolute pixel-perfection and direct, clear communication on every single project we take on.
            </p>
            
            <div className="mt-4">
              <button 
                onClick={() => setShowFuture(!showFuture)}
                className="group flex items-center justify-between w-full p-6 bg-[#111] hover:bg-white/10 border border-white/10 rounded-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#a855f7]/20 transition-all">
                    <Globe2 size={18} className="text-white group-hover:text-[#a855f7] transition-colors" />
                  </div>
                  <span className="text-white font-bold text-lg">Looking to the Future</span>
                </div>
                <motion.div
                  animate={{ rotate: showFuture ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} className="text-white/50 group-hover:text-white transition-colors" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {showFuture && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-gradient-to-br from-[#1a0b2e]/50 to-[#050505] border border-[#a855f7]/30 rounded-2xl backdrop-blur-xl">
                      <p className="text-base text-foreground/80 leading-relaxed">
                        We are actively expanding our horizons. Very soon, we will be launching full-suite <strong className="text-white">Marketing</strong>, <strong className="text-white">Social Media Management</strong>, and <strong className="text-white">Brand Collaborations</strong> to offer complete, end-to-end growth for our clients beyond just code and design.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

      {/* 2. Our Mission Statement */}
      <section className="bg-[#050505] border-y border-white/5 py-32 mb-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#a855f7] rounded-full mix-blend-screen filter blur-[200px] opacity-10 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        
        <div className="container px-6 md:px-12 mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight mb-6">
                Bridging the gap between <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#00c6ff]">aesthetics</span> and <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00c6ff] to-[#d946ef]">performance.</span>
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-6 text-foreground/70 text-lg leading-relaxed"
            >
              <p>
                Most agencies treat design and development as two separate worlds. At Weblinq, they are one and the same. We believe that breathtaking UI means nothing if the underlying architecture is slow, and robust code is wasted on a poor user experience.
              </p>
              <p>
                Our mission is to eliminate that compromise. We build end-to-end solutions where every micro-interaction is polished, and every backend query is optimized for scale.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Deep Dive: What we actually do (Bento Grid) */}
      <section className="container px-6 md:px-12 mx-auto mb-32">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Our Core Capabilities</h2>
          <p className="text-foreground/50 text-lg max-w-2xl">A comprehensive look at the technologies and disciplines we master to bring your vision to life.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Capability 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-[#111] border border-white/5 p-10 rounded-3xl hover:border-white/20 transition-colors"
          >
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8">
              <Code2 className="text-[#a855f7]" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Modern Web Architecture</h3>
            <p className="text-foreground/60 mb-6 max-w-lg">
              We specialize in the React ecosystem. From highly interactive SPAs to SEO-optimized server-side rendered applications, we architect frontends that are blazingly fast and infinitely scalable.
            </p>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map(tech => (
                <span key={tech} className="px-4 py-2 bg-white/5 rounded-full text-xs font-semibold uppercase tracking-wider">{tech}</span>
              ))}
            </div>
          </motion.div>

          {/* Capability 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-[#111] border border-white/5 p-10 rounded-3xl hover:border-white/20 transition-colors"
          >
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8">
              <Smartphone className="text-[#00c6ff]" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Mobile Development</h3>
            <p className="text-foreground/60 mb-6">
              Native-feeling mobile experiences compiled for iOS and Android from a single robust codebase using Flutter and Firebase.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Flutter', 'Firebase', 'Dart', 'Provider'].map(tech => (
                <span key={tech} className="px-4 py-2 bg-white/5 rounded-full text-xs font-semibold uppercase tracking-wider">{tech}</span>
              ))}
            </div>
          </motion.div>

          {/* Capability 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-[#111] border border-white/5 p-10 rounded-3xl hover:border-white/20 transition-colors"
          >
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8">
              <Palette className="text-[#d946ef]" size={28} />
            </div>
            <h3 className="text-2xl font-bold mb-4">UI/UX & Branding</h3>
            <p className="text-foreground/60 mb-6">
              We design digital products that look premium and feel intuitive. We obsess over micro-interactions and typography.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Figma', 'Prototyping', 'Design Systems'].map(tech => (
                <span key={tech} className="px-4 py-2 bg-white/5 rounded-full text-xs font-semibold uppercase tracking-wider">{tech}</span>
              ))}
            </div>
          </motion.div>

          {/* Capability 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-gradient-to-br from-[#1a0b2e] to-[#050505] border border-white/10 p-10 rounded-3xl hover:border-[#a855f7]/50 transition-colors relative overflow-hidden group"
          >
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full filter blur-[80px] group-hover:bg-[#a855f7]/20 transition-colors duration-700" />
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                <Cpu className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Backend & Cloud Infrastructure</h3>
              <p className="text-foreground/60 mb-6 max-w-lg">
                We build secure, scalable backend architectures capable of handling millions of requests. From robust REST APIs to real-time WebSockets and complex database optimization.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'PostgreSQL', 'MongoDB', 'AWS', 'Redis'].map(tech => (
                  <span key={tech} className="px-4 py-2 bg-white/10 rounded-full text-xs font-semibold uppercase tracking-wider">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. Our Values */}
      <section className="container px-6 md:px-12 mx-auto mb-32">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              num: "01",
              title: "Pixel Perfection",
              desc: "We don't do 'good enough'. Every margin, padding, and animation is scrutinized until it matches the design perfectly."
            },
            {
              num: "02",
              title: "Direct Communication",
              desc: "No bloated project management layers. You speak directly with the engineers and designers building your product."
            },
            {
              num: "03",
              title: "Built for Scale",
              desc: "We architect solutions not just for your launch day, but for the millions of users you plan to acquire."
            }
          ].map((value, i) => (
            <motion.div 
              key={value.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-[#111] p-10 rounded-3xl border border-white/5 hover:border-[#a855f7]/50 hover:bg-[#151515] hover:-translate-y-2 transition-all duration-500 group"
            >
              <div className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white/20 to-white/5 mb-6 group-hover:from-[#a855f7] group-hover:to-[#00c6ff] transition-all duration-700">
                {value.num}
              </div>
              <h4 className="text-2xl font-display font-bold mb-4 group-hover:text-white transition-colors">{value.title}</h4>
              <p className="text-foreground/60 leading-relaxed text-lg">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Team Section */}
      <div className="mt-24 bg-[#050505] py-24 border-t border-white/5">
        <Team />
      </div>
    </main>
  );
}
