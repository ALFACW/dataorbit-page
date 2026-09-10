import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ChevronRight } from 'lucide-react';
import { HeroCanvas } from './HeroCanvas';
import { HeroInteractiveCore } from './HeroInteractiveCore';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-[#05080E] via-orbit-dark to-[#090E1A]">
      
      {/* Background Synaptic Particle Mesh Canvas */}
      <HeroCanvas />

      {/* Background Radial Glow Spheres */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-orbit-blue/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-indigo-600/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Value Proposition */}
          <div className="lg:col-span-7 text-center lg:text-left flex flex-col items-center lg:items-start">
            
            {/* Main Headline (Reducido de tamaño a petición del usuario) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-2xl sm:text-4xl lg:text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.2]"
            >
              Transformamos tus{' '}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400 font-black">
                datos
                <span className="absolute left-0 bottom-1 w-full h-[4px] bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full blur-[2px] opacity-80" />
              </span>{' '}
              en decisiones estratégicas que impulsan tu negocio
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-5 text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal"
            >
              Extraemos el verdadero valor de tus datos mediante análisis avanzados, automatización y modelos predictivos. 
              Optimizamos procesos, reducimos la incertidumbre y transformamos la información en estrategias claras y accionables.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            >
              <a
                href="#contacto"
                className="w-full sm:w-auto relative group overflow-hidden px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-white bg-gradient-to-r from-orbit-blue via-blue-600 to-indigo-600 shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-all duration-300 hover:shadow-[0_0_45px_rgba(59,130,246,0.6)] hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Contáctanos
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <a
                href="#soluciones"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-sm sm:text-base text-slate-200 glass-panel border border-slate-700/60 hover:border-slate-500 hover:text-white transition-all duration-300 hover:bg-slate-800/50 text-center"
              >
                Explorar Soluciones
              </a>
            </motion.div>

          </div>

          {/* Right Side: Interactive 3D Holographic Orbit Core Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="w-full relative"
            >
              <HeroInteractiveCore />
            </motion.div>
          </div>

        </div>

        {/* Scroll Indicator Down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 sm:mt-16 flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => {
            const el = document.getElementById('soluciones');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="w-10 h-10 rounded-full glass-panel border border-slate-700/80 flex items-center justify-center text-slate-400 group-hover:text-orbit-blue-glow group-hover:border-orbit-blue/50 transition-all duration-300 group-hover:scale-110 shadow-lg">
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
