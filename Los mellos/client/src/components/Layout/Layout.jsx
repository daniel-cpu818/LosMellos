import React from "react";
import Sidebar from "../Sidebar";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <aside className="layout__sidebar">
        <Sidebar />
      </aside>

      <main className="layout__content">
        <header className="layout__header">
          <h2>Los Mellos Admin</h2>
        </header>

        <section className="layout__main">{children}</section>

        <footer className="layout__footer">
          © {new Date().getFullYear()} Los Mellos
        </footer>
      </main>
    </div>
  );
};

export default Layout;
