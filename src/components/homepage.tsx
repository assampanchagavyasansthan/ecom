// src/HomePage.js

import React from 'react';
import './home.css'; // Ensure you have corresponding CSS for styling
import { FaDollarSign, FaHeadset, FaShippingFast } from 'react-icons/fa'; 
const HomePage = () => {
  return (
    <div className="bodybox">
    <div className="backgroundbox">
        
        </div>
        
        <div className="content">
        <div className="image-box">
          image box
        </div></div>
      
        <div className="midbox">
      <div className="box">
        <FaDollarSign size={30} color="#4CAF50" /> {/* Icon for Box 1 */}
        <h3>Reasonable Price</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <div className="box">
        <FaHeadset size={30} color="#2196F3" /> {/* Icon for Box 2 */}
        <h3>24/7 Customer Support</h3>
        <p>Our dedicated support team is available around the clock to assist you with any questions or issues you may have.</p>
      </div>
      <div className="box">
        <FaShippingFast size={30} color="#FF5722" /> {/* Icon for Box 3 */}
        <h3>Free Shipping</h3>
        <p>Enjoy free shipping on all orders within our service area. No minimum purchase required.</p>
      </div>
    </div>
  
<div style={{ fontSize: '2rem', paddingLeft: '20px', color: '#333' }}>
  New Products
</div>
<div className="grid-container">
          <div className="grid-item">Box 1</div>
          <div className="grid-item">Box 2</div>
          <div className="grid-item">Box 3</div>
          <div className="grid-item">Box 4</div>
          <div className="grid-item">Box 5</div>
          <div className="grid-item">Box 6</div>
          <div className="grid-item">Box 7</div>
          <div className="grid-item">Box 8</div>
        </div>

      <div className="threemidle">

</div>
 </div>
  );
};

export default HomePage;
