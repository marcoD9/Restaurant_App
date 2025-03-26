import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  AuthContextType,
  AuthProviderProps,
  LoginResponse,
  User,
} from "@/types";
import { login, fetchUserById } from "./api.ts";

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [error, setError] = useState<string | null>(null);

  const onError = (message: string) => {
    setError(message); // Set the error
    console.error(message); // Log the error
  };

  //Login
  const loginHandler = async (username: string, password: string) => {
    try {
      const userData: LoginResponse = await login(username, password);
      setToken(userData.token);
      localStorage.setItem("authToken", userData.token); // Save the token to localStorage
    } catch (err: unknown) {
      if (err instanceof Error) {
        onError(err.message);
      } else {
        onError("An unknown error occurred.");
      }
    }
  };

  // Fetch user data
  const fetchUserData = useCallback(
    async (token: string) => {
      if (token) {
        try {
          const userData = await fetchUserById(user?.id || "", token);
          setUser(userData); // Set the user data
        } catch (error) {
          onError("Failed to fetch user data: " + error);
        }
      }
    },
    [user?.id] // Run when user?.id changes
  );

  // Fetch user data on token change
  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token, fetchUserData]); // Add fetchUserData as a dependency

  // Logout
  const logoutHandler = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login: loginHandler,
        logout: logoutHandler,
        setUser,
        onError,
      }}
    >
      {children}
      {error && <div style={{ color: "red" }}>{error}</div>}{" "}
    </AuthContext.Provider>
  );
};

// Hook for useContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
