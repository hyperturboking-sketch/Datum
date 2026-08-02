"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar_url: string | null;
  organization_id: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_KEY = "datum.session";
const CURRENT_USER_KEY = "datum.current_user";

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(CURRENT_USER_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<AuthUser>;
    if (
      typeof parsed.id === "string" &&
      typeof parsed.email === "string" &&
      typeof parsed.name === "string" &&
      typeof parsed.organization_id === "string"
    ) {
      return {
        id: parsed.id,
        email: parsed.email,
        name: parsed.name,
        avatar_url: typeof parsed.avatar_url === "string" ? parsed.avatar_url : null,
        organization_id: parsed.organization_id,
      };
    }
  } catch {
    return null;
  }
  return null;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = readStoredUser();
    if (stored) {
      setUser(stored);
    } else {
      setUser({
        id: "usr_2f6a1c",
        email: "engineer@datum.build",
        name: "Maya Chen",
        avatar_url: null,
        organization_id: "org_8b4d9e",
      });
    }
    setIsLoading(false);
  }, []);

  const signOut = useCallback(() => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(SESSION_KEY);
      window.localStorage.removeItem(CURRENT_USER_KEY);
    }
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      signOut,
    }),
    [user, isLoading, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
