import { type User } from "../../types/user";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthResponse {
  email: string;
  name: string;
  token: string;
  refreshToken: string;
}

export interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  setAuth: (data: AuthResponse) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      token: null,
      refreshToken: null,

      setAuth: (data) => {
        set({
          user: {
            email: data.email,
            name: data.name,
          },
          token: data.token,
          refreshToken: data.refreshToken,
          isAuthenticated: true,
        });
      },

      clearAuth: () => {
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
