import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("adminToken");
    const username = localStorage.getItem("adminUsername");
    const role = localStorage.getItem("adminRole");
    return token ? { token, username, role } : null;
  });

  const login = ({ token, username, role }) => {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminUsername", username);
    localStorage.setItem("adminRole", role);
    setAuth({ token, username, role });
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    localStorage.removeItem("adminRole");
    setAuth(null);
  };

  return (
    <AuthContext.Provider value={{ auth, isAuthenticated: !!auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
