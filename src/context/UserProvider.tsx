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
    console.log("User data from cookies:", user);
    console.log("auth data from cookies:", Cookies.get("authToken"));
    document.cookie.split(";").forEach((cookie) => {
      const [name, value] = cookie.split("=");
      console.log(`Cookie Name: ${name.trim()}, Value: ${value}`);
    })
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
