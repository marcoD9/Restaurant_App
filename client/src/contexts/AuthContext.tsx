import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { LoginResponse, User } from "@/types";
import { login, fetchUserById, logout } from "../api.ts";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  onError: (message: string) => void;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("authToken")
  );
  const [error, setError] = useState<string | null>(null);

  const onError = (message: string) => {
    setError(message);
    console.error(message);
  };

  const clearError = () => {
    setError(null);
  };

  const loginHandler = async (username: string, password: string) => {
    try {
      const userData: LoginResponse = await login(username, password);
      setToken(userData.token);
      localStorage.setItem("authToken", userData.token);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  const fetchUserData = useCallback(
    async (token: string) => {
      if (token) {
        try {
          const userData = await fetchUserById(user?.id || "", token);
          setUser(userData);
        } catch (fetchError: unknown) {
          if (fetchError instanceof Error) {
            setError(fetchError.message);
          } else {
            setError("Failed to fetch user data.");
          }
        }
      }
    },
    [user?.id]
  );

  useEffect(() => {
    if (token) {
      fetchUserData(token);
    }
  }, [token, fetchUserData]);

  const logoutHandler = () => {
    setUser(null);
    setToken(null);
    logout();
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
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
