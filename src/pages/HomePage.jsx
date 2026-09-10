import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Solutions } from '../components/Solutions';
import { InteractiveDashboardShowcase } from '../components/InteractiveDashboardShowcase';
import { Pillars } from '../components/Pillars';
import { TrustCarousel } from '../components/TrustCarousel';
import { WhyUs } from '../components/WhyUs';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export const HomePage = () => {
  return (
    <div className="min-h-screen bg-orbit-dark text-slate-100 selection:bg-orbit-blue selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Solutions />
        <InteractiveDashboardShowcase />
        <Pillars />
        <TrustCarousel />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
