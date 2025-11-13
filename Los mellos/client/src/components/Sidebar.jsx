import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [active, setActive] = useState("home");

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h1>🛠️ Los Mellos</h1>
        <p>Panel de control</p>
      </div>

      <nav className="sidebar__nav">
        <button
          className={active === "home" ? "active" : ""}
          onClick={() => setActive("home")}
        >
          🏠 Inicio
        </button>
        <button
          className={active === "products" ? "active" : ""}
          onClick={() => setActive("products")}
        >
          🛍️ Productos
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
