import React, {
  createContext,
  useMemo,
  useContext,
  useState,
  useEffect,
} from "react";

const UserContext = createContext(null);

export const GetUser = () => {
  const user = useContext(UserContext);
  return user;
};

export const UserProvider = ({ children }) => {
  const initialUserData = useMemo(() => {
    const userDataFromLocalStorage = localStorage?.getItem("user");
    return userDataFromLocalStorage
      ? JSON.parse(userDataFromLocalStorage)
      : null;
  }, []);

  // User state that can be updated in the future
  const [user, setUser] = useState(initialUserData);
  const [config, setConfig] = useState(null);

  // Whenever userData changes, update the localStorage value
  useEffect(() => {
    setUser(JSON.parse (localStorage.getItem("user")));
    setConfig({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage?.getItem("token")}`,
      },
    });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, config ,setConfig}}>
      {children}
    </UserContext.Provider>
  );
};
