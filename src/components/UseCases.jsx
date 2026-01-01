import { User, Users, Zap } from 'lucide-react';

function UseCases() {
  const cases = [
    {
      icon: <User size={32} />,
      title: "Solo Directors",
      desc: "JAMz is your solo power enhancer—get the strength of 5 people with just you."
    },
    {
      icon: <Zap size={32} />,
      title: "OTT & Large Projects",
      desc: "Manage 1000+ talent profiles across multiple seasons without the manual chaos."
    },
    {
      icon: <Users size={32} />,
      title: "Casting Studios",
      desc: "Keep your entire team aligned. Senior directors stay in total control of every project."
    }
  ];

  return (
    <section id="use-cases" className="use-cases reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="text-gradient-primary">Casting Solutions Built for Growth</h2>
          <p className="section-subtitle">Tailored workflows for every scale of talent management in India.</p>
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
