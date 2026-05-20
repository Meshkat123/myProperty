import React, { createContext, ReactNode, useContext, useState } from "react";

interface User {
  email: string;
  name: string;
  profilePicture?: string | null;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  hasSeenWelcome: boolean;
  login: (email: string, password: string) => boolean;
  signup: (
    name: string,
    email: string,
    password: string,
    profilePicture?: string | null,
  ) => boolean;
  logout: () => void;
  completeWelcome: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

  const login = (email: string, password: string): boolean => {
    if (email.trim() === "" || password.trim() === "") {
      return false;
    }
    setUser({ email, name: email.split("@")[0] });
    setIsLoggedIn(true);
    return true;
  };

  const signup = (
    name: string,
    email: string,
    password: string,
    profilePicture?: string | null,
  ): boolean => {
    if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
      return false;
    }
    setUser({ email, name, profilePicture });
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setHasSeenWelcome(false);
  };

  const completeWelcome = () => {
    setHasSeenWelcome(true);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        hasSeenWelcome,
        login,
        signup,
        logout,
        completeWelcome,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
