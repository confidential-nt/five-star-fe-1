import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import LoginModal from "./components/Modal/LoginModal/LoginModal";
import { BtnId } from "./constant/btn-id";
import SignUpModal from "./components/Modal/SignUpModal/SignUpModal";
import { UserProvider } from "./context/UserContext";

function App() {
  const [display, setDisplay] = useState();

  const location = useLocation();

  useEffect(() => {
    setDisplay(null);
  }, [location.key]);

  const onClick = (btn) => {
    setDisplay(btn);
  };

  return (
    <>
      <UserProvider>
        <Header onClick={onClick} />
        {display === BtnId.LOG_IN && <LoginModal onClick={onClick} />}
        {display === BtnId.SIGN_UP && <SignUpModal onClick={onClick} />}
        <Outlet />
      </UserProvider>
    </>
  );
}

export default App;
