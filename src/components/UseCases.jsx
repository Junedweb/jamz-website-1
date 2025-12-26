import { User, Users, Zap } from 'lucide-react';

function UseCases() {
  const cases = [
    {
      icon: <User size={32} />,
      title: "Solo Casting Director",
      desc: "Manage your entire talent database and projects without a dedicated coordinator.",
      highlighted: false
    },
    {
      icon: <Zap size={32} />,
      title: "High-Volume OTT",
      desc: "Scale for large ensemble casts with automated breakdowns and structured tracking.",
      highlighted: true
    },
    {
      icon: <Users size={32} />,
      title: "Casting Team",
      desc: "Collaborate across assistants with clear logs, shared notes, and permission levels.",
      highlighted: false
    }
  ];

  return (
    <section id="use-cases" className="use-cases reveal">
      <div className="container">
        <h2 className="text-gradient-primary" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>Built for your scale</h2>
        <div className="use-cases-grid">
          {cases.map((c, i) => (
            <div key={i} className={`case-card ${c.highlighted ? 'highlighted' : ''}`}>
              <div style={{ color: c.highlighted ? 'var(--accent)' : 'var(--primary)', marginBottom: '1rem' }}>
                {c.icon}
              </div>
              <h3>{c.title}</h3>
              <p style={{ marginBottom: 0 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UseCases;