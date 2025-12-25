function CTA({ onCtaClick }) {
  return (
    <section className="cta-section">
      <div className="bg-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.1, background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="cta-title">Give your casting team the best tools</h2>
        <p className="cta-subtitle">
          Join other casting directors and acting schools who use JAMz to make their daily work easier.
        </p>
        <div className="cta-group">
          <a href="#" className="btn-primary" onClick={onCtaClick}>Book a Private Demo</a>
          <a href="#" className="btn-secondary" onClick={onCtaClick}>Request Access</a>
        </div>
      </div>
    </section>
  );
}

export default CTA;