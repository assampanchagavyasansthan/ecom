import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from './fierbase'; // Correct import path for Firestore
import { collection, addDoc } from 'firebase/firestore'; // Import necessary functions
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate unique order IDs
import './checkout.css'; // Import the CSS file

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

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phoneNumber: '',
    email: '',
    paymentMethod: '',
  });
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(savedCartItems);
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const uniqueOrderId = uuidv4();

    const orderData = {
      orderId: uniqueOrderId,
      ...formData,
      items: cartItems.map(item => ({
        medicineName: item.medicineName,
        price: item.price,
      })),
      totalAmount: cartItems.reduce((acc, item) => acc + item.price, 0),
    };

    try {
      await addDoc(collection(db, 'orders'), orderData);
      setOrderId(uniqueOrderId);

      localStorage.removeItem('cart');
      setCartItems([]);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-header">Checkout</h1>
      {orderId ? (
        <div className="order-success">
          <h2>Thank you for shopping!</h2>
          <p>Your order has been placed successfully. Your order ID is <strong>{orderId}</strong>.</p>
          <Link to="/"><button className="btn">Go to Home</button></Link>
        </div>
      ) : (
        <>
          <div className="checkout-summary">
            <h2>Order Summary</h2>
            {cartItems.length > 0 ? (
              cartItems.map(item => (
                <div className="checkout-summary-item" key={item.id}>
                  <span>{item.medicineName}</span>
                  <span>${item.price}</span>
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input"
                required
              />
            </label>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="input"
                required
              />
            </label>
            <label>
              City:
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="input"
                required
              />
            </label>
            <label>
              Postal Code:
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="input"
                required
              />
            </label>
            <label>
              Country:
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="input"
                required
              />
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="input"
                required
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                required
              />
            </label>
            <label>
              Payment Method:
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="ddl"
                required
              >
                <option value="">Select Payment Method</option>
                <option value="creditCard">Cash on delevery</option>
               
                {/* Add other payment methods as needed */}
              </select>
            </label>
            <button type="submit" className="btn">Place Order</button>
          </form>
        </>
      )}
      <div className="checkout-footer">
        <Link to="/cart">
          <button className="btn action__back">Back to Cart</button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
