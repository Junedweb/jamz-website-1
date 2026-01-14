import { User, Users, Zap } from 'lucide-react';

function CTA({ onCtaClick }) {
  return (
    <section className="cta-section">
      <div className="bg-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.1, background: 'radial-gradient(circle, var(--primary) 0%, transparent 70%)' }}></div>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="cta-title">Ready To See JAMz For Your Next Casting?</h2>
        <p className="cta-subtitle">
          Book a walkthrough tailored to your workflow and get early access pricing for your team or agency.
        </p>
        <div className="cta-group">
          <a href="#" className="btn-primary" onClick={onCtaClick}>Talk To Sales</a>
          <a href="#" className="btn-secondary" onClick={() => onCtaClick('suggestion')}>Share Product Feedback</a>
        </div>
      </div>
    </section>
  );
}

export default CTA;
