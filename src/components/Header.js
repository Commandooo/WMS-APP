import React from 'react';
import { useAuth } from '../context/AuthContext';

function Header() {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            alert('Wylogowano pomyślnie!');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return (
        <header>
            <div className="logo">
                <img src="/logo.png" alt="Logo" />
                <span>Blue Admin</span>
            </div>
            <input type="text" placeholder="Wciśnij / aby szukać" />
            <div className="user-options">
                <i className="fa fa-bell"></i>
                <i className="fa fa-user"></i>
                <span>{user?.email || "Gość"}</span>
                {user && (
                    <button onClick={handleLogout} className="logout-btn">
                        Wyloguj
                    </button>
                )}
            </div>
        </header>
    );
}

export default Header;
