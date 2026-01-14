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
      title: "Cut Admin, Protect Energy",
      desc: "Automate updates, reminders and sheets so you can focus on casting, not chasing."
    },
    {
      icon: <Lock size={24} />,
      title: "Private Casting Database",
      desc: "Your vault of artists, notes and contracts stays private to your team."
    },
    {
      icon: <Users size={24} />,
      title: "Verified Artist Pool",
      desc: "Access serious, verified talent profiles while still prioritising your private vault."
    },
    {
      icon: <Layout size={24} />,
      title: "Smart Search",
      desc: "Search your own database the way you brief clients – by look, skills and nuance."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Seamless Collaboration",
      desc: "Give coordinators, assistants and clients a shared view of what is happening."
    },
    {
      icon: <Globe size={24} />,
      title: "Work Anywhere",
      desc: "Review shortlists and update statuses from office, vanity van or set."
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
        <div className="onboarding-steps">
          <h3>Getting Started With JAMz</h3>
          <ol className="onboarding-list">
            <li><strong>Step 1:</strong> Request early access and share how your casting team works today.</li>
            <li><strong>Step 2:</strong> Our team sets up your workspace, talent vault structure and key projects.</li>
            <li><strong>Step 3:</strong> Invite coordinators, assistants and clients with the right permissions.</li>
            <li><strong>Step 4:</strong> Start running live briefs, auditions and shortlists inside JAMz with support on chat.</li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default WhyJamz;
