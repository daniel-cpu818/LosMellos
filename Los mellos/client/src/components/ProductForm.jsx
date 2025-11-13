import { useState } from "react";
import { createProduct } from "../api/products";
import "./ProductForm.css";

const ProductForm = ({ onProductCreated }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createProduct({
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock) || 0,
      });

      alert("✅ Producto creado con éxito");
      setForm({ name: "", description: "", price: "", stock: "" });
      onProductCreated();
    } catch (error) {
      console.error(error);
      alert("❌ Error al crear producto");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <div className="form-group">
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
          />
        </div>
      </div>

      <button type="submit" className="btn-submit">
        Crear Producto
      </button>
    </form>
  );
};

export default ProductForm;

