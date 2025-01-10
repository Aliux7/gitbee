"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

import Cookies from "js-cookie";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserData {
  nim: string;
  name: string;
  email: string;
  role: string;
}

interface AuthContextType {
  userData: UserData | null;
  setUserData: (userData: UserData | null) => void; // Updated type
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setUserData(null);
      setLoading(false);
      return;
    }

    const decoded = jwt.decode(token) as JwtPayload;
    console.log(decoded);
    setUserData({
      // nim: decoded.nim,
      nim: decoded?.nim ? decoded.nim : "",
      name: decoded?.name ? decoded.name : "",
      email: decoded?.email ? decoded.email : "",
      role: decoded?.role ? decoded.role : "",
    });

    // setUserData({
    //   nim: "2540115465",
    //   name: "Kelson Edbert Susilo",
    //   email: "kelson.susilo@binus.ac.id ",
    //   role: "Lecturer",
    // });
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
