import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children, adminOnly = false }) {
    const { user, isAdmin, loading } = useAuth();

    if (loading) {
        return <div>Ładowanie...</div>; // Ekran ładowania
    }

    // Jeśli użytkownik nie jest zalogowany, przekieruj na login
    if (!user) {
        console.log("Użytkownik niezalogowany - przekierowanie na /login");
        return <Navigate to="/login" />;
    }

    // Jeśli trasa wymaga admina, a użytkownik nie jest adminem, przekieruj na stronę główną
    if (adminOnly && !isAdmin) {
        console.log("Użytkownik nie jest adminem - przekierowanie na /");
        return <Navigate to="/" />;
    }

    // W przeciwnym razie wyświetl dzieci
    return children;
}

export default PrivateRoute;
