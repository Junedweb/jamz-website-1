import React, { useState } from 'react';
import { User, Phone, Calendar, Clock, CheckCircle, Loader2 } from 'lucide-react';

function LeadForm({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    date: '',
    time: '',
    captcha: ''
  });

  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic captcha check
    if (formData.captcha !== '9') {
      alert('Please solve the security question correctly.');
      return;
    }

    setStatus('loading');

    // Prepare data for Google Sheets
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyhPsSlnFDQgncytyt4BJEFlGlEeAqcvma-tr7184zVedHihK8MaJq_zfuU6qWuvPYQ/exec';

    try {
      // Create a hidden form and submit it to a hidden iframe
      // This is the most reliable way to bypass CORS for Google Apps Script
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = scriptURL;
      form.target = 'hidden_iframe';

      // Add fields
      Object.keys(formData).forEach(key => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = formData[key];
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
                <div className="phone-input-group">
                  <select className="country-select">
                    <option value="+91">IN +91</option>
                  </select>
                  <input 
                    type="tel" 
                    name="mobileNumber"
                    className="form-input" 
                    placeholder="10-digit mobile number" 
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <p className="form-hint">Enter 10-digit Indian mobile number (starting with 6, 7, 8, or 9)</p>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Calendar size={18} /> Preferred Date <span>*</span>
                </label>
                <input 
                  type="date" 
                  name="date"
                  className="form-input" 
                  value={formData.date}
                  onChange={handleChange}
                  required 
                />
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
