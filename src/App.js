import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Deliveries from './pages/Deliveries';
import Producers from './pages/Producers';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Sidebar />
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/deliveries"
            element={
              <PrivateRoute>
                <Deliveries />
              </PrivateRoute>
            }
          />
          <Route
            path="/producers"
            element={
              <PrivateRoute>
                <Producers />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute adminOnly={true}>
                <AdminPanel />
              </PrivateRoute>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />


        </Routes>
      </div>
    </Router>
  );
}

export default App;
