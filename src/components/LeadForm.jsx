import React, { useState, useMemo, useEffect } from 'react';
import { User, Phone, Calendar, Clock, CheckCircle, Loader2, MapPin, Navigation, ShieldCheck, FileText } from 'lucide-react';

function LeadForm({ isOpen, onClose, type = 'waitlist' }) {
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+91',
    mobileNumber: '',
    date: '',
    time: '',
    location: '',
    suggestion: '',
    captcha: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [mobileError, setMobileError] = useState('');
  const [dateError, setDateError] = useState('');
  const [timeError, setTimeError] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [selectedCaptcha, setSelectedCaptcha] = useState(null);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Store current scroll position to prevent jump on iOS if needed
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [isOpen]);

  const captchaOptions = useMemo(() => [
    { id: 'camera', icon: '📷', label: 'Camera' },
    { id: 'diamond', icon: '💎', label: 'Diamond' },
    { id: 'heart', icon: '❤️', label: 'Heart' },
    { id: 'car', icon: '🚗', label: 'Car' }
  ], []);

  const targetCaptcha = useMemo(() => captchaOptions[1], [captchaOptions]); // Let's pick 'Star' as the target

  const timeOptions = useMemo(() => {
    const options = [];
    for (let hour = 8; hour <= 21; hour++) {
      const displayHour = hour > 12 ? hour - 12 : hour;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      
      // On the hour
      options.push({
        value: `${hour.toString().padStart(2, '0')}:00`,
        label: `${displayHour}:00 ${ampm}`
      });
      
      // Half past
      options.push({
        value: `${hour.toString().padStart(2, '0')}:30`,
        label: `${displayHour}:30 ${ampm}`
      });
    }
    // Add 10:00 PM specifically
    options.push({ value: '22:00', label: '10:00 PM' });
    return options;
  }, []);

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

  const validateMobile = (number) => {
    const phoneRegex = /^[\d-. ]+\d$/;
    const digitsOnly = number.replace(/\D/g, '');
    
    if (!number) return '';
    if (!phoneRegex.test(number)) return 'Invalid phone format';
    if (digitsOnly.length < 7 || digitsOnly.length > 15) return 'Number must be 7-15 digits';
    return '';
  };

  const validateDate = (dateString) => {
    if (!dateString) return '';
    const selectedDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return 'Preferred date cannot be in the past';
    }
    return '';
  };

  const validateTime = (timeString) => {
    if (!timeString) return '';
    const [hours, minutes] = timeString.split(':').map(Number);
    // 8:00 AM to 10:00 PM (22:00)
    if (hours < 8 || (hours >= 22 && minutes > 0)) {
      return 'Please select a time between 8:00 AM and 10:00 PM';
    }
    return '';
  };

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (type !== 'suggestion' && (mobileError || dateError || timeError)) return;
    if (type === 'suggestion' && mobileError) return;

    // Image captcha check
    if (!selectedCaptcha || selectedCaptcha.id !== targetCaptcha.id) {
      alert(`Security check: Please select the ${targetCaptcha.label} icon.`);
      return;
    }

    setStatus('loading');

    // Prepare data for Google Sheets
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyrRMgUWnYNzF1KuUnl2rLk_WzE01RvfwwYzkvoUbOUtRv1vdXMG-V6NrgIqDE4mG6O/exec';

    const payload = {
      type: type,
      fullName: formData.fullName,
      mobileNumber: `${formData.countryCode.replace('+', '')}${formData.mobileNumber}`,
      date: type === 'suggestion' ? 'N/A' : (formData.date || 'N/A'),
      time: type === 'suggestion' ? 'N/A' : (formData.time || 'N/A'),
      suggestion: formData.suggestion || 'N/A',
      geoLocation: formData.location,
      captcha: selectedCaptcha?.label || 'none'
    };

    try {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = scriptURL;
      form.target = 'hidden_iframe';

      Object.keys(payload).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = payload[key];
        form.appendChild(input);
      });

      // Create and add hidden iframe if it doesn't exist
      let iframe = document.getElementById('hidden_iframe');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'hidden_iframe';
        iframe.name = 'hidden_iframe';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
      }

      document.body.appendChild(form);
      form.submit();

      // Track conversion in GA4
      if (window.gtag) {
        window.gtag('event', 'generate_lead', {
          'event_category': 'engagement',
          'event_label': type,
          'value': 1.0
        });
      }

      // Clean up
      setTimeout(() => {
        document.body.removeChild(form);
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setSelectedCaptcha(null);
          setFormData({ fullName: '', mobileNumber: '', date: '', time: '', location: '', captcha: '' });
        }, 3000);
      }, 1000);

    } catch (error) {
      console.error('Submission Error:', error);
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'mobileNumber') {
      setMobileError(validateMobile(value));
    }
    if (name === 'date') {
      setDateError(validateDate(value));
    }
    if (name === 'time') {
      setTimeError(validateTime(value));
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData(prev => ({
          ...prev,
          location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        }));
        setIsLocating(false);
      },
      (error) => {
        console.error('Location Error:', error);
        alert('Unable to retrieve your location. Please enter it manually.');
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="lead-form-container" onClick={(e) => e.stopPropagation()}>
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle size={64} color="#10b981" style={{ marginBottom: '1.5rem' }} />
            <h2>{type === 'suggestion' ? 'Thank You!' : 'Request Received!'}</h2>
            <p className="subtitle">
              {type === 'suggestion' 
                ? "Your input helps us build a better platform for everyone."
                : "We’ll contact you soon to confirm your early access."}
            </p>
            <button className="btn-back" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2>{type === 'suggestion' ? 'Share Your Thoughts' : 'Join the Waitlist'}</h2>
            <p className="subtitle">
              {type === 'suggestion' 
                ? "Help us build the casting standard for India with your feedback."
                : "Be among the first to try JAMz when we launch."}
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  <User size={18} /> Full Name <span>*</span>
                </label>
                <input 
                  type="text" 
                  name="fullName"
                  className="form-input" 
                  placeholder="Enter your full name" 
                  value={formData.fullName}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Phone size={18} /> Mobile Number <span>*</span>
                </label>
                <div className="mobile-input-wrapper">
                  <select 
                    name="countryCode" 
                    className="country-select form-input" 
                    onChange={handleChange} 
                    value={formData.countryCode}
                    style={{ width: '75px', flex: '0 0 75px', padding: '0.75rem 0.5rem' }}
                  >
                    {countryCodes.map(c => (
                      <option key={c.code} value={c.code}>{c.code}</option>
                    ))}
                  </select>
                  <input 
                    type="tel" 
                    name="mobileNumber"
                    className={`form-input ${mobileError ? 'input-error' : ''}`} 
                    placeholder="9876543210" 
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required 
                    style={{ flex: 1 }}
                  />
                </div>
                {mobileError ? (
                  <p className="error-text" style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.4rem' }}>{mobileError}</p>
                ) : (
                  <p className="form-hint">Enter your mobile number for confirmation</p>
                )}
              </div>

              {type === 'suggestion' ? (
                <div className="form-group">
                  <label className="form-label">
                    <FileText size={18} /> Your Suggestions
                  </label>
                  <textarea 
                    name="suggestion"
                    className="form-input" 
                    placeholder="Tell us what features or improvements you'd like to see..." 
                    value={formData.suggestion}
                    onChange={handleChange}
                    rows="4"
                    style={{ resize: 'vertical', minHeight: '100px' }}
                  />
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label className="form-label">
                      <Calendar size={18} /> Preferred Date to Connect (Optional)
                    </label>
                    <input 
                      type="date" 
                      name="date"
                      min={new Date().toISOString().split('T')[0]}
                      className={`form-input ${dateError ? 'input-error' : ''}`} 
                      value={formData.date}
                      onChange={handleChange}
                    />
                    {dateError ? (
                      <p className="error-text" style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.4rem' }}>{dateError}</p>
                    ) : (
                      <p className="form-hint">Select a date if you'd like to meet or connect</p>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <Clock size={18} /> Preferred Time to Connect (Optional)
                    </label>
                    <select 
                      name="time"
                      className={`form-input ${timeError ? 'input-error' : ''}`} 
                      value={formData.time}
                      onChange={handleChange}
                    >
                      <option value="">Select a time</option>
                      {timeOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {timeError && <p className="error-text" style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.4rem' }}>{timeError}</p>}
                    <p className="form-hint">Working hours: 8:00 AM - 10:00 PM</p>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <FileText size={18} /> Suggestions (Optional)
                    </label>
                    <textarea 
                      name="suggestion"
                      className="form-input" 
                      placeholder="Any specific requirements or questions?" 
                      value={formData.suggestion}
                      onChange={handleChange}
                      rows="2"
                      style={{ resize: 'vertical', minHeight: '60px' }}
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label className="form-label">
                  <MapPin size={18} /> Location
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    name="location"
                    className="form-input" 
                    placeholder="Enter location or use current location" 
                    value={formData.location}
                    onChange={handleChange}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    className="btn-location"
                    disabled={isLocating}
                    title="Get Current Location"
                  >
                    {isLocating ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Navigation size={18} />
                    )}
                  </button>
                </div>
              </div>

              <div className="captcha-section">
                <p className="captcha-question">
                  <ShieldCheck size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
                  Verification: Select the <strong>{targetCaptcha.label}</strong> <span>*</span>
                </p>
                <div className="captcha-options" style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
                  {captchaOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={`captcha-option-btn ${selectedCaptcha?.id === option.id ? 'active' : ''}`}
                      onClick={() => setSelectedCaptcha(option)}
                      style={{
                        fontSize: '1.5rem',
                        padding: '0.75rem',
                        border: '2px solid',
                        borderColor: selectedCaptcha?.id === option.id ? '#f97316' : '#e2e8f0',
                        borderRadius: '12px',
                        background: selectedCaptcha?.id === option.id ? '#fff7ed' : 'white',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {option.icon}
                    </button>
                  ))}
                </div>
                <p className="form-hint">Click on the icon that matches the description above</p>
              </div>

              <button 
                type="submit" 
                className="btn-book" 
                disabled={status === 'loading'}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
              >
                {status === 'loading' ? (
                  <><Loader2 className="animate-spin" size={20} /> Sending...</>
                ) : (
                  type === 'suggestion' ? 'Submit Suggestion' : 'Join Waitlist'
                )}
              </button>
              <button type="button" className="btn-back" onClick={onClose}>Back to Home</button>
              
              {status === 'error' && (
                <p style={{ color: '#ef4444', textAlign: 'center', marginTop: '1rem', fontSize: '0.9rem' }}>
                  Something went wrong. Please try again later.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default LeadForm;
