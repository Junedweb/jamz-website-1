import React, { useState, useEffect } from 'react';
import { Sparkles, X, User, MapPin, Calendar, Send, Wand2, Star, Moon, Sun, Phone, MapPinned, Loader2 } from 'lucide-react';

const FortuneTeller = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [isLocating, setIsLocating] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    countryCode: '+91',
    mobile: '',
    gender: '',
    dob: '',
    location: '',
    q1: '', // Passion/Career question
    q2: ''  // Casting/AI question
  });
  const [fortune, setFortune] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [dobError, setDobError] = useState('');

  const countryCodes = [
    { code: '+91', name: 'India' },
    { code: '+1', name: 'USA/Canada' },
    { code: '+44', name: 'UK' },
    { code: '+61', name: 'Australia' },
    { code: '+971', name: 'UAE' },
    { code: '+65', name: 'Singapore' },
    { code: '+49', name: 'Germany' },
    { code: '+33', name: 'France' },
    { code: '+81', name: 'Japan' },
    { code: '+86', name: 'China' }
  ];

  // Global mobile validation regex (E.164 format or standard international)
  const validateMobile = (number) => {
    // Allows: 1234567890, 123-456-7890, etc.
    // Minimum 7 digits, maximum 15 digits (global standard)
    const phoneRegex = /^[\d-. ]+\d$/;
    const digitsOnly = number.replace(/\D/g, '');
    
    if (!number) return '';
    if (!phoneRegex.test(number)) return 'Invalid phone format';
    if (digitsOnly.length < 7 || digitsOnly.length > 15) return 'Number must be 7-15 digits';
    return '';
  };

  const validateDOB = (dateString) => {
    if (!dateString) return '';
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate comparison

    if (selectedDate > today) {
      return 'Date of Birth cannot be in the future';
    }
    return '';
  };

  const submitLead = (data) => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyrRMgUWnYNzF1KuUnl2rLk_WzE01RvfwwYzkvoUbOUtRv1vdXMG-V6NrgIqDE4mG6O/exec';
    
    // Prepare data for Google Sheets
    const payload = {
      fullName: data.name,
      mobileNumber: `${data.countryCode.replace('+', '')}${data.mobile}`,
      gender: data.gender,
      dateOfBirth: data.dob,
      geoLocation: data.location,
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
    if (step === 1) {
      setIsProcessing(true);
      setStep(2); // Move to revelation step immediately
      
      // Submit details to the leads DB
      submitLead(formData);

      setTimeout(() => {
        const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
        setFortune(randomFortune);
        setIsProcessing(false);
      }, 1500); // Slightly longer for better effect
    } else {
      setStep(step + 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'mobile') {
      setMobileError(validateMobile(value));
    }
    if (name === 'dob') {
      setDobError(validateDOB(value));
    }
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
        <div className="fortune-card-top-glow"></div>
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
                  <div className="mobile-input-wrapper">
                    <select 
                      name="countryCode" 
                      className="country-select" 
                      onChange={handleInputChange} 
                      value={formData.countryCode}
                    >
                      {countryCodes.map(c => (
                        <option key={c.code} value={c.code}>{c.code}</option>
                      ))}
                    </select>
                    <input 
                      type="tel" 
                      name="mobile" 
                      placeholder="9876543210" 
                      onChange={handleInputChange} 
                      value={formData.mobile} 
                      className={mobileError ? 'input-error' : ''}
                    />
                  </div>
                  {mobileError ? (
                    <p className="error-text">{mobileError}</p>
                  ) : (
                    <p className="field-hint">Your data is safe with our cosmic vault. No spam, just the numerical secrets to your 2026 success.</p>
                  )}
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
                  <input 
                    type="date" 
                    name="dob" 
                    max={new Date().toISOString().split('T')[0]}
                    onChange={handleInputChange} 
                    value={formData.dob} 
                    className={dobError ? 'input-error' : ''}
                  />
                  {dobError && <p className="error-text">{dobError}</p>}
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
              <button 
                className="btn-next" 
                disabled={!formData.name || !formData.mobile || !!mobileError || !formData.dob || !!dobError} 
                onClick={handleNext}
              >
                Reveal My Fortune
              </button>
            </div>
          )}

          {step === 2 && (
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
