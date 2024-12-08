import { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // Dodajemy stan admina
    const [loading, setLoading] = useState(true); // Dodajemy stan ładowania

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            // Ustawianie isAdmin na podstawie konkretnego adresu e-mail
            if (currentUser?.email === "marcinzbionica@gmail.com") {
                setIsAdmin(true);
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
            if (userCredential.user.email === 'marcinzbionica@gmail.com') {
                setIsAdmin(true);
            }
            console.log('Zalogowano użytkownika:', userCredential.user.email);
            return true;
        } catch (error) {
            console.error('Błąd logowania:', error);
            return false;
        }
    };


    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            setIsAdmin(false); // Reset informacji o adminie
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
