import React from 'react';

function Login() {
    return (
        <div>
            <h1>Logowanie</h1>
            <form>
                <input type="text" placeholder="Email" />
                <input type="password" placeholder="Hasło" />
                <button type="submit">Zaloguj się</button>
            </form>
        </div>
    );
}

export default Login;
