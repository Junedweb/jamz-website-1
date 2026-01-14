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
      title: "Central Casting Workspace", 
      desc: "Track projects, roles and approvals in one place instead of scattered sheets.",
      color: "#3b82f6"
    },
    { 
      icon: <Activity size={24} />, 
      title: "Live Casting Funnel Analytics", 
      desc: "See invites, auditions, shortlists and bookings at a glance for every role.",
      color: "#a855f7"
    },
    { 
      icon: <FileSignature size={24} />, 
      title: "Smart Agreements & Compliance", 
      desc: "Auto-organise contracts, consent forms and paperwork against each talent and job.",
      color: "#22c55e"
    },
    { 
      icon: <Search size={24} />, 
      title: "Private Talent Vault Search", 
      desc: "Search your own database by age, look, skills and tags in seconds.",
      color: "#eab308"
    },
    { 
      icon: <MessageSquare size={24} />, 
      title: "WhatsApp-Ready Outreach", 
      desc: "Send structured casting messages from one hub instead of manual forwards.",
      color: "#f97316"
    },
    { 
      icon: <Clock size={24} />, 
      title: "Scheduling Without Chaos", 
      desc: "Plan audition slots and callbacks with automatic reminders and confirmations.",
      color: "#881337"
    },
    { 
      icon: <CheckCircle size={24} />, 
      title: "Side-by-Side Talent Evaluation", 
      desc: "Compare self-tapes, photos and notes to build strong shortlists faster.",
      color: "#6366f1"
    },
    { 
      icon: <ExternalLink size={24} />, 
      title: "Client-Friendly Casting Links", 
      desc: "Share clean digital decks with like/maybe/no feedback built in.",
      color: "#14b8a6"
    },
    { 
      icon: <Users size={24} />, 
      title: "Talent Relationship Memory", 
      desc: "Keep history, performance notes and tags to re-cast trusted artists quickly.",
      color: "#ec4899"
    },
    { 
      icon: <Zap size={24} />, 
      title: "AI Creative Assist", 
      desc: "Turn rough client briefs into role breakdowns, outreach copy and visual ideas.",
      color: "#facc15"
    },
    { 
      icon: <BarChart size={24} />, 
      title: "Time & Win-Rate Insights", 
      desc: "Understand response rates, time-to-cast and which channels bring the best talent.",
      color: "#06b6d4"
    },
    { 
      icon: <Shield size={24} />, 
      title: "Team & Client Permissions", 
      desc: "Invite coordinators, assistants and clients with the right level of access.",
      color: "#64748b"
    }
  ];

  return (
    <section id="features" className="features-section reveal">
      <div className="container">
        <h2 className="text-gradient-primary">Features That Remove Casting Busywork</h2>
        
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
