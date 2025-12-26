import React from 'react';
import { X, Shield, FileText, Info, Briefcase } from 'lucide-react';

function InfoModal({ isOpen, onClose, type }) {
  if (!isOpen) return null;

  const getContent = () => {
    switch (type) {
      case 'about':
        return {
          title: 'About Us',
          icon: <Info className="icon-gold" size={32} />,
          body: (
            <div className="info-content">
              <p>JAMZ is an AI-powered casting and talent management platform built to simplify how the entertainment industry discovers, manages, and collaborates with talent.</p>
              <p>We bring actors, acting schools, and casting directors onto a single, structured platform — replacing scattered files, WhatsApp forwards, and outdated spreadsheets with intelligent workflows and smart matching.</p>
              <h3>Our focus is simple:</h3>
              <ul>
                <li>Reduce friction in casting</li>
                <li>Improve talent visibility without noise</li>
                <li>Help creative professionals spend less time managing data and more time making decisions</li>
              </ul>
              <p>JAMZ is built with an AI-first, mobile-first, and India-first mindset, designed to scale with the evolving needs of the entertainment ecosystem.</p>
            </div>
          )
        };
      case 'careers':
        return {
          title: 'Careers',
          icon: <Briefcase className="icon-gold" size={32} />,
          body: (
            <div className="info-content">
              <p>At JAMZ, we’re building the future infrastructure of casting and talent discovery.</p>
              <p>We’re a small, driven team working at the intersection of technology, media, and creativity. If you enjoy solving real-world problems, moving fast, and building products that creators actually use — you’ll fit right in.</p>
              <h3>We value:</h3>
              <ul>
                <li>Ownership over hierarchy</li>
                <li>Clarity over chaos</li>
                <li>Execution over noise</li>
              </ul>
              <div className="contact-box">
                <p>If you’re interested in working with us, write to:</p>
                <a href="mailto:support@jamzconnect.com" className="email-link">📩 support@jamzconnect.com</a>
                <p className="hint">(Include what you’re good at — not just your resume.)</p>
              </div>
            </div>
          )
        };
      case 'privacy':
        return {
          title: 'Privacy Policy',
          icon: <Shield className="icon-gold" size={32} />,
          body: (
            <div className="info-content">
              <p>Your privacy matters to us.</p>
              <p>JAMZ collects only the information required to provide our services effectively. This may include personal details shared through forms, profiles, or platform usage.</p>
              <h3>We commit to:</h3>
              <ul>
                <li>Using data only for platform-related purposes</li>
                <li>Never selling personal data to third parties</li>
                <li>Implementing reasonable security measures to protect stored information</li>
              </ul>
              <p>By using JAMZ, you consent to the collection and use of information in accordance with this policy.</p>
              <div className="contact-box">
                <p>For any privacy-related concerns, contact us at:</p>
                <a href="mailto:privacy@jamzconnect.com" className="email-link">📩 privacy@jamzconnect.com</a>
              </div>
            </div>
          )
        };
      case 'terms':
        return {
          title: 'Terms of Service',
          icon: <FileText className="icon-gold" size={32} />,
          body: (
            <div className="info-content">
              <p>By accessing or using JAMZ, you agree to comply with these Terms of Service.</p>
              <p>JAMZ provides tools and services intended to support casting, talent management, and content showcasing. Users are responsible for the accuracy of the information they submit and the content they upload.</p>
              <h3>We reserve the right to:</h3>
              <ul>
                <li>Modify or discontinue services at any time</li>
                <li>Restrict access in cases of misuse or violation of terms</li>
                <li>Update these terms as the platform evolves</li>
              </ul>
              <p>Use of JAMZ is at your own discretion and risk. Continued use of the platform constitutes acceptance of any updates to these terms.</p>
              <div className="contact-box">
                <p>For questions regarding terms, reach us at:</p>
                <a href="mailto:support@jamzconnect.com" className="email-link">📩 support@jamzconnect.com</a>
              </div>
            </div>
          )
        };
      default:
        return null;
    }
  };

  const content = getContent();
  if (!content) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="info-modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="info-modal-header">
          {content.icon}
          <h2>{content.title}</h2>
        </div>
        
        <div className="info-modal-body">
          {content.body}
        </div>
      </div>
    </div>
  );
}

export default InfoModal;
