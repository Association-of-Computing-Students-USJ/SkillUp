import './Journey.css';
import  CanvaImage  from '../assets/Canva-session.jpg'
import LinkedInImage from '../assets/LinkedIn-session.jpeg'

const Journey = () => {
  const journeys = [
    {
      id: 1,
      tag: "JAN 2026",
      title: "Canva for Creators",
      desc: "Becoming a Pro Canva designer by elevating creativity",
      img: CanvaImage,
      grad: "linear-gradient(to top, rgba(93, 45, 176, 0.23), transparent)"
    },
    {
      id: 2,
      tag: "APRIL 2026",
      title: "Mastering LinkedIn",
      desc: "Strategic networking and personal branding for the digital age.",
      img: LinkedInImage,
      grad: "linear-gradient(to top, rgba(169, 85, 247, 0.31), transparent)"
    }
  ];

  return (
    <section id="journey" className="journey-section container">
      <div className="section-header text-center animate-fade">
        <h2>Our Journey</h2>
        <p>From humble beginnings to a community of creators. These are the sessions that shaped our legacy.</p>
      </div>
      
      <div className="journey-grid">
        {journeys.map((item) => (
          <div key={item.id} className={`journey-card ${item.type === 'archive' ? 'archive-card' : ''}`}>
            {item.type !== 'archive' ? (
              <>
                <img src={item.img} alt={item.title} className="journey-img" />
                <div className="card-overlay" style={{ background: item.grad }}>
                  <span className="card-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </>
            ) : (
              <div className="archive-content">
                <div className="archive-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <a href="#archive" className="btn-link">View All Archive →</a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Journey;
