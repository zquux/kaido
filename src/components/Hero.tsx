import * as React from "react";
import Hls from "hls.js";
import { motion } from "motion/react";
import { Zap, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function Hero() {
  const videoUrl = "https://cpkrujvelvopfdtghrpr.supabase.co/storage/v1/object/public/weenkie/hf_20260404_191519_70977e15-0814-4f6f-80a9-4f3606dc9e29.mp4";

  return (
    <section className="relative w-full h-screen overflow-hidden bg-background flex items-center">
      {/* Background Video - Full Screen Cover */}
      <div className="absolute inset-0 z-10 pointer-events-none select-none overflow-hidden">
        <div className="absolute inset-0 z-10 bg-linear-to-b from-transparent via-transparent to-background" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover mix-blend-screen opacity-80"
          style={{ filter: 'contrast(1.1) brightness(1.1)' }}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </div>

      {/* Left-Aligned & Vertically Centered Content */}
      <div className="relative z-20 w-full px-6 md:px-12 lg:px-24">
        <div className="max-w-none w-full flex flex-col items-start mt-10 md:mt-20 ml-0 md:ml-10 lg:ml-20">
          {/* Headline - Massive sizes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] font-black tracking-tighter leading-[0.85] mb-6 text-left uppercase">
              <span className="block text-white">Beyond</span>
              <span className="block text-white">Ordinary</span>
              <span className="block text-white">Cars.</span>
            </h1>
            <p style={{ fontFamily: '"Playwrite IE", cursive' }} className="text-base sm:text-lg md:text-2xl text-white/80 max-w-2xl mb-10 text-left font-medium leading-relaxed">
              Step into a world of rare Japanese machines built for attention, captured for moments.
            </p>
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group relative inline-block"
          >
            <div className="absolute -inset-1 bg-white/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition duration-500" />
            <button className="group/btn relative overflow-hidden flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md glass-border text-white font-bold rounded-full hover:bg-white/20 transition-all duration-300 text-base shadow-[0_4px_30px_rgba(0,0,0,0.1)] uppercase tracking-wide">
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out bg-linear-to-r from-transparent via-white/40 to-transparent z-0" />
              <span className="relative z-10">Explore Cars</span>
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-iridescent relative z-10">
                <ArrowRight className="w-4 h-4 text-white" />
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
