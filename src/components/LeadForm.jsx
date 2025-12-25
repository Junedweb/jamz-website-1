import React, { useState } from 'react';
import { User, Phone, Calendar, Clock, CheckCircle, Loader2 } from 'lucide-react';

function LeadForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    countryCode: '+91',
    mobileNumber: '',
    date: '',
    time: '',
    captcha: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [mobileError, setMobileError] = useState('');
  const [dateError, setDateError] = useState('');

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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (mobileError || dateError) return;

    // Basic captcha check
    if (formData.captcha !== '9') {
      alert('Please solve the security question correctly.');
      return;
    }

    setStatus('loading');

    // Prepare data for Google Sheets
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyhPsSlnFDQgncytyt4BJEFlGlEeAqcvma-tr7184zVedHihK8MaJq_zfuU6qWuvPYQ/exec';

    const payload = {
      fullName: formData.fullName,
      mobileNumber: `${formData.countryCode}${formData.mobileNumber}`,
      date: formData.date,
      time: formData.time,
      captcha: formData.captcha
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

      // Clean up
      setTimeout(() => {
        document.body.removeChild(form);
        setStatus('success');
        setTimeout(() => {
          onClose();
          setStatus('idle');
          setFormData({ fullName: '', mobileNumber: '', date: '', time: '', captcha: '' });
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
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="lead-form-container" onClick={(e) => e.stopPropagation()}>
        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <CheckCircle size={64} color="#10b981" style={{ marginBottom: '1.5rem' }} />
            <h2>Request Received!</h2>
            <p className="subtitle">Our team will contact you shortly to confirm your consultation.</p>
            <button className="btn-back" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2>Book Your Free Consultation</h2>
            <p className="subtitle">Let's discuss how JAMZ can improve your casting workflow</p>

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

              <div className="form-group">
                <label className="form-label">
                  <Calendar size={18} /> Preferred Date <span>*</span>
                </label>
                <input 
                  type="date" 
                  name="date"
                  min={new Date().toISOString().split('T')[0]}
                  className={`form-input ${dateError ? 'input-error' : ''}`} 
                  value={formData.date}
                  onChange={handleChange}
                  required 
                />
                {dateError && <p className="error-text" style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '0.4rem' }}>{dateError}</p>}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Clock size={18} /> Preferred Time <span>*</span>
                </label>
                <input 
                  type="time" 
                  name="time"
                  className="form-input" 
                  value={formData.time}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="captcha-section">
                <p className="captcha-question">Security Question: What is 10 - 1? <span>*</span></p>
                <input 
                  type="text" 
                  name="captcha"
                  className="form-input" 
                  style={{ width: '150px' }} 
                  placeholder="Enter your ans" 
                  value={formData.captcha}
                  onChange={handleChange}
                  required 
                />
                <p className="form-hint">Please solve this simple math problem to verify you're human</p>
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
                  'Book Consultation'
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
