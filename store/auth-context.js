import React, { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState("");

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setAuthToken(storedToken); // Fix: Set the stored token correctly
      }
    }
    fetchToken();
  }, []);

  const authenticate = (token) => {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  };

  const logout = () => {
    setAuthToken("");
    AsyncStorage.removeItem("token");
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
