import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/products`
      );
      setProducts(response.data);
    } catch (err) {
      setError("Failed to fetch products");
    }
  };

  const handleCreate = async (productData) => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/products`,
        productData
      );
      fetchProducts();
      setEditingProduct(null);
    } catch (err) {
      setError("Failed to create product");
    }
  };

  const handleUpdate = async (productData) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/products/${editingProduct._id}`,
        productData
      );
      fetchProducts();
      setEditingProduct(null);
    } catch (err) {
      setError("Failed to update product");
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/products/${productId}`
      );
      fetchProducts();
    } catch (err) {
      setError("Failed to delete product");
    }
  };

  if (!localStorage.getItem("isLoggedIn")) {
    return (
      <div className="alert alert-warning">
        Please login to access the dashboard
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card mb-4">
        <div className="card-header bg-info text-white">
          {editingProduct ? "Edit Product" : "Add New Product"}
        </div>
        <div className="card-body">
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdate : handleCreate}
            onCancel={() => setEditingProduct(null)}
          />
        </div>
      </div>

      <ProductList
        products={products}
        onEdit={setEditingProduct}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Dashboard;
