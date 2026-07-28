import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Prevent ProtectedRoute from redirecting
  // before we restore the user
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser =
        localStorage.getItem("user") ||
        sessionStorage.getItem("user");

      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error(
        "Failed to restore user:",
        error
      );

      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (
    userData,
    rememberMe = true
  ) => {
    if (rememberMe) {
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      sessionStorage.removeItem("user");
    } else {
      sessionStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      localStorage.removeItem("user");
    }

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");

    setUser(null);
  };

  const updateUser = (
    updatedData
  ) => {
    const current =
      JSON.parse(
        localStorage.getItem("user")
      ) ||
      JSON.parse(
        sessionStorage.getItem("user")
      );

    if (!current) return;

    const updatedUser = {
      ...current,
      ...updatedData,
    };

    if (
      localStorage.getItem("user")
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
    } else {
      sessionStorage.setItem(
        "user",
        JSON.stringify(updatedUser)
      );
    }

    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}