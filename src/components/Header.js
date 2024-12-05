import React from 'react';

function Header() {
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
                <span>Jakub Bartkowski</span>
            </div>
        </header>
    );
}

export default Header;
