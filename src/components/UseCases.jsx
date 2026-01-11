import { User, Users, Zap } from 'lucide-react';

function UseCases() {
  const cases = [
    {
      icon: <User size={32} />,
      title: "Casting Directors & Freelancers",
      desc: "The ultimate casting director software to manage your private talent vault and projects solo."
    },
    {
      icon: <Zap size={32} />,
      title: "OTT, TV, Brands & Studios",
      desc: "High-scale casting workflow automation for large projects, OTT series, and brand campaigns."
    },
    {
      icon: <Users size={32} />,
      title: "Talent Agencies & Production Houses",
      desc: "A complete agency management system to synchronise artist booking and talent representation."
    }
  ];

  return (
    <section id="use-cases" className="use-cases reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="text-gradient-primary">Casting Solutions Built for Growth</h2>
          <p className="section-subtitle">Designed for every casting journey in India.</p>
        </div>

        <div className="use-cases-grid-simple">
          {cases.map((c, i) => (
            <div key={i} className="use-case-card-simple">
              <div className="use-case-icon-simple">{c.icon}</div>
              <div className="use-case-content-simple">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UseCases;
