export type AuthSession = {
    token: string;
    username: string;
  };
  
  const KEY = "session";
  
  export function saveSession(session: AuthSession) {
    localStorage.setItem(KEY, JSON.stringify(session));
  }
  
  export function loadSession(): AuthSession | null {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  }
  
  export function clearSession() {
    localStorage.removeItem(KEY);
  }
  
  export function getToken() {
    return loadSession()?.token ?? "";
  }
  
  export function isAuthenticated() {
    return loadSession() !== null;
  }
  