import { User, Users, Zap } from 'lucide-react';

function UseCases() {
  const cases = [
    {
      icon: <User size={32} />,
      title: "Solo Directors/Freelancers",
      desc: "Use our talent booking system to manage your projects solo."
    },
    {
      icon: <Zap size={32} />,
      title: "OTT, TV, Brands & Large Projects",
      desc: "The ultimate hiring platform for large-scale AI recruitment across seasons."
    },
    {
      icon: <Users size={32} />,
      title: "Casting Agencies",
      desc: "Synchronise your artist booking workflow across hiring platforms."
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
