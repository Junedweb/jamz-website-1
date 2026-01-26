import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Sparkles, X, User, MapPin, Calendar, Send, Wand2, Star, Moon, Sun, Phone, MapPinned, Loader2, MessageSquare, Bot, ArrowRight, UserCircle, CheckCircle } from 'lucide-react';

const FortuneTeller = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [isLocating, setIsLocating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedModule, setSelectedModule] = useState(null);
  const [currentInput, setCurrentInput] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [mobileError, setMobileError] = useState('');
  const [dobError, setDobError] = useState('');
  
  const [chatStep, setChatStep] = useState('module'); // 'module', 'suggestion', 'contact_name', 'contact_mobile', 'completed'
  const [formData, setFormData] = useState({
    name: 'Anonymous',
    countryCode: '+91',
    mobile: 'N/A',
    gender: 'N/A',
    dob: 'N/A',
    location: 'N/A',
    suggestions: ''
  });
  
  const [chatMessages, setChatMessages] = useState([
    { role: 'bot', text: "Hello! I'm your JAMz AI design assistant. We are so grateful for your interest in helping us build the perfect casting platform. To get started, which area of the app would you like to suggest an improvement for?", type: 'module_selection' }
  ]);

  const chatEndRef = useRef(null);

  const modules = useMemo(() => [
    { id: 'search', label: 'Talent Search & Discovery', icon: <Star size={16} /> },
    { id: 'communication', label: 'Messaging & Outreach', icon: <Phone size={16} /> },
    { id: 'client', label: 'Client Portals & Sharing', icon: <UserCircle size={16} /> },
    { id: 'team', label: 'Team Collaboration', icon: <User size={16} /> },
    { id: 'other', label: 'Other Features', icon: <Sparkles size={16} /> }
  ], []);

  const submitLead = useCallback((data) => {
    // GA4 Tracking for suggestion submission
    if (window.gtag) {
      window.gtag('event', 'submit_suggestion', {
        'event_category': 'engagement',
        'event_label': 'Feature Suggestion Submitted',
        'suggestion_module': selectedModule?.label || 'Direct'
      });
    }

    const scriptURL = 'https://script.google.com/macros/s/AKfycbyrRMgUWnYNzF1KuUnl2rLk_WzE01RvfwwYzkvoUbOUtRv1vdXMG-V6NrgIqDE4mG6O/exec';
    
    const payload = {
      fullName: data.name,
      mobileNumber: `${data.countryCode.replace('+', '')}${data.mobile}`,
      gender: data.gender,
      dateOfBirth: data.dob,
      geoLocation: data.location,
      goal: 'Suggestion Submission',
      manualHours: 'ChatBot Summary',
      source: 'Feature Suggestion Form',
      suggestion: data.suggestions,
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
      console.error('Lead Submission Error:', error);
    }
  }, []);

  const handleFinalSubmit = useCallback((dataToSubmit) => {
    setIsProcessing(true);
    submitLead(dataToSubmit || formData);
    setTimeout(() => {
      setStep(3);
      setIsProcessing(false);
    }, 1500);
  }, [submitLead, formData]);

  const handleModuleSelect = useCallback((module) => {
    setSelectedModule(module);
    setChatStep('suggestion');
    setChatMessages(prev => [
      ...prev,
      { role: 'user', text: module.label },
      { role: 'bot', text: `Great choice! How can we make ${module.label} better for you? Please share your suggestion.` }
    ]);
  }, []);

  const isGenuineSuggestion = (text) => {
    if (!text || text.trim().length < 5) return false;
    const words = text.trim().split(/\s+/);
    if (words.length < 2) return false;
    if (/(.)\1{4,}/.test(text)) return false;
    return true;
  };

  const scrollToBottom = useCallback(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isBotTyping, scrollToBottom]);

  const handleChatSubmit = useCallback((e) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const userMessage = currentInput.trim();
    setChatMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setCurrentInput('');
    setIsBotTyping(true);

    setTimeout(() => {
      let response = "";
      
      if (chatStep === 'suggestion') {
        if (isGenuineSuggestion(userMessage)) {
          setFormData(prev => ({ ...prev, suggestions: userMessage }));
          setChatStep('contact_name');
          response = "Thank you! We have noted your suggestion and will surely put it into consideration. Would you be comfortable sharing your Name so our tech team can reference your feedback? (Or skip to submit anonymously)";
        } else {
          response = "I'm sorry, I didn't quite catch that. Could you please share a more detailed suggestion so our team can understand your needs better?";
        }
      } 
      else if (chatStep === 'contact_name') {
        if (userMessage.toLowerCase() !== 'skip') {
          const updatedData = { ...formData, name: userMessage };
          setFormData(updatedData);
          setChatStep('contact_mobile');
          response = `Nice to meet you, ${userMessage}! Lastly, would you like to share your Mobile Number in case our tech team needs to discuss this further? (Or skip to finish)`;
        } else {
          setChatStep('completed');
          response = "No problem! I'm submitting your anonymous suggestion now. Thank you for helping us build JAMz AI!";
          handleFinalSubmit(formData);
        }
      }
      else if (chatStep === 'contact_mobile') {
        let finalData = { ...formData };
        if (userMessage.toLowerCase() !== 'skip') {
          finalData.mobile = userMessage;
          setFormData(finalData);
        }
        setChatStep('completed');
        response = "Thank you! I've recorded everything. Our team will review your suggestions as we build the next version of JAMz AI.";
        handleFinalSubmit(finalData);
      }

      setChatMessages(prev => [...prev, { role: 'bot', text: response }]);
      setIsBotTyping(false);
    }, 1000);
  }, [currentInput, chatMessages, chatStep, handleFinalSubmit]);

  const countryCodes = useMemo(() => [
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
  ], []);

  // Global mobile validation regex (E.164 format or standard international)
  const validateMobile = (number) => {
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
    today.setHours(0, 0, 0, 0);
    if (selectedDate > today) return 'Date of Birth cannot be in the future';
    return '';
  };

  const steps = useMemo(() => [
    { title: "Your Needs", icon: <MessageSquare className="text-blue-500" /> },
    { title: "Contact Info", icon: <User className="text-amber-500" /> },
    { title: "Thank You", icon: <CheckCircle className="text-emerald-500" /> }
  ], []);

  const handleStart = useCallback(() => {
    // GA4 Tracking
    if (window.gtag) {
      window.gtag('event', 'open_suggestion_fab', {
        'event_category': 'engagement',
        'event_label': 'You suggest, we build.'
      });
    }
    setIsOpen(true);
    setStep(1);
  }, []);

  const handleNext = useCallback(() => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsProcessing(true);
      submitLead(formData);
      setTimeout(() => {
        setStep(3);
        setIsProcessing(false);
      }, 1500);
    }
  }, [step, formData]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'mobile') setMobileError(validateMobile(value));
    if (name === 'dob') setDobError(validateDOB(value));
  }, []);

  const detectLocation = useCallback(() => {
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
  }, []);

  if (!isOpen) {
    return (
      <div className="fortune-trigger-fab" onClick={handleStart}>
        <div className="fab-icon">
          <MessageSquare size={24} />
        </div>
        <div className="fab-text">You suggest, we build.</div>
      </div>
    );
  }

  return (
    <div className="fortune-overlay">
      <div className="fortune-card suggestion-card">
        <div className="fortune-card-top-glow"></div>
        <button className="close-btn" onClick={() => setIsOpen(false)}><X size={20} /></button>
        
        <div className="fortune-header">
          {step <= 3 && steps[step-1]?.icon}
          <h3>{step <= 3 && steps[step-1]?.title}</h3>
        </div>

        <div className="fortune-body">
          {step === 1 && (
            <div className="chat-container">
              <p className="intro-text">Chat with our AI to define your ideal casting tool:</p>
              <div className="chat-window">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`chat-bubble ${msg.role}`}>
                    <div className="avatar-icon">
                      {msg.role === 'bot' ? <Bot size={16} /> : <UserCircle size={16} />}
                    </div>
                    <div className="message-content">
                      <div className="message-text">{msg.text}</div>
                      {msg.type === 'module_selection' && !selectedModule && (
                        <div className="module-options">
                          {modules.map(m => (
                            <button 
                              key={m.id} 
                              className="module-btn"
                              onClick={() => handleModuleSelect(m)}
                            >
                              {m.icon}
                              <span>{m.label}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {isBotTyping && (
                  <div className="chat-bubble bot">
                    <div className="avatar-icon"><Bot size={16} /></div>
                    <div className="typing-indicator"><span></span><span></span><span></span></div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <form onSubmit={handleChatSubmit} className="chat-input-row">
                <input 
                  type="text" 
                  placeholder={
                    chatStep === 'suggestion' ? "Type your needs here..." :
                    chatStep === 'contact_name' ? "Enter your name (or skip)..." :
                    chatStep === 'contact_mobile' ? "Enter mobile (or skip)..." :
                    "Thank you!"
                  }
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  disabled={chatStep === 'completed'}
                />
                <button type="submit" disabled={!currentInput.trim()}><Send size={18} /></button>
              </form>
              <button 
                className="btn-next-step" 
                onClick={() => {
                  if (chatStep === 'suggestion') {
                    setChatStep('contact_name');
                    setChatMessages(prev => [...prev, { role: 'bot', text: "Would you be comfortable sharing your Name so our tech team can reference your feedback? (Or skip to submit anonymously)" }]);
                  } else {
                    handleFinalSubmit();
                  }
                }}
                disabled={chatMessages.length < 2 || chatStep === 'completed'}
              >
                {chatStep === 'suggestion' ? 'Submit Suggestion' : 'Finish & Submit'} <ArrowRight size={16} />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="fortune-form">
              <p className="intro-text">Almost done! Where should we send your project updates?</p>
              <div className="form-grid">
                <div className="input-group">
                  <label>Name</label>
                  <input type="text" name="name" placeholder="Your name" onChange={handleInputChange} value={formData.name} />
                </div>
                <div className="input-group">
                  <label>Mobile Number</label>
                  <div className="mobile-input-wrapper">
                    <select name="countryCode" className="country-select" onChange={handleInputChange} value={formData.countryCode}>
                      {countryCodes.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                    </select>
                    <input type="tel" name="mobile" placeholder="9876543210" onChange={handleInputChange} value={formData.mobile} className={mobileError ? 'input-error' : ''} />
                  </div>
                  {mobileError && <p className="error-text">{mobileError}</p>}
                </div>
                <div className="input-group">
                  <label>Date of Birth</label>
                  <input type="date" name="dob" max={new Date().toISOString().split('T')[0]} onChange={handleInputChange} value={formData.dob} className={dobError ? 'input-error' : ''} />
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
                Submit Suggestions
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="fortune-result thank-you">
              {isProcessing ? (
                <div className="processing">
                  <div className="spinner"></div>
                  <p>Securing your suggestions...</p>
                </div>
              ) : (
                <div className="result-content animate-fade-in">
                  <div className="success-icon-large">
                    <CheckCircle size={64} color="#10b981" />
                  </div>
                  <h3>Thank You!</h3>
                  <p>Your suggestions have been recorded. We're building JAMz AI based on needs just like yours.</p>
                  <button className="btn-demo" onClick={() => setIsOpen(false)}>Close</button>
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
