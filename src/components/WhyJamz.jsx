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
      category: "Efficiency",
      title: "Reclaim Your Creative Energy",
      desc: "Automate repetitive updates, reminders, and call sheets. Spend 80% less time on admin and 100% more on finding the perfect face."
    },
    {
      icon: <Lock size={24} />,
      category: "Security",
      title: "Your Private Talent Vault",
      desc: "A secure, encrypted database of your artists and contracts. Your proprietary notes stay private to your team, always."
    },
    {
      icon: <Zap size={24} />,
      category: "Intelligence",
      title: "AI-Powered Smart Search",
      desc: "Search your database exactly like you brief clients – by specific looks, niche skills, and subtle nuances in seconds."
    },
    {
      icon: <Users size={24} />,
      category: "Network",
      title: "Verified Talent Ecosystem",
      desc: "Instantly access a pool of serious, verified talent profiles while seamlessly integrating them into your private workflow."
    },
    {
      icon: <ShieldCheck size={24} />,
      category: "Workflow",
      title: "Seamless Team Collaboration",
      desc: "Keep coordinators, assistants, and clients in perfect sync with real-time shared views and controlled permissions."
    },
    {
      icon: <Globe size={24} />,
      category: "Mobility",
      title: "The Mobile Casting Office",
      desc: "Review shortlists, update statuses, and manage auditions from the office, a vanity van, or directly on set."
    }
  ];

  return (
    <section id="why-jamz" className="why-jamz-section reveal">
      <div className="section-bg-glow"></div>
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Why JAMz AI</span>
          <h2 className="text-gradient-primary">Built for the Modern Casting Director</h2>
          <p className="section-subtitle">The first AI-native casting operating system designed specifically for India's high-speed creative industry.</p>
        </div>

        <div className="why-cards-container">
          {reasons.map((r, i) => (
            <div key={i} className="why-card">
              <div className="why-card-top">
                <div className="why-card-icon">
                  {r.icon}
                </div>
                <span className="why-card-category">{r.category}</span>
              </div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>

        <div className="process-section">
          <div className="process-header">
            <h3>Seamless Onboarding</h3>
            <p>From zero to live projects in 4 simple steps</p>
          </div>
          
          <div className="process-timeline">
            <div className="process-step">
              <div className="step-number">01</div>
              <h4>Request Access</h4>
              <p>Share your team's unique workflow with our experts.</p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h4>Custom Setup</h4>
              <p>We build your workspace and talent vault structure for you.</p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h4>Team Invite</h4>
              <p>Onboard your coordinators and clients with custom permissions.</p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <h4>Go Live</h4>
              <p>Run live briefs and auditions with 24/7 dedicated support.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyJamz;
