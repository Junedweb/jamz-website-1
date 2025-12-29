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
  Snowflake
} from 'lucide-react';

function DashboardPreview({ onCtaClick }) {
  const [dateTime, setDateTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [isChristmas, setIsChristmas] = useState(false);
  const [showDemoMsg, setShowDemoMsg] = useState(false);

  const handleDashboardClick = (e) => {
    setShowDemoMsg(true);
    setTimeout(() => setShowDemoMsg(false), 4000);
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
    <section id="dashboard" className={`dashboard-preview-section reveal ${isChristmas ? 'festive-christmas' : ''}`} style={{ padding: '80px 0', background: 'var(--bg-light)', position: 'relative', overflow: 'hidden' }}>
      {showDemoMsg && (
        <div className="demo-notification">
          <div className="demo-notification-content">
            <Zap size={20} className="icon-gold" />
            <div>
              <strong>Interactive Preview Mode</strong>
              <p>You're exploring a sandbox version of JAMz. Book a demo to see the full power of AI-driven casting on your own live dashboard.</p>
            </div>
            <button className="demo-cta-inline" onClick={onCtaClick}>Get Full Access</button>
          </div>
        </div>
      )}

      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>See the <span className="text-gradient-gold">App in Action</span></h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Take a look at how JAMz simplifies your casting workflow with our intuitive, interactive app demonstration.
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
                <div className="ui-logo">JAM<span>z</span></div>
                
                <div className="ui-nav">
                  <div className="ui-nav-item active"><LayoutDashboard size={16} /> <span>Dashboard</span></div>
                  <div className="ui-nav-item"><Users size={16} /> <span>Actors</span></div>
                  <div className="ui-nav-item"><Briefcase size={16} /> <span>Roles</span></div>
                  <div className="ui-nav-item"><FileText size={16} /> <span>Scripts</span></div>
                  <div className="ui-nav-item"><Trophy size={16} /> <span>Leaderboard</span></div>
                  <div className="ui-nav-item"><UserCircle size={16} /> <span>Talent Profiles</span></div>
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

              {/* Dashboard Hero Banner */}
              <div className="ui-dashboard-banner">
                <div className="banner-content">
                  <div className="banner-title">
                    <span role="img" aria-label="clapper">
                      {isChristmas ? '🎄' : '🎬'}
                    </span>
                    <h2>{greeting}, Mukesh CD {isChristmas && '🎅'}</h2>
                  </div>
                  <p>{isChristmas ? 'Merry Christmas! Enjoy festive casting with JAMz' : 'Manage your casting work easily with JAMz'}</p>
                  <div className="banner-badges">
                    <span className="badge-admin">Admin • cd-mukesh</span>
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
                  <Briefcase size={24} />
                  <div className="stat-value">5</div>
                  <div className="stat-label">Active Roles</div>
                </div>
                <div className="stat-card green">
                  <Users size={24} />
                  <div className="stat-value">12</div>
                  <div className="stat-label">Total Actors</div>
                </div>
                <div className="stat-card orange">
                  <Clock size={24} />
                  <div className="stat-value">3</div>
                  <div className="stat-label">Awaiting Profile</div>
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
                    <div className="card-title"><Trophy size={18} /> Top Actors</div>
                    <button className="ui-btn-outline-sm">Full Board</button>
                  </div>
                  <p className="card-subtitle">Weekly leaderboard highlights</p>
                  <div className="top-actors-list">
                    <div className="actor-item">
                      <div className="rank">1</div>
                      <div className="avatar">
                        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&auto=format&fit=crop" alt="Arjun Sharma" />
                      </div>
                      <div className="info">
                        <div className="name">Arjun Sharma</div>
                        <div className="score-bar"><div className="fill" style={{ width: '85%' }}></div><span>85 pts</span></div>
                      </div>
                    </div>
                    <div className="actor-item">
                      <div className="rank">2</div>
                      <div className="avatar">
                        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop" alt="Priya Patel" />
                      </div>
                      <div className="info">
                        <div className="name">Priya Patel</div>
                        <div className="score-bar"><div className="fill" style={{ width: '72%' }}></div><span>72 pts</span></div>
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

              {/* Actor Rankings */}
              <div className="ui-leaderboard-section">
                <div className="section-header">
                  <div className="section-title"><Trophy size={20} color="#f59e0b" /> Actor Rankings</div>
                </div>
                
                <div className="rankings-list">
                  <div className="ranking-card gold-tier">
                    <div className="rank-badge"><Trophy size={16} /></div>
                    <div className="actor-avatar">
                      <img src="https://i.pravatar.cc/150?u=michael" alt="Michael Rodriguez" />
                    </div>
                    <div className="actor-main">
                      <h3>Michael Rodriguez</h3>
                      <div className="actor-stats-row">
                        <span><Eye size={12} /> 1234</span>
                        <span><Users size={12} /> 89</span>
                        <span><Trophy size={12} /> 18 matches</span>
                      </div>
                    </div>
                    <div className="actor-points">
                      <div className="points-val">2450</div>
                      <div className="points-label">points</div>
                      <div className="trend up">+15%</div>
                    </div>
                    <button className="ui-btn-outline-sm">View Profile</button>
                  </div>

                  <div className="ranking-card silver-tier">
                    <div className="rank-badge silver"><Trophy size={16} /></div>
                    <div className="actor-avatar">
                      <img src="https://i.pravatar.cc/150?u=emma" alt="Emma Thompson" />
                    </div>
                    <div className="actor-main">
                      <h3>Emma Thompson</h3>
                      <div className="actor-stats-row">
                        <span><Eye size={12} /> 1156</span>
                        <span><Users size={12} /> 76</span>
                        <span><Trophy size={12} /> 16 matches</span>
                      </div>
                    </div>
                    <div className="actor-points">
                      <div className="points-val">2380</div>
                      <div className="points-label">points</div>
                      <div className="trend up">+12%</div>
                    </div>
                    <button className="ui-btn-outline-sm">View Profile</button>
                  </div>

                  <div className="ranking-card bronze-tier">
                    <div className="rank-badge bronze"><Trophy size={16} /></div>
                    <div className="actor-avatar">
                      <img src="https://i.pravatar.cc/150?u=james" alt="James Wilson" />
                    </div>
                    <div className="actor-main">
                      <h3>James Wilson</h3>
                      <div className="actor-stats-row">
                        <span><Eye size={12} /> 1089</span>
                        <span><Users size={12} /> 67</span>
                        <span><Trophy size={12} /> 15 matches</span>
                      </div>
                    </div>
                    <div className="actor-points">
                      <div className="points-val">2290</div>
                      <div className="points-label">points</div>
                      <div className="trend up">+8%</div>
                    </div>
                    <button className="ui-btn-outline-sm">View Profile</button>
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
