import  {
  createContext,
  useMemo,
  useContext,
  useState,
  type ReactNode,
} from "react";
import Cookies from "js-cookie";

interface UserContextType {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const GetUser = () => {
  const user = useContext(UserContext);
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
