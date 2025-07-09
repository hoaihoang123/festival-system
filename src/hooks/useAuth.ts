import { create } from "zustand";

interface User {
  id: number;
  name: string;
  email: string;
  role: "staff" | "chef" | "manager";
}

interface AuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: {
    id: 1,
    name: "Staff User",
    email: "staff@example.com",
    role: "staff",
  },
  setUser: (user) => set({ user }),
}));
