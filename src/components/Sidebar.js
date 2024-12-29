import React from "react";
import PropTypes from "prop-types";
import "./Sidebar.css";

function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <div className="sidebar-header">
                <h2>Menu</h2>
                <button onClick={toggleSidebar} className="close-btn">
                    &times;
                </button>
            </div>
            <ul>
                <li>
                    <a href="/dashboard">Pulpit</a>
                </li>
                <li>
                    <a href="/deliveries">Dostawy</a>
                </li>
                <li>
                    <a href="/producers">Producenci</a>
                </li>
                <li>
                    <a href="/admin">Panel Admina</a>
                </li>
            </ul>
            <button className="logout-btn" onClick={() => alert("Wylogowano!")}>
                Wyloguj
            </button>
        </div>
    );
}

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
