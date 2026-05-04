import { useState } from 'react';
import { User, Mail, Phone, BookOpen, Send, Loader2 } from 'lucide-react';
import './DelegateForm.css';

const DelegateForm = ({ onSucccess, onCancel }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsappNumber: '',
    learnings: '',
    faculty: '',
    futureComments: '',
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
    "Faculty of Graduate Studies"
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
      setError('Failed to connect to server. Please ensure the backend is running.', err);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="success-message">
        <div className="success-icon">✓</div>
        <h3>Your Attendance has been marked successfully</h3>
        <div className="success-content">
          <h4>SkillUp - Freelancing Session</h4>

          <div className="whatsapp-box">
            <p>📌💼Your attendance has been recorded for the Freelancing Workshop </p>
            <p>📌📱Your e-certificate will be sent to your provided email 💻</p>
            <p> 🔖Stay connected with ACS, USJ for more exciting SkillUp sessions!👾💜 </p>
            <p>#SkillUp #ACS #USJ</p>
          </div>

          <p className="closing-text">Looking forward to seeing you in another exciting session</p>
        </div>
        <button className="btn-close-final" onClick={onSucccess}>Close</button>
      </div>
    );
  }

  return (
    <div className="form-container">
      <div className="session-info-header">
        <h2>SkillUP - Attendance</h2>
        <div className="session-badge">SkillUp - Freelancing</div>
        <p className="session-promo">🚀 Level up your career with SkillUp’s Freelancing session</p>
        <div className="session-details">
          <p><strong>📖 Topic:</strong> Building a Professional Presence with FreeLancing</p>
          <p><strong>📅 Date:</strong> 7th May 2026</p>
          <p><strong>⏰ Time:</strong> 1.00 PM onwards</p>
          <p><strong>🏛️ Venue:</strong> University of Sri Jayewardenepura Premises</p>
        </div>
      </div>

      <form className="delegate-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group full-width">
            <label htmlFor="fullName">Name to be appeared on the e-certificate (Ex: A.B.C.Perera) *</label>
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
            <label htmlFor="learnings">What did you learn from this session? *</label>
            <div className="input-wrapper">
              <textarea
                type="text"
                id="learnings"
                name="learnings"
                rows={3}
                placeholder="..."
                value={formData.learnings}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group full-width">
            <label htmlFor="futureComments"> Any comments or suggestions for future projects?   *</label>
            <div className="input-wrapper">
              <textarea
                type="text"
                id="futureComments"
                name="futureComments"
                placeholder="Future ideas..."
                rows={3}
                value={formData.futureComments}
                onChange={handleChange}
                required
              />
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
                <Send size={18} /> Mark Attendance
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DelegateForm;
