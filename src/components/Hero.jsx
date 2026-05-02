import heroImg from '../assets/SkillUp.webp';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section container animate-fade">
      <div className="hero-grid">
        <div className="hero-text">
          <span className="badge">ACADEMIC RIGOR MEETS CREATIVE FLAIR</span>
          <h1>
            Empowering <span className="text-gradient">Limitless</span> Potential through Expert Sessions.
          </h1>
          <p>
            Designed to create a positive and sustainable impact by
            strengthening the career readiness and professional competencies, 
            by focusing on non-technical and career-oriented skills,
          </p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => document.getElementById('sessions')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Current Sessions <span className="arrow">→</span>
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="image-wrapper">
            <img src={heroImg} alt="Students collaborating" className="hero-image" />
            <div className="floating-card animate-float">
              <div className="card-icon">🎓</div>
              <div className="card-info">
                <h4>Academic Excellence</h4>
                <p>Accredited by the modern education standards for lifelong learners.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
