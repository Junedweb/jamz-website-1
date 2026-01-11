import { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Users, 
  Briefcase, 
  FileText, 
  Zap,
  Clock,
  Eye,
  Video,
  Image as ImageIcon,
  Pencil,
  Upload,
  MapPin,
  Calendar,
  UserPlus,
  Facebook,
  Instagram,
  MessageCircle,
  Share2,
  Activity,
  Flag,
  CheckCircle,
  Search,
  FileSignature,
  ExternalLink,
  MessageSquare,
  X,
  Star,
  Smartphone,
  Monitor,
  ChevronDown,
  Loader2,
  BarChart,
  Shield,
  Mail
} from 'lucide-react';

function DashboardPreview({ onCtaClick }) {
  const [dateTime, setDateTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [isChristmas, setIsChristmas] = useState(false);
  const [isMobileView, setIsMobileView] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const [showDemoMsg, setShowDemoMsg] = useState(false);
  const [clickPos, setClickPos] = useState({ x: 0, y: 0 });
  const [timerId, setTimerId] = useState(null);

  // New state for multi-project management
  const [projects] = useState([
    {
      id: 1,
      name: "Project Shadow",
      client: "Netflix India",
      castings: [
        { id: 101, title: "Lead Male - Action Hero", status: "Open", talentCount: 45, applicants: 120 },
        { id: 102, title: "Supporting Female", status: "Auditioning", talentCount: 67, applicants: 85 }
      ]
    },
    {
      id: 2,
      name: "The Midnight Heist",
      client: "Amazon Prime",
      castings: [
        { id: 201, title: "Main Antagonist", status: "Open", talentCount: 32, applicants: 54 },
        { id: 202, title: "Police Chief", status: "Shortlisting", talentCount: 15, applicants: 28 }
      ]
    }
  ]);
  const [selectedProjectId, setSelectedProjectId] = useState(1);
  const [selectedCastingId, setSelectedCastingId] = useState(101);
  const [activeModule, setActiveModule] = useState(null);

  const modules = [
    {
      id: 'projects',
      title: "Project & Role Management",
      icon: <Briefcase size={20} />,
      desc: "Create, manage, and track projects and roles in one place.",
      color: "blue",
      items: ["Project overview & quick statuses", "Role briefs, requirements, and deadlines", "Applicants, shortlisted, and confirmed counts"]
    },
    {
      id: 'analytics',
      title: "Funnel & Casting Health Analytics",
      icon: <Activity size={20} />,
      desc: "Understand where each casting stands and what needs attention.",
      color: "purple",
      items: ["Funnel from invite to finalised", "Casting health score drill-down", "Drop-off reasons and bottlenecks"]
    },
    {
      id: 'agreements',
      title: "Smart Agreements & Compliance",
      icon: <FileSignature size={20} />,
      desc: "Centralise contracts, consent, and paperwork for every talent.",
      color: "green",
      items: ["Generate and track agreements", "Minor consent and legal documents", "Status: not sent, sent, signed, issues"]
    },
    {
      id: 'search',
      title: "Deep Talent Search & Vault",
      icon: <Search size={20} />,
      desc: "Search your private vault and wider network with precision.",
      color: "gold",
      items: ["Filters for age, look, skills, languages", "AI search commands and suggestions", "Saved searches and reusable lists"]
    },
    {
      id: 'outreach',
      title: "Communication & Outreach",
      icon: <MessageSquare size={20} />,
      desc: "Run all casting communication from one control centre.",
      color: "orange",
      items: ["Broadcast, sub-group, and 1:1 outreach", "AI rewrites and tone checks", "Templates across WhatsApp, email, SMS"]
    },
    {
      id: 'scheduling',
      title: "Scheduling & Availability",
      icon: <Clock size={20} />,
      desc: "Coordinate auditions and callbacks without manual chaos.",
      color: "maroon",
      items: ["Slot planning for auditions", "Talent availability and confirmations", "Auto-reminders and rescheduling"]
    },
    {
      id: 'evaluation',
      title: "Shortlisting & Evaluation",
      icon: <CheckCircle size={20} />,
      desc: "Compare and curate the right mix of talents for each role.",
      color: "indigo",
      items: ["Side-by-side comparisons and notes", "Internal vs client shortlist versions", "Team ratings and opinions"]
    },
    {
      id: 'client',
      title: "Client Share & Handover",
      icon: <ExternalLink size={20} />,
      desc: "Present cast options cleanly to clients and track feedback.",
      color: "teal",
      items: ["Branded client links and decks", "Client like / maybe / no feedback", "Round-wise shortlist history"]
    },
    {
      id: 'feedback',
      title: "Talent Feedback & History",
      icon: <Users size={20} />,
      desc: "Build long-term relationships and memory with your talent base.",
      color: "pink",
      items: ["Performance notes per audition", "Internal-only tags and flags", "Optional feedback sharing with talent"]
    },
    {
      id: 'ai-tools',
      title: "AI Creative Tools",
      icon: <Zap size={20} />,
      desc: "Use AI to turn briefs into posters, roles, and ideas.",
      color: "yellow",
      items: ["Visual outreach posters and creatives", "AI role breakdown from client briefs", "Suggestions for diversity and options"]
    },
    {
      id: 'reporting',
      title: "Reporting & Insights",
      icon: <BarChart size={20} />,
      desc: "See what is working across clients, projects, and talents.",
      color: "cyan",
      items: ["Client and project performance reports", "Time-to-cast and success metrics", "Top collaborators and talent reliability"]
    },
    {
      id: 'team',
      title: "Team & Permissions",
      icon: <Shield size={20} />,
      desc: "Run your casting office with clear roles and access.",
      color: "slate",
      items: ["Coordinator, assistant, and admin roles", "Task assignments and responsibilities", "Access control for sensitive data"]
    }
  ];

  // Deep Search States
  const [searchCommand, setSearchCommand] = useState('');
  const [mandatoryFilters, setMandatoryFilters] = useState({
    ageGroups: [] // Changed to array for multi-selection
  });
  const [isVaultSearching, setIsVaultSearching] = useState(false);
  const [vaultResults, setVaultResults] = useState([]);
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);
  const [aiPosterPrompt, setAiPosterPrompt] = useState('');
  const [outreachMessage, setOutreachMessage] = useState('');
  const [isAiRewriting, setIsAiRewriting] = useState(false);
  const [activeOutreachChannel, setActiveOutreachChannel] = useState('whatsapp');
  const [isLocked, setIsLocked] = useState(true);
  const statsRef = useRef(null);
  const dashboardContainerRef = useRef(null);

  const handleDashboardScroll = () => {
    if (isLocked) return;
    
    // Auto-scroll logic removed as per user request
  };

  // Add wheel and touch event listeners to allow natural scroll transition at boundaries
  useEffect(() => {
    const container = dashboardContainerRef.current;
    if (!container || isLocked) return;

    let touchStartY = 0;

    const handleWheel = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const delta = e.deltaY;

      // Check if we are at the bottom boundary
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
      const isAtTop = scrollTop <= 0;

      if (delta > 0 && isAtBottom) {
        // At the bottom, scrolling down - scroll the window
        window.scrollBy({ top: delta, behavior: 'auto' });
      } else if (delta < 0 && isAtTop) {
        // At the top, scrolling up - scroll the window
        window.scrollBy({ top: delta, behavior: 'auto' });
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
      const isAtTop = scrollTop <= 0;

      if (deltaY > 0 && isAtBottom) {
        // Scrolling down at the bottom - scroll the window
        window.scrollBy(0, deltaY);
      } else if (deltaY < 0 && isAtTop) {
        // Scrolling up at the top - scroll the window
        window.scrollBy(0, deltaY);
      }
      touchStartY = touchY;
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [isLocked]);

  const handleExploreClick = (e) => {
    e.stopPropagation();
    
    // GA4 Tracking
    if (window.gtag) {
      window.gtag('event', 'view_app_demo', {
        'event_category': 'engagement',
        'event_label': 'Click here to view app demo',
        'project_name': selectedProject.name
      });
    }

    setIsLocked(false);
    // Auto-scroll to stats removed as per user request
  };

  // Logic to suggest filters based on command - derived from searchCommand
  const dynamicFilters = useMemo(() => {
    const command = searchCommand.toLowerCase();
    const suggestions = [];
    
    if (command.includes('martial arts') || command.includes('action')) {
      suggestions.push({ id: 'f1', label: 'Action Ready', active: true });
    }
    if (command.includes('hindi') || command.includes('language')) {
      suggestions.push({ id: 'f2', label: 'Fluent Hindi', active: true });
    }
    if (command.includes('video') || command.includes('intro')) {
      suggestions.push({ id: 'f3', label: 'Intro Video', active: true });
    }
    if (command.includes('tall') || command.includes('height')) {
      suggestions.push({ id: 'f4', label: 'Height: 5\'10"+', active: true });
    }
    
    return suggestions;
  }, [searchCommand]);

  const selectedProject = projects.find(p => p.id === selectedProjectId) || projects[0];
  const selectedCasting = selectedProject.castings.find(c => c.id === selectedCastingId) || selectedProject.castings[0];

  const toggleAgeGroup = (group) => {
    setMandatoryFilters(prev => {
      const exists = prev.ageGroups.includes(group);
      if (exists) {
        return { ...prev, ageGroups: prev.ageGroups.filter(g => g !== group) };
      } else {
        return { ...prev, ageGroups: [...prev.ageGroups, group] };
      }
    });
  };

  const handleVaultSearch = () => {
    if (mandatoryFilters.ageGroups.length === 0) {
      alert("Please select at least one Age Group");
      return;
    }
    setIsVaultSearching(true);
    // Simulate smart auto-filtering based on command
    setTimeout(() => {
      setVaultResults([
        {
          id: 'v1',
          name: "Vikram Malhotra",
          score: 4.9,
          jobs: 24,
          isVault: true,
          instagram: "vikram_malhotra_official",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&auto=format&fit=crop",
          tags: ["Trained", "Action Ready"]
        },
        {
          id: 'v2',
          name: "Sanya Deshmukh",
          score: 4.7,
          jobs: 18,
          isVault: true,
          instagram: "sanya_deshmukh_acts",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=200&auto=format&fit=crop",
          tags: ["Fluent Hindi", "Intro Video"]
        }
      ]);
      setIsVaultSearching(false);
    }, 1500);
  };

  const handleAiPosterGen = () => {
    if (!aiPosterPrompt) return;
    setIsGeneratingPoster(true);
    setTimeout(() => {
      setIsGeneratingPoster(false);
      setAiPosterPrompt('');
      // In a real app, this would add a new poster to the list
    }, 2000);
  };

  const handleAiRewrite = () => {
    if (!outreachMessage) return;
    setIsAiRewriting(true);
    setTimeout(() => {
      setOutreachMessage("Dear Talent, we are currently casting for 'Project Shadow'. Based on your profile, we believe you'd be a great fit for the Lead Action role. Please review the details in the JAMz app.");
      setIsAiRewriting(false);
    }, 1200);
  };

  const handleDashboardClick = (e) => {
    // Only trigger if not clicking the button itself
    if (e.target.closest('.demo-cta-inline')) return;
    
    // Clear existing timer if any
    if (timerId) clearTimeout(timerId);
    
    setClickPos({ x: e.clientX, y: e.clientY });
    setShowDemoMsg(true);
    
    const newTimerId = setTimeout(() => {
      setShowDemoMsg(false);
      setTimerId(null);
    }, 4000);
    
    setTimerId(newTimerId);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setDateTime(now);
      
      const hour = now.getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 17) setGreeting('Good Afternoon');
      else if (hour < 21) setGreeting('Good Evening');
      else setGreeting('Good Night');

      // Christmas check (Dec 25)
      if (now.getMonth() === 11 && now.getDate() === 25) {
        setIsChristmas(true);
      } else {
        setIsChristmas(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  const renderModuleContent = () => {
    const mod = modules.find(m => m.id === activeModule);
    if (!mod) return null;

    return (
      <article className="cd-module-detail-view fade-in" role="region" aria-labelledby={`module-title-${mod.id}`}>
        <header className="module-detail-header">
          <button 
            className="back-to-grid" 
            onClick={() => setActiveModule(null)}
            aria-label="Back to Control Centre grid"
          >
            <X size={20} /> <span>Back to Control Centre</span>
          </button>
          <div className="module-title-row">
            <div className={`module-icon-large ${mod.color}`} aria-hidden="true">{mod.icon}</div>
            <div>
              <h2 id={`module-title-${mod.id}`}>{mod.title}</h2>
              <p>{mod.desc}</p>
            </div>
          </div>
        </header>

        <main className="module-prototype-content">
          {activeModule === 'projects' && (
            <section className="prototype-projects" aria-label="Projects Overview">
              <div className="proto-stats-row">
                <div className="proto-stat"><span>Active Projects</span><strong>5</strong></div>
                <div className="proto-stat"><span>Total Roles</span><strong>12</strong></div>
                <div className="proto-stat"><span>Openings</span><strong>8</strong></div>
              </div>
              <div className="proto-card-list">
                {projects.map(p => (
                  <div key={p.id} className="proto-project-card">
                    <div className="project-card-header">
                      <strong>{p.name}</strong>
                      <span className="badge-green-soft">Active</span>
                    </div>
                    <div className="project-card-details">
                      <div className="detail-item">
                        <span className="label">Client:</span>
                        <span className="value">{p.client}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Roles:</span>
                        <span className="value">{p.castings.length}</span>
                      </div>
                    </div>
                    <button className="ui-btn-gold-sm" aria-label={`View details for ${p.name}`}>View Project</button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeModule === 'analytics' && (
            <section className="prototype-analytics" aria-label="Casting Analytics">
              <div className="funnel-viz" role="img" aria-label="Casting funnel visualization">
                <div className="funnel-step"><span>Reach</span><div className="bar" style={{width: '100%'}} aria-label="12,400 reach">12,400</div></div>
                <div className="funnel-step"><span>Interest</span><div className="bar" style={{width: '45%'}} aria-label="5,580 interest">5,580</div></div>
                <div className="funnel-step"><span>Audition</span><div className="bar" style={{width: '12%'}} aria-label="1,488 auditions">1,488</div></div>
                <div className="funnel-step"><span>Shortlist</span><div className="bar" style={{width: '3%'}} aria-label="372 shortlists">372</div></div>
                <div className="funnel-step"><span>Cast</span><div className="bar" style={{width: '0.5%'}} aria-label="62 cast">62</div></div>
              </div>
              <div className="health-metrics">
                <div className="metric-card">
                  <span>Average Time to Cast</span>
                  <strong>14 Days</strong>
                </div>
                <div className="metric-card">
                  <span>Talent Response Rate</span>
                  <strong>88%</strong>
                </div>
              </div>
            </section>
          )}

          {activeModule === 'search' && (
            <section className="prototype-search" aria-label="Talent Search">
              <div className="search-controls">
                <div className="proto-search-bar">
                  <Search size={18} aria-hidden="true" />
                  <input 
                    type="text" 
                    placeholder="Search talent by skill, look, or name..." 
                    aria-label="Search talent"
                  />
                </div>
                <div className="search-filters-proto" role="group" aria-label="Active filters">
                  <span className="p-filter">Age: 20-30</span>
                  <span className="p-filter">Gender: Male</span>
                  <span className="p-filter">Location: Mumbai</span>
                </div>
              </div>
              <div className="search-results-proto">
                {[1, 2, 3].map(i => (
                  <div key={i} className="search-result-card">
                    <div className="result-avatar" aria-hidden="true"></div>
                    <div className="result-info">
                      <strong>Talent Name {i}</strong>
                      <span>Actor • 25 Years • Mumbai</span>
                    </div>
                    <button className="ui-btn-outline-sm" aria-label={`Add Talent Name ${i} to list`}>Add to List</button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeModule === 'agreements' && (
            <section className="prototype-agreements" aria-label="Agreements Status">
              <div className="proto-stats-row">
                <div className="proto-stat"><span>Pending Signature</span><strong>14</strong></div>
                <div className="proto-stat"><span>Signed</span><strong>42</strong></div>
                <div className="proto-stat"><span>Legal Issues</span><strong>2</strong></div>
              </div>
              <div className="proto-card-list">
                {[
                  { name: "Rahul Khanna", type: "Actor Agreement", date: "10 Jan", status: "Signed", color: "green" },
                  { name: "Priya Sharma", type: "Minor Consent", date: "11 Jan", status: "Pending", color: "orange" },
                  { name: "Amit Shah", type: "NDA", date: "09 Jan", status: "Signed", color: "green" }
                ].map((doc, i) => (
                  <div key={i} className="proto-agreement-card">
                    <div className="agreement-card-header">
                      <strong>{doc.name}</strong>
                      <span className={`badge-${doc.color}-soft`}>{doc.status}</span>
                    </div>
                    <div className="agreement-card-details">
                      <div className="detail-item">
                        <span className="label">Type:</span>
                        <span className="value">{doc.type}</span>
                      </div>
                      <div className="detail-item">
                        <span className="label">Sent:</span>
                        <span className="value">{doc.date}</span>
                      </div>
                    </div>
                    <div className="agreement-card-actions">
                      <button className="ui-btn-outline-sm" aria-label={`View ${doc.type} for ${doc.name}`}>View</button>
                      {doc.status !== 'Signed' && (
                        <button className="ui-btn-gold-sm" aria-label={`Resend ${doc.type} to ${doc.name}`}>Resend</button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeModule === 'outreach' && (
            <section className="prototype-outreach" aria-label="Outreach Channels">
              <div className="outreach-channels">
                <button 
                  className={`channel-card ${activeOutreachChannel === 'whatsapp' ? 'active' : ''}`} 
                  aria-pressed={activeOutreachChannel === 'whatsapp'}
                  onClick={() => setActiveOutreachChannel('whatsapp')}
                >
                  <MessageCircle size={24} aria-hidden="true" />
                  <span>WhatsApp</span>
                  <div className="status-dot green" aria-label="Online"></div>
                </button>
                <button 
                  className={`channel-card ${activeOutreachChannel === 'email' ? 'active' : ''}`} 
                  aria-pressed={activeOutreachChannel === 'email'}
                  onClick={() => setActiveOutreachChannel('email')}
                >
                  <Mail size={24} aria-hidden="true" />
                  <span>Email</span>
                  <div className="status-dot green" aria-label="Online"></div>
                </button>
                <button 
                  className={`channel-card ${activeOutreachChannel === 'sms' ? 'active' : ''}`} 
                  aria-pressed={activeOutreachChannel === 'sms'}
                  onClick={() => setActiveOutreachChannel('sms')}
                >
                  <Smartphone size={24} aria-hidden="true" />
                  <span>SMS</span>
                  <div className="status-dot gray" aria-label="Offline"></div>
                </button>
              </div>
              <div className="outreach-message-preview">
                <label htmlFor="outreach-msg">Broadcast Message Preview:</label>
                <textarea 
                  id="outreach-msg"
                  className="proto-textarea"
                  value={outreachMessage || "Hi [Talent Name], we have an exciting role for you..."}
                  readOnly
                  aria-label="Message preview"
                ></textarea>
              </div>
              <div className="outreach-actions">
                <button className="ui-btn-dark-full" aria-label="Create New Broadcast Message">Create New Broadcast</button>
              </div>
            </section>
          )}

          {activeModule === 'scheduling' && (
            <section className="prototype-scheduling" aria-label="Audition Scheduling">
              <header className="calendar-header-proto">
                <div className="date-nav">
                  <button aria-label="Previous day" className="ui-nav-btn">&lt;</button>
                  <span className="current-date">12 Jan 2026</span>
                  <button aria-label="Next day" className="ui-nav-btn">&gt;</button>
                </div>
                <button className="ui-btn-outline-sm">Today</button>
              </header>
              <div className="slots-container-scroll">
                <div className="slots-grid-proto">
                  {['Studio A', 'Studio B', 'Zoom 1'].map(studio => (
                    <div key={studio} className="day-column">
                      <span className="day-header">{studio}</span>
                      <div className="slot-pill">09:00 AM</div>
                      <div className="slot-pill active">10:30 AM</div>
                      <div className="slot-pill">12:00 PM</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activeModule === 'evaluation' && (
            <section className="prototype-evaluation" aria-label="Talent Evaluation">
              <div className="evaluation-grid">
                {[
                  { name: "Vikram Malhotra", acts: 4, look: 5, note: "Strong performance, great range. Fits the lead brief perfectly." },
                  { name: "Sanya Deshmukh", acts: 5, look: 4, note: "Exceptional screen presence. Dialogue delivery is spot on." }
                ].map((candidate, i) => (
                  <div key={i} className="talent-eval-card">
                    <div className="eval-card-top">
                      <div className="eval-photo" aria-hidden="true"></div>
                      <div className="eval-main-info">
                        <strong>{candidate.name}</strong>
                        <div className="ratings-proto">
                          <div className="rating-item">
                            <span>Acting</span>
                            <div className="stars">{"⭐".repeat(candidate.acts)}</div>
                          </div>
                          <div className="rating-item">
                            <span>Look</span>
                            <div className="stars">{"⭐".repeat(candidate.look)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="notes-proto">{candidate.note}</p>
                    <div className="eval-actions">
                      <button className="ui-btn-green-sm" aria-label={`Shortlist ${candidate.name}`}>Shortlist</button>
                      <button className="ui-btn-red-sm" aria-label={`Reject ${candidate.name}`}>Reject</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeModule === 'ai-tools' && (
            <section className="prototype-ai" aria-label="AI Creative Tools">
              <div className="ai-actions-proto">
                <button className="ai-tool-btn">
                  <ImageIcon size={18} aria-hidden="true" />
                  <span>Generate Poster</span>
                </button>
                <button className="ai-tool-btn">
                  <Zap size={18} aria-hidden="true" />
                  <span>AI Role Brief</span>
                </button>
              </div>
              <div className="ai-output-proto" role="log" aria-live="polite">
                <p>Analyzing brief for 'Project Shadow'...</p>
                <p>Generating role requirements based on historical success data<span className="ai-cursor" aria-hidden="true"></span></p>
              </div>
            </section>
          )}

          {activeModule === 'reporting' && (
            <section className="prototype-reporting" aria-label="Performance Reports">
              <div className="reporting-charts">
                <div className="chart-placeholder" role="img" aria-label="Bar chart showing project performance">
                  <div className="chart-bar-v" style={{height: '60%'}} aria-label="Project A: 60%"></div>
                  <div className="chart-bar-v" style={{height: '85%'}} aria-label="Project B: 85%"></div>
                  <div className="chart-bar-v" style={{height: '40%'}} aria-label="Project C: 40%"></div>
                  <div className="chart-bar-v" style={{height: '70%'}} aria-label="Project D: 70%"></div>
                </div>
                <div className="chart-labels" aria-hidden="true">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span>
                </div>
              </div>
              <div className="report-list">
                <div className="report-item">
                  <BarChart size={16} aria-hidden="true" />
                  <span>Monthly Casting Success Report</span>
                  <button className="ui-btn-outline-sm">View</button>
                </div>
                <div className="report-item">
                  <Users size={16} aria-hidden="true" />
                  <span>Talent Diversity Analytics</span>
                  <button className="ui-btn-outline-sm">View</button>
                </div>
              </div>
            </section>
          )}

          {activeModule === 'team' && (
            <section className="prototype-team" aria-label="Team Management">
              <div className="team-members-list">
                {[
                  { name: "Alex Rivers", role: "Lead CD", status: "online" },
                  { name: "Sarah Chen", role: "Associate", status: "online" },
                  { name: "Mike Ross", role: "Assistant", status: "offline" }
                ].map((m, i) => (
                  <div key={i} className="team-member-card">
                    <div className="m-avatar" aria-hidden="true"></div>
                    <div className="m-info">
                      <strong>{m.name}</strong>
                      <span>{m.role}</span>
                    </div>
                    <span className={`m-status ${m.status}`}>{m.status}</span>
                  </div>
                ))}
              </div>
              <button className="ui-btn-dark-full">Invite Team Member</button>
            </section>
          )}

          {activeModule === 'client' && (
            <section className="prototype-client" aria-label="Client Collaboration">
              <div className="client-share-header">
                <div className="share-info">
                  <strong>Client Share Link</strong>
                  <span className="share-url">jamz.app/share/project-shadow-x92</span>
                </div>
                <button className="ui-btn-outline-sm">Copy Link</button>
              </div>
              <div className="client-feedback-stats">
                <div className="c-stat"><span>Liked</span><strong>12</strong></div>
                <div className="c-stat"><span>Maybe</span><strong>5</strong></div>
                <div className="c-stat"><span>Rejected</span><strong>3</strong></div>
              </div>
              <div className="client-talent-list">
                {[1, 2].map(i => (
                  <div key={i} className="client-item">
                    <div className="c-avatar" aria-hidden="true"></div>
                    <div className="c-info">
                      <strong>Talent {i}</strong>
                      <span>Lead Action Role</span>
                    </div>
                    <span className="c-feedback-badge liked">LIKED</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeModule === 'feedback' && (
            <section className="prototype-feedback" aria-label="Talent Feedback History">
              <div className="feedback-search">
                <Search size={16} aria-hidden="true" />
                <input type="text" placeholder="Search talent feedback..." aria-label="Search feedback" />
              </div>
              <div className="feedback-timeline">
                {[
                  { name: "Vikram Malhotra", text: "Exceptional audition for 'Shadow'. Very professional.", tag: "Positive" },
                  { name: "Sanya Deshmukh", text: "Great energy, needs slight improvement in dialogue delivery.", tag: "Constructive" }
                ].map((f, i) => (
                  <div key={i} className="feedback-card-proto">
                    <div className="f-header">
                      <strong>{f.name}</strong>
                      <span className={`f-tag ${f.tag.toLowerCase()}`}>{f.tag}</span>
                    </div>
                    <p>{f.text}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </main>

        <footer className="module-navigation-footer">
          <nav aria-label="Module Quick Navigation">
            <span>Switch Module:</span>
            <div className="quick-nav-links">
              {modules.filter(m => m.id !== activeModule).slice(0, 4).map(m => (
                <button 
                  key={m.id} 
                  className="quick-nav-btn" 
                  onClick={() => setActiveModule(m.id)}
                  aria-label={`Switch to ${m.title}`}
                >
                  {m.icon} <span>{m.title.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </nav>
        </footer>
      </article>
    );
  };

  return (
    <section id="dashboard" className={`dashboard-preview-section reveal ${isChristmas ? 'festive-christmas' : ''}`}>
      {showDemoMsg && (
        <div 
          className="demo-notification" 
          style={{ 
            position: 'fixed',
            top: `${clickPos.y}px`,
            left: `${clickPos.x}px`,
            transform: 'translate(-50%, -120%)', // Position above the click point
            margin: 0,
            pointerEvents: 'auto'
          }}
        >
          <div className="demo-notification-content">
            <Zap size={20} className="icon-gold" />
            <div>
              <strong>Launching Soon Preview</strong>
              <p>You’re exploring a sandbox preview of JAMz. Get early access to be first in line for the full platform.</p>
            </div>
            <button className="demo-cta-inline" onClick={onCtaClick}>Get Early Access</button>
          </div>
        </div>
      )}

      <div className="container">
        <div className="section-header">
          <h2>AI-Powered <span className="text-gradient-gold">Casting Dashboard</span></h2>
          <p>
            Preview how JAMz runs your casting day from search to shortlist.
          </p>
        </div>

        <div className="dashboard-preview-wrapper animate-float" onClick={handleDashboardClick}>
          <div className="preview-header-meta">
            <div className="preview-badge">
              <span className="pulse-dot"></span>
              {isMobileView ? (
                <><Smartphone size={14} /> MOBILE APP PREVIEW</>
              ) : (
                <><Monitor size={14} /> DESKTOP DASHBOARD PREVIEW</>
              )}
            </div>
          </div>
          
          <div className={isMobileView ? "mobile-device-frame" : "browser-window"}>
            {isMobileView ? (
              <div className="mobile-top-bar">
                <div className="mobile-notch"></div>
                <div className="mobile-status-icons">
                  <span className="time">{formatTime(dateTime)}</span>
                  <div className="right-icons">
                    <div className="signal">📶</div>
                    <div className="battery">🔋</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="browser-top-bar">
                <div className="browser-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
                <div className="browser-address-bar">
                  www.jamzconnect.com/dashboard
                </div>
              </div>
            )}
            
            <div 
              ref={dashboardContainerRef}
              className={`dashboard-real-ui ${isLocked ? 'scroll-locked' : 'scroll-unlocked'}`}
              onScroll={handleDashboardScroll}
            >
              {/* Top Bar */}
              <div className="ui-top-bar">
                <div className="ui-logo-user-row">
                  <div className="ui-logo">JAM<span>z</span></div>
                  <div className="ui-search-bar">
                    <Search size={16} className="search-icon" />
                    <input type="text" placeholder="Deep Search talent..." className="search-input" />
                    <div className="search-filters">
                      <span className="filter-tag">Trained <X size={10}/></span>
                      <span className="filter-tag">Intro Video <X size={10}/></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Selector Tabs */}
              <div className="ui-project-tabs">
                {projects.map(project => (
                  <button 
                    key={project.id}
                    className={`project-tab ${selectedProjectId === project.id ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProjectId(project.id);
                      setSelectedCastingId(project.castings[0].id);
                    }}
                  >
                    <Briefcase size={14} />
                    <span>{project.name}</span>
                  </button>
                ))}
                <button className="add-project-btn" onClick={(e) => e.stopPropagation()}>
                  <UserPlus size={14} />
                  <span>New Project</span>
                </button>
              </div>

              {/* Dashboard Hero Banner */}
              <div className={`ui-dashboard-banner ${isLocked ? 'banner-locked' : 'banner-compact'}`}>
                <div className="banner-content">
                  <div className="banner-title">
                    <span role="img" aria-label="clapper">
                      {isChristmas ? '🎄' : '🎬'}
                    </span>
                    <h2>{greeting}{isChristmas && ' 🎅'}</h2>
                  </div>
                  <p>{isChristmas ? 'Merry Christmas! Managing ' : 'Currently managing '} <span className="text-gold-bold">{selectedProject.name}</span> for {selectedProject.client}</p>
                  
                  {!isLocked && (
                    <div className="banner-health-mini">
                      <Zap size={14} className="text-gold" />
                      <span>Casting Health: <strong>82/100</strong></span>
                      <span className="health-divider">|</span>
                      <span className="health-status-text">On track</span>
                    </div>
                  )}

                  {isLocked && (
                    <button className="explore-ai-btn pulse" onClick={handleExploreClick}>
                      <Zap size={16} />
                      <span>Click here to view app demo</span>
                      <ChevronDown size={16} className="bounce" />
                    </button>
                  )}
                </div>
                {!isLocked && (
                  <div className="banner-date">
                    <div className="banner-date-day">{formatDate(dateTime)}</div>
                    <div className="banner-date-time">{formatTime(dateTime)}</div>
                  </div>
                )}
              </div>

              <div className={`dashboard-scrollable-content ${isLocked ? 'sections-hidden' : 'sections-revealed'}`}>
                {/* Stats Grid */}
                <div className="ui-stats-grid" ref={statsRef}>
                  <div className="stat-card blue">
                    <div className="stat-header">
                      <Activity size={18} />
                      <span>Casting Health</span>
                    </div>
                    <div className="stat-value-row">
                      <div className="stat-value">82/100</div>
                      <span className="stat-sub">Overall Score</span>
                    </div>
                    <div className="funnel-bar">
                      <div className="funnel-fill" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                  <div className="stat-card green">
                    <div className="stat-header">
                      <FileSignature size={18} />
                      <span>Agreements</span>
                    </div>
                    <div className="stat-value-row">
                      <div className="stat-value">42/50</div>
                      <span className="stat-sub">Signed</span>
                    </div>
                    <div className="stat-mini-text">8 Pending Compliance</div>
                  </div>
                  <div className="stat-card gold">
                    <div className="stat-header">
                      <Zap size={18} />
                      <span>AI Efficiency</span>
                    </div>
                    <div className="stat-value-row">
                      <div className="stat-value">12h</div>
                      <span className="stat-sub">Saved/Week</span>
                    </div>
                    <div className="posting-stats-row">
                      <div className="p-stat">
                        <span className="p-label">Search</span>
                        <span className="p-count">4h</span>
                      </div>
                      <div className="p-stat">
                        <span className="p-label">Scheduling</span>
                        <span className="p-count">5h</span>
                      </div>
                      <div className="p-stat">
                        <span className="p-label">Creative</span>
                        <span className="p-count">3h</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ui-card next-best-actions-card">
                  <div className="card-header">
                    <div className="card-title">
                      <Zap size={16} className="text-gold" /> AI Recommended Actions
                    </div>
                  </div>
                  <div className="next-actions-list">
                    <div className="next-action-item">
                      <span className="next-action-label">Use <strong>AI Creative Tools</strong> to generate audition posters for Jake Thompson role.</span>
                      <button className="ui-btn-outline-sm" onClick={() => setActiveModule('ai-tools')}>Launch AI</button>
                    </div>
                    <div className="next-action-item">
                      <span className="next-action-label">14 agreements are pending in <strong>Compliance</strong>. Send automated reminders.</span>
                      <button className="ui-btn-outline-sm" onClick={() => setActiveModule('agreements')}>Review</button>
                    </div>
                    <div className="next-action-item">
                      <span className="next-action-label">Run <strong>Deep Talent Search</strong> for the "Police Chief" role in Midnight Heist.</span>
                      <button className="ui-btn-outline-sm" onClick={() => setActiveModule('search')}>Search</button>
                    </div>
                  </div>
                </div>

                {/* Module Quick Access Section */}
                <div className="ui-section-title">Control Centre Quick Access</div>
                <div className="ui-activity-grid">
                  <div className="activity-card-mini clickable" onClick={() => setActiveModule('projects')}>
                    <div className="activity-icon-mini blue"><Briefcase size={16} /></div>
                    <div className="activity-content-mini">
                      <span className="activity-label-mini">Projects</span>
                      <span className="activity-value-mini">{projects.length} Active</span>
                    </div>
                  </div>
                  <div className="activity-card-mini clickable" onClick={() => setActiveModule('analytics')}>
                    <div className="activity-icon-mini purple"><Activity size={16} /></div>
                    <div className="activity-content-mini">
                      <span className="activity-label-mini">Analytics</span>
                      <span className="activity-value-mini">Health: 82%</span>
                    </div>
                  </div>
                  <div className="activity-card-mini clickable" onClick={() => setActiveModule('scheduling')}>
                    <div className="activity-icon-mini maroon"><Clock size={16} /></div>
                    <div className="activity-content-mini">
                      <span className="activity-label-mini">Scheduling</span>
                      <span className="activity-value-mini">8 Slots Open</span>
                    </div>
                  </div>
                  <div className="activity-card-mini clickable" onClick={() => setActiveModule('evaluation')}>
                    <div className="activity-icon-mini indigo"><CheckCircle size={16} /></div>
                    <div className="activity-content-mini">
                      <span className="activity-label-mini">Evaluation</span>
                      <span className="activity-value-mini">12 to Review</span>
                    </div>
                  </div>
                  <div className="activity-card-mini clickable" onClick={() => setActiveModule('client')}>
                    <div className="activity-icon-mini teal"><ExternalLink size={16} /></div>
                    <div className="activity-content-mini">
                      <span className="activity-label-mini">Client Share</span>
                      <span className="activity-value-mini">3 New Likes</span>
                    </div>
                  </div>
                  <div className="activity-card-mini clickable" onClick={() => setActiveModule('outreach')}>
                    <div className="activity-icon-mini orange"><MessageSquare size={16} /></div>
                    <div className="activity-content-mini">
                      <span className="activity-label-mini">Outreach</span>
                      <span className="activity-value-mini">92% Reach</span>
                    </div>
                  </div>
                </div>

                {/* Roles List */}
                <div className="ui-section-title">Active Roles</div>
                <div className="ui-roles-list">
                  <div className="ui-role-card-detailed">
                    <div className="role-card-header">
                      <div className="role-main-info">
                        <div className="role-title-row">
                          <h3>Lead Male - Action Hero</h3>
                          <span className="badge-green-soft">Open</span>
                        </div>
                        <h4>Jake Thompson</h4>
                        <p>A former military operative turned private investigator. Strong, decisive, and morally complex.</p>
                      </div>
                      <div className="role-card-actions">
                        <button className="ui-btn-outline-sm"><Eye size={14} /> View Details</button>
                        <button className="ui-btn-dark-sm">Manage</button>
                      </div>
                    </div>
                    
                    <div className="role-metadata">
                      <div className="meta-item"><Users size={14} /> 45 applicants</div>
                      <div className="meta-item"><Calendar size={14} /> Due: 2026-01-15</div>
                      <div className="meta-item"><MapPin size={14} /> Los Angeles, CA</div>
                      <div className="meta-item"><Clock size={14} /> Posted: 2025-12-01</div>
                    </div>

                    <div className="role-tags">
                      <span className="ui-tag">Male</span>
                      <span className="ui-tag">28-35 years</span>
                      <span className="ui-tag">English</span>
                      <span className="ui-tag-green">$50,000 - $75,000</span>
                    </div>

                    <div className="role-progress-section">
                      <div className="progress-info">
                        <span className="shortlisted-text">8 shortlisted</span>
                        <span className="total-text">of 45 total</span>
                      </div>
                      <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: '18%' }}></div>
                      </div>
                    </div>

                    <div className="ai-shortlist-hint">
                      <div className="ai-badge-sm">
                        <Zap size={10} /> AI Shortlist Coach
                      </div>
                      <p>AI suggests adding 3 more profiles to reach a strong client-ready shortlist.</p>
                    </div>
                  </div>
                </div>

                {/* Multi-Project Casting Management Section */}
                <div className="ui-casting-management">
                  <div className="casting-sidebar">
                    <div className="sidebar-header">
                      <h3>Casting Requirements</h3>
                      <div className="ai-inline-alert">
                        <Zap size={10} /> <span>AI check: 2 shortlisted actors are double-booked next week.</span>
                      </div>
                    </div>
                    <div className="casting-list">
                      {selectedProject.castings.map(casting => (
                        <div 
                          key={casting.id}
                          className={`casting-item ${selectedCastingId === casting.id ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCastingId(casting.id);
                          }}
                        >
                          <div className="casting-item-info">
                            <span className="casting-title">{casting.title}</span>
                            <span className={`casting-status-badge ${casting.status.toLowerCase()}`}>{casting.status}</span>
                          </div>
                          <span className="casting-meta">{casting.talentCount} contacted</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="casting-details-main">
                    <div className="casting-header-actions">
                      <div className="header-info">
                        <h3>{selectedCasting.title}</h3>
                        <p>Contacting 50+ talents for this requirement</p>
                      </div>
                      <div className="bulk-actions">
                        <button className="ui-btn-primary-sm" onClick={(e) => e.stopPropagation()}>
                          <UserPlus size={14} /> <span>Bulk Outreach</span>
                        </button>
                        <button className="ui-btn-outline-sm" onClick={(e) => e.stopPropagation()}>
                          <ExternalLink size={14} /> <span>Forward to Client</span>
                        </button>
                        <div className="export-options">
                          <button className="ui-btn-dark-sm" onClick={(e) => e.stopPropagation()}>
                            <FileText size={14} /> <span>Export PDF</span>
                          </button>
                          <button className="ui-btn-whatsapp-sm" onClick={(e) => e.stopPropagation()}>
                            <MessageSquare size={14} /> <span>WhatsApp Share</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="talent-contact-grid">
                      {[
                        { id: 101, name: "Rahul Khanna", insta: "rahul_k_actor" },
                        { id: 102, name: "Sneha Kapoor", insta: "sneha_kapoor_arts" },
                        { id: 103, name: "Ishaan Singh", insta: "ishaan_singh_official" }
                      ].map(talent => (
                        <div key={talent.id} className="talent-contact-card">
                          <div className="talent-avatar-row">
                            <div className="mini-avatar">T{talent.id % 100}</div>
                            <div className="talent-brief">
                              <div className="talent-name-row" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <span className="talent-name">{talent.name}</span>
                                <a 
                                  href={`https://instagram.com/${talent.insta}`} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="insta-link-mini"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Instagram size={10} />
                                  <span>Profile</span>
                                </a>
                              </div>
                            </div>
                            <span className="status-dot online"></span>
                          </div>
                          <div className="talent-stats">
                            <div className="t-stat">
                              <Video size={12} />
                              <span>Audition Received</span>
                            </div>
                          </div>
                          <div className="talent-actions">
                            <button className="btn-icon-only"><Eye size={14} /></button>
                            <button className="btn-icon-only"><Share2 size={14} /></button>
                            <button className="btn-icon-only text-green"><CheckCircle size={14} /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* AI & Top Actors Row */}
                <div className="ui-dashboard-row">
                  <div className="ui-card half">
                    <div className="card-header">
                      <div className="card-title"><Zap size={18} className="text-gold" /> AI Creative Tools</div>
                      <div className="ai-badge-sm">Active</div>
                    </div>
                    <p className="card-subtitle">Use AI to turn briefs into posters, roles, and ideas.</p>
                    
                    <div className="ai-poster-creator" onClick={(e) => e.stopPropagation()}>
                      <div className="ai-input-wrapper">
                        <input 
                          type="text" 
                          placeholder="Describe requirement (e.g. Action Hero for Netflix)..." 
                          className="ai-input-sm"
                          value={aiPosterPrompt}
                          onChange={(e) => setAiPosterPrompt(e.target.value)}
                        />
                        <div className="suggested-chips-mini">
                          <span className="chip-xs" onClick={() => setAiPosterPrompt("Action Hero for Netflix")}>Action Hero</span>
                          <span className="chip-xs" onClick={() => setAiPosterPrompt("Romantic Lead for Amazon")}>Romantic Lead</span>
                          <span className="chip-xs" onClick={() => setAiPosterPrompt("Commercial Audition")}>Commercial</span>
                        </div>
                      </div>
                      <button 
                        className="ui-btn-gold-sm" 
                        onClick={handleAiPosterGen}
                        disabled={isGeneratingPoster || !aiPosterPrompt}
                      >
                        {isGeneratingPoster ? <Loader2 size={14} className="animate-spin" /> : <Pencil size={14} />}
                        <span>{isGeneratingPoster ? 'Generating...' : 'Gen Poster'}</span>
                      </button>
                    </div>

                    <div className="card-content-area">
                      <div className="poster-list">
                        <div className="poster-item-ui">
                          <div className="poster-preview-mini casting">
                            <img 
                              src="https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=100" 
                              alt="Casting Preview" 
                              className="mini-preview-img"
                            />
                          </div>
                          <div className="poster-details">
                            <span className="poster-name">Casting Call: TV Commercial</span>
                            <span className="poster-meta">Target: Male/Female (20-35) • Mumbai • ₹25,000/day</span>
                          </div>
                          <button className="ui-btn-whatsapp-xs"><MessageSquare size={12} /> Share</button>
                        </div>
                        <div className="poster-item-ui">
                          <div className="poster-preview-mini christmas">
                            <img 
                              src="https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=100" 
                              alt="Festive Preview" 
                              className="mini-preview-img"
                            />
                          </div>
                          <div className="poster-details">
                            <span className="poster-name">Festive Special: Kids Audition</span>
                            <span className="poster-meta">Target: Kids (5-12) • PAN India • Digital Shoot</span>
                          </div>
                          <button className="ui-btn-whatsapp-xs"><MessageSquare size={12} /> Share</button>
                        </div>
                      </div>

                      <div className="poster-collection-sample">
                        <div className="collection-header">
                          <span className="collection-label">Generated Poster Collection</span>
                        </div>
                        <div className="poster-grid-mini">
                          <div className="poster-sample-card primary">
                            <img 
                              src="/assets/casting-call.jpg" 
                              alt="Casting Call Poster" 
                              className="poster-sample-img"
                              onError={(e) => {
                                e.target.src = "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&q=80&w=800";
                              }}
                            />
                            <div className="poster-sample-overlay top-left">
                              <span className="poster-tag">Latest Gen</span>
                            </div>
                            <div className="poster-sample-overlay bottom-right">
                              <span className="agency-branding-sm">Raj Malhotra Casting × JAMz</span>
                            </div>
                          </div>
                          <div className="poster-sample-card secondary">
                            <img 
                              src="https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=400" 
                              alt="Festive Poster" 
                              className="poster-sample-img" 
                            />
                            <div className="poster-sample-overlay top-left">
                              <span className="poster-tag mini">Festive</span>
                            </div>
                            <div className="poster-sample-overlay bottom-right">
                              <span className="agency-branding-xs">RMC</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="ai-brief-breakdown" onClick={(e) => e.stopPropagation()}>
                        <div className="card-subtitle">Paste a short brief and see a sample role breakdown.</div>
                        <div className="brief-layout">
                          <div className="brief-input">
                            <textarea 
                              className="brief-textarea" 
                              placeholder="Paste a short scene or casting brief..."
                            />
                          </div>
                          <div className="brief-output">
                            <div className="brief-output-title">
                              <Zap size={12} /> AI Role Breakdown
                            </div>
                            <ul className="brief-role-list">
                              <li>Lead: Action hero, 28–35, Hindi and English fluent.</li>
                              <li>Supporting: Best friend, 25–32, strong comic timing.</li>
                              <li>Recurring: Police officer, 35–45, authoritative presence.</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ui-card half">
                    <div className="card-header">
                      <div className="card-title"><Search size={18} className="text-gold" /> Deep Talent Search & Vault</div>
                      <div className="ai-badge-sm">Private</div>
                    </div>
                    <p className="card-subtitle">Search your private vault and wider network with precision.</p>
                    
                    <div className="deep-search-controls" onClick={(e) => e.stopPropagation()}>
                      <div className="mandatory-filters-row">
                        <div className="age-multi-select">
                          <span className="multi-label">Age Groups:</span>
                          <div className="age-tags">
                            {['Kids', 'Teens', '20s', '30s', '40s+'].map(age => (
                              <button 
                                key={age}
                                className={`age-tag-btn ${mandatoryFilters.ageGroups.includes(age) ? 'active' : ''}`}
                                onClick={() => toggleAgeGroup(age)}
                              >
                                {age}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {dynamicFilters.length > 0 && (
                        <div className="dynamic-filters-row">
                          <span className="dynamic-label">Auto-detected filters:</span>
                          <div className="dynamic-tags">
                            {dynamicFilters.map(filter => (
                              <span key={filter.id} className="dynamic-tag">
                                <Zap size={10} /> {filter.label}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="command-box-row">
                        <textarea 
                          placeholder="Type your command (e.g., 'Find a tall actor for an action role who knows martial arts')..."
                          value={searchCommand}
                          onChange={(e) => setSearchCommand(e.target.value)}
                          className="command-textarea"
                        />
                        <button 
                          className="ui-btn-gold-sm" 
                          onClick={handleVaultSearch}
                          disabled={isVaultSearching}
                        >
                          {isVaultSearching ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
                          <span>Execute Command</span>
                        </button>
                      </div>
                    </div>

                    <div className="dual-search-results">
                      <div className="results-section">
                        <div className="section-label">Private vault</div>
                        <div className="top-actors-list">
                          {(vaultResults.length > 0 ? vaultResults : [
                            {
                              id: 1,
                              name: "Arjun Sharma",
                              score: 4.8,
                              jobs: 12,
                              instagram: "arjun_sharma_actor",
                              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop",
                              tags: ["Trained"]
                            },
                            {
                              id: 2,
                              name: "Priya Patel",
                              score: 2.1,
                              jobs: 5,
                              instagram: "priya_patel_official",
                              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
                              tags: ["Flagged"],
                              isFlagged: true
                            }
                          ]).map((actor, idx) => (
                            <div key={actor.id} className={`actor-item ${actor.isFlagged ? 'flagged' : ''}`}>
                              <div className="rank">{idx + 1}</div>
                              <div className="avatar">
                                <img src={actor.image} alt={actor.name} loading="lazy" />
                                {actor.isVault && <div className="vault-avatar-badge"><Zap size={8} /></div>}
                              </div>
                              <div className="info">
                                <div className="name-row">
                                  <div className="name">{actor.name}</div>
                                  {actor.instagram && (
                                    <a 
                                      href={`https://instagram.com/${actor.instagram}`} 
                                      target="_blank" 
                                      rel="noopener noreferrer" 
                                      className="insta-link-mini"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <Instagram size={12} />
                                      <span>@{actor.instagram}</span>
                                    </a>
                                  )}
                                  {actor.isVault && <span className="badge-vault">Vault Profile</span>}
                                  {actor.tags.map(tag => (
                                    <span key={tag} className={`badge-${tag.toLowerCase().replace(' ', '-')}`}>{tag}</span>
                                  ))}
                                  {actor.isFlagged && <Flag size={12} className="icon-red-flag" />}
                                </div>
                                <div className="score-row">
                                  <div className={`star-rating ${actor.isFlagged ? 'low' : ''}`}>
                                    <Star size={10} fill={actor.isFlagged ? "#ef4444" : "#fbbf24"} color={actor.isFlagged ? "#ef4444" : "#fbbf24"} />
                                    <span className="score-val">{actor.score}</span>
                                  </div>
                                  <span className="feedback-count">({actor.jobs} jobs)</span>
                                </div>
                                <div className="similar-talent-row">
                                  <span className="similar-label">
                                    <Zap size={10} /> Similar talent:
                                  </span>
                                  <div className="similar-tags">
                                    {(idx === 0 
                                      ? ["Action-ready male, 28–35", "High reliability"] 
                                      : ["Drama lead, 25–32", "Trained"]
                                    ).map(label => (
                                      <span key={label} className="similar-tag">{label}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="results-section premium-gated">
                        <div className="section-label">
                          Jamz Talent base
                          <span className="premium-badge">Premium</span>
                        </div>
                        <div className="locked-state">
                          <div className="locked-content">
                            <Zap size={24} className="text-gold mb-2" />
                            <div className="match-count">1,240+ Potential Matches</div>
                            <p>Global talent network access requires a premium subscription.</p>
                            <button className="ui-btn-gold-xs" onClick={(e) => { e.stopPropagation(); onCtaClick(); }}>View Plans</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Communication & Outreach Section */}
                <div className="ui-section-title">Communication & Outreach Hub</div>
                <div className="ui-communication-row">
                  {/* WhatsApp Outreach */}
                  <div className="ui-card">
                    <div className="card-header">
                      <div className="card-title text-green"><MessageSquare size={18} /> Communication & Outreach</div>
                      <div className="ai-badge-sm"><Zap size={10} /> Smart Hub</div>
                    </div>
                    <div className="whatsapp-management" onClick={(e) => e.stopPropagation()}>
                      <div className="ai-message-box">
                        <textarea 
                          placeholder="Draft your outreach message..." 
                          className="ai-textarea-sm"
                          value={outreachMessage}
                          onChange={(e) => setOutreachMessage(e.target.value)}
                        />
                        <div className="ai-action-row">
                          <button 
                            className="ai-btn-text" 
                            onClick={handleAiRewrite}
                            disabled={isAiRewriting || !outreachMessage}
                          >
                            {isAiRewriting ? <Loader2 size={10} className="animate-spin" /> : <Zap size={10} />}
                            AI Professional Rewrite
                          </button>
                          <div className="suggested-chips">
                            <span className="chip" onClick={() => setOutreachMessage("Hi, are you available for an audition tomorrow?")}>Availability?</span>
                            <span className="chip" onClick={() => setOutreachMessage("Great news! You've been shortlisted for Project Shadow.")}>Shortlisted!</span>
                          </div>
                        </div>
                        <div className="ai-review-row">
                          <span className="ai-review-label">
                            <Zap size={10} /> AI Review:
                          </span>
                          <span className="ai-review-text">Tone looks professional. Likely to get a quick response.</span>
                        </div>
                      </div>

                      <div className="broadcast-options">
                        <div className="broadcast-card">
                          <div className="b-icon"><Users size={16} /></div>
                          <div className="b-info">
                            <span className="b-title">Group Outreach</span>
                            <span className="b-desc">Broadcasting to all 120 applicants</span>
                          </div>
                          <button className="btn-send-wa"><Zap size={12} /> Send</button>
                        </div>
                        <div className="broadcast-card">
                          <div className="b-icon sub"><Users size={16} /></div>
                          <div className="b-info">
                            <span className="b-title">Sub-Group Filter</span>
                            <span className="b-desc">Shortlisted (12) • Trained Only</span>
                          </div>
                          <button className="btn-send-wa"><Zap size={12} /> Send</button>
                        </div>
                        <div className="broadcast-card">
                          <div className="b-icon individual"><UserPlus size={16} /></div>
                          <div className="b-info">
                            <span className="b-title">Individual Connect</span>
                            <span className="b-desc">Personalized 1:1 reaching</span>
                          </div>
                          <button className="btn-send-wa"><Zap size={12} /> Chat</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reporting & Insights Section */}
                  <div className="ui-card">
                    <div className="card-header">
                      <div className="card-title text-gold"><BarChart size={18} /> Reporting & Insights</div>
                      <div className="ai-badge-sm">Performance</div>
                    </div>
                    <div className="comm-trail-content" onClick={(e) => e.stopPropagation()}>
                      <div className="comm-summary-stats">
                        <div className="summary-stat-item">
                          <span className="stat-label">Total Messages</span>
                          <span className="stat-value">1,452</span>
                        </div>
                        <div className="summary-stat-item">
                          <span className="stat-label">Avg. Response Time</span>
                          <span className="stat-value">14m</span>
                        </div>
                        <div className="summary-stat-item">
                          <span className="stat-label">Success Rate</span>
                          <span className="stat-value">92%</span>
                        </div>
                      </div>

                      <div className="comm-timeline">
                        <div className="timeline-item">
                          <div className="timeline-marker"></div>
                          <div className="timeline-info">
                            <span className="timeline-time">10:30 AM</span>
                            <span className="timeline-text">Bulk outreach sent for <strong>Lead Male</strong></span>
                            <span className="timeline-tag">Outreach</span>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-marker success"></div>
                          <div className="timeline-info">
                            <span className="timeline-time">11:15 AM</span>
                            <span className="timeline-text">12 Auditions received for <strong>Project Shadow</strong></span>
                            <span className="timeline-tag-green">Updates</span>
                          </div>
                        </div>
                        <div className="timeline-item">
                          <div className="timeline-marker alert"></div>
                          <div className="timeline-info">
                            <span className="timeline-time">Yesterday</span>
                            <span className="timeline-text">Client feedback shared with 5 talents</span>
                            <span className="timeline-tag-blue">Sharing</span>
                          </div>
                        </div>
                      </div>

                      <button className="ui-btn-outline-full">View Detailed Report</button>
                    </div>
                  </div>
                </div>

                <div className="ui-section-title">Casting Director Control Center</div>
                <div className="cd-control-centre-wrapper">
                  {!activeModule ? (
                    <div className="cd-modules-grid">
                      {modules.map(mod => (
                        <div 
                          key={mod.id} 
                          className={`cd-module-card clickable-card ${mod.color}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveModule(mod.id);
                          }}
                        >
                          <div className="module-card-header">
                            <div className="module-icon">{mod.icon}</div>
                            <h3 className="cd-module-title">{mod.title}</h3>
                          </div>
                          <p className="cd-module-desc">{mod.desc}</p>
                          <ul className="cd-module-list">
                            {mod.items.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                          <div className="module-card-footer">
                            <span className="launch-text">Launch Module</span>
                            <ExternalLink size={14} />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    renderModuleContent()
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPreview;
