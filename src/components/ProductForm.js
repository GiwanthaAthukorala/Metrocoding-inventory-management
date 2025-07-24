import React, { useState } from "react";

const ProductForm = ({ product, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    quantity: product?.quantity || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      price: parseFloat(formData.price),
      quantity: parseInt(formData.quantity),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Product Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price (LKR)</label>
        <input
          type="number"
          step="0.01"
          className="form-control"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Quantity</label>
        <input
          type="number"
          className="form-control"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-success">
        {product ? "Update" : "Add"} Product
      </button>
      {product && (
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default ProductForm;
