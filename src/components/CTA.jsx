import { useState, useEffect } from 'react';
import './CTA.css';

const CTA = ({ setShowCreateModal }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const driveUrl = "https://drive.google.com/drive/folders/YOUR_FOLDER_ID"; // Placeholder for folder path

  useEffect(() => {
    const targetDate = new Date('2026-06-20T19:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        // setTimeLeft('REGISTRATION NOT AVAILABLE');
        setTimeLeft('ATTENDANCE FORM CLOSED');
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${days}D ${hours}H ${minutes}M ${seconds}S`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="cta-section container">
      <div className="cta-card animate-fade">
        <div className="cta-content">
          <h2>Start Your Journey Today</h2>
          <p>
            Attendance form for the CV Writing session is now open. Secure your spot and unlock your limitless potential.
          </p>
          <div className="cta-btns">
            <button className="btn-white" onClick={() => setShowCreateModal(true)}>
              Mark Your Attendance ↗
            </button>
            {/* <button className="btn-ghost" onClick={() => window.open(driveUrl, '_blank')}>
              Download E certificates 📥
            </button> */}
            <button className="btn-ghost" onClick={() => setShowCreateModal(false)}>
              Download E certificates 📥
            </button>
          </div>
           <span className="early-bird">ATTENDANCE FORM CLOSED IN {timeLeft}</span>
          
        </div>
      </div>
    </section>
  );
};

export default CTA;
