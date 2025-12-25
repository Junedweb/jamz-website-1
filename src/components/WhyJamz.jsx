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
      desc: "Let AI sort actors and read scripts for you."
    },
    {
      icon: <Brain size={24} />,
      title: "No More Stress",
      desc: "Easily find the right face for any role."
    },
    {
      icon: <Lock size={24} />,
      title: "Safe & Private",
      desc: "Your data is kept safe in a private lock."
    },
    {
      icon: <MessageSquareOff size={24} />,
      title: "Clean Dashboard",
      desc: "Keep all your chats in one easy place."
    },
    {
      icon: <Award size={24} />,
      title: "Professional Look",
      desc: "Show your work to clients in a nice way."
    },
    {
      icon: <Globe size={24} />,
      title: "Work Anywhere",
      desc: "Use JAMz from your office or on the film set."
    }
  ];

  return (
    <section className="why-jamz-section">
      <div className="container">
        <h2>Why people use JAMz</h2>
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