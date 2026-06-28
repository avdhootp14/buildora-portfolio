"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { API_URL } from "../utils/api";

type Project = {
  _id: string;
  title: string;
  description: string;
  tag?: string;
  link?: string;
  imageUrl?: string;
};

// --- Individual Card Component ---
const ProjectCard = ({ 
  project, 
  index, 
  progress, 
  range, 
  targetScale 
}: { 
  project: Project, 
  index: number, 
  progress: MotionValue<number>, 
  range: number[], 
  targetScale: number 
}) => {
  const containerRef = useRef(null);
  
  // Local scroll for the image parallax effect as it enters the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.3, 1]);
  
  // Global scroll for scaling the card down when the next one overlays it
  const scale = useTransform(progress, range, [1, targetScale]);
  const opacity = useTransform(progress, range, [1, 0.5]);

  return (
    <>
      {/* Desktop Sticky Stack View */}
      <div ref={containerRef} className="hidden md:flex h-screen items-center justify-center sticky top-0">
        <motion.div 
          style={{ 
            scale, 
            opacity, 
            top: `calc(-5vh + ${index * 25}px)` 
          }}
          className="relative w-full max-w-7xl h-[85vh] mx-auto rounded-[3rem] overflow-hidden transform-origin-top shadow-2xl bg-[#0a0a0a] border border-white/10"
        >
          {/* Background Image with Parallax */}
          <motion.div 
            style={{ scale: imageScale }}
            className="absolute inset-0 w-full h-full"
          >
            {project.imageUrl ? (
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#111] flex items-center justify-center">
                <span className="text-white/20 font-bold text-2xl">No Image</span>
              </div>
            )}
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514]/80 via-transparent to-transparent pointer-events-none" />

          {/* Card Content */}
          <div className="absolute inset-0 p-12 lg:p-16 flex flex-col justify-between z-10 pointer-events-none">
            <div className="flex justify-between items-start">
              <div className="bg-black/50 backdrop-blur-xl border border-white/20 px-6 py-2.5 rounded-full pointer-events-auto hover:bg-white hover:text-black transition-colors duration-300 cursor-pointer">
                <span className="text-xs font-semibold uppercase tracking-widest text-inherit">
                  {project.tag || "Case Study"}
                </span>
              </div>
            </div>

            <div className="flex flex-row items-end justify-between gap-8 pointer-events-auto w-full">
              <div className="max-w-3xl">
                <span className="text-sm font-semibold text-white/60 block mb-4 tracking-wider uppercase">{project.description}</span>
                <h3 className="text-7xl lg:text-8xl font-sans font-bold text-white tracking-tighter leading-[0.9]">
                  {project.title}
                </h3>
              </div>
              
              <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="group bg-white text-black px-8 py-4 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors shrink-0 w-max flex items-center gap-2">
                Explore Project <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Normal List View */}
      <div className="md:hidden flex h-[60vh] w-full px-4 mb-8">
        <div className="relative w-full h-full mx-auto rounded-[2rem] overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/10">
          <div className="absolute inset-0 w-full h-full">
            {project.imageUrl ? (
              <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#111] flex items-center justify-center">
                <span className="text-white/20 font-bold text-2xl">No Image</span>
              </div>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0514]/80 via-transparent to-transparent pointer-events-none" />

          <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
            <div className="flex justify-between items-start">
              <div className="bg-black/50 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full pointer-events-auto">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-white">
                  {project.tag || "Case Study"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-6 pointer-events-auto w-full">
              <div>
                <span className="text-xs font-semibold text-white/60 block mb-2 tracking-wider uppercase line-clamp-1">{project.description}</span>
                <h3 className="text-4xl font-sans font-bold text-white tracking-tighter leading-none line-clamp-2">
                  {project.title}
                </h3>
              </div>
              
              <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-200 transition-colors shrink-0 w-max flex items-center gap-2">
                Explore Project <ArrowUpRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- Main Wrapper Component ---
export const Work = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  
  const containerRef = useRef(null);
  
  // Track the scroll progress of the entire Work section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${API_URL}/projects`);
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section ref={containerRef} className="bg-background relative" id="work">
      {/* Intro Header Section */}
      <div className="container px-6 md:px-12 mx-auto pt-32 pb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-foreground tracking-tighter"
          >
            Selected <br />
            <span className="font-display italic font-medium text-foreground/50">Works.</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a href="#" className="inline-flex items-center gap-2 px-8 py-3 bg-transparent text-foreground border border-foreground/20 font-medium rounded-full hover:bg-foreground hover:text-background transition-all duration-300">
              View Archive <ArrowUpRight size={18} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Heavy Scroll Sticky Stack Gallery */}
      {loading ? (
        <div className="flex justify-center py-32 h-screen items-start">
          <div className="w-8 h-8 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="relative mt-8 md:pb-[10vh]">
          {projects.map((project, index) => {
            // Calculate scale parameters for the sticky effect
            const targetScale = 1 - ((projects.length - index) * 0.03); // Next cards compress the previous ones
            const range = [index * (1 / projects.length), 1];
            
            return (
              <ProjectCard 
                key={project._id} 
                project={project} 
                index={index} 
                progress={scrollYProgress} 
                range={range}
                targetScale={targetScale}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};
