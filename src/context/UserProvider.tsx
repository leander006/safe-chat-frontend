import  {
  createContext,
  useMemo,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { BASE_URL } from "../utils/service";
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

  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
        try {
            const response = await axios.get(`${BASE_URL}/api/auth/user/me`, {
                withCredentials: true,
            });
            setUser(response.data.user);
        } catch (error) {
            console.error("User not authenticated:", error);
        }
    }

    fetchUser();
}, []);

  return (
    <UserContext.Provider
      value={{ user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
