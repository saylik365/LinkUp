import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Profile from './components/Profile';
import ProfileView from './components/ProfileView';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app">
      <Header />
      <div className="main-layout">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/profile/:id" element={<ProfileView />} />
            <Route path="/profile/:id/edit" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App; 