import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { useGetMe, useLogin, useLogout, useRegister } from "@/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: "teacher" | "student";
  grade?: string | null;
  division?: string | null;
  board?: string | null;
  subject?: string | null;
  school?: string | null;
  avatarUrl?: string | null;
  teacherId?: number | null;
  aiApiKey?: string | null;
  teacherCode?: string | null;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  refetchUser: () => void;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: "teacher" | "student";
  grade?: string;
  division?: string;
  board?: string;
  subject?: string;
  school?: string;
  teacherCode?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { data: meData, isError, refetch } = useGetMe({ query: { retry: false } });
  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const registerMutation = useRegister();

  useEffect(() => {
    if (meData) {
      setUser(meData as User);
      setIsLoading(false);
    } else if (isError) {
      setUser(null);
      setIsLoading(false);
    }
  }, [meData, isError]);

  const login = async (email: string, password: string) => {
    const result = await loginMutation.mutateAsync({ data: { email, password } });
    setUser((result as any).user as User);
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    setUser(null);
  };

  const register = async (data: RegisterData) => {
    const result = await registerMutation.mutateAsync({ data });
    setUser((result as any).user as User);
  };

  const refetchUser = () => {
    refetch();
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register, refetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
