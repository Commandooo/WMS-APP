import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children, adminOnly = false }) {
    const { user, isAdmin, loading } = useAuth();

    if (loading) {
        return <div>Ładowanie...</div>; // Możesz tu dodać spinner lub inny element ładowania
    }

    // Przekierowanie, jeśli użytkownik nie jest zalogowany
    if (!user) {
        console.log("Użytkownik niezalogowany - przekierowanie na /login");
        return <Navigate to="/login" />;
    }

    // Przekierowanie, jeśli trasa wymaga admina, a użytkownik nim nie jest
    if (adminOnly && !isAdmin) {
        console.log("Użytkownik nie jest adminem - przekierowanie na /");
        return <Navigate to="/" />;
    }

    // Jeśli wszystkie warunki są spełnione, wyświetl dzieci
    return children;
}

// Definicje PropTypes
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    adminOnly: PropTypes.bool,
};

export default PrivateRoute;
