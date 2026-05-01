import { useState } from 'react';
import { User, Mail, Phone, Building2, BookOpen, Send, Loader2 } from 'lucide-react';
import './DelegateForm.css';

const DelegateForm = ({ onSucccess, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsappNumber: '',
    studentRegNo: '',
    university: '',
    faculty: '',
    academicYear: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const faculties = [
    "Faculty of Humanities & Social Sciences",
    "Faculty of Management Studies & Commerce",
    "Faculty of Applied Sciences",
    "Faculty of Medical Sciences",
    "Faculty of Allied Health Sciences",
    "Faculty of Engineering",
    "Faculty of Technology",
    "Faculty of Computing",
    "Faculty of Urban and Aquatic Bioresources",
    "Faculty of Dental Sciences",
    "Faculty of Graduate Studies",
    "Other"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.error || data.message || 'Something went wrong. Please try again.');
        console.error('Registration Error:', data);
      }
    } catch (err) {
      setError('Failed to connect to server. Please ensure the backend is running.',err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <div className="success-icon">✓</div>
        <h3>Successfully Registered!</h3>
        <div className="success-content">
          <h4>SkillUp - Freelancing Session</h4>
          <p>Thank you for submitting your attendance for the Building a Professional Presence with Freelancing session.</p>
          
          <div className="whatsapp-box">
            <p>Join the group through this link:</p>
            <a href="https://chat.whatsapp.com/JOmaFSARK6nL1zqNfq9tdr" target="_blank" rel="noopener noreferrer" className="whatsapp-link">
              Join WhatsApp Group
            </a>
          </div>

          <p className="status-text">Your response has been recorded successfully.</p>
          <p className="closing-text">Looking forward to seeing you at the University of Sri Jayewardenepura Premises!</p>
        </div>
        <button className="btn-close-final" onClick={onSucccess}>Close</button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="session-info-header">
        <h2>SkillUP - Registration</h2>
        <div className="session-badge">SkillUp - Freelancing</div>
        <p className="session-promo">🚀 Level up your career with SkillUp’s Freelancing session</p>
        <div className="session-details">
          <p><strong>📖 Topic:</strong> Building a Professional Presence with FreeLancing</p>
          <p><strong>📅 Date:</strong> 7th May 2026</p>
          <p><strong>⏰ Time:</strong> 1.00 PM onwards</p>
          <p><strong>🏛️ Venue:</strong> University of Sri Jayewardenepura Premises</p>
          <p className="highlight">🎓 An e-Certificate will be provided</p>
        </div>
      </div>

      <form className="delegate-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="fullName">Full Name *</label>
            <div className="input-wrapper">
              <User size={18} />
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="E.g. A B C Perera"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="whatsappNumber">WhatsApp Number *</label>
            <div className="input-wrapper">
              <Phone size={18} />
              <input
                type="tel"
                id="whatsappNumber"
                name="whatsappNumber"
                placeholder="+94 7x xxx xxxx"
                value={formData.whatsappNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="studentRegNo">Student Registration No.</label>
            <div className="input-wrapper">
              <User size={18} />
              <input
                type="text"
                id="studentRegNo"
                name="studentRegNo"
                placeholder="AS2021xxx"
                value={formData.studentRegNo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="university">University / Institute</label>
            <div className="input-wrapper">
              <Building2 size={18} />
              <input
                type="text"
                id="university"
                name="university"
                placeholder="University of Sri Jayewardenepura"
                value={formData.university}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="faculty">Faculty *</label>
            <div className="input-wrapper">
              <BookOpen size={18} />
              <select
                id="faculty"
                name="faculty"
                value={formData.faculty}
                onChange={handleChange}
                required
              >
                <option value="">Select your Faculty</option>
                {faculties.map((fac, index) => (
                  <option key={index} value={fac}>{fac}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="academicYear">Academic Year *</label>
            <div className="input-wrapper">
              <BookOpen size={18} />
              <select
                id="academicYear"
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                required
              >
                <option value="">Select Academic Year</option>
                <option value="1st Year">1st Year</option>
                <option value="2nd Year">2nd Year</option>
                <option value="3rd Year">3rd Year</option>
                <option value="4th Year">4th Year</option>
              </select>
            </div>
          </div>
        </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn-submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin" /> Submitting...
            </>
          ) : (
            <>
              <Send size={18} /> Register Now
            </>
          )}
        </button>
      </div>
    </form>
    </div>
  );
};

export default DelegateForm;
