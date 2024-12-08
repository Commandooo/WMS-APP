import React from 'react';
import { useAuth } from '../context/AuthContext'; // Pobieranie funkcji useAuth z kontekstu
import './Sidebar.css'; // Import stylów dla sidebaru

function Sidebar() {
    const { user, logout, isAdmin } = useAuth(); // Pobieranie user, logout i isAdmin z kontekstu

    const handleLogout = async () => {
        try {
            await logout();
            alert('Wylogowano pomyślnie!');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <nav className="sidebar">
            <a href="/">Pulpit</a>
            <a href="/deliveries">Dostawy</a>
            <a href="/producers">Producenci</a>
            {/* Widoczny tylko dla admina */}
            {isAdmin && <a href="/admin">Panel Admina</a>}
            {user && (
                <button onClick={handleLogout} className="logout-btn">
                    Wyloguj
                </button>
            )}
        </nav>
    );
}

export default Sidebar;
