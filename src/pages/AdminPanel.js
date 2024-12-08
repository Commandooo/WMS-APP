import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';

function AdminPanel() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const fetchUsers = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'users'));
            const users = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(users);
            console.log('Lista użytkowników została odświeżona:', users);
        } catch (error) {
            console.error('Błąd podczas pobierania użytkowników:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const functions = getFunctions();
            const createUser = httpsCallable(functions, 'createUser');

            const result = await createUser({
                email: email,
                password: password,
                role: 'user',
            });

            console.log(result.data.message);

            fetchUsers();
            setEmail('');
            setPassword('');
            setSuccessMessage(`Użytkownik ${email} został utworzony!`);
        } catch (error) {
            console.error('Błąd podczas tworzenia użytkownika:', error.message);
            setErrorMessage('Nie udało się utworzyć użytkownika.');
        }
    };

    const handleDeleteUser = async (userId) => {
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const functions = getFunctions();
            const deleteUser = httpsCallable(functions, 'deleteUser');

            const result = await deleteUser({ uid: userId });

            console.log(result.data.message);

            fetchUsers();
            setSuccessMessage(`Użytkownik ${userId} został usunięty.`);
        } catch (error) {
            console.error('Błąd podczas usuwania użytkownika:', error.message);
            setErrorMessage('Nie udało się usunąć użytkownika.');
        }
    };

    const handleSetAdmin = async (email) => {
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const functions = getFunctions();
            const setAdmin = httpsCallable(functions, 'setAdmin');

            const result = await setAdmin({ email });

            console.log(result.data.message);

            fetchUsers();
            setSuccessMessage(`Użytkownik ${email} został ustawiony jako admin.`);
        } catch (error) {
            console.error('Błąd podczas ustawiania admina:', error.message);
            setErrorMessage('Nie udało się ustawić użytkownika jako admin.');
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
                <button type="submit">Utwórz użytkownika</button>
            </form>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <h2>Lista użytkowników</h2>
            <ul>
                {users.length === 0 ? (
                    <p>Brak użytkowników w systemie.</p>
                ) : (
                    users.map((user) => (
                        <li key={user.id}>
                            {user.email} - {user.role || 'brak roli'}
                            <button onClick={() => handleSetAdmin(user.email)}>Ustaw jako admin</button>
                            <button onClick={() => handleDeleteUser(user.id)}>Usuń</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default AdminPanel;
