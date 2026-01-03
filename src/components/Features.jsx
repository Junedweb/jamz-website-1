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
  Star,
  Image as ImageIcon,
  Database,
  Lock,
  MessageSquare,
  ExternalLink,
  Clock,
  BarChart3,
  CheckCircle
} from 'lucide-react';

function Features({ onCtaClick }) {
  const features = [
    { 
      icon: <Users size={24} />, 
      title: "Organize Your Talent", 
      desc: "Easily organize your roster with 1-click job posts and social media sharing.",
      color: "#8b5cf6" // Purple
    },
    { 
      icon: <Filter size={24} />, 
      title: "Smart Search", 
      desc: "Filter by Age, Language, Height, and Training status to find the perfect match.",
      color: "#f97316" // Orange
    },
    { 
      icon: <Activity size={24} />, 
      title: "Live Castings", 
      desc: "Keep all your assignments, shortlists, and follow-ups in one clear dashboard.",
      color: "#06b6d4" // Cyan
    },
    { 
      icon: <ImageIcon size={24} />, 
      title: "Creative Studio", 
      desc: "Create and share professional requirement posters and greetings via WhatsApp.",
      color: "#ec4899" // Pink
    },
    { 
      icon: <Lock size={24} />, 
      title: "Safe & Private Data", 
      desc: "Your data is linked only to your login. Safe, secure, and completely confidential.",
      color: "#10b981" // Green
    },
    { 
      icon: <ShieldCheck size={24} />, 
      title: "Quick Contracts", 
      desc: "Simple digital T&Cs for shift hours and per diems to get to work faster.",
      color: "#3b82f6" // Blue
    },
    { 
      icon: <Star size={24} />, 
      title: "Reputation Score", 
      desc: "Track reliability for talent and clients with automated feedback scores.",
      color: "#ef4444" // Red
    },
    { 
      icon: <Users size={24} />, 
      title: "Team Sync", 
      desc: "Collaborate with your entire team with shared access and project controls.",
      color: "#64748b" // Slate
    },
    { 
      icon: <MessageSquare size={24} />, 
      title: "WhatsApp Sharing", 
      desc: "Share auditions and posters directly to talent via WhatsApp in one click.",
      color: "#25d366" // WhatsApp Green
    },
    { 
      icon: <ExternalLink size={24} />, 
      title: "Client Portals", 
      desc: "Share professional shortlists with clients for quick feedback and selection.",
      color: "#6366f1" // Indigo
    },
    { 
      icon: <Clock size={24} />, 
      title: "Auto Reminders", 
      desc: "Never miss a follow-up with automated reminders for auditions and feedback.",
      color: "#f59e0b" // Amber
    },
    { 
      icon: <BarChart3 size={24} />, 
      title: "Success Insights", 
      desc: "Track your casting success and efficiency with simple real-time updates.",
      color: "#14b8a6" // Teal
    }
  ];

  return (
    <section id="features" className="features-section reveal">
      <div className="container">
        <h2 className="text-gradient-primary">Everything Included in Your Casting Toolkit</h2>
        
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

        <div className="offerings-summary">
          <h3 className="offerings-title">What's Included in Your Access:</h3>
          <div className="offerings-grid-mini">
            <div className="offering-item-mini">
              <CheckCircle size={16} className="text-primary" />
              <span>Full Casting Dashboard</span>
            </div>
            <div className="offering-item-mini">
              <CheckCircle size={16} className="text-primary" />
              <span>Talent Mobile App Access</span>
            </div>
            <div className="offering-item-mini">
              <CheckCircle size={16} className="text-primary" />
              <span>Private Database Sync</span>
            </div>
            <div className="offering-item-mini">
              <CheckCircle size={16} className="text-primary" />
              <span>WhatsApp Outreach Tools</span>
            </div>
            <div className="offering-item-mini">
              <CheckCircle size={16} className="text-primary" />
              <span>Project Performance Analytics</span>
            </div>
            <div className="offering-item-mini">
              <CheckCircle size={16} className="text-primary" />
              <span>Priority support for issues or new requirements.</span>
            </div>
          </div>
        </div>

        <a href="#" className="btn-primary features-cta" onClick={onCtaClick}>
          Join Waitlist →
        </a>
      </div>
    </section>
  );
}

export default Features;