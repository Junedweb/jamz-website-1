import { User, Users, Zap } from 'lucide-react';

function UseCases() {
  const cases = [
    {
      icon: <User size={32} />,
      title: "Solo Film Casting Director, Mumbai",
      desc: "Has shared detailed requirements for managing a private vault, live role tracking and cleaner client approvals. Currently waiting for JAMz to replace manual sheets and WhatsApp threads with one organised dashboard."
    },
    {
      icon: <Zap size={32} />,
      title: "OTT Series Production And Showrunner Team",
      desc: "In early conversations, they outlined the need to track dozens of speaking roles, auditions and chemistry tests in a single live view. They are awaiting the first JAMz release to pilot this workflow once the application is ready."
    },
    {
      icon: <Users size={32} />,
      title: "Talent And Artist Management Agency",
      desc: "Has expressed the need for a shared system for availability, contracts and payments that connects directly to casting briefs. They are on the early access list and are waiting for the initial JAMz deployment."
    }
  ];

  return (
    <section id="use-cases" className="use-cases reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="text-gradient-primary">What Early Partners Need From JAMz</h2>
          <p className="section-subtitle">Based on requirements shared by agencies, solo directors and production teams who are awaiting the first release.</p>
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
