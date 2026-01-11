import { 
  Clock, 
  Brain, 
  Lock, 
  MessageSquare, 
  Award, 
  Globe,
  Layout,
  Zap,
  ShieldCheck,
  Users
} from 'lucide-react';

function WhyJamz() {
  const reasons = [
    {
      icon: <Clock size={24} />,
      title: "Do More of What You Love",
      desc: "Skip admin on your job app and take on more projects without burning out."
    },
    {
      icon: <Lock size={24} />,
      title: "Safe & Protected",
      desc: "Your talent booking system data stays private and protected."
    },
    {
      icon: <Users size={24} />,
      title: "Fresh Talent Pool",
      desc: "Access serious talent for your hiring platform from our network."
    },
    {
      icon: <Layout size={24} />,
      title: "Smart Search",
      desc: "Search your own database using the same language as your briefs."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Seamless Collaboration",
      desc: "Keep your team and clients aligned on every decision."
    },
    {
      icon: <Globe size={24} />,
      title: "Work Anywhere",
      desc: "Access your dashboard from office, studio or set."
    }
  ];

  return (
    <section id="why-jamz" className="why-jamz-section reveal">
      <div className="container">
        <h2 className="text-gradient-primary">Why Casting Directors Choose JAMz</h2>
        <p className="section-subtitle">The casting OS built for India's creative community.</p>
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
