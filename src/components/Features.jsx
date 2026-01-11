import { 
  Briefcase,
  Activity,
  FileSignature,
  Search,
  MessageSquare,
  Clock,
  CheckCircle,
  ExternalLink,
  Users,
  Zap,
  BarChart,
  Shield,
  Loader2,
  CheckCircle as CheckCircleIcon
} from 'lucide-react';

function Features({ onCtaClick }) {
  const features = [
    { 
      icon: <Briefcase size={24} />, 
      title: "AI Casting & Role Management", 
      desc: "The complete casting platform for creative projects and role tracking.",
      color: "#3b82f6"
    },
    { 
      icon: <Activity size={24} />, 
      title: "Casting Funnel & Booking Analytics", 
      desc: "Understand where each talent booking stands and what needs attention.",
      color: "#a855f7"
    },
    { 
      icon: <FileSignature size={24} />, 
      title: "Agency Agreements & Compliance", 
      desc: "Centralise contracts and agency paperwork for every artist booking.",
      color: "#22c55e"
    },
    { 
      icon: <Search size={24} />, 
      title: "Casting Database & Talent Search", 
      desc: "A powerful casting database to search your private talent pool with precision.",
      color: "#eab308"
    },
    { 
      icon: <MessageSquare size={24} />, 
      title: "Agency Communication & Outreach", 
      desc: "Run all agency and artist communication from one central control centre.",
      color: "#f97316"
    },
    { 
      icon: <Clock size={24} />, 
      title: "Audition Scheduling & Availability", 
      desc: "Coordinate auditions and artist availability without manual chaos.",
      color: "#881337"
    },
    { 
      icon: <CheckCircle size={24} />, 
      title: "Digital Casting Sheets & Evaluation", 
      desc: "Compare and curate the right mix of talents with digital evaluation sheets.",
      color: "#6366f1"
    },
    { 
      icon: <ExternalLink size={24} />, 
      title: "Director Share & Presentation", 
      desc: "Present casting options cleanly to directors and track feedback in real-time.",
      color: "#14b8a6"
    },
    { 
      icon: <Users size={24} />, 
      title: "Talent Feedback & History", 
      desc: "Build long-term relationships in the AI recruitment lifecycle.",
      color: "#ec4899"
    },
    { 
      icon: <Zap size={24} />, 
      title: "AI Studios & Creative Tools", 
      desc: "Use AI studios tools to turn briefs into posters, roles, and ideas.",
      color: "#facc15"
    },
    { 
      icon: <BarChart size={24} />, 
      title: "Reporting & Insights", 
      desc: "See what is working across clients, projects, and talents.",
      color: "#06b6d4"
    },
    { 
      icon: <Shield size={24} />, 
      title: "Team & Permissions", 
      desc: "Run your casting office with clear roles and access.",
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
              <CheckCircleIcon size={16} className="text-primary" />
              <span>Full 12-Module Control Centre</span>
            </div>
            <div className="offering-item-mini">
              <CheckCircleIcon size={16} className="text-primary" />
              <span>AI-Powered Search & Creative Tools</span>
            </div>
            <div className="offering-item-mini">
              <CheckCircleIcon size={16} className="text-primary" />
              <span>Secure Private Talent Vault</span>
            </div>
            <div className="offering-item-mini">
              <CheckCircleIcon size={16} className="text-primary" />
              <span>Automated WhatsApp & Outreach Hub</span>
            </div>
            <div className="offering-item-mini">
              <CheckCircleIcon size={16} className="text-primary" />
              <span>Real-time Analytics & Reporting</span>
            </div>
            <div className="offering-item-mini">
              <CheckCircleIcon size={16} className="text-primary" />
              <span>Team Permissions & Client Portals</span>
            </div>
          </div>
        </div>

        <a href="#" className="btn-primary features-cta" onClick={onCtaClick}>
          Get Early Access →
        </a>
      </div>
    </section>
  );
}

export default Features;
