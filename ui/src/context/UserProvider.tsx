import  {
  createContext,
  useMemo,
  useContext,
  useState,
  type ReactNode,
} from "react";

interface UserContextType {
  user: unknown;
  setUser: React.Dispatch<unknown>;
}

export const UserContext = createContext<UserContextType | null>(null);

export const GetUser = () => {
  const user = useContext(UserContext);
  return user;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const initialUserData = useMemo(() => {
    const userDataFromLocalStorage = localStorage?.getItem("user");
    return userDataFromLocalStorage
      ? JSON.parse(userDataFromLocalStorage)
      : null;
  }, []);

  // User state that can be updated in the future
  const [user, setUser] = useState(initialUserData);
  // const [peer, setPeer] = useState(null);
  // const [stream, setStream] = useState();
  // const [config, setConfig] = useState(null);

  return (
    <UserContext.Provider
      value={{ user, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
