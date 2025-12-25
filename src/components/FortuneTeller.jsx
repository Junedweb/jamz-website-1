import React, { useState, useEffect } from 'react';
import { Sparkles, X, User, MapPin, Calendar, Send, Wand2, Star, Moon, Sun, Phone, MapPinned, Loader2 } from 'lucide-react';

const FortuneTeller = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [isLocating, setIsLocating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    gender: '',
    dob: '',
    location: '',
    q1: '', // Passion/Career question
    q2: ''  // Casting/AI question
  });
  const [fortune, setFortune] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const submitLead = (data) => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyhPsSlnFDQgncytyt4BJEFlGlEeAqcvma-tr7184zVedHihK8MaJq_zfuU6qWuvPYQ/exec';
    
    // Prepare data for Google Sheets
    const payload = {
      fullName: data.name,
      mobileNumber: data.mobile,
      gender: data.gender,
      dateOfBirth: data.dob,
      location: data.location,
      goal: data.q1,
      manualHours: data.q2,
      source: '2026 Fortune Quiz',
      timestamp: new Date().toLocaleString()
    };

    try {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = scriptURL;
      form.target = 'hidden_iframe_fortune';

      Object.keys(payload).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = payload[key];
        form.appendChild(input);
      });

      let iframe = document.getElementById('hidden_iframe_fortune');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hidden_iframe_fortune';
        iframe.name = 'hidden_iframe_fortune';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }

      document.body.appendChild(form);
      form.submit();

      setTimeout(() => {
        if (document.body.contains(form)) {
          document.body.removeChild(form);
        }
      }, 1000);
    } catch (error) {
      console.error('Fortune Lead Submission Error:', error);
    }
  };

  const steps = [
    { title: "Welcome to 2026", icon: <Sparkles className="text-amber-500" /> },
    { title: "Personal Details", icon: <User className="text-blue-500" /> },
    { title: "Your Stars", icon: <Star className="text-purple-500" /> },
    { title: "The Revelation", icon: <Wand2 className="text-emerald-500" /> }
  ];

  const fortunes = [
    "2026 is your year of breakthrough; a major project will find you 70% faster than expected.",
    "Your creative stars are aligned; a new collaboration in Q1 will redefine your casting success.",
    "The digital shift favors you; AI will unlock hours of freedom for your most ambitious projects.",
    "A legendary talent is waiting in your peripheral; trust your intuition and the tools that sharpen it.",
    "Abundance follows efficiency; by streamlining your workflow, you'll double your impact this spring.",
    "Your eye for detail will be your greatest asset this year; a unique script breakdown will bring national acclaim."
  ];

  const handleStart = () => {
    setIsOpen(true);
    setStep(1);
  };

  const handleNext = () => {
    if (step === 2) {
      setIsProcessing(true);
      
      // Submit details to the leads DB
      submitLead(formData);

      setTimeout(() => {
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        setFortune(randomFortune);
        setIsProcessing(false);
        setStep(3);
      }, 2000);
    } else {
      setStep(step + 1);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          const address = data.display_name || `${latitude}, ${longitude}`;
          setFormData(prev => ({ ...prev, location: address }));
        } catch (error) {
          console.error("Error fetching address:", error);
          alert("Could not detect address. Please enter manually.");
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Permission denied or location unavailable.");
        setIsLocating(false);
      }
    );
  };

  if (!isOpen) {
    return (
      <div className="fortune-trigger-fab" onClick={handleStart}>
        <div className="fab-icon">
          <Sparkles size={24} />
        </div>
        <div className="fab-text">2026 Fortune</div>
      </div>
    );
  }

  return (
    <div className="fortune-overlay">
      <div className="fortune-card">
        <button className="close-btn" onClick={() => setIsOpen(false)}><X size={20} /></button>
        
        <div className="fortune-header">
          {steps[step].icon}
          <h3>{steps[step].title}</h3>
        </div>

        <div className="fortune-body">
          {step === 1 && (
            <div className="fortune-form">
              <p className="intro-text">To reveal your 2026 Casting Destiny, tell the stars about yourself:</p>
              <div className="form-grid">
                <div className="input-group">
                  <label>Name</label>
                  <input type="text" name="name" placeholder="Your name" onChange={handleInputChange} value={formData.name} />
                </div>
                <div className="input-group">
                  <label>Mobile Number</label>
                  <input type="tel" name="mobile" placeholder="WhatsApp for Numerology" onChange={handleInputChange} value={formData.mobile} />
                  <p className="field-hint">Promise, no spam! Helps with your Numerology.</p>
                </div>
                <div className="input-group">
                  <label>Gender</label>
                  <select name="gender" onChange={handleInputChange} value={formData.gender}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Date of Birth</label>
                  <input type="date" name="dob" onChange={handleInputChange} value={formData.dob} />
                </div>
                <div className="input-group full">
                  <label><MapPin size={14} /> Location</label>
                  <div className="geo-input-wrapper">
                    <input type="text" name="location" placeholder="City, Country" onChange={handleInputChange} value={formData.location} />
                    <button type="button" className="btn-geo" onClick={detectLocation} disabled={isLocating}>
                      {isLocating ? <Loader2 size={18} className="animate-spin" /> : <MapPinned size={18} />}
                    </button>
                  </div>
                </div>
              </div>
              <button className="btn-next" disabled={!formData.name || !formData.mobile} onClick={handleNext}>Consult the Stars</button>
            </div>
          )}

          {step === 2 && (
            <div className="fortune-form">
              <p className="intro-text">Just two more spiritual questions...</p>
              <div className="input-group full">
                <label>What is your biggest creative goal for the New Year?</label>
                <textarea name="q1" placeholder="e.g. Find the next big star, scale my agency..." onChange={handleInputChange} value={formData.q1}></textarea>
              </div>
              <div className="input-group full">
                <label>How much time do you currently spend on manual casting tasks?</label>
                <select name="q2" onChange={handleInputChange} value={formData.q2}>
                  <option value="">Select</option>
                  <option value="lots">Way too much (40+ hours)</option>
                  <option value="some">A fair amount (20-40 hours)</option>
                  <option value="little">I'm already efficient</option>
                </select>
              </div>
              <button className="btn-next" disabled={!formData.q1 || !formData.q2} onClick={handleNext}>Reveal My Fortune</button>
            </div>
          )}

          {step === 3 && (
            <div className="fortune-result">
              {isProcessing ? (
                <div className="processing">
                  <div className="spinner"></div>
                  <p>Reading your cosmic energy...</p>
                </div>
              ) : (
                <div className="result-content animate-fade-in">
                  <div className="crystal-ball">
                    <div className="fortune-text">
                      <span className="quote-mark">"</span>
                      {fortune}
                      <span className="quote-mark">"</span>
                    </div>
                  </div>
                  <div className="result-footer">
                    <p>Ready to make this fortune a reality?</p>
                    <button className="btn-demo" onClick={() => {
                      setIsOpen(false);
                      // Trigger main lead form or scroll to CTA
                      document.querySelector('.cta-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}>Claim Your 2026 Success</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FortuneTeller;
