import React, { useEffect, useState, useRef } from 'react';

const sections = [
  { id: 'hero', label: 'Top' },
  { id: 'features', label: 'Features' },
  { id: 'dashboard', label: 'App Demo' },
  { id: 'use-cases', label: 'Impact' },
  { id: 'why-jamz', label: 'About' }
];

const SideDecorations = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const glowRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    let rafId;
    const handleMouseMove = (e) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        if (glowRef.current) {
          // Center the 800x800 glow by subtracting 400px
          glowRef.current.style.transform = `translate3d(${e.clientX - 400}px, ${e.clientY - 400}px, 0)`;
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
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
