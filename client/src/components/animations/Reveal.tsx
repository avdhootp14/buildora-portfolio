"use client";

import { motion } from "framer-motion";

export const Reveal = ({ 
  children, 
  delay = 0, 
  className = "",
  direction = "up"
}: { 
  children: React.ReactNode, 
  delay?: number, 
  className?: string,
  direction?: "up" | "down" | "left" | "right" | "none"
}) => {
  const getVariants = () => {
    switch(direction) {
      case "up": return { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } };
      case "down": return { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } };
      case "left": return { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } };
      case "right": return { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } };
      case "none": return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    }
  };

  const variants = getVariants();

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};
