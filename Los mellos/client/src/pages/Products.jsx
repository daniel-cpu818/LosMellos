import { useEffect, useState } from "react";
import { getActiveProducts } from "../api/products";
import ProductForm from "../components/ProductForm";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const loadProducts = async () => {
    const data = await getActiveProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div className="products-container">
      <div className="header">
        <h1>🛍️ Productos Activos</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="add-btn"
        >
          {showForm ? "Cerrar" : "Agregar Producto"}
        </button>
      </div>

      {showForm && <ProductForm onProductCreated={loadProducts} />}

      <div className="products-grid">
        {products.length > 0 ? (
          products.map((p) => (
            <div key={p.id} className="product-card">
              <div className="product-image">
                {p.name.charAt(0).toUpperCase()}
              </div>

              <div className="product-info">
                <h2>{p.name}</h2>
                <p>{p.description || "Sin descripción"}</p>

                <div className="product-footer">
                  <span className="price">${p.price}</span>
                  <span
                    className={`stock ${
                      p.stock > 0 ? "in-stock" : "out-stock"
                    }`}
                  >
                    {p.stock > 0 ? `Stock: ${p.stock}` : "Sin stock"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-products">No hay productos activos aún.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
