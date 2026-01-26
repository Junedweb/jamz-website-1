import React from 'react';

function TrustedBy() {
  return (
    <section className="trusted-by-section" style={{ background: 'white', padding: '2rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <p style={{ 
          fontSize: '0.875rem', 
          fontWeight: 600, 
          color: '#64748b', 
          letterSpacing: '0.05em', 
          textTransform: 'uppercase', 
          marginBottom: '1.5rem' 
        }}>
          Trusted by Casting Teams working on projects for
        </p>
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          justifyContent: 'center', 
          flexWrap: 'wrap', 
          opacity: 0.6, 
          filter: 'grayscale(100%)' 
        }}>
          <span style={{ fontWeight: 700, fontSize: '1.5rem', color: '#334155' }}>Brand Partners</span>
          <span style={{ fontWeight: 700, fontSize: '1.5rem', color: '#334155' }}>Major OTTs</span>
          <span style={{ fontWeight: 700, fontSize: '1.5rem', color: '#334155' }}>Film Casting</span>
          <span style={{ fontWeight: 700, fontSize: '1.5rem', color: '#334155' }}>Ad Agencies</span>
        </div>
        
        <div style={{ 
          marginTop: '3rem', 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem', 
          textAlign: 'left' 
        }}>
          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '1rem', color: '#334155', fontStyle: 'italic', marginBottom: '1rem' }}>
              "We used to drown in WhatsApp chats. JAMz AI organized our entire database and cut our casting time in half for our latest web series."
            </p>
            <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>— Casting Director (Anonymous Pilot User)</p>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Mumbai, India</p>
          </div>
          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <p style={{ fontSize: '1rem', color: '#334155', fontStyle: 'italic', marginBottom: '1rem' }}>
              "The ability to search our own internal talent vault by 'look' and 'skills' instantly is a game changer. No more scrolling through drive folders."
            </p>
            <p style={{ fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>— Casting Associate</p>
            <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Top Tier Agency, Mumbai</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustedBy;