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
  Loader2
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
    ageGroups: [] // Changed to array for multi-selection
  });
  const [isVaultSearching, setIsVaultSearching] = useState(false);
  const [vaultResults, setVaultResults] = useState([]);
  const [isGeneratingPoster, setIsGeneratingPoster] = useState(false);
  const [aiPosterPrompt, setAiPosterPrompt] = useState('');
  const [outreachMessage, setOutreachMessage] = useState('');
  const [isAiRewriting, setIsAiRewriting] = useState(false);
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
              <p>You’re exploring a sandbox preview of JAMz. Join the waitlist to be first in line for the full platform.</p>
            </div>
            <button className="demo-cta-inline" onClick={onCtaClick}>Join Waitlist</button>
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
                      <FileSignature size={18} />
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
                      <Share2 size={18} />
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
                      <Facebook size={11} />
                      <Instagram size={11} />
                      <MessageCircle size={11} />
                      <MessageSquare size={11} />
                    </div>
                  </div>
                </div>

                <div className="ui-card next-best-actions-card">
                  <div className="card-header">
                    <div className="card-title">
                      <Zap size={16} className="text-gold" /> Next Best Actions
                    </div>
                  </div>
                  <div className="next-actions-list">
                    <div className="next-action-item">
                      <span className="next-action-label">Follow up with 12 talents who opened but did not reply.</span>
                      <button className="ui-btn-outline-sm">View list</button>
                    </div>
                    <div className="next-action-item">
                      <span className="next-action-label">Schedule auditions for shortlisted profiles this week.</span>
                      <button className="ui-btn-outline-sm">Plan slots</button>
                    </div>
                    <div className="next-action-item">
                      <span className="next-action-label">Review 1 flagged profile before sending final shortlist.</span>
                      <button className="ui-btn-outline-sm">Review now</button>
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
                      <div className="card-title"><Zap size={18} className="text-gold" /> Deep Search Command Center</div>
                    </div>
                    
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

                {/* Communication Management Section */}
                <div className="ui-section-title">Communication Centre</div>
                <div className="ui-communication-row">
                  {/* WhatsApp Outreach */}
                  <div className="ui-card">
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

                <div className="ui-section-title">Casting Director Control Center</div>
                <div className="cd-modules-grid">
                  <div className="cd-module-card">
                    <h3 className="cd-module-title">Project & Role Management</h3>
                    <p className="cd-module-desc">Create, manage, and track projects and roles in one place.</p>
                    <ul className="cd-module-list">
                      <li>Project overview & quick statuses</li>
                      <li>Role briefs, requirements, and deadlines</li>
                      <li>Applicants, shortlisted, and confirmed counts</li>
                    </ul>
                  </div>

                  <div className="cd-module-card">
                    <h3 className="cd-module-title">Funnel & Casting Health Analytics</h3>
                    <p className="cd-module-desc">Understand where each casting stands and what needs attention.</p>
                    <ul className="cd-module-list">
                      <li>Funnel from invite to finalised</li>
                      <li>Casting health score drill-down</li>
                      <li>Drop-off reasons and bottlenecks</li>
                    </ul>
                  </div>

                  <div className="cd-module-card">
                    <h3 className="cd-module-title">Smart Agreements & Compliance</h3>
                    <p className="cd-module-desc">Centralise contracts, consent, and paperwork for every talent.</p>
                    <ul className="cd-module-list">
                      <li>Generate and track agreements</li>
                      <li>Minor consent and legal documents</li>
                      <li>Status: not sent, sent, signed, issues</li>
                    </ul>
                  </div>

                  <div className="cd-module-card">
                    <h3 className="cd-module-title">Deep Talent Search & Vault</h3>
                    <p className="cd-module-desc">Search your private vault and wider network with precision.</p>
                    <ul className="cd-module-list">
                      <li>Filters for age, look, skills, languages</li>
                      <li>AI search commands and suggestions</li>
                      <li>Saved searches and reusable lists</li>
                    </ul>
                  </div>

                  <div className="cd-module-card">
                    <h3 className="cd-module-title">Communication & Outreach</h3>
                    <p className="cd-module-desc">Run all casting communication from one control centre.</p>
                    <ul className="cd-module-list">
                      <li>Broadcast, sub-group, and 1:1 outreach</li>
                      <li>AI rewrites and tone checks</li>
                      <li>Templates across WhatsApp, email, SMS</li>
                    </ul>
                  </div>

                  <div className="cd-module-card">
                    <h3 className="cd-module-title">Scheduling & Availability</h3>
                    <p className="cd-module-desc">Coordinate auditions and callbacks without manual chaos.</p>
                    <ul className="cd-module-list">
                      <li>Slot planning for auditions</li>
                      <li>Talent availability and confirmations</li>
                      <li>Auto-reminders and rescheduling</li>
                    </ul>
                  </div>

                  <div className="cd-module-card">
                    <h3 className="cd-module-title">Shortlisting & Evaluation</h3>
                    <p className="cd-module-desc">Compare and curate the right mix of talents for each role.</p>
                    <ul className="cd-module-list">
                      <li>Side-by-side comparisons and notes</li>
                      <li>Internal vs client shortlist versions</li>
                      <li>Team ratings and opinions</li>
                    </ul>
                  </div>

                  <div className="cd-module-card">
                    <h3 className="cd-module-title">Client Share & Handover</h3>
                    <p className="cd-module-desc">Present cast options cleanly to clients and track feedback.</p>
                    <ul className="cd-module-list">
                      <li>Branded client links and decks</li>
                      <li>Client like / maybe / no feedback</li>
                      <li>Round-wise shortlist history</li>
                    </ul>
                  </div>

                  <div className="cd-module-card">
                    <h3 className="cd-module-title">Talent Feedback & History</h3>
                    <p className="cd-module-desc">Build long-term relationships and memory with your talent base.</p>
                    <ul className="cd-module-list">
                      <li>Performance notes per audition</li>
                      <li>Internal-only tags and flags</li>
                      <li>Optional feedback sharing with talent</li>
                    </ul>
                  </div>

                  <div className="cd-module-card">
                    <h3 className="cd-module-title">AI Creative Tools</h3>
                    <p className="cd-module-desc">Use AI to turn briefs into posters, roles, and ideas.</p>
                    <ul className="cd-module-list">
                      <li>Visual outreach posters and creatives</li>
                      <li>AI role breakdown from client briefs</li>
                      <li>Suggestions for diversity and options</li>
                    </ul>
                  </div>

                  <div className="cd-module-card">
                    <h3 className="cd-module-title">Reporting & Insights</h3>
                    <p className="cd-module-desc">See what is working across clients, projects, and talents.</p>
                    <ul className="cd-module-list">
                      <li>Client and project performance reports</li>
                      <li>Time-to-cast and success metrics</li>
                      <li>Top collaborators and talent reliability</li>
                    </ul>
                  </div>

                  <div className="cd-module-card">
                    <h3 className="cd-module-title">Team & Permissions</h3>
                    <p className="cd-module-desc">Run your casting office with clear roles and access.</p>
                    <ul className="cd-module-list">
                      <li>Coordinator, assistant, and admin roles</li>
                      <li>Task assignments and responsibilities</li>
                      <li>Access control for sensitive data</li>
                    </ul>
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
