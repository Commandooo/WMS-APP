import React from 'react';
import './Sidebar.css';

function Sidebar() {
    return (
        <nav className="sidebar">
            <a href="/">Pulpit</a>
            <a href="/deliveries">Dostawy</a>
            <a href="/producers">Producenci</a>
            <a href="/admin">Panel Admina</a>
            <a href="/login">Logowanie</a>
        </nav>
    );
}

export default Sidebar;
