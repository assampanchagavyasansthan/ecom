import React, { useEffect, useState } from 'react';
import { db } from './fierbase'; // Ensure this is the correct path
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom'; // For routing
import { FaSearch } from 'react-icons/fa'; // Import search icon
import './dispaly.css';

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

const DisplayProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [priceFilter, setPriceFilter] = useState<number | ''>('');
  const [indicationsFilter, setIndicationsFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [productsPerPage] = useState<number>(10); // Change this to adjust the number of products per page

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsCollection = collection(db, 'medicines');
        const productSnapshot = await getDocs(productsCollection);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productList);
      } catch (err) {
        console.error('Error fetching products: ', err);
        setError('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    return (
      product.medicineName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (categoryFilter ? product.category === categoryFilter : true) &&
      (priceFilter ? product.price <= priceFilter : true) &&
      (indicationsFilter ? product.indications.toLowerCase().includes(indicationsFilter.toLowerCase()) : true)
    );
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFilter(Number(event.target.value) || '');
  };

  const handleIndicationsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIndicationsFilter(event.target.value);
  };

  const handleAddToCart = (product: Product) => {
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = [...existingCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div
      style={{
        background: 'rgba(166, 237, 158, 0.2)',
        padding: '20px',
        borderRadius: '5px',
      }}
    >
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            width: '100%',
            padding: '8px 32px 8px 8px',
            marginBottom: '16px',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
        <FaSearch
          style={{
            position: 'absolute',
            right: '10px',
            fontSize: '16px',
            color: '#aaa',
            top: '40%',
            transform: 'translateY(-50%)',
          }}
        />
      </div>
      <div>
        <label>
          Category:
          <select value={categoryFilter} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            <option value="Category1">Category1</option>
            <option value="Category2">Category2</option>
            <option value="Category3">Category3</option>
          </select>
        </label>
        <label>
          Price:
          <input
            type="number"
            value={priceFilter || ''}
            onChange={handlePriceChange}
            placeholder="Max price"
            style={{
              width: '100px',
              padding: '8px',
              margin: '0 8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </label>
        <label>
          Indications:
          <input
            type="text"
            value={indicationsFilter}
            onChange={handleIndicationsChange}
            placeholder="Filter by indications"
            style={{
              width: '200px',
              padding: '8px',
              margin: '0 8px',
              border: '1px solid #ddd',
              borderRadius: '4px',
            }}
          />
        </label>
      </div>

      <div className="product-grid">
        {currentProducts.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.imageUrl} alt={product.medicineName} style={{ width: '100%', height: 'auto' }} />
            <h2>{product.medicineName}</h2>
            <p><strong>Indications:</strong> {product.indications}</p>
            <p><strong>Doses:</strong> {product.doses}</p>
            <p><strong>Weight:</strong> {product.weight}</p>
            <p><strong>Price:</strong> {product.price}</p>
            <div className="button-group">
              <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
              <Link to="/cart">
                <button>Buy Now</button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default DisplayProducts;
