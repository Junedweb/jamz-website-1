import React from 'react';

function Workflow() {
  const steps = [
    { num: '01', title: 'Brief Received', desc: 'Client brief converted into structured roles.' },
    { num: '02', title: 'Roles Created', desc: 'Breakdowns & eligibility filters auto-saved.' },
    { num: '03', title: 'Outreach', desc: 'WhatsApp broadcasts with tracking & auto-follow-ups.' },
    { num: '04', title: 'Auditions', desc: 'Responses flow into live funnel with audit trail.' },
    { num: '05', title: 'Shortlist', desc: 'Filter best takes and share with client.' },
    { num: '06', title: 'Approval', desc: 'Client reviews and locks final choices.' },
    { num: '07', title: 'Booking', desc: 'Contracts & status updates finalized.' }
  ];

  return (
    <section className="workflow-section reveal" style={{ marginBottom: '4rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '2rem', marginTop: '2rem' }}>
      <div className="container">
        <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#0f172a', marginBottom: '1rem', textAlign: 'center' }}>Real Workflow Example</h2>
        <p style={{ fontSize: '1.05rem', color: '#475569', maxWidth: '900px', margin: '0 auto 2rem', textAlign: 'center' }}>
          See how a real casting flows from start to finish in JAMz AI.
        </p>

        {/* Before vs After Comparison */}
        <div className="workflow-comparison">
          <div className="workflow-col before">
            <div className="workflow-header before">BEFORE (The Chaos)</div>
            <div className="workflow-content">
              <ul style={{ listStyle: 'none', padding: 0, color: '#475569', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#ef4444' }}>❌</span> 100s of unorganized WhatsApp chats</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#ef4444' }}>❌</span> Manual Excel trackers & copy-pasting</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#ef4444' }}>❌</span> Lost audition files in Drive folders</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#ef4444' }}>❌</span> "Did I reply to him?" confusion</li>
              </ul>
            </div>
          </div>
          
          <div className="workflow-col after">
            <div className="workflow-header after">AFTER (JAMz AI)</div>
            <div className="workflow-content after">
              <ul style={{ listStyle: 'none', padding: 0, color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#22c55e' }}>✅</span> One central dashboard for all chats</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#22c55e' }}>✅</span> Auto-generated casting sheets</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#22c55e' }}>✅</span> Smart Talent Vault with instant search</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><span style={{ color: '#22c55e' }}>✅</span> Automated status updates & tracking</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem', textAlign: 'center' }}>
              <div style={{ fontWeight: 800, color: '#cbd5e1', fontSize: '1.5rem', marginBottom: '0.5rem' }}>{step.num}</div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{step.title}</h3>
              <p style={{ fontSize: '0.9rem', color: '#475569' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Workflow;