import { Route, Routes, Link } from 'react-router-dom';
import './nav.css';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'; 
import HomePage from './homepage';
import About from './Aboutpage';
import UploadForm from './fierbaseupload';
import DisplayProducts from './displayfierbase';
import SignUp from './signeup';
import LogIn from './login';
import Cart from './cardpage';
import OrderPage from './orders'; 
import { useState } from 'react';

function Nav() {
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  
  const toggleProfileOptions = () => {
    setShowProfileOptions(prev => !prev);
  };

  // Example order data, replace this with actual order data from your application
  const orderData = {
    id: '12345',
    items: [
      { id: '1', name: 'Herbal Medicine 1', price: 20 },
      { id: '2', name: 'Herbal Medicine 2', price: 15 },
    ],
    total: 35,
  };

  return (
    <div className="app-container">
      <nav className="menu menu-1">
        <div className="nav-wrapper">
          <ul>
            <li><Link to="/homepage">Home</Link></li>
            <li><Link to="/signeup"></Link></li>
            <li><Link to="/Aboutpage">About</Link></li>
            <li><Link to="/firebaseupload"></Link></li>
            <li><Link to="/displayfierbase">Shop</Link></li>
          
            <li>
              <Link to="/cardpage">
                <FaShoppingCart style={{ marginRight: '5px' }} /> Cart
              </Link>
            </li>
            <li>
              <div className="profile-icon" onClick={toggleProfileOptions}>
                <FaUserCircle style={{ fontSize: '24px', cursor: 'pointer' }} />
              </div>
              {showProfileOptions && (
                <div className="profile-dropdown">
                  <Link to="/login" onClick={() => setShowProfileOptions(false)}>Log In</Link>
                  <Link to="/signeup" onClick={() => setShowProfileOptions(false)}>Sign Up</Link>
                  <Link to="/orders" state={{ order: orderData }} onClick={() => setShowProfileOptions(false)}>My Orders</Link>
                  <Link to="/logout" onClick={() => setShowProfileOptions(false)}>Logout</Link>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/firebaseupload" element={<UploadForm />} />
        <Route path="/displayfierbase" element={<DisplayProducts />} />
        <Route path="/Aboutpage" element={<About />} />
        <Route path="/signeup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/cardpage" element={<Cart />} />
        <Route path="/orders" element={<OrderPage />} /> {/* Ensure OrderPage receives the order data */}
      </Routes>
    </div>
  );
}

export default Nav;
