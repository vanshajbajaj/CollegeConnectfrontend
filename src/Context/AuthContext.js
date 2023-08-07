import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser && !user) {
      setUser(JSON.parse(localUser));
    } else if (!localUser && user) {
      setUser(null);
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout, editUser: setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
