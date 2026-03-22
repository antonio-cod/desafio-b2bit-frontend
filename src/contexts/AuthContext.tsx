import { createContext, useEffect, useState, type ReactNode } from "react";

type AuthContext = {
  session: null | UserAPIResponse;
  save: (data: UserAPIResponse) => void;
  isLoading: boolean;
  remove: () => void;
};

const LOCAL_STORAGE_KEY = "@Mini-twitter";

export const AuthContext = createContext({} as AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<null | UserAPIResponse>(null);
  const [isLoading, setIsLoading] = useState(true);

  function save(data: UserAPIResponse) {
    localStorage.setItem(
      `${LOCAL_STORAGE_KEY}:user`,
      JSON.stringify(data.user),
    );
    localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token);

    setSession(data);
  }

  function loadUser() {
    const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`);

    const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`);

    if (token && user) {
      setSession({
        token,
        user: JSON.parse(user),
      });
    }
    setIsLoading(false);
  }

  function remove() {
    setSession(null);

    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ session, save, isLoading, remove }}>
      {children}
    </AuthContext.Provider>
  );
}
