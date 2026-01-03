import { User, Users, Zap } from 'lucide-react';

function UseCases() {
  const cases = [
    {
      icon: <User size={32} />,
      title: "Solo Directors",
      desc: "JAMz is your productivity partner—achieve the results of a full team on your own."
    },
    {
      icon: <Zap size={32} />,
      title: "OTT & Large Projects",
      desc: "Organize thousands of actors across multiple seasons without the endless clutter."
    },
    {
      icon: <Users size={32} />,
      title: "Casting Studios",
      desc: "Stay in sync with your crew. Lead your team with clarity and confidence on every project."
    }
  ];

  return (
    <section id="use-cases" className="use-cases reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="text-gradient-primary">Casting Solutions Built for Growth</h2>
          <p className="section-subtitle">Custom solutions for every casting journey in India.</p>
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
