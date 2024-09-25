import React from 'react';
import './About.css'; // Make sure you have the CSS file in the same directory or update the path accordingly

const About: React.FC = () => {
  return (
    <div className="background1">
      {/* Navbar */}
      
      <div className="hero-section">
        <h1>About Our Herbal Medicine Company</h1>
        <p>We specialize in selling high-quality, natural herbal products that promote health and wellness.</p>
      </div>

      {/* Image Grid Section */}
      <div className="image-grid">
        <img src="/herbs2.jpg" alt="Herbal Product 1" className="grid-image" />
        <img src="/h2.jpg" alt="Herbal Product 2" className="grid-image" />
        <img src="/h5.jfif" alt="Herbal Product 3" className="grid-image" />
        <img src="/h6.png" alt="Herbal Product 4" className="grid-image" />
      </div>

      {/* Company Section */}
      <div className="company-section">
        <h2>About Our Company</h2>
        <p>
          We are dedicated to bringing the best of nature to our customers through our herbal products. Our mission is to provide 
          natural alternatives that promote health and vitality. Our products are sourced from the finest ingredients and are designed 
          to enhance well-being and longevity.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mission-section">
        <h2>Our Mission</h2>
        <p>
          We believe in the power of nature to heal and improve lives. Our goal is to create high-quality herbal products that are safe, 
          effective, and affordable for everyone. We are committed to sustainability and ethical sourcing practices.
        </p>
      </div>

      {/* Owner Section */}
      <div className="owner-section">
        <div className="owner-details">
          <img src="owner-image.jpg" alt="Owner" className="owner-image" />
          <div className="owner-info">
            <h3>John Doe</h3>
            <p>Founder & CEO</p>
            <p>Years of experience: 20</p>
            <p>
              John Doe has been passionate about herbal medicine for over two decades. His vision is to bring holistic health solutions to 
              everyone and make herbal medicine mainstream.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="footer-section">
        <h2>Join Us on Our Journey</h2>
        <p>We invite you to explore our range of herbal products and experience the benefits of natural healing.</p>
      </div>
    </div>
  );
};

export default About;
