import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "";

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAut must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("accessToken", token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  };

  const refreshAuth = async () => {
    try {
      const response = await axios.get(`${apiBaseUrl}/api/user/auth`, {
        withCredentials: true,
      });
      const { user, token } = response.data;
      login(user, token);
    } catch (error) {
      console.log(error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = localStorage.getItem("user");
      const storedToken = localStorage.getItem("accessToken");

      if (storedUser && storedToken) {
        await refreshAuth();
      } else {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const isAuthenticated = !!user && !!token;

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          token,
          login,
          logout,
          isAuthenticated,
          refreshAuth,
          loading,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
