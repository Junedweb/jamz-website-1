import { Mail, Phone, MapPin } from 'lucide-react';

function Footer({ onInfoClick }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top-row">
          <div className="footer-brand-section">
            <div className="footer-logo-wrapper">
              <img src="/logo.svg" alt="JAMz AI - Best Casting Director Software" loading="lazy" decoding="async" className="footer-logo-img" />
              <h3 className="footer-logo">JAMz AI</h3>
            </div>
            <p className="footer-tagline">
              AI-Powered Casting Software & Agency Management Platform
            </p>
          </div>
          
          <div className="footer-contact-info">
            <div className="contact-item">
              <Mail size={16} />
              <a href="mailto:jamz.techconnect@gmail.com">jamz.techconnect@gmail.com</a>
            </div>
            <div className="contact-item">
              <Phone size={16} />
              <a href="tel:+918240978061">+91 82409 78061</a>
            </div>
            <div className="contact-item">
              <MapPin size={16} />
              <span>Dahisar, Maharashtra 401107</span>
            </div>
          </div>
        </div>

        <div className="footer-links-row">
          <div className="footer-links-group">
            <h4>Company</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onInfoClick('about'); }}>About Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onInfoClick('careers'); }}>Careers</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onInfoClick('privacy'); }}>Privacy Policy</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onInfoClick('terms'); }}>Terms of Service</a></li>
            </ul>
          </div>
          
          <div className="footer-links-group">
            <h4>Connect</h4>
            <ul>
              <li><a href="https://www.linkedin.com/in/jamzconnect/" rel="noopener">LinkedIn</a></li>
              <li><a href="https://www.instagram.com/jamzconnect/" rel="noopener">Instagram</a></li>
              <li><a href="https://www.youtube.com/channel/UCVflK9gD26xrMbiHL0LQOVg" rel="noopener">YouTube</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom-row">
          <p className="copyright">&copy; 2025 JAMz AI. Powered by <a href="https://jamzconnect.com/">jamzconnect.com</a></p>
          <div className="footer-meta">
            <span>Made with precision for Casting Professionals</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;