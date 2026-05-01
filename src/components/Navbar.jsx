import { useState, useEffect } from "react";
import { TvIcon, X } from 'lucide-react'
import skillupLogo from "../assets/skillup-logo.png"
import DelegateForm from './DelegateForm';
import './Navbar.css';

const Navbar = ({ showCreateModal, setShowCreateModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    if (showCreateModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showCreateModal]);

  return (
    <nav className={`navbar ${showCreateModal ? 'modal-open' : ''}`}>
      <div className="container nav-content">
        <div className="logo">
          <img src={skillupLogo} className="skillup-logo" alt="SkillUp" />
        </div>
        
        <div className={`nav-links-wrapper ${isMenuOpen ? 'active' : ''}`}>
          <ul className="nav-links">
            <li><a href="#" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#journey" onClick={() => setIsMenuOpen(false)}>Our Journey</a></li>
            <li><a href="#sessions" onClick={() => setIsMenuOpen(false)}>Current Sessions</a></li>
          </ul>
          <button className="btn-register mobile-only"
            onClick={() => {
              setShowCreateModal(true);
              setIsMenuOpen(false);
            }}>
            <TvIcon size={16} />Register
          </button>
        </div>

        <div className="nav-actions">
          <button className="btn-register desktop-only"
            onClick={() => setShowCreateModal(true)}>
            <TvIcon size={16} />Register
          </button>
          
          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <div className="hamburger"><span></span><span></span><span></span></div>}
          </button>
        </div>
      </div>

      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2>Registration</h2>
                <p>Register for SkillUp and empower your potential</p>
              </div>
              <button className="btn-close" onClick={() => setShowCreateModal(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <DelegateForm
                onSucccess={() => setShowCreateModal(false)}
                onCancel={() => setShowCreateModal(false)}
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
