import { createContext, useState } from "react";

const AuthContext = createContext<any | undefined>(undefined);

export function AuthProvider({ children }: any) {
  if (localStorage.getItem("auth") === 'undefined') {
    localStorage.clear();
  }

  const persistedAuthString = localStorage.getItem("auth") as string

  const persistedAuth = JSON.parse(persistedAuthString);
  const [auth, setAuth] = useState(persistedAuth);

  function logIn(authData: any) {
    setAuth(authData);
    localStorage.setItem("auth", JSON.stringify(authData));

  } function logOff() {
    setAuth("");
    localStorage.removeItem("auth")
  }

  return (
    <AuthContext.Provider value={{ auth, logIn, logOff }}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContext;