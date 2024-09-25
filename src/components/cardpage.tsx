import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
 import './card.css';// Ensure this CSS file exists or update with your styles

interface Product {
  id: string;
  imageUrl: string;
  medicineName: string;
  indications: string;
  doses: string;
  weight: string;
  price: number;
  category: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCartItems);
  }, []);

  const handleRemoveFromCart = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.imageUrl} alt={item.medicineName} style={{ width: '100px', height: 'auto' }} />
              <h2>{item.medicineName}</h2>
              <p><strong>Indications:</strong> {item.indications}</p><br></br> <br></br>
              <p><strong>Doses:</strong> {item.doses}</p>
              <p><strong>Weight:</strong> {item.weight}</p>
              <p><strong>Price:</strong> ${item.price}</p>
              <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
      <Link to="/">
        <button>Back to Products</button>
      </Link>
      <Link to="/checkout">
        <button>Proceed to Checkout</button>
      </Link>
    </div>
  );
};

export default Cart;
