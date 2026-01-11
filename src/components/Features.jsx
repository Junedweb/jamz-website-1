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
      title: "Project & Role Management", 
      desc: "Create, manage, and track projects and roles in one place.",
      color: "#3b82f6"
    },
    { 
      icon: <Activity size={24} />, 
      title: "Funnel & Casting Health Analytics", 
      desc: "Understand where each casting stands and what needs attention.",
      color: "#a855f7"
    },
    { 
      icon: <FileSignature size={24} />, 
      title: "Smart Agreements & Compliance", 
      desc: "Centralise contracts, consent, and paperwork for every talent.",
      color: "#22c55e"
    },
    { 
      icon: <Search size={24} />, 
      title: "Deep Talent Search & Vault", 
      desc: "Search your private vault and wider network with precision.",
      color: "#eab308"
    },
    { 
      icon: <MessageSquare size={24} />, 
      title: "Communication & Outreach", 
      desc: "Run all casting communication from one control centre.",
      color: "#f97316"
    },
    { 
      icon: <Clock size={24} />, 
      title: "Scheduling & Availability", 
      desc: "Coordinate auditions and callbacks without manual chaos.",
      color: "#881337"
    },
    { 
      icon: <CheckCircle size={24} />, 
      title: "Shortlisting & Evaluation", 
      desc: "Compare and curate the right mix of talents for each role.",
      color: "#6366f1"
    },
    { 
      icon: <ExternalLink size={24} />, 
      title: "Client Share & Handover", 
      desc: "Present cast options cleanly to clients and track feedback.",
      color: "#14b8a6"
    },
    { 
      icon: <Users size={24} />, 
      title: "Talent Feedback & History", 
      desc: "Build long-term relationships and memory with your talent base.",
      color: "#ec4899"
    },
    { 
      icon: <Zap size={24} />, 
      title: "AI Creative Tools", 
      desc: "Use AI to turn briefs into posters, roles, and ideas.",
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
          Join Waitlist →
        </a>
      </div>
    </section>
  );
}

export default Features;
