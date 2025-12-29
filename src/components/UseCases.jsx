import { useState } from 'react';
import { User, Users, Zap, Layout, Smartphone, Sparkles, Filter, Shield, Share2, Lock, Activity, ChevronRight } from 'lucide-react';

function UseCases() {
  const [activeTab, setActiveTab] = useState(1); // Default to OTT Specialist

  const cases = [
    {
      icon: <User size={32} />,
      title: "The Solo Powerhouse",
      tagline: "Team of 5, headcount of 1. JAMZ becomes your back office.",
      highlights: [
        { icon: <Layout size={18} />, text: "Centralized Casting Hub" },
        { icon: <Smartphone size={18} />, text: "Full Mobile Control" },
        { icon: <Sparkles size={18} />, text: "AI-Powered Shortlisting" }
      ],
      impact: "Operate at scale without hiring extra coordinators.",
      highlighted: false
    },
    {
      icon: <Zap size={32} />,
      title: "The OTT Specialist",
      tagline: "Process 1000+ actors across OTT seasons without manual chaos.",
      highlights: [
        { icon: <Zap size={18} />, text: "Auto Script Breakdowns" },
        { icon: <Filter size={18} />, text: "Smart High-Speed Filtering" },
        { icon: <Shield size={18} />, text: "Data Integrity Protection" }
      ],
      impact: "Prevent project collapse during peak volume peaks.",
      highlighted: true
    },
    {
      icon: <Users size={32} />,
      title: "The Studio Head",
      tagline: "Complete team alignment. Senior CDs stay in total control.",
      highlights: [
        { icon: <Share2 size={18} />, text: "Real-time Team Sync" },
        { icon: <Lock size={18} />, text: "Granular Access Control" },
        { icon: <Activity size={18} />, text: "Live Studio Audit Logs" }
      ],
      impact: "Zero dependency on individuals; shared studio intelligence.",
      highlighted: false
    }
  ];

  return (
    <section id="use-cases" className="use-cases reveal">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="text-gradient-primary" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Built for the new age growth</h2>
          <p style={{ color: 'var(--text-gray)', fontSize: '1.1rem', fontWeight: '500' }}>Choose your profile to see how JAMZ scales with you</p>
        </div>

        <div className="use-cases-interactive-container">
          <div className="use-cases-sidebar">
            {cases.map((c, i) => (
              <button 
                key={i} 
                className={`use-case-selector ${activeTab === i ? 'active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                <div className="selector-icon">{c.icon}</div>
                <div className="selector-content">
                  <span className="selector-title">{c.title}</span>
                  <ChevronRight size={16} className="selector-arrow" />
                </div>
              </button>
            ))}
          </div>

          <div className="use-case-display">
            <div className={`display-card ${cases[activeTab].highlighted ? 'is-highlighted' : ''}`}>
              <div className="display-header">
                <div className="display-icon-circle">
                  {cases[activeTab].icon}
                </div>
                <div className="display-title-group">
                  <h3>{cases[activeTab].title}</h3>
                  <p className="display-tagline">{cases[activeTab].tagline}</p>
                </div>
              </div>

              <div className="display-body">
                <div className="display-highlights">
                  {cases[activeTab].highlights.map((h, idx) => (
                    <div key={idx} className="display-highlight-item">
                      <span className="h-icon-box">{h.icon}</span>
                      <span className="h-text-label">{h.text}</span>
                    </div>
                  ))}
                </div>

                <div className="display-impact">
                  <div className="impact-badge">The JAMZ Effect</div>
                  <p>{cases[activeTab].impact}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UseCases;