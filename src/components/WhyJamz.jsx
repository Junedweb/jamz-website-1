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
      desc: "Skip the tedious tasks and handle more projects with ease."
    },
    {
      icon: <Lock size={24} />,
      title: "Safe & Protected",
      desc: "Your talent data is 100% confidential and protected within your secure account."
    },
    {
      icon: <Users size={24} />,
      title: "Fresh Talent Pool",
      desc: "Access serious talent from the JAMz Drama School network for your next project."
    },
    {
      icon: <Layout size={24} />,
      title: "Smart Search",
      desc: "Search your personal database using any casting requirements you need."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Seamless Collaboration",
      desc: "Keep your entire team in sync and stay updated on every choice."
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
        <p className="section-subtitle">The favorite casting tool for India's creative community.</p>
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