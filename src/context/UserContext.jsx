import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isLogined, setisLogined] = useState(false);

  useEffect(() => {
    axios
      .get("/login/check")
      .then((response) => setisLogined(response.data))
      .catch(console.log);
  }, []);

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
