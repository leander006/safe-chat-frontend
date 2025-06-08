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

  useEffect(() => {
    async function fetchUser() {
        try {
            const response = await axios.get(`${BASE_URL}/api/auth/user/me`, {
                withCredentials: true,
            });
            console.log("Fetched user data:", response.data.user);

            fetch(`${BASE_URL}/api/auth/user/me`, {
              credentials: 'include', // Sends cookies with the request
            })
              .then(response => response.json())
              .then(data => {
                console.log(data); // Use user data in your React app
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
