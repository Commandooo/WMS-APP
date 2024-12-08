import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, setDoc, deleteDoc, doc } from 'firebase/firestore';

function AdminPanel() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
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

        fetchUsers();
    }, []);

    const handleCreateUser = async (e) => {
        e.preventDefault();

        try {
            console.log('Tworzenie nowego użytkownika:', email);

            // Zapamiętaj obecnie zalogowanego użytkownika
            const originalUser = auth.currentUser;

            // Tworzenie nowego użytkownika w Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const newUser = userCredential.user;

            console.log('Nowy użytkownik został utworzony:', newUser.email);

            // Dodanie użytkownika do Firestore
            const userDocRef = doc(db, 'users', newUser.email);
            await setDoc(userDocRef, { email: newUser.email, role: 'user' });

            console.log('Nowy użytkownik zapisany w Firestore:', newUser.email);

            // Przywrócenie pierwotnego użytkownika bez zmiany trasy
            if (originalUser) {
                await auth.updateCurrentUser(originalUser);
                console.log('Przywrócono pierwotnego użytkownika:', originalUser.email);
            }

            // Zresetowanie pól formularza
            setEmail('');
            setPassword('');
            setSuccessMessage(`Użytkownik ${newUser.email} został utworzony!`);

            // Odświeżenie listy użytkowników
            const snapshot = await getDocs(collection(db, 'users'));
            const updatedUsers = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Błąd podczas tworzenia użytkownika:', error);
            setErrorMessage('Nie udało się utworzyć użytkownika.');
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await deleteDoc(doc(db, 'users', userId));
            console.log(`Użytkownik ${userId} został usunięty z Firestore`);

            // Aktualizacja listy użytkowników
            setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
            setSuccessMessage(`Użytkownik ${userId} został usunięty.`);
        } catch (error) {
            console.error('Błąd podczas usuwania użytkownika:', error);
            setErrorMessage('Nie udało się usunąć użytkownika.');
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
                            <button onClick={() => handleDeleteUser(user.id)}>Usuń</button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default AdminPanel;
