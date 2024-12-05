import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function AdminPanel() {
    const { register } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const user = await register(email, password);
        if (user) {
            setSuccess('Użytkownik został utworzony');
        } else {
            setSuccess('Nie udało się utworzyć użytkownika');
        }
    };

    return (
        <div className="main-content">
            <h1>Panel Admina</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email użytkownika:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Hasło:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Utwórz użytkownika</button>
            </form>
            {success && <p>{success}</p>}
        </div>
    );
}

export default AdminPanel;
