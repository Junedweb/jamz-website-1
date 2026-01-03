import { useState, useEffect, useRef } from 'react';
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
  Snowflake,
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
  Loader2,
  ChevronDown
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

  // Deep Search States
  const [searchCommand, setSearchCommand] = useState('');
  const [mandatoryFilters, setMandatoryFilters] = useState({
    gender: '',
    ageGroups: [] // Changed to array for multi-selection
  });
  const [dynamicFilters, setDynamicFilters] = useState([]);
  const [isVaultSearching, setIsVaultSearching] = useState(false);
  const [vaultResults, setVaultResults] = useState([]);
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);
  const [aiPosterPrompt, setAiPosterPrompt] = useState('');
  const [outreachMessage, setOutreachMessage] = useState('');
  const [isAiRewriting, setIsAiRewriting] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const statsRef = useRef(null);
  const lastSectionRef = useRef(null);
  const dashboardContainerRef = useRef(null);

  const handleDashboardScroll = (e) => {
    if (isLocked) return;
    
    // Auto-scroll logic removed as per user request
  };

  // Add wheel event listener for desktop users who might be using a mouse 
  // while the dashboard is in a fixed-height container (like the browser-window if it had one)
  useEffect(() => {
    const container = dashboardContainerRef.current;
    if (!container || isLocked) return;

    const handleWheel = (e) => {
      // Auto-scroll logic removed as per user request
    };

    container.addEventListener('wheel', handleWheel, { passive: true });
    return () => container.removeEventListener('wheel', handleWheel);
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

  // Logic to suggest filters based on command
  useEffect(() => {
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
    
    setDynamicFilters(suggestions);
  }, [searchCommand]);

  const selectedProject = projects.find(p => p.id === selectedProjectId);
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
    if (!mandatoryFilters.gender || mandatoryFilters.ageGroups.length === 0) {
      alert("Please select mandatory filters (Gender & at least one Age Group)");
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
              <p>You're exploring a sandbox version of JAMz while we build the future. Join our waitlist to be among the first to experience the full platform.</p>
            </div>
            <button className="demo-cta-inline" onClick={onCtaClick}>Join Waitlist</button>
          </div>
        </div>
      )}

      <div className="container">
        <div className="section-header">
          <h2>AI-Powered <span className="text-gradient-gold">Casting Dashboard</span></h2>
          <p>
            Explore our pre-launch interactive demonstration to see how we're building the future of casting.
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
                      <Activity size={20} />
                      <span>Audition Funnel</span>
                    </div>
                    <div className="stat-value-row">
                      <div className="stat-value">{selectedCasting.talentCount}/{selectedCasting.applicants}</div>
                      <span className="stat-sub">Confirmed</span>
                    </div>
                    <div className="funnel-bar">
                      <div className="funnel-fill" style={{ width: `${(selectedCasting.talentCount / selectedCasting.applicants) * 100}%` }}></div>
                    </div>
                  </div>
                  <div className="stat-card green">
                    <div className="stat-header">
                      <FileSignature size={20} />
                      <span>Smart Agreements</span>
                    </div>
                    <div className="stat-value-row">
                      <div className="stat-value">12</div>
                      <span className="stat-sub">Signed</span>
                    </div>
                    <div className="stat-mini-text">T&C • Per Diem Active</div>
                  </div>
                  <div className="stat-card orange">
                    <div className="stat-header">
                      <Share2 size={20} />
                      <span>Easy Posting</span>
                    </div>
                    <div className="stat-value-row">
                      <div className="stat-value" style={{ fontSize: '1.2rem' }}>Link Socials</div>
                      <span className="stat-sub">1-Click Post</span>
                    </div>
                    <div className="posting-stats-row">
                      <div className="p-stat">
                        <span className="p-label">Today</span>
                        <span className="p-count">12</span>
                      </div>
                      <div className="p-stat">
                        <span className="p-label">MTD</span>
                        <span className="p-count">145</span>
                      </div>
                      <div className="p-stat">
                        <span className="p-label">Live</span>
                        <span className="p-count">1,240</span>
                      </div>
                    </div>
                    <div className="social-mini-icons">
                      <Facebook size={12} />
                      <Instagram size={12} />
                      <MessageCircle size={12} />
                      <MessageSquare size={12} />
                    </div>
                  </div>
                </div>

                {/* Activity Management Section */}
                <div className="ui-section-title">Activity Management</div>
                <div className="ui-activity-grid">
                  <div className="activity-card-mini">
                    <div className="activity-icon-mini blue"><Briefcase size={16} /></div>
                    <div className="activity-content-mini">
                      <span className="activity-label-mini">Projects</span>
                      <span className="activity-value-mini">{projects.length} Active</span>
                    </div>
                  </div>
                  <div className="activity-card-mini">
                    <div className="activity-icon-mini purple"><Users size={16} /></div>
                    <div className="activity-content-mini">
                      <span className="activity-label-mini">Castings</span>
                      <span className="activity-value-mini">{projects.reduce((acc, p) => acc + p.castings.length, 0)} Ongoing</span>
                    </div>
                  </div>
                  <div className="activity-card-mini">
                    <div className="activity-icon-mini orange"><Clock size={16} /></div>
                    <div className="activity-content-mini">
                      <span className="activity-label-mini">Followups</span>
                      <span className="activity-value-mini">6 Pending</span>
                    </div>
                  </div>
                  <div className="activity-card-mini">
                    <div className="activity-icon-mini green"><CheckCircle size={16} /></div>
                    <div className="activity-content-mini">
                      <span className="activity-label-mini">Shortlistings</span>
                      <span className="activity-value-mini">32 Selected</span>
                    </div>
                  </div>
                  <div className="activity-card-mini clickable">
                    <div className="activity-icon-mini gold"><MessageSquare size={16} /></div>
                    <div className="activity-content-mini">
                      <span className="activity-label-mini">Feedback</span>
                      <span className="activity-value-mini">Share with Talent</span>
                    </div>
                  </div>
                  <div className="activity-card-mini clickable">
                    <div className="activity-icon-mini maroon"><ExternalLink size={16} /></div>
                    <div className="activity-content-mini">
                      <span className="activity-label-mini">Client Share</span>
                      <span className="activity-value-mini">Share Shortlist</span>
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
                  </div>
                </div>

                {/* Multi-Project Casting Management Section */}
                <div className="ui-casting-management">
                  <div className="casting-sidebar">
                    <div className="sidebar-header">
                      <h3>Casting Requirements</h3>
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
                      <div className="card-title"><ImageIcon size={18} /> Visual Outreach Studio</div>
                      <div className="ai-badge-sm"><Zap size={10} /> AI Powered</div>
                    </div>
                    <p className="card-subtitle">Generate co-branded requirement posters with JAMz & Your Agency branding</p>
                    
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
                    </div>
                  </div>

                  <div className="ui-card half">
                    <div className="card-header">
                      <div className="card-title"><Zap size={18} className="text-gold" /> Deep Search Command Center</div>
                    </div>
                    
                    <div className="deep-search-controls" onClick={(e) => e.stopPropagation()}>
                      <div className="mandatory-filters-row">
                        <select 
                          value={mandatoryFilters.gender} 
                          onChange={(e) => setMandatoryFilters(prev => ({ ...prev, gender: e.target.value }))}
                          className="filter-select-sm gender-select"
                        >
                          <option value="">Gender (Req)</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        
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

                {/* Communication Management Section */}
                <div className="ui-section-title">Communication Centre</div>
                <div className="ui-communication-row">
                  {/* WhatsApp Outreach */}
                  <div className="ui-card" ref={lastSectionRef}>
                    <div className="card-header">
                      <div className="card-title text-green"><MessageCircle size={18} /> WhatsApp Outreach</div>
                      <div className="ai-badge-sm"><Zap size={10} /> Smart Select</div>
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

                  {/* Project Communication Trail & Summary */}
                  <div className="ui-card">
                    <div className="card-header">
                      <div className="card-title text-gold"><Activity size={18} /> Communication Trail & Summary</div>
                      <div className="ai-badge-sm">Project Wise</div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DashboardPreview;
