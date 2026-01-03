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
      icon: <Filter size={24} />, 
      title: "Deep Search Command Centre", 
      desc: "Type natural language commands and smart filters to find talent 70% faster.",
      color: "#f97316"
    },
    { 
      icon: <Lock size={24} />, 
      title: "Private Talent Vault", 
      desc: "Search your trusted database with tags, training and history in one place.",
      color: "#10b981"
    },
    { 
      icon: <Users size={24} />, 
      title: "JAMz Talent Pool Access", 
      desc: "Tap into the JAMz Drama School network when you need fresh, serious talent fast.",
      color: "#8b5cf6"
    },
    { 
      icon: <Activity size={24} />, 
      title: "Live Casting Dashboard", 
      desc: "View projects, roles, auditions and follow-ups in one real-time dashboard.",
      color: "#06b6d4"
    },
    { 
      icon: <ImageIcon size={24} />, 
      title: "Visual Outreach Studio", 
      desc: "Generate co-branded casting posters ready to share on social and WhatsApp.",
      color: "#ec4899"
    },
    { 
      icon: <MessageSquare size={24} />, 
      title: "WhatsApp Outreach Automation", 
      desc: "Broadcast, segment and 1:1 message talent with polished outreach in a few clicks.",
      color: "#25d366"
    },
    { 
      icon: <FileText size={24} />, 
      title: "Smart Agreements & Contracts", 
      desc: "Send digital T&Cs, per diems and confirmations so work starts faster.",
      color: "#3b82f6"
    },
    { 
      icon: <Star size={24} />, 
      title: "Reputation & Reliability Scores", 
      desc: "Track feedback for talent and clients so you know who delivers on set.",
      color: "#ef4444"
    },
    { 
      icon: <ExternalLink size={24} />, 
      title: "Team & Client Collaboration", 
      desc: "Share clear shortlists and updates with your team and clients without spreadsheets.",
      color: "#64748b"
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
              <span>Priority support for issues and new requirements.</span>
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
