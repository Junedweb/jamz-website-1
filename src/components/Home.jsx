import React, { useState } from 'react';
import Header from './Header';
import HowItWorks from './HowItWorks';
import ValueProp from './ValueProp';
import Features from './Features';
import DashboardPreview from './DashboardPreview';
import UseCases from './UseCases';
import WhyJamz from './WhyJamz';
import CTA from './CTA';
import Footer from './Footer';
import LeadForm from './LeadForm';
import FortuneTeller from './FortuneTeller';
import InfoModal from './InfoModal';

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infoModal, setInfoModal] = useState({ isOpen: false, type: null });

  const openModal = (e) => {
    if (e) e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const openInfoModal = (type) => {
    setInfoModal({ isOpen: true, type });
  };

  const closeInfoModal = () => {
    setInfoModal({ isOpen: false, type: null });
  };

  return (
    <div className="home-wrapper">
      <Header onCtaClick={openModal} />
      <HowItWorks onCtaClick={openModal} />
      <ValueProp onCtaClick={openModal} />
      <Features onCtaClick={openModal} />
      <DashboardPreview onCtaClick={openModal} />
      <UseCases onCtaClick={openModal} />
      <WhyJamz onCtaClick={openModal} />
      <CTA onCtaClick={openModal} />
      <Footer onCtaClick={openModal} onInfoClick={openInfoModal} />
      
      <LeadForm isOpen={isModalOpen} onClose={closeModal} />
      <InfoModal 
        isOpen={infoModal.isOpen} 
        onClose={closeInfoModal} 
        type={infoModal.type} 
      />
      <FortuneTeller />
    </div>
  );
}

export default Home;