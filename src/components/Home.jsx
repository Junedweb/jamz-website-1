import React, { useState, useEffect } from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Features from './Features';
import DashboardPreview from './DashboardPreview';
import UseCases from './UseCases';
import WhyJamz from './WhyJamz';
import CTA from './CTA';
import Footer from './Footer';
import LeadForm from './LeadForm';
import FortuneTeller from './FortuneTeller';
import InfoModal from './InfoModal';
import SideDecorations from './SideDecorations';

function Home() {
  const [modalConfig, setModalConfig] = useState({ isOpen: false, type: 'waitlist' });
  const [infoModal, setInfoModal] = useState({ isOpen: false, type: null });

  useEffect(() => {
    const reveal = () => {
      const reveals = document.querySelectorAll('.reveal');
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        }
      }
    };

    window.addEventListener('scroll', reveal);
    // Initial check
    reveal();
    
    return () => window.removeEventListener('scroll', reveal);
  }, []);

  const openModal = (type = 'waitlist') => {
    // If it's a synthetic event, default to 'waitlist'
    const actualType = typeof type === 'string' ? type : 'waitlist';
    setModalConfig({ isOpen: true, type: actualType });
  };

  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  const openInfoModal = (type) => {
    setInfoModal({ isOpen: true, type });
  };

  const closeInfoModal = () => {
    setInfoModal({ isOpen: false, type: null });
  };

  return (
    <div className="home-wrapper">
      <Navbar onCtaClick={openModal} />
      <SideDecorations />
      <Header onCtaClick={openModal} />
      <Features onCtaClick={openModal} />
      <DashboardPreview onCtaClick={openModal} />
      <UseCases onCtaClick={openModal} />
      <WhyJamz onCtaClick={openModal} />
      <CTA onCtaClick={openModal} />
      <Footer onCtaClick={openModal} onInfoClick={openInfoModal} />
      
      <LeadForm isOpen={modalConfig.isOpen} onClose={closeModal} type={modalConfig.type} />
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