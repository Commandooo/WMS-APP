import React from "react";
import PropTypes from "prop-types"; // Dodanie PropTypes
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children, adminOnly = false }) {
    const { user, isAdmin, loading } = useAuth();

    console.log("Sprawdzanie użytkownika:", { user, isAdmin, loading });

    if (loading) {
        console.log("Ładowanie danych użytkownika...");
        return <div>Ładowanie...</div>;
    }

    if (!user) {
        console.log("Użytkownik nie jest zalogowany, przekierowanie na /login");
        return <Navigate to="/login" />;
    }

    if (adminOnly && !isAdmin) {
        console.log("Użytkownik nie jest adminem, przekierowanie na /");
        return <Navigate to="/" />;
    }

    console.log("Wszystkie warunki spełnione, renderowanie dzieci komponentu.");
    return children;
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
    adminOnly: PropTypes.bool,
};

export default PrivateRoute;
