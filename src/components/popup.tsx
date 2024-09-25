// src/ProductPopup.tsx

import React, { useState } from 'react';
import './popup.css';

interface ProductPopupProps {
  product: {
    name: string;
    description: string;
    price: string;
  };
  onClose: () => void;
  onAddToCart: (product: { name: string; description: string; price: string }) => void;
  onBuyNow: (product: { name: string; description: string; price: string }) => void;
}

const ProductPopup: React.FC<ProductPopupProps> = ({ product, onClose, onAddToCart, onBuyNow }) => {
  const handleAddToCart = () => {
    onAddToCart(product);
  };

  const handleBuyNow = () => {
    onBuyNow(product);
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p><strong>Price:</strong> ${product.price}</p>
        <div className="popup-buttons">
          <button onClick={handleBuyNow}>Buy Now</button>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductPopup;
