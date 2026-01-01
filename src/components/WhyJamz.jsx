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
      title: "Double Your Work",
      desc: "By saving time."
    },
    {
      icon: <Lock size={24} />,
      title: "Your Data, Your Choice",
      desc: "80% of your casting comes from your private database. We keep it 100% secure."
    },
    {
      icon: <Users size={24} />,
      title: "Fresh 20% Talent",
      desc: "Leverage JAMz Drama School database for serious, career-building talent."
    },
    {
      icon: <Layout size={24} />,
      title: "Multiple Data Cuts",
      desc: "Filter your private database with any industry-specific criteria you want."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "You Are in Charge",
      desc: "You make all the final choices."
    },
    {
      icon: <Globe size={24} />,
      title: "Work Anywhere",
      desc: "Use JAMz from your office or on the film set."
    }
  ];

  return (
    <section id="why-jamz" className="why-jamz-section reveal">
      <div className="container">
        <h2 className="text-gradient-primary">Why people use JAMz</h2>
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