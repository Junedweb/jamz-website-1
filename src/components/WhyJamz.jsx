import { 
  Clock, 
  Brain, 
  Lock, 
  MessageSquareOff, 
  Award, 
  Globe 
} from 'lucide-react';

function WhyJamz() {
  const reasons = [
    {
      icon: <Clock size={24} />,
      title: "Save 40+ Hours",
      desc: "Automate script breakdowns and talent sorting."
    },
    {
      icon: <Brain size={24} />,
      title: "Eliminate Fatigue",
      desc: "Instantly recall the 'perfect face' from your memory."
    },
    {
      icon: <Lock size={24} />,
      title: "Private & Secure",
      desc: "Your data is kept in a secure, private vault."
    },
    {
      icon: <MessageSquareOff size={24} />,
      title: "Reduce Clutter",
      desc: "Centralize all communication in one dashboard."
    },
    {
      icon: <Award size={24} />,
      title: "Professional Workflow",
      desc: "Impress clients with polished casting presentations."
    },
    {
      icon: <Globe size={24} />,
      title: "Access Anywhere",
      desc: "Access your database from the studio or the set."
    }
  ];

  return (
    <section className="why-jamz-section">
      <div className="container">
        <h2>Built for your business</h2>
        <div className="why-cards-container">
          {reasons.map((r, i) => (
            <div key={i} className="why-card">
              <div className="why-card-icon">
                {r.icon}
              </div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyJamz;