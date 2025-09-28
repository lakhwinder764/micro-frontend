// src/shared/store.ts
import { create } from "zustand";

type User = { id: string; name: string; role: "user" | "admin" } | null;

export type Booking = {
  id: string;
  room: string;
  time: string;
  createdAt: number;
};

type StoreState = {
  // session
  user: User;
  login: (u: NonNullable<User>) => void;
  logout: () => void;

  // bookings
  bookings: Booking[];
  addBooking: (b: Omit<Booking, "id" | "createdAt">) => void;
  removeBooking: (id: string) => void;
  clearBookings: () => void;
};

export const useSessionStore = create<StoreState>((set) => ({
  // session
  user: null,
  login: (u) => set({ user: u }),
  logout: () => set({ user: null }),

  // bookings
  bookings: [],
  addBooking: (b) =>
    set((state) => ({
      bookings: [
        ...state.bookings,
        { id: crypto.randomUUID(), createdAt: Date.now(), ...b },
      ],
    })),
  removeBooking: (id) =>
    set((state) => ({
      bookings: state.bookings.filter((bk) => bk.id !== id),
    })),
  clearBookings: () => set({ bookings: [] }),
}));
