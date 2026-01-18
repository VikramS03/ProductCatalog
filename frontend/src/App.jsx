import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductForm from './components/ProductForm';

const API_BASE = 'http://localhost:8080/api/products';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_BASE);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (formData, image) => {
    const data = new FormData();
    data.append('product', JSON.stringify(formData));
    if (image) {
      data.append('image', image);
    }

    try {
      if (editingProduct) {
        await axios.put(`${API_BASE}/${editingProduct.id}`, data);
      } else {
        await axios.post(API_BASE, data);
      }
      fetchProducts();
      setIsModalOpen(false);
    } catch (error) {
      alert('Error saving product. Check console.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this product?')) {
      await axios.delete(`${API_BASE}/${id}`);
      fetchProducts();
    }
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar onAddClick={() => { setEditingProduct(null); setIsModalOpen(true); }} />

      <div className="container py-4">
        <div className="row mb-4 align-items-center">
          <div className="col-md-6">
            <h2>Product Management</h2>
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row g-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="col-sm-6 col-md-4 col-lg-3">
                <ProductCard
                  product={product}
                  onEdit={(p) => { setEditingProduct(p); setIsModalOpen(true); }}
                  onDelete={handleDelete}
                />
              </div>
            ))}
            {filteredProducts.length === 0 && (
              <div className="col-12 text-center text-muted py-5">
                No products found.
              </div>
            )}
          </div>
        )}
      </div>

      <ProductForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSave}
        initialData={editingProduct}
      />
    </div>
  );
}

export default App;
