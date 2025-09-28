// src/shared/store.ts
import { create } from "zustand";

type User = { id: string; name: string; role: "user" | "admin" } | null;

type StoreState = {
  user: User;
  login: (u: NonNullable<User>) => void;
  logout: () => void;
};

export const useSessionStore = create<StoreState>((set) => ({
  user: null,
  login: (u) => set({ user: u }),
  logout: () => set({ user: null }),
}));
