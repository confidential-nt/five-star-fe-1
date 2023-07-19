import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isLogined, setisLogined] = useState(false);

  const logUserIn = (data) => {
    setisLogined(Boolean(data));
  };

  return (
    <UserContext.Provider value={{ isLogined, logUserIn }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUserContext = () => useContext(UserContext);
