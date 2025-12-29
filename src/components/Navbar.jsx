import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const Navbar = ({ onCtaClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'App Demonstration', href: '#dashboard' },
    { name: 'Impact', href: '#use-cases' },
    { name: 'About', href: '#why-jamz' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
      <div className="container navbar-container">
        <div className="nav-logo">
          <div className="logo-icon">
            <Zap size={24} fill="var(--accent)" color="var(--accent)" />
          </div>
          <span className="logo-text">JAM<span className="text-accent">z</span></span>
        </div>

        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
          <button className="btn-primary nav-cta" onClick={onCtaClick}>
            Book Demo
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="mobile-toggle" onClick={toggleMobileMenu} aria-label="Toggle menu">
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-links">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button className="btn-primary mobile-cta" onClick={() => {
            setIsMobileMenuOpen(false);
            onCtaClick();
          }}>
            Book Demo
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
