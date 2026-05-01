import './Footer.css';
import logo from '../assets/skillup-logo.png'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-top">
          <div className="logo" >
            <img className='logo-img' src={logo} />
          </div>
          <div className="footer-brand">
            <p className="copyright">
              © 2025  SkillUp. EMPOWERING LIMITLESS POTENTIAL
              THROUGH CURATED EDUCATIONAL EXPERIENCES AND CREATIVE RIGOR.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
