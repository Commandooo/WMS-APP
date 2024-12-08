import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppWrapper() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Ładowanie...</div>; // Możesz dodać spinner lub ekran ładowania
  }

  return <App />;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  </AuthProvider>
);
