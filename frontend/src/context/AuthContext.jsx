import React, { createContext, useState } from "react";
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem("role"));

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setRole(role);
  };

  const logout = async () => {
    try {
        await api.post("/auth/logout");
    } catch (err) {
        console.err("something went wrong");
    } finally {
        localStorage.clear();
        setRole(null);
    }
  };


  return (
    <AuthContext.Provider value={{ role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
