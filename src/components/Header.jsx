import { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileText, 
  Trophy, 
  UserCircle, 
  Search, 
  Plus, 
  LogOut,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Video,
  Image as ImageIcon,
  Pencil,
  Upload,
  Share2,
  MapPin,
  Calendar,
  DollarSign,
  Globe,
  UserPlus,
  ChevronRight,
  Monitor,
  Snowflake
} from 'lucide-react';

function Header({ onCtaClick }) {
  const [dateTime, setDateTime] = useState(new Date());
  const [greeting, setGreeting] = useState('');
  const [isChristmas, setIsChristmas] = useState(false);

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
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  return (
    <section className={`hero ${isChristmas ? 'festive-christmas' : ''}`}>
      {isChristmas && (
        <div className="snow-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="snowflake" style={{ 
              left: `${Math.random() * 100}%`, 
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}>
              <Snowflake size={12 + Math.random() * 10} color="white" opacity={0.6} />
            </div>
          ))}
        </div>
      )}
      <div className="bg-glow" style={{ 
        top: '-10%', 
        right: '-5%',
        background: dateTime.getHours() >= 18 || dateTime.getHours() < 6 
          ? 'radial-gradient(circle, rgba(30, 58, 138, 0.2) 0%, transparent 70%)' // Night glow
          : 'radial-gradient(circle, var(--primary-light) 0%, transparent 70%)'  // Day glow
      }}></div>
      <div className="bg-glow" style={{ bottom: '10%', left: '-5%', background: 'radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)', opacity: 0.05 }}></div>
      
      <div className="container fade-in">
        <div className="hero-content-main">
          <h1 style={{ marginBottom: '0.75rem' }}>
            <span className="shiny-gold-brown">JAMz: Introducing AI in Casting for</span> <br />
            <span style={{ color: 'var(--accent)' }}>Casting Directors & Acting Schools</span>
          </h1>
          <p className="sub-headline" style={{ maxWidth: '650px', margin: '0 auto 2rem' }}>
            The AI tool to help your casting business grow. Find the right actors 
            70% faster and manage more projects easily.
          </p>
          
          <div className="hero-benefits-row">
            <div className="hero-benefit">
              <Zap size={20} color="var(--accent)" />
              <span>70% Faster Search</span>
            </div>
            <div className="hero-benefit">
              <Trophy size={20} color="var(--accent)" />
              <span>Double Your Work</span>
            </div>
            <div className="hero-benefit">
              <Clock size={20} color="var(--accent)" />
              <span>Save 40+ Hours/Week</span>
            </div>
          </div>
        </div>
        
        <div className="cta-group">
          <a href="#" className="btn-primary" onClick={onCtaClick}>Book a Demo</a>
          <a href="#" className="btn-secondary" onClick={onCtaClick}>Request Access</a>
        </div>
        
        {/* Dashboard Preview Section */}
        <div className="dashboard-preview-container animate-float">
          <div className="dashboard-label">JAMz AI Dashboard Preview</div>
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
                  <div className="ui-avatar">J</div>
                  <div className="ui-user-details">
                    <span className="ui-user-name">Juned CD</span>
                    <span className="ui-user-role">Admin</span>
                  </div>
                </div>
                <button className="ui-logout-btn" title="Logout">
                  <LogOut size={16} />
                </button>
              </div>
            </div>

            {/* Dashboard Hero Banner (Image 1) */}
            <div className="ui-dashboard-banner">
              <div className="banner-content">
                <div className="banner-title">
                  <span role="img" aria-label="clapper">
                    {isChristmas ? '🎄' : '🎬'}
                  </span>
                  <h2>{greeting}, Juned CD {isChristmas && '🎅'}</h2>
                </div>
                <p>{isChristmas ? 'Merry Christmas! Enjoy festive casting with JAMz' : 'Manage your casting work easily with JAMz'}</p>
                <div className="banner-badges">
                  <span className="badge-admin">Admin • cd-juned</span>
                </div>
              </div>
              <div className="banner-date">
                {formatDate(dateTime)}<br />{formatTime(dateTime)}
              </div>
            </div>

            {/* Stats Grid (Image 1) */}
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

            {/* AI & Top Actors Row (Image 2) */}
            <div className="ui-dashboard-row">
              <div className="ui-card half">
                <div className="card-header">
                  <div className="card-title"><Zap size={18} /> AI Script Breakdowns</div>
                  <button className="ui-btn-gold">Upload Script</button>
                </div>
                <p className="card-subtitle">8 scripts read by AI</p>
                <div className="card-empty-state">
                  <img src="https://images.unsplash.com/photo-15120706327b2-ac7c5c64159d?q=80&w=300&h=200&fit=crop&fm=jpg" alt="Script Breakdown" style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem', opacity: 0.6 }} />
                  <h4>No scripts yet</h4>
                  <p>Upload a script to start</p>
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

            {/* Quick Actions & Team Management (Image 3 Style) */}
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
              
              <div className="team-empty-state">
                  <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=300&h=150&fit=crop&fm=jpg" alt="Team" style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem', opacity: 0.6 }} />
                  <h4>No members yet</h4>
                  <p>Invite your team to work together</p>
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

            {/* Roles List (Image 2 Style) */}
            <div className="ui-section-title">Active Roles</div>
            <div className="ui-roles-list">
              {/* Role Card 1 */}
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
                  <div className="meta-item"><Calendar size={14} /> Due: 2024-01-15</div>
                  <div className="meta-item"><MapPin size={14} /> Los Angeles, CA</div>
                  <div className="meta-item"><Clock size={14} /> Posted: 2023-12-01</div>
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

              {/* Role Card 2 */}
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
                  <div className="meta-item"><Calendar size={14} /> Due: 2024-01-20</div>
                  <div className="meta-item"><MapPin size={14} /> New York, NY</div>
                  <div className="meta-item"><Clock size={14} /> Posted: 2023-12-05</div>
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

            {/* Actors Gallery (Image 1 Style) */}
            <div className="ui-section-title">Featured Talent</div>
            <div className="ui-actors-grid-new">
              {/* Actor Card 1 */}
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
                  <p className="update-text">Updated 2 hours ago</p>
                  <div className="actor-meta-row">
                    <span>3 photos</span>
                    <span className="badge-public-sm">Public</span>
                  </div>
                  <div className="actor-card-btns">
                    <button className="btn-ui-icon"><Pencil size={14} /> Edit</button>
                    <button className="btn-ui-icon"><Upload size={14} /> Upload</button>
                    <button className="btn-ui-dark"><Video size={14} /> Video</button>
                  </div>
                </div>
              </div>

              {/* Actor Card 2 */}
              <div className="ui-actor-card-new">
                <div className="actor-image-container">
                  <div className="actor-image-placeholder">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=600&fit=crop&fm=jpg" alt="Priya Patel" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                    <span className="badge-busy">Busy</span>
                    <div className="view-icon-hidden"><Eye size={16} opacity={0.5} /></div>
                  </div>
                </div>
                <div className="actor-info-new">
                  <h3>Priya Patel</h3>
                  <p className="age-text">25 years old</p>
                  <p className="update-text">Updated 1 day ago</p>
                  <div className="actor-meta-row">
                    <span>2 photos</span>
                    <span className="badge-private-sm">Private</span>
                  </div>
                  <div className="actor-card-btns">
                    <button className="btn-ui-icon"><Pencil size={14} /> Edit</button>
                    <button className="btn-ui-icon"><Upload size={14} /> Upload</button>
                    <button className="btn-ui-dark"><Video size={14} /> Video</button>
                  </div>
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

            {/* Actor Rankings (Image 5 Style) */}
            <div className="ui-leaderboard-section">
              <div className="section-header">
                <div className="section-title"><Trophy size={20} color="#f59e0b" /> Actor Rankings</div>
              </div>
              
              <div className="rankings-list">
                {/* Rank 1 */}
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

                {/* Rank 2 */}
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

                {/* Rank 3 */}
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
    </section>
  );
}

export default Header;