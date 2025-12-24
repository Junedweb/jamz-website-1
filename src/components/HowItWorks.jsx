import { FileText, Search, UserCheck } from 'lucide-react';

function HowItWorks({ onCtaClick }) {
  const steps = [
    {
      number: "1",
      color: "#2563eb", // Blue
      title: "Upload Script",
      desc: "AI extracts character requirements instantly."
    },
    {
      number: "2",
      color: "#10b981", // Green
      title: "Get Matches",
      desc: "Ranked talent from your pool with scores."
    },
    {
      number: "3",
      color: "#f97316", // Orange
      title: "Make Decisions",
      desc: "Review top candidates and cast faster."
    }
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <h2>Casting as easy as 1-2-3</h2>
        <h1 className="section-headline-blue">with JAMz AI</h1>
        
        <p className="section-subtext">
          AI analyzes your script instantly. Smart matching from your talent pool with fitment scores.
        </p>
        <p className="section-focus">
          Focus on creative decisions, not administrative work.
        </p>
        
        <p style={{ color: '#64748b', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
          Need external talent? Outsource seamlessly while keeping all casting details organized for your workflow.
        </p>

        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-number-circle" style={{ backgroundColor: s.color }}>
                {s.number}
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem' }}>
          <a href="#" className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 600 }} onClick={onCtaClick}>
            See How It Works
          </a>
          <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.85rem' }}>
            Trusted by casting professionals across India
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;