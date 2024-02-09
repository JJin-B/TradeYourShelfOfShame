import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

import axios from "axios";
import { toast } from "react-toastify";
import { UserWithNotification } from "../components/classes/interfaces";

// const apiAddress = "http://13.59.201.41:3001" // http url for AWS EC2 backend
// const apiAddress = "https://9afnnp3x28.execute-api.us-east-2.amazonaws.com/TTYS"; // API Gateway address
let apiAddress: string = "http://localhost:3001"; // local server for development

if (process.env.AWS_API_Gateway_Address) {
  apiAddress = process.env.AWS_API_Gateway_Address;
}

interface AuthContextProps {
  user: UserWithNotification | null; // Replace YourUserType with your actual user type
  signin: (userData: UserWithNotification) => void;
  signout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | null>(null);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserWithNotification | null>(null);

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

  const signin = (userData: UserWithNotification) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };
  const signout = () => {
    setUser(null);
    localStorage.removeItem("user");
    window.location.reload();
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
