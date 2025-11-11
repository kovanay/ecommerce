import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { authFetch } from "../lib/authApi";
import { userFetch } from "../lib/userApi";
import {
  type CredentialsType,
  type FormRegisterType,
} from "../interface/auth.type";
import { type UserType } from "../interface/user.type";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: UserType | null;
  isLoading: boolean;
  login: (credentials: CredentialsType) => Promise<void>;
  register: (newUser: FormRegisterType) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const checkSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const userData = await userFetch<UserType>("/api/users/me");
      setUser(userData);
    } catch (error) {
      // setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = useCallback(
    async (credentials: CredentialsType) => {
      try {
        const userData = await authFetch<UserType>("/api/auth/login", {
          method: "POST",
          body: JSON.stringify(credentials),
        });
        setUser(userData);
        if (userData.data.role === "admin") {
          navigate("/admin");
        } else if (userData.data.role === "user") {
          navigate("/");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
        setUser(null);
        throw error;
      }
    },
    [navigate],
  );

  const register = useCallback(
    async (credentials: FormRegisterType) => {
      try {
        const userData = await authFetch<UserType>("/api/auth/register", {
          method: "POST",
          body: JSON.stringify(credentials),
        });
        setUser(userData);
        navigate("/login");
      } catch (error) {
        console.error("Error en el registro:", error);
        setUser(null);
        throw error;
      }
    },
    [navigate],
  );

  const logout = useCallback(async () => {
    try {
      await authFetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Error en el logout:", error);
    } finally {
      setUser(null);
    }
  }, []);

  // Memoiza el valor del contexto para evitar renders innecesarios
  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 4. Crea el Hook personalizado
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
