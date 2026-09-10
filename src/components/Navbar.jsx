import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Soluciones', href: '/#soluciones' },
    { name: '¿Por qué nosotros?', href: '/#por-que-nosotros' },
    { name: 'Casos de éxito', href: '/#casos-exito' },
    { name: 'Contacto', href: '/#contacto' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3 shadow-2xl shadow-blue-950/20' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Official DataOrbit Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src="/logos/l_do_blanco_2.svg"
              alt="DataOrbit Logo"
              className="h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors duration-200 hover:scale-105 transform"
              >
                {link.name}
              </a>
            ))}

            {/* EduOrbit Link - Compact & Balanced Badge */}
            <Link
              to="/eduorbit"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/40 text-indigo-200 hover:text-white text-xs font-semibold hover:border-indigo-400/80 transition-all duration-300 group shadow-[0_0_12px_rgba(99,102,241,0.2)]"
            >
              <img
                src="/logos/Eduview 360 blanco_v2.png"
                alt="EduOrbit 360"
                className="h-4 max-h-4 w-auto object-contain group-hover:scale-105 transition-transform"
              />
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            </Link>
          </nav>

          {/* Action CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="/#contacto"
              className="relative group overflow-hidden px-5 py-2 rounded-full font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-orbit-blue to-indigo-600 hover:from-blue-600 hover:to-indigo-500 shadow-lg shadow-blue-600/25 transition-all duration-300 hover:shadow-blue-500/40 hover:-translate-y-0.5"
            >
              <span className="relative z-10 flex items-center gap-2">
                Hablar con un Experto
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center gap-3">
            <Link
              to="/eduorbit"
              className="px-2.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/40 text-indigo-300 text-xs font-medium flex items-center gap-1.5"
            >
              <img src="/logos/Eduview 360 blanco_v2.png" alt="EduOrbit 360" className="h-3.5 max-h-3.5 w-auto object-contain" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-b border-slate-800 px-6 py-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-slate-200 hover:text-orbit-blue-light transition-colors py-2 border-b border-slate-800/50"
                >
                  {link.name}
                </a>
              ))}
              <Link
                to="/eduorbit"
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-indigo-300 flex items-center gap-2 py-2 border-b border-slate-800/50"
              >
                <img src="/logos/Eduview 360 blanco_v2.png" alt="EduOrbit 360" className="h-4 max-h-4 w-auto object-contain" />
              </Link>
              <a
                href="/#contacto"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center py-3 rounded-full font-semibold text-white bg-orbit-blue shadow-lg shadow-blue-600/30"
              >
                Contáctanos
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
