import { 
  Share2, 
  Filter, 
  Activity, 
  ShieldCheck, 
  Flag, 
  Calendar, 
  RefreshCw, 
  FileText, 
  Users,
  Star
} from 'lucide-react';

function Features({ onCtaClick }) {
  const features = [
    { 
      icon: <Share2 size={24} />, 
      title: "Easy Posting", 
      desc: "Bulk contact 50+ talents & share audition PDF/links via WhatsApp with one click.",
      color: "#8b5cf6" // Purple
    },
    { 
      icon: <Filter size={24} />, 
      title: "Deep Search", 
      desc: "Filter by Trained/Untrained, Intro Videos, Age, and Language.",
      color: "#f97316" // Orange
    },
    { 
      icon: <Activity size={24} />, 
      title: "Audition Funnel", 
      desc: "Manage multiple projects & castings. Track 1-to-many confirmations in real-time.",
      color: "#06b6d4" // Cyan
    },
    { 
      icon: <ShieldCheck size={24} />, 
      title: "Smart Agreements", 
      desc: "Digital T&C for Standard Shift Hours and Per Diem clauses.",
      color: "#10b981" // Green
    },
    { 
      icon: <Star size={24} />, 
      title: "Reputation Score", 
      desc: "Auto-scoring for Talent & Clients based on feedback. Flags triggered by low scores.",
      color: "#ef4444" // Red
    },
    { 
      icon: <Calendar size={24} />, 
      title: "Client Nurture", 
      desc: "Automated festive greetings and co-branded updates for your clients.",
      color: "#3b82f6" // Blue
    },
    { 
      icon: <FileText size={24} />, 
      title: "Script Help", 
      desc: "AI finds characters in your scripts.",
      color: "#ec4899" // Pink
    },
    { 
      icon: <Users size={24} />, 
      title: "Team Access", 
      desc: "Give your team safe access to work.",
      color: "#64748b" // Slate
    }
  ];

  return (
    <section id="features" className="features-section reveal">
      <div className="container">
        <h2 className="text-gradient-primary">What you get</h2>
        
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon-wrapper" style={{ color: f.color, backgroundColor: `${f.color}10` }}>
                {f.icon}
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        <a href="#" className="btn-primary features-cta" onClick={onCtaClick}>
          Join Waitlist →
        </a>
      </div>
    </section>
  );
}

export default Features;