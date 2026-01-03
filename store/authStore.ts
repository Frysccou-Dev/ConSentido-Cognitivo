import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Usuario } from "@/types/firebase-types";

interface AuthState {
  isAdmin: boolean;
  userData: Usuario | null;
  setSession: (userData: Usuario) => void;
  clearSession: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAdmin: false,
      userData: null,
      setSession: (userData) =>
        set({
          userData,
          isAdmin: userData.rol === "admin" || userData.rol === "super",
        }),
      clearSession: () => set({ userData: null, isAdmin: false }),
    }),
    {
      name: "consentido-session",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
