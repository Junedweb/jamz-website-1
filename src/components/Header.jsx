import { useState } from 'react';
import { 
  Zap,
  Trophy, 
  Clock,
  Snowflake
} from 'lucide-react';

function Header({ onCtaClick }) {
  const [isChristmas] = useState(() => {
    const now = new Date();
    return now.getMonth() === 11 && now.getDate() === 25;
  });

  const [snowflakes] = useState(() => {
    if (!isChristmas) return [];
    return [...Array(20)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${5 + Math.random() * 10}s`,
      size: 12 + Math.random() * 10
    }));
  });

  return (
    <section id="hero" className={`hero ${isChristmas ? 'festive-christmas' : ''}`}>
      {isChristmas && (
        <div className="snow-container">
          {snowflakes.map((snow) => (
            <div key={snow.id} className="snowflake" style={{ 
              left: snow.left, 
              animationDelay: snow.animationDelay,
              animationDuration: snow.animationDuration
            }}>
              <Snowflake size={snow.size} color="white" opacity={0.6} />
            </div>
          ))}
        </div>
      )}
      <div className="bg-glow" style={{ 
        top: '-10%', 
        right: '-5%',
        background: 'radial-gradient(circle, var(--primary-light) 0%, transparent 70%)'
      }}></div>
      <div className="bg-glow" style={{ bottom: '10%', left: '-5%', background: 'radial-gradient(circle, var(--accent-gold) 0%, transparent 70%)', opacity: 0.05 }}></div>
      
      <div className="container fade-in">
        <div className="hero-content-main">
          <div className="hero-announcement">
            <span className="announcement-badge">Launching Soon</span>
            <span className="announcement-text">Crafting the Future of Casting Excellence</span>
          </div>
          <h1 className="hero-title">
            <span className="text-gradient-gold">AI Talent Management App India</span>
            <span className="hero-title-accent">For Visionary Casting Directors</span>
          </h1>
          <p className="sub-headline" style={{ maxWidth: '650px', margin: '0 auto 2rem' }}>
            Eliminate the manual grind. Our AI-driven engine finds your perfect 
            cast 70% faster while automating your entire workflow.
          </p>
          
          <div className="hero-benefits-row">
            <div className="hero-benefit">
              <Zap size={20} color="var(--accent)" />
              <span>70% Faster Discovery</span>
            </div>
            <div className="hero-benefit">
              <Trophy size={20} color="var(--accent)" />
              <span>2x Workflow Efficiency</span>
            </div>
            <div className="hero-benefit">
              <Clock size={20} color="var(--accent)" />
              <span>40+ Hours Saved Weekly</span>
            </div>
          </div>
        </div>
        
        <div className="cta-group">
          <a href="#" className="btn-primary" onClick={onCtaClick}>Join Waitlist</a>
          <a href="#" className="btn-secondary" onClick={() => onCtaClick('suggestion')}>Share Suggestions</a>
        </div>
      </div>
    </section>
  );
}

export default Header;