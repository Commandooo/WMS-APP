import { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false); // Stan admina
    const [loading, setLoading] = useState(true); // Stan ładowania

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                try {
                    // Pobierz token z custom claims
                    const idTokenResult = await currentUser.getIdTokenResult();
                    const adminClaim = idTokenResult.claims.admin;
                    setIsAdmin(!!adminClaim); // Sprawdź, czy custom claim `admin` istnieje
                    console.log("Admin status z tokenu:", !!adminClaim);
                } catch (error) {
                    console.error("Błąd podczas sprawdzania custom claims:", error);
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

            // Wymuś odświeżenie tokenu po zalogowaniu, aby pobrać aktualne custom claims
            const idTokenResult = await userCredential.user.getIdTokenResult(true);
            const adminClaim = idTokenResult.claims.admin;
            setIsAdmin(!!adminClaim);

            console.log('Zalogowano użytkownika:', userCredential.user.email);
            console.log('Admin status:', !!adminClaim);
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
            console.error("Błąd wylogowania:", error);
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
