import React from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { WhyNow } from '../components/WhyNow';
import { Solutions } from '../components/Solutions';
import { AiInAction } from '../components/AiInAction';
import { WhatWeBuild } from '../components/WhatWeBuild';
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
        <WhyNow />
        <Solutions />
        <AiInAction />
        <WhatWeBuild />
        <TrustCarousel />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};
