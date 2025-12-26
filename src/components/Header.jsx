import { useState, useEffect } from 'react';
import { 
  Zap,
  Trophy, 
  Clock,
  Snowflake
} from 'lucide-react';

function Header({ onCtaClick }) {
  const [isChristmas, setIsChristmas] = useState(false);

  useEffect(() => {
    const now = new Date();
    // Christmas check (Dec 25)
    if (now.getMonth() === 11 && now.getDate() === 25) {
      setIsChristmas(true);
    }
  }, []);

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
        background: 'radial-gradient(circle, var(--primary-light) 0%, transparent 70%)'
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
      </div>
    </section>
  );
}

export default Header;