import React, { useState } from "react";
import Products from "./Products";
import "./Dashboard.css";

const Dashboard = () => {
  const [view, setView] = useState("home");

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-top">
          <div className="brand">
            <h1>Los Mellos Admin</h1>
            <p>Panel de administración</p>
          </div>

          <nav className="menu">
            <button
              onClick={() => setView("home")}
              className={`menu-btn ${view === "home" ? "active" : ""}`}
            >
              <span>🏠</span> Inicio
            </button>

            <button
              onClick={() => setView("products")}
              className={`menu-btn ${view === "products" ? "active" : ""}`}
            >
              <span>🛍️</span> Productos
            </button>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <p>© {new Date().getFullYear()} Los Mellos</p>
        </div>
      </aside>

      {/* Contenido principal */}
      <main className="main-content">
        {view === "home" && (
          <div className="welcome">
            <h2>👋 Bienvenido al Panel</h2>
            <p>Usa el menú lateral para gestionar tus productos y más.</p>
          </div>
        )}

        {view === "products" && <Products />}
      </main>
    </div>
  );
};

export default Dashboard;
