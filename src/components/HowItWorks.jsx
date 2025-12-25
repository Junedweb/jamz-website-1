import { FileText, Search, UserCheck } from 'lucide-react';

function HowItWorks({ onCtaClick }) {
  const steps = [
    {
      number: "1",
      icon: <FileText size={24} />,
      color: "#2563eb", // Blue
      title: "Upload Script",
      desc: "AI extracts character requirements instantly."
    },
    {
      number: "2",
      icon: <Search size={24} />,
      color: "#10b981", // Green
      title: "Get Matches",
      desc: "Ranked talent from your pool with scores."
    },
    {
      number: "3",
      icon: <UserCheck size={24} />,
      color: "#f97316", // Orange
      title: "Make Decisions",
      desc: "Review top candidates and cast faster."
    }
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <h2>Casting simplified</h2>
        
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div key={i} className="step-card">
              <div className="step-icon-circle" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                {s.icon}
                <div className="step-badge" style={{ backgroundColor: s.color }}>{s.number}</div>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <a href="#" className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 600 }} onClick={onCtaClick}>
            Get Started →
          </a>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;