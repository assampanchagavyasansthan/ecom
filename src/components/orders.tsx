import React from 'react';
import { useLocation } from 'react-router-dom';

interface Order {
  id: string;
  items: { id: string; name: string; price: number }[];
  total: number;
}

const OrderPage: React.FC = () => {
  const location = useLocation();
  const { order } = location.state as { order: Order }; // Extract the order data

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order.id}</p>
      <h2>Items:</h2>
      <ul>
        {order.items.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <h3>Total: ${order.total}</h3>
    </div>
  );
};

export default OrderPage;
