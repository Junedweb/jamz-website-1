function CTA({ onCtaClick }) {
  return (
    <section className="cta-section">
      <div className="bg-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.1, background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="cta-title">Provide the Best Tools to Your Casting Team</h2>
        <p className="cta-subtitle">
          Join the community of creators and acting schools using JAMz to make their daily work easier.
        </p>
        <div className="cta-group">
          <a href="#" className="btn-primary" onClick={onCtaClick}>Join Waitlist</a>
          <a href="#" className="btn-secondary" onClick={() => onCtaClick('suggestion')}>Share Suggestions</a>
        </div>
      </div>
    </section>
  );
}

export default CTA;