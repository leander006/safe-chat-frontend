import  {
  createContext,
  useMemo,
  useContext,
  useState,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";
import type { User } from "../utils/types";

interface UserContextType {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const GetUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("GetUser must be used within a UserProvider");
  }
  const user = context.user;
  return user;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const initialUserData = useMemo(() => {
    const user = Cookies.get("user");
    return user
      ?JSON.parse(user)
      : null;
  }, []);

  const [user, setUser] = useState<string | null>(initialUserData);
  return (
    <UserContext.Provider
      value={{ user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
