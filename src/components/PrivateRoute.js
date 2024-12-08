import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children, adminOnly = false }) {
    const { user, isAdmin, loading } = useAuth();

    // Sprawdzenie, czy trwa ładowanie
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

export default PrivateRoute;
