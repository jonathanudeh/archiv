"use client";

import { createContext, useContext } from "react";
import { useCurrentUser } from "@/src/features/auth/hooks/useCurrentUser";

import { User } from "@/src/types/user";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { currentUser, isLoadingCurrentUser } = useCurrentUser();

  return (
    <AuthContext.Provider
      value={{
        user: currentUser ?? null,
        loading: isLoadingCurrentUser,
        isAuthenticated: !!currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
