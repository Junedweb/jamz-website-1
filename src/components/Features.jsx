import { 
  Share2, 
  Filter, 
  UserSearch, 
  Mail, 
  LayoutDashboard, 
  RefreshCw, 
  FileText, 
  Users 
} from 'lucide-react';

function Features({ onCtaClick }) {
  const features = [
    { 
      icon: <Share2 size={24} />, 
      title: "One-Click Social Campaigns", 
      desc: "Post talent calls across all platforms instantly. Reach thousands in seconds.",
      color: "#8b5cf6" // Purple
    },
    { 
      icon: <Filter size={24} />, 
      title: "Smart Filters", 
      desc: "Search by age, city, language, looks, and more.",
      color: "#f97316" // Orange
    },
    { 
      icon: <UserSearch size={24} />, 
      title: "Face-Match AI", 
      desc: "Find lookalikes of any actor in seconds.",
      color: "#06b6d4" // Cyan
    },
    { 
      icon: <Mail size={24} />, 
      title: "Centralized Inbox", 
      desc: "WhatsApp, Instagram, website—all profiles synced in one place.",
      color: "#10b981" // Green
    },
    { 
      icon: <LayoutDashboard size={24} />, 
      title: "Project Dashboard", 
      desc: "Track casting progress and team collaboration in real-time.",
      color: "#3b82f6" // Blue
    },
    { 
      icon: <RefreshCw size={24} />, 
      title: "Self-Updating Profiles", 
      desc: "Actors update their own info, photos, and availability. No more chasing calls.",
      color: "#6366f1" // Indigo
    },
    { 
      icon: <FileText size={24} />, 
      title: "Script Analysis", 
      desc: "AI identifies characters and suggests talent matches from your script.",
      color: "#ec4899" // Pink
    },
    { 
      icon: <Users size={24} />, 
      title: "Team Access Control", 
      desc: "Role-based permissions with secure access logs.",
      color: "#64748b" // Slate
    }
  ];

  return (
    <section className="features-section">
      <div className="container">
        <h2>Your Complete Casting Solution</h2>
        <p className="section-subtext">
          JAMz upgrades your entire casting lifecycle—not just a fancy dashboard for one piece.
        </p>
        
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

        <a href="#" className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 600 }} onClick={onCtaClick}>
          Book a Demo →
        </a>
      </div>
    </section>
  );
}

export default Features;