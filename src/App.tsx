import './App.css';
import Footer from './components/footer';
import Nav from './components/nevigation'; // Corrected import path
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/homepage';// Make sure the path is correct
import Cart from './components/cardpage'; // Make sure the path is correct
import Checkout from './components/checkout'; // Optional: Add if you have a checkout page

function App() {
  return (
    <Router>
      <div className="app-container">
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
       
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} /> {/* Add this if you have a checkout page */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
