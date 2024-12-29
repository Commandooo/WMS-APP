import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Producers from "./pages/Producers";
import AdminPanel from "./pages/AdminPanel";
import Deliveries from "./pages/Deliveries";
import CreateDelivery from "./pages/CreateDelivery";
import Login from "./pages/Login";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="content">
        {!isSidebarOpen && (
          <button onClick={toggleSidebar} className="menu-btn">
            &#9776;
          </button>
        )}
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
            path="/create-delivery"
            element={
              <PrivateRoute>
                <CreateDelivery />
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
