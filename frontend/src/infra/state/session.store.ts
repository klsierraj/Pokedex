import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Token } from "../../core/domain/value-objects/token";
import { User } from "../../core/domain/models/user";

type SessionState = {
  token: Token | null;
  user: User | null;
  setSession: (token: Token, user: User) => void;
  clearSession: () => void;
};

type PersistedSessionState = {
  token: string | null;
  user: string | null;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: (token, user) => set({ token, user }),
      clearSession: () => set({ token: null, user: null })
    }),
    {
      name: "session",
      partialize: (state): PersistedSessionState => ({
        token: state.token?.value ?? null,
        user: state.user?.username ?? null
      }),
      merge: (persistedState, currentState) => {
        const persisted = persistedState as unknown as PersistedSessionState;
        return {
          ...currentState,
          token: persisted.token ? new Token(persisted.token) : null,
          user: persisted.user ? new User(persisted.user) : null
        };
      }
    }
  )
);
