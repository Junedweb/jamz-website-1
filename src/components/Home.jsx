import React, { useState } from 'react';
import Header from './Header';
import HowItWorks from './HowItWorks';
import ValueProp from './ValueProp';
import Features from './Features';
import UseCases from './UseCases';
import WhyJamz from './WhyJamz';
import CTA from './CTA';
import Footer from './Footer';
import LeadForm from './LeadForm';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (e) => {
    if (e) e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="home-wrapper">
      <Header onCtaClick={openModal} />
      <HowItWorks onCtaClick={openModal} />
      <ValueProp onCtaClick={openModal} />
      <Features onCtaClick={openModal} />
      <UseCases onCtaClick={openModal} />
      <WhyJamz onCtaClick={openModal} />
      <CTA onCtaClick={openModal} />
      <Footer onCtaClick={openModal} />
      
      <LeadForm isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}

export default Home;