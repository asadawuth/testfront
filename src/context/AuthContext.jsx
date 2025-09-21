import { createContext, useState, useEffect, useContext } from "react";
import { apiMain, apiPublic } from "../config/axios";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await apiMain.get("/user/datauser");
        const user = res?.data?.user ?? null;

        if (user) {
          setAuthUser(user);
          localStorage.setItem("user", JSON.stringify(user));
        }
      } catch (err) {
        console.error("fetch user error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const register = async (registerInputObject) => {
    const res = await apiPublic.post("/user/register", registerInputObject);
    return res.data;
  };

  const login = async (credential) => {
    const res = await apiPublic.post("/user/login", credential, {
      withCredentials: true,
    });
    const { accessToken, user } = res.data || {};
    if (accessToken) localStorage.setItem("accessToken", accessToken);
    if (user) {
      setAuthUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    }
    return res.data;
  };

  const logout = async () => {
    try {
      await apiMain.post("/user/logout", {}, { withCredentials: true });
    } catch {}
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setAuthUser(null);
  };

  const logoutAll = async () => {
    try {
      await apiMain.post("/user/logoutall", {}, { withCredentials: true });
    } catch {}
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authUser,
        loading,
        setLoading,
        register,
        login,
        logout,
        logoutAll,
        setAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
