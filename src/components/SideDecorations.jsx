import React, { useEffect, useState, useRef } from 'react';

const SideDecorations = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const glowRef = useRef(null);

  const sections = [
    { id: 'hero', label: 'Top' },
    { id: 'features', label: 'Features' },
    { id: 'dashboard', label: 'App Demo' },
    { id: 'use-cases', label: 'Impact' },
    { id: 'why-jamz', label: 'About' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Texture & Overlays */}
      <div className="noise-overlay"></div>
      <div className="bg-grid"></div>
      <div ref={glowRef} className="mouse-glow"></div>

      {/* Background Blobs */}
      <div className="bg-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
        <div className="blob blob-3"></div>
        <div className="blob blob-4"></div>
        <div className="blob blob-5"></div>
      </div>

      {/* Floating Side Elements (Visible on Ultra-wide) */}
      <div className="side-elements">
        <div className="floating-card floating-card-1">
          <div className="card-icon">✨</div>
          <div className="card-info">
            <h4>AI Efficiency</h4>
            <p>70% Faster</p>
          </div>
        </div>
        
        <div className="floating-card floating-card-2">
          <div className="card-icon">💎</div>
          <div className="card-info">
            <h4>Casting Quality</h4>
            <p>Top Tier</p>
          </div>
        </div>

        <div className="floating-card floating-card-3">
          <div className="card-icon">⚡</div>
          <div className="card-info">
            <h4>Processing</h4>
            <p>Real-time</p>
          </div>
        </div>

        <div className="floating-card" style={{ top: '80%', left: '50px', animationDelay: '-2s' }}>
          <div className="card-icon">🤝</div>
          <div className="card-info">
            <h4>Support</h4>
            <p>24/7 Experts</p>
          </div>
        </div>
      </div>

      {/* Side Navigation */}
      <nav className="side-nav">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`nav-dot ${activeSection === section.id ? 'active' : ''}`}
            data-label={section.label}
            onClick={() => scrollToSection(section.id)}
          />
        ))}
      </nav>
    </>
  );
};

export default SideDecorations;
