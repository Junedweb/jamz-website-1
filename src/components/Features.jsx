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
      title: "Easy Posting", 
      desc: "Post to all social media with one click.",
      color: "#8b5cf6" // Purple
    },
    { 
      icon: <Filter size={24} />, 
      title: "Quick Search", 
      desc: "Search by age, city, and language.",
      color: "#f97316" // Orange
    },
    { 
      icon: <UserSearch size={24} />, 
      title: "Find Lookalikes", 
      desc: "Find actors who look like anyone in seconds.",
      color: "#06b6d4" // Cyan
    },
    { 
      icon: <Mail size={24} />, 
      title: "One Inbox", 
      desc: "See all your messages in one place.",
      color: "#10b981" // Green
    },
    { 
      icon: <LayoutDashboard size={24} />, 
      title: "Project Board", 
      desc: "See your project progress anytime.",
      color: "#3b82f6" // Blue
    },
    { 
      icon: <RefreshCw size={24} />, 
      title: "Auto-Update", 
      desc: "Actors update their own info and photos.",
      color: "#6366f1" // Indigo
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
    <section className="features-section">
      <div className="container">
        <h2>What you get</h2>
        
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

        <a href="#" className="btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1rem', fontWeight: 600, marginTop: '1rem' }} onClick={onCtaClick}>
          Book a Demo →
        </a>
      </div>
    </section>
  );
}

export default Features;