import { ReactNode } from "react";

export interface Dish {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}
export interface DishDetailsProps {
  id: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface LoginFormProps {
  onLoginSuccess: (userData: LoginResponse) => Promise<void>;
  onError: (error: string) => void;
}

export interface LoginResponse {
  user: {
    id: string;
  };
  token: string;
}

export interface AuthProviderProps {
  children: ReactNode;
}
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  onError: (message: string) => void;
}
