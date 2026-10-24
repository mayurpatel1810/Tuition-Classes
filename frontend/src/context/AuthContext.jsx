import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Reads the "exp" claim from the JWT so an old/expired login is not treated as logged-in.
function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return !payload.exp || payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

function clearStorage() {
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminUsername");
  localStorage.removeItem("adminRole");
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("adminToken");
    if (!token || isTokenExpired(token)) {
      clearStorage();
      return null;
    }
    const username = localStorage.getItem("adminUsername");
    const role = localStorage.getItem("adminRole");
    return { token, username, role };
  });

  const login = ({ token, username, role }) => {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminUsername", username);
    localStorage.setItem("adminRole", role);
    setAuth({ token, username, role });
  };

  const logout = () => {
    clearStorage();
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
