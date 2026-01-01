import { 
  Clock, 
  Brain, 
  Lock, 
  MessageSquare, 
  Award, 
  Globe,
  Layout,
  Zap,
  ShieldCheck
} from 'lucide-react';

function WhyJamz() {
  const reasons = [
    {
      icon: <Clock size={24} />,
      title: "Double Your Work",
      desc: "By saving time."
    },
    {
      icon: <Layout size={24} />,
      title: "All in One Place",
      desc: "Keep all your data organized."
    },
    {
      icon: <MessageSquare size={24} />,
      title: "No More Chaos",
      desc: "Stop using 100+ WhatsApp groups."
    },
    {
      icon: <Zap size={24} />,
      title: "AI Helper",
      desc: "Let AI do the boring office work."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "You Are in Charge",
      desc: "You make all the final choices."
    },
    {
      icon: <Lock size={24} />,
      title: "Safe & Private",
      desc: "Your data is kept safe in a private lock."
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