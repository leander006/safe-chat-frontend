import React, { createContext, useMemo, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export const GetUser = () => {
      const user = useContext(UserContext);
      return user;
    };
    
export const UserProvider = ({children}) => {
  const initialUserData = useMemo(() => {
      const userDataFromLocalStorage = localStorage?.getItem('user');
      return userDataFromLocalStorage ? JSON.parse(userDataFromLocalStorage) : null;
    }, []);
  
    // User state that can be updated in the future
    const [user, setUser] = useState(initialUserData);
    let token =null;
    // Whenever userData changes, update the localStorage value
    useEffect(() => {
        setUser(localStorage.getItem('user'));
        token=localStorage.getItem('token');
    }, []);

  return (
    <UserContext.Provider value={{user,setUser,token}}>
      {children}
    </UserContext.Provider>
  );
};