import { User, Users, Zap } from 'lucide-react';

function UseCases() {
  const cases = [
    {
      icon: <User size={32} />,
      title: "Solo Casting Directors",
      desc: "Replacing manual sheets and WhatsApp chaos with a unified dashboard for vault management, role tracking, and instant client approvals."
    },
    {
      icon: <Zap size={32} />,
      title: "Production & Showrunners",
      desc: "Tracking dozens of speaking roles and chemistry tests in a single live view to streamline high-volume OTT and film casting."
    },
    {
      icon: <Users size={32} />,
      title: "Talent Agencies",
      desc: "Syncing availability, contracts, and payments directly with casting briefs for a seamless agency-to-director workflow."
    }
  ];

  return (
    <section id="use-cases" className="use-cases reveal">
      <div className="container">
        <div className="section-header">
          <h2 className="text-gradient-primary">Early Partner Requirements</h2>
          <p className="section-subtitle">Core features requested by the directors and agencies piloting our first release.</p>
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
