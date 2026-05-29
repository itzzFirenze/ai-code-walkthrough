import { useState } from "react";
import { AuthContext } from "./AuthContext.js";

export const AuthProvider = ({ children }) => {
   const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
   });

   const [token, setToken] = useState(() => {
      return localStorage.getItem("token") || null;
   });

   const login = (userData, jwtToken) => {
      setUser(userData);
      setToken(jwtToken);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", jwtToken);
   };

   const logout = () => {
      setUser(null);
      setToken(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
   };

   return (
      <AuthContext.Provider value={{ user, token, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};