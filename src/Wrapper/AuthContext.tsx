import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import axios from "axios";
import { toast } from "react-toastify";

const apiAddress = "http://3.145.3.210:3001";
// const apiAddress = "http://localhost:3001";

interface PostingNotification {
  postingId: { _id: string; title: string; type: "sell" | "buy" };
  isViewed: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  userSetting: {};
  notifications: PostingNotification[];
}

interface AuthContextProps {
  user: User | null; // Replace YourUserType with your actual user type
  signin: (userData: User) => void;
  signout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user data exists in localStorage on component mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userId = JSON.parse(storedUser)._id;
      const fetchUrl = apiAddress + "/user/" + userId;

      try {
        axios.get(fetchUrl).then((res) => {
          const data = res.data;
          if (data === "Not valid User") {
            toast.error("Either email or password is wrong", {
              autoClose: 5000,
            });
            return;
          }

          setUser(data);
        });
      } catch (e) {
        if (e instanceof Error) {
          const errorMessage = e.message || "An unexpected error occurred.";
          toast.error(
            `${errorMessage}. Please try again. If the issue persists, contact support.`,
            { autoClose: 5000 }
          );
        } else {
          toast.error(
            "An unexpected error occurred. Please try again. If the issue persists, contact support.",
            { autoClose: 5000 }
          );
        }

        console.error(e);
      }
    }
  }, []);

  const signin = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const contextValue: AuthContextProps = {
    user,
    signin,
    signout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth, apiAddress };
