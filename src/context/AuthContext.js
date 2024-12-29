import React, { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log("Auth state changed:", currentUser);
            setUser(currentUser);

            if (currentUser) {
                try {
                    const idTokenResult = await currentUser.getIdTokenResult();
                    console.log("Custom claims:", idTokenResult.claims);
                    const adminClaim = idTokenResult.claims.admin;
                    setIsAdmin(!!adminClaim);
                    console.log("Is admin:", !!adminClaim);
                } catch (error) {
                    console.error("Error checking admin claim:", error);
                    setIsAdmin(false);
                }
            } else {
                setIsAdmin(false);
            }

            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const login = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);

            const idTokenResult = await userCredential.user.getIdTokenResult(true);
            console.log("Login custom claims:", idTokenResult.claims);
            const adminClaim = idTokenResult.claims.admin;
            setIsAdmin(!!adminClaim);

            console.log('User logged in:', userCredential.user.email);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setIsAdmin(false);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useAuth() {
    return useContext(AuthContext);
}
