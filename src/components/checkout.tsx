import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from './fierbase'; // Ensure this path is correct
import { collection, addDoc } from 'firebase/firestore'; // Import necessary functions
import { v4 as uuidv4 } from 'uuid';
import './checkout.css'; // Import the CSS file

// Interface for Product
interface Product {
  id: string;
  imageUrl: string;
  medicineName: string;
  indications: string;
  doses: string;
  weight: string;
  price: string; // Change price to string
}

// Initial form data state
const initialFormData = {
  name: '',
  address: '',
  city: '',
  postalCode: '',
  country: '',
  phoneNumber: '',
  email: '',
  paymentMethod: '',
};

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]); // State for cart items
  const [formData, setFormData] = useState(initialFormData); // State for form data
  const [orderId, setOrderId] = useState<string | null>(null); // State for order ID
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cart') || '[]').map((item: Product) => ({
      ...item,
      price: item.price.toString(), // Ensure price is a string
    }));
    setCartItems(savedCartItems);
  }, []);

  // Handle form input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage(null); // Reset error message

    // Generate unique order ID
    const uniqueOrderId = uuidv4();

    // Prepare order data
    const orderData = {
      orderId: uniqueOrderId,
      ...formData,
      items: cartItems.map(item => ({
        medicineName: item.medicineName,
        price: item.price, // price will be a string now
      })),
      totalAmount: cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0), // Sum the number
    };

    try {
      // Save order to Firestore
      await addDoc(collection(db, 'orders'), orderData);
      setOrderId(uniqueOrderId);

      // Clear cart and form
      localStorage.removeItem('cart');
      setCartItems([]);
      setFormData(initialFormData);
    } catch (error) {
      console.error('Error placing order:', error);
      setErrorMessage('There was an error placing your order. Please try again.');
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
                  <span>{item.price}</span> {/* Display price correctly */}
                </div>
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>

          {cartItems.length > 0 && (
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
                  <option value="creditCard">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="cashOnDelivery">Cash on Delivery</option>
                  {/* Add other payment methods as needed */}
                </select>
              </label>
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit" className="btn">Place Order</button>
            </form>
          )}
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
