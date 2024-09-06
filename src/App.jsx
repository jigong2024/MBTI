import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import TestPage from "./pages/TestPage";
import TestResultPage from "./pages/TestResultPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { login } from "./api/auth";

const App = () => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setUser(!!token);
  }, []);

  const handleLogin = async (userData) => {
    try {
      const response = await login(userData);
      localStorage.setItem("authToken", response.token);
      setUser(true);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(false);
  };

  return (
    <BrowserRouter>
      <Layout user={user} handleLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute user={user}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute user={user}>
                <TestPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result"
            element={
              <ProtectedRoute user={user}>
                <TestResultPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
