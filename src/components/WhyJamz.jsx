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
      desc: "Automate manual script breakdowns per project. Let AI handle the heavy lifting while you focus on casting."
    },
    {
      icon: <Brain size={24} />,
      title: "Eliminate Fatigue",
      desc: "Use AI-powered talent recall to find that 'perfect face' from your memory instantly."
    },
    {
      icon: <Lock size={24} />,
      title: "Private & Secure",
      desc: "Keep your talent pool organized in a private, secure vault. Your data, your rules."
    },
    {
      icon: <MessageSquareOff size={24} />,
      title: "Reduce Clutter",
      desc: "Say goodbye to fragmented WhatsApp chats. Centralize all communication in one dashboard."
    },
    {
      icon: <Award size={24} />,
      title: "Professional Workflow",
      desc: "Impress high-budget OTT and Film clients with polished, organized casting presentations."
    },
    {
      icon: <Globe size={24} />,
      title: "Access Anywhere",
      desc: "Your entire database in your pocket. Access talent profiles from the studio or the set."
    }
  ];

  return (
    <section className="why-jamz-section">
      <div className="container">
        <h2>Why top teams choose JAMz</h2>
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