import React from 'react';
import { FaInstagram, FaFacebookF, FaWhatsapp, FaEnvelope, FaPhone, FaLeaf } from 'react-icons/fa';
import './Footer.css'; // Ensure this path is correct

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__addr">
        <h1 className="footer__logo">
          <FaLeaf style={{ marginRight: '8px' }} /> Herbal Solutions
        </h1>
        <h2>Contact Us</h2>
        <address>
          5534 Nature's Path, Green City, Earth 22193-10212<br />
          <a className="footer__btn" href="tel:+1234567890" style={{ fontSize: '24px', display: 'flex', alignItems: 'center' }}>
            <FaPhone style={{ marginRight: '8px' }} /> +1 234 567 890
          </a>
          <a className="footer__btn" href="mailto:example@gmail.com" style={{ fontSize: '24px', display: 'flex', alignItems: 'center' }}>
            <FaEnvelope style={{ marginRight: '8px' }} /> Email Us
          </a>
        </address>
      </div>
      
      <ul className="footer__nav">
        <li className="nav__item">
          <h2 className="nav__title">Our Products</h2>
          <ul className="nav__ul">
            <li><a href="#">Herbal Remedies</a></li>
            <li><a href="#">Organic Teas</a></li>
            <li><a href="#">Natural Supplements</a></li>
          </ul>
        </li>
        
        <li className="nav__item">
          <h2 className="nav__title">Follow Us</h2>
          <div className="social__icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram style={{ fontSize: '30px' }} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF style={{ fontSize: '30px' }} />
            </a>
            <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer">
              <FaWhatsapp style={{ fontSize: '30px' }} />
            </a>
          </div>
        </li>
        
        <li className="nav__item">
          <h2 className="nav__title">Legal</h2>
          <ul className="nav__ul">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </li>
      </ul>

      
      
    </footer>
  );
};

export default Footer;
