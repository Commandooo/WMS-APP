import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updatePassword, // Importowanie funkcji do zmiany hasła
} from 'firebase/auth';
import {
    collection,
    getDocs,
    doc,
    setDoc,
    deleteDoc,
    updateDoc,
} from 'firebase/firestore';

function AdminPanel() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [currentAdminEmail, setCurrentAdminEmail] = useState('');
    const [adminPassword, setAdminPassword] = useState('');

    const fetchUsers = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'users'));
            const users = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(users);
        } catch (error) {
            console.error('Błąd podczas pobierania użytkowników:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
        if (auth.currentUser) {
            setCurrentAdminEmail(auth.currentUser.email);
        }
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            console.log('Rozpoczęto tworzenie użytkownika...');
            const newUserCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = newUserCredential.user;

            console.log('Utworzono użytkownika w Authentication:', newUser);

            // Przełączenie z powrotem na administratora
            await signInWithEmailAndPassword(auth, currentAdminEmail, adminPassword);

            console.log('Powrót do konta administratora.');

            // Dodanie użytkownika do Firestore Database
            await setDoc(doc(db, 'users', newUser.email), {
                email: newUser.email,
                role: 'user',
            });

            console.log('Użytkownik dodany do Firestore.');

            setSuccessMessage(`Użytkownik ${email} został utworzony!`);
            fetchUsers();
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error('Błąd podczas tworzenia użytkownika:', error.message);
            setErrorMessage('Nie udało się utworzyć użytkownika.');
        }
    };

    const handleDeleteUser = async (userEmail) => {
        setSuccessMessage('');
        setErrorMessage('');

        try {
            await deleteDoc(doc(db, 'users', userEmail));
            setSuccessMessage(`Użytkownik ${userEmail} został usunięty.`);
            fetchUsers();
        } catch (error) {
            console.error('Błąd podczas usuwania użytkownika:', error.message);
            setErrorMessage('Nie udało się usunąć użytkownika.');
        }
    };

    const handleSetAdmin = async (userEmail) => {
        setSuccessMessage('');
        setErrorMessage('');

        try {
            await updateDoc(doc(db, 'users', userEmail), {
                role: 'admin',
            });
            setSuccessMessage(`Użytkownik ${userEmail} został ustawiony jako admin.`);
            fetchUsers();
        } catch (error) {
            console.error('Błąd podczas ustawiania admina:', error.message);
            setErrorMessage('Nie udało się ustawić użytkownika jako admin.');
        }
    };

    const handleRemoveAdmin = async (userEmail) => {
        setSuccessMessage('');
        setErrorMessage('');

        try {
            await updateDoc(doc(db, 'users', userEmail), {
                role: 'user',
            });
            setSuccessMessage(`Użytkownik ${userEmail} został usunięty z roli admina.`);
            fetchUsers();
        } catch (error) {
            console.error('Błąd podczas usuwania uprawnień admina:', error.message);
            setErrorMessage('Nie udało się usunąć uprawnień admina.');
        }
    };

    const handleChangePassword = async (userEmail) => {
        setSuccessMessage('');
        setErrorMessage('');

        try {
            // Znajdź użytkownika w Authentication
            const user = auth.currentUser;

            // Zmień hasło użytkownika
            if (user) {
                await updatePassword(user, newPassword);
                setSuccessMessage(`Hasło użytkownika ${userEmail} zostało zmienione.`);
                setNewPassword('');
            } else {
                throw new Error('Nie można znaleźć użytkownika w Authentication.');
            }
        } catch (error) {
            console.error('Błąd podczas zmiany hasła:', error.message);
            setErrorMessage('Nie udało się zmienić hasła użytkownika.');
        }
    };

    return (
        <div className="main-content">
            <h1>Panel Admina</h1>
            <h2>Tworzenie użytkownika</h2>
            <form onSubmit={handleCreateUser}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Hasło:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Hasło administratora:</label>
                    <input
                        type="password"
                        value={adminPassword}
                        onChange={(e) => setAdminPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Utwórz użytkownika</button>
            </form>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <h2>Lista użytkowników</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.email}>
                        {user.email} - {user.role}
                        <button onClick={() => handleSetAdmin(user.email)}>Ustaw jako admin</button>
                        <button onClick={() => handleRemoveAdmin(user.email)}>Usuń admina</button>
                        <input
                            type="password"
                            placeholder="Nowe hasło"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button onClick={() => handleChangePassword(user.email)}>
                            Zmień hasło
                        </button>
                        <button onClick={() => handleDeleteUser(user.email)}>Usuń</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AdminPanel;
