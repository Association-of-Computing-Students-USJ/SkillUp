import { useState } from 'react';
import { X, Calendar, MapPin, ArrowRight } from 'lucide-react';
import hero from '../assets/Mr.Achintha.webp'
import FreeLanceImg from '../assets/Freelancing-session.webp'
import './Sessions.css';

const Sessions = ({ setShowCreateModal }) => {
  const [selectedSession, setSelectedSession] = useState(null);

  const sessions = [
    {
      id: 3,
      status: "ENROLLING",
      date: "MAY 07, 2026",
      time: "1.00 PM onwards",
      title: "Building a Professional Presence with Freelancing",
      desc: "Level up your career with SkillUp’s Freelancing session. Learn how to navigate the global market and build a sustainable income.",
      longDesc: "This session is designed for students and professionals looking to break into the world of freelancing. We will cover platform selection, profile optimization, client acquisition, and financial management for freelancers. Whether you are a designer, developer, or writer, this session will provide you with the tools to succeed.",
      img: FreeLanceImg,
      venue: "USJ Faculty of Computing Premises",
      speaker: {
        name: "Mr. Achintha Jayaweera",
        designation: "Founder Hey Creations & Hey Studios & Suvanda Naturals & Siamo, Co-Founder - Inseeks",
        profileImg: hero,
        bio: "A pioneer in the Sri Lankan freelancing community with global service delivery."
      },
      avatars: ["👨‍💻", "🚀", "💰"]
    }
   /* {
      id: 1,
      status: "WAITLIST",
      date: "OCT 15 - NOV 20",
      title: "Modern UI/UX Systems",
      desc: "Master Figma, design tokens, and accessibility standards in this immersive 6-week studio session.",
      longDesc: "Dive deep into the world of user interface and experience design. From typography and color theory to advanced prototyping and handoff, this session covers the entire design lifecycle.",
      img: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&w=800&q=80",
      venue: "Online via Zoom",
      speaker: {
        name: "Jane Doe",
        designation: "Lead UI/UX Designer",
      },
      avatars: ["👨‍💻", "👩‍🎨", "🧑‍🚀"]
    },
    {
      id: 2,
      status: "WAITLIST",
      date: "NOV 05 - DEC 15",
      title: "Creative Leadership",
      desc: "Navigating the intersection of team management and creative vision for future-ready directors.",
      longDesc: "Learn how to lead creative teams without stifling innovation. This session focuses on conflict resolution, vision setting, and sustainable creative practices.",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
      venue: "Main Hall, Admin Building",
      speaker: {
        name: "John Smith",
        designation: "Creative Director",
      },
      avatars: ["🦸‍♂️", "🧝‍♀️", "🧙‍♂️"]
    } */
  ];

  const openDetails = (session) => {
    setSelectedSession(session);
    document.body.style.overflow = 'hidden';
  };

  const closeDetails = () => {
    setSelectedSession(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <section id="sessions" className="sessions-section container">
      <div className="sessions-header">
        <div className="header-left">
          <span className="badge-small">HAPPENING NOW</span>
          <h2>Current Sessions</h2>
        </div>
        <div className="header-nav">
          <button className="nav-btn">←</button>
          <button className="nav-btn">→</button>
        </div>
      </div>

      <div className="sessions-grid">
        {sessions.map(session => (
          <div key={session.id} className="session-card">
            <div className="session-img-box">
              <img src={session.img} alt={session.title} />
              <span className="status-tag">{session.status}</span>
            </div>
            <div className="session-info">
              <div className="session-meta">
                <span className="calendar-icon">📅</span>
                <span className="session-date">{session.date}</span>
              </div>
              <h3>{session.title}</h3>
              <p>{session.desc}</p>
              <div className="session-footer">
                <div className="avatars">
                  {session.avatars.map((a, i) => (
                    <span key={i} className="avatar-blob">{a}</span>
                  ))}
                  <span className="avatar-count">+12</span>
                </div>
                <button 
                  className="btn-details" 
                  onClick={() => openDetails(session)}
                >
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSession && (
        <div className="modal-overlay" onClick={closeDetails}>
          <div className="modal-content session-details-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="badge-small">{selectedSession.status}</span>
                <h2>Session Details</h2>
              </div>
              <button className="btn-close" onClick={closeDetails}>
                <X size={20} />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="session-detail-grid">
                <div className="detail-image-side">
                  <img src={selectedSession.img} alt={selectedSession.title} className="detail-hero-img" />
                  <div className="speaker-card">
                    <div className="speaker-icon">
                      <img src={selectedSession.speaker.profileImg} className='profile-pic' />
                    </div>
                    <div className="speaker-info">
                      <h5>{selectedSession.speaker.name}</h5>
                      <p>{selectedSession.speaker.designation}</p>
                    </div>
                  </div>
                </div>
                
                <div className="detail-info-side">
                  <h3>{selectedSession.title}</h3>
                  <div className="detail-meta-list">
                    <div className="meta-item">
                      <Calendar size={18} className="text-primary" />
                      <span>{selectedSession.date} {selectedSession.time ? `| ${selectedSession.time}` : ''}</span>
                    </div>
                    <div className="meta-item">
                      <MapPin size={18} className="text-primary" />
                      <span>{selectedSession.venue}</span>
                    </div>
                  </div>
                  
                  <div className="detail-description">
                    <h4>About the Session</h4>
                    <p>{selectedSession.longDesc}</p>
                  </div>
                  
                  <div className="detail-actions">
                    <button 
                      className="btn-register-action"
                      onClick={() => {
                        closeDetails();
                        setShowCreateModal(true);
                      }}
                    >
                      Register Now <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Sessions;
