import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    axios
      .post("https://bc-afbq.onrender.com/auth/validate", { token })
      .then(res => {
        if (res.data.valid) setIsAuth(true);
        else localStorage.removeItem("token");
      })
      .finally(() => setLoading(false));
  }, []);

  function login(token) {
    localStorage.setItem("token", token);
    setIsAuth(true);
  }

  function logout() {
    localStorage.removeItem("token");
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider value={{ isAuth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
