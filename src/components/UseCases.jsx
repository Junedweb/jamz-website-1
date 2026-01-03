import { User, Users, Zap } from 'lucide-react';

function UseCases() {
  const cases = [
    {
      icon: <User size={32} />,
      title: "Solo Directors",
      desc: "Get the output of a full team while working solo."
    },
    {
      icon: <Zap size={32} />,
      title: "OTT & Large Projects",
      desc: "Organise thousands of actors across seasons without the usual clutter."
    },
    {
      icon: <Users size={32} />,
      title: "Casting Studios",
      desc: "Keep your crew in sync and projects moving with clarity."
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
