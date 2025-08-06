import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    }
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = sessionStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('https://linkup-3gic.onrender.com/api/auth/user');
          setUser(res.data);
        } catch (error) {
          sessionStorage.removeItem('token');
          delete axios.defaults.headers.common['x-auth-token'];
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('https://linkup-3gic.onrender.com/api/auth/login', { email, password });
      const { token, user } = res.data;
      sessionStorage.setItem('token', token);
      axios.defaults.headers.common['x-auth-token'] = token;
      setUser(user);
      toast.success('Successfully logged in!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post('https://linkup-3gic.onrender.com/api/auth/register', userData);
      const { token, user } = res.data;
      sessionStorage.setItem('token', token);
      axios.defaults.headers.common['x-auth-token'] = token;
      setUser(user);
      toast.success('Account created successfully!');
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Registration failed';
      toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    delete axios.defaults.headers.common['x-auth-token'];
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
