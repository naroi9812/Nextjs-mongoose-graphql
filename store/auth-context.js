import React, { createContext, useState } from "react";

const AuthContext = createContext({
  userId: "",
  token: "",
  login: () => {},
  logout: () => {},
});

export default AuthContext;

export const AuthContextProvider = (props) => {
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  const loginHandler = (userId, token) => {
    setUserId(userId);
    setToken(token);
  };

  const logoutHandler = () => {
    setUserId("");
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{ userId, token, login: loginHandler, logout: logoutHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
