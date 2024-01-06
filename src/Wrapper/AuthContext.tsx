import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const apiAddress = "http://3.12.146.211:3001";
// const apiAddress = "http://localhost:3001";

interface User {
  _id: string;
  name: string;
  email: string;
  userSetting: {};
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
      setUser(JSON.parse(storedUser));
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
