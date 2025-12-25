import { ShieldCheck, Zap, MessageSquare, Layout } from 'lucide-react';

function ValueProp() {
  const points = [
    { icon: <Layout size={24} />, title: "All in One Place", desc: "Keep all your data organized." },
    { icon: <MessageSquare size={24} />, title: "No More Chaos", desc: "Stop using 100+ WhatsApp groups." },
    { icon: <Zap size={24} />, title: "AI Helper", desc: "Let AI do the boring office work." },
    { icon: <ShieldCheck size={24} />, title: "You Are in Charge", desc: "You make all the final choices." }
  ];

  return (
    <section className="dark-section">
      <div className="bg-glow" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.1 }}></div>
      <div className="container">
        <h2 style={{ marginBottom: '2.5rem' }}>Organize your workflow, start casting</h2>
        
        <div className="value-prop-grid">
          {points.map((p, i) => (
            <div key={i} className="value-point">
              <div className="value-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValueProp;