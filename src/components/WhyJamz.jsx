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
      title: "Double Your Output",
      desc: "Save hours of manual work and handle more projects with ease."
    },
    {
      icon: <Lock size={24} />,
      title: "Private & Secure",
      desc: "Your talent data is 100% private and protected within your unique login."
    },
    {
      icon: <Users size={24} />,
      title: "Fresh Talent Pool",
      desc: "Access serious talent from the JAMz Drama School network for your next project."
    },
    {
      icon: <Layout size={24} />,
      title: "Smart Search",
      desc: "Search your private database using any industry criteria you need."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Total Team Control",
      desc: "Keep your entire team in sync and maintain full control over every decision."
    },
    {
      icon: <Globe size={24} />,
      title: "Work Anywhere",
      desc: "Access your dashboard from the office, the studio, or right on the film set."
    }
  ];

  return (
    <section id="why-jamz" className="why-jamz-section reveal">
      <div className="container">
        <h2 className="text-gradient-primary">Why Casting Directors Choose JAMz</h2>
        <p className="section-subtitle">The preferred talent management app for India's creative industry.</p>
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