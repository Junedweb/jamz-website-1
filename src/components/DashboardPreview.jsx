import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  Trophy, 
  UserCircle, 
  LogOut,
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
  Activity,
  Flag,
  CheckCircle,
  Lock,
  Search,
  Filter,
  FileSignature,
  Share2,
  HeartHandshake,
  AlertTriangle,
  ExternalLink,
  MessageSquare,
  X,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

function DashboardPreview({ onCtaClick }) {
  const [dateTime, setDateTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [isChristmas, setIsChristmas] = useState(false);
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

  const selectedProject = projects.find(p => p.id === selectedProjectId);
  const selectedCasting = selectedProject.castings.find(c => c.id === selectedCastingId) || selectedProject.castings[0];

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
          <h2>See the <span className="text-gradient-gold">Vision in Action</span></h2>
          <p>
            Explore our pre-launch interactive demonstration to see how we're building the future of casting.
          </p>
        </div>

        <div className="dashboard-preview-wrapper animate-float" onClick={handleDashboardClick}>
          <div className="preview-header-meta">
            <div className="preview-badge">
              <span className="pulse-dot"></span>
              INTERACTIVE APP DEMONSTRATION
            </div>
          </div>
          
          <div className="browser-window">
            <div className="browser-top-bar">
              <div className="browser-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="browser-address-bar">
                www.jamzconnect.com/Mukesh
              </div>
            </div>
            
            <div className="dashboard-real-ui">
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
                
                <div className="ui-nav">
                  <div className="ui-nav-item active"><LayoutDashboard size={16} /> <span>Dashboard</span></div>
                  <div className="ui-nav-item"><Users size={16} /> <span>Talent</span></div>
                  <div className="ui-nav-item"><Briefcase size={16} /> <span>Roles</span></div>
                  <div className="ui-nav-item"><FileText size={16} /> <span>Scripts</span></div>
                  <div className="ui-nav-item"><FileSignature size={16} /> <span>Contracts</span></div>
                </div>

                <div className="ui-user">
                  <div className="ui-user-info">
                    <div className="ui-avatar">M</div>
                    <div className="ui-user-details">
                      <span className="ui-user-name">Mukesh CD</span>
                      <span className="ui-user-role">Admin</span>
                    </div>
                  </div>
                  <button className="ui-logout-btn" title="Logout">
                    <LogOut size={16} />
                  </button>
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
              <div className="ui-dashboard-banner">
                <div className="banner-content">
                  <div className="banner-title">
                    <span role="img" aria-label="clapper">
                      {isChristmas ? '🎄' : '🎬'}
                    </span>
                    <h2>{greeting}, Mukesh CD {isChristmas && '🎅'}</h2>
                  </div>
                  <p>{isChristmas ? 'Merry Christmas! Managing ' : 'Currently managing '} <span className="text-gold-bold">{selectedProject.name}</span> for {selectedProject.client}</p>
                  <div className="banner-badges">
                    <span className="badge-admin">Admin • cd-mukesh</span>
                    <span className="badge-active-project">{selectedProject.castings.length} Active Castings</span>
                  </div>
                </div>
                <div className="banner-date">
                  <div className="banner-date-day">{formatDate(dateTime)}</div>
                  <div className="banner-date-time">{formatTime(dateTime)}</div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="ui-stats-grid">
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
                    <div className="stat-value">50+</div>
                    <span className="stat-sub">Contacts Sent</span>
                  </div>
                  <div className="stat-mini-text">WhatsApp & SMS Bulk</div>
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
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="talent-contact-card">
                        <div className="talent-avatar-row">
                          <div className="mini-avatar">T{i}</div>
                          <div className="talent-brief">
                            <span className="talent-name">Talent Profile #{100 + i}</span>
                            <span className="talent-location">Mumbai, India</span>
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
                    <div className="card-title"><Zap size={18} /> AI Script Breakdowns</div>
                    <button className="ui-btn-gold">Upload Script</button>
                  </div>
                  <p className="card-subtitle">8 scripts read by AI</p>
                  <div className="card-empty-state">
                    <div className="script-list">
                      <div className="script-item-ui">
                        <FileText size={16} color="var(--primary)" />
                        <div className="script-details">
                          <span className="script-name">The_Midnight_Heist.pdf</span>
                          <span className="script-meta">12 roles identified • 24 scenes</span>
                        </div>
                        <span className="badge-processed">Processed</span>
                      </div>
                      <div className="script-item-ui">
                        <FileText size={16} color="var(--primary)" />
                        <div className="script-details">
                          <span className="script-name">Project_Shadow.docx</span>
                          <span className="script-meta">8 roles identified • 15 scenes</span>
                        </div>
                        <span className="badge-processed">Processed</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ui-card half">
                  <div className="card-header">
                    <div className="card-title"><Search size={18} /> Deep Search Results</div>
                    <button className="ui-btn-outline-sm">Filter</button>
                  </div>
                  <p className="card-subtitle">Showing: Trained • Intro Video</p>
                  <div className="top-actors-list">
                    <div className="actor-item">
                      <div className="rank">1</div>
                      <div className="avatar">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop" alt="Arjun Sharma" />
                      </div>
                      <div className="info">
                        <div className="name-row">
                          <div className="name">Arjun Sharma</div>
                          <span className="badge-trained">Trained</span>
                        </div>
                        <div className="score-row">
                           <div className="star-rating">
                             <Star size={10} fill="#fbbf24" color="#fbbf24" />
                             <span className="score-val">4.8</span>
                           </div>
                           <span className="feedback-count">(12 jobs)</span>
                        </div>
                      </div>
                    </div>
                    <div className="actor-item flagged">
                      <div className="rank">2</div>
                      <div className="avatar">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop" alt="Priya Patel" />
                      </div>
                      <div className="info">
                        <div className="name-row">
                          <div className="name">Priya Patel</div>
                          <Flag size={12} className="icon-red-flag" />
                        </div>
                        <div className="score-row">
                           <div className="star-rating low">
                             <Star size={10} fill="#ef4444" color="#ef4444" />
                             <span className="score-val">2.1</span>
                           </div>
                           <span className="feedback-alert">Low Score Alert</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Team Management */}
              <div className="ui-team-section">
                <div className="team-header">
                  <div className="team-title">
                    <UserPlus size={18} />
                    <div>
                      <h3>Team Management</h3>
                      <p>3 active team members</p>
                    </div>
                  </div>
                  <button className="ui-btn-maroon">Invite Member</button>
                </div>
                
                <div className="team-members-list">
                  <div className="team-member-card">
                    <div className="member-avatar">
                      <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&fit=crop" alt="Sarah J." />
                      <div className="status-indicator online"></div>
                    </div>
                    <div className="member-info">
                      <h4>Sarah Jenkins</h4>
                      <p>Senior Casting Director</p>
                    </div>
                    <button className="btn-member-action">Manage</button>
                  </div>

                  <div className="team-member-card">
                    <div className="member-avatar">
                      <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&fit=crop" alt="Rahul S." />
                      <div className="status-indicator online"></div>
                    </div>
                    <div className="member-info">
                      <h4>Rahul Sharma</h4>
                      <p>Associate Director</p>
                    </div>
                    <button className="btn-member-action">Manage</button>
                  </div>

                  <div className="team-member-card">
                    <div className="member-avatar">
                      <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&h=150&fit=crop" alt="Emma W." />
                      <div className="status-indicator offline"></div>
                    </div>
                    <div className="member-info">
                      <h4>Emma Watson</h4>
                      <p>Junior CD</p>
                    </div>
                    <button className="btn-member-action">Manage</button>
                  </div>
                </div>

                <div className="quick-actions-grid">
                  <div className="action-card">
                    <Users size={20} />
                    <span>Browse Actors</span>
                  </div>
                  <div className="action-card">
                    <Briefcase size={20} />
                    <span>Create Role</span>
                  </div>
                  <div className="action-card">
                    <Zap size={20} />
                    <span>AI Breakdown</span>
                  </div>
                  <div className="action-card">
                    <Trophy size={20} />
                    <span>Leaderboard</span>
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

                <div className="ui-role-card-detailed">
                  <div className="role-card-header">
                    <div className="role-main-info">
                      <div className="role-title-row">
                        <h3>Supporting Female - Romantic Lead</h3>
                        <span className="badge-orange-soft">Auditioning</span>
                      </div>
                      <h4>Dr. Sarah Mitchell</h4>
                      <p>A brilliant neurosurgeon who becomes the love interest. Intelligent, independent, and compassionate.</p>
                    </div>
                    <div className="role-card-actions">
                      <button className="ui-btn-outline-sm"><Eye size={14} /> View Details</button>
                      <button className="ui-btn-dark-sm">Manage</button>
                    </div>
                  </div>
                  
                  <div className="role-metadata">
                    <div className="meta-item"><Users size={14} /> 67 applicants</div>
                    <div className="meta-item"><Calendar size={14} /> Due: 2026-01-20</div>
                    <div className="meta-item"><MapPin size={14} /> New York, NY</div>
                    <div className="meta-item"><Clock size={14} /> Posted: 2025-12-05</div>
                  </div>

                  <div className="role-tags">
                    <span className="ui-tag">Female</span>
                    <span className="ui-tag">26-32 years</span>
                    <span className="ui-tag">English</span>
                    <span className="ui-tag-green">$30,000 - $45,000</span>
                  </div>

                  <div className="role-progress-section">
                    <div className="progress-info">
                      <span className="shortlisted-text">12 shortlisted</span>
                      <span className="total-text">of 67 total</span>
                    </div>
                    <div className="progress-bar-container">
                      <div className="progress-bar-fill" style={{ width: '22%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actors Gallery */}
              <div className="ui-section-title">Featured Talent</div>
              <div className="ui-actors-grid-new">
                <div className="ui-actor-card-new">
                  <div className="actor-image-container">
                    <div className="actor-image-placeholder">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=600&fit=crop&fm=jpg" alt="Arjun Sharma" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                      <span className="badge-available">Available</span>
                      <div className="view-icon"><Eye size={16} /></div>
                    </div>
                  </div>
                  <div className="actor-info-new">
                    <h3>Arjun Sharma</h3>
                    <p className="age-text">28 years old</p>
                    <span className="badge-private-sm">Private</span>
                  </div>
                  <div className="actor-card-btns">
                    <button className="btn-ui-icon"><Pencil size={14} /> Edit</button>
                    <button className="btn-ui-icon"><Upload size={14} /> Upload</button>
                    <button className="btn-ui-dark"><Video size={14} /> Video</button>
                  </div>
                </div>
              </div>

              {/* Actor Top Actions */}
              <div className="ui-actor-actions">
                <div className="action-circle-item">
                  <div className="circle-bg green"><Pencil size={20} color="#16a34a" /></div>
                  <span>Edit Profile</span>
                </div>
                <div className="action-circle-item">
                  <div className="circle-bg blue"><ImageIcon size={20} color="#2563eb" /></div>
                  <span>Upload Images</span>
                </div>
                <div className="action-circle-item">
                  <div className="circle-bg red"><Video size={20} color="#dc2626" /></div>
                  <span>Share Video</span>
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
