import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useState } from "react";
import LoginModal from "./components/Modal/LoginModal/LoginModal";
import { BtnId } from "./constant/btn-id";
import SignUpModal from "./components/Modal/SignUpModal/SignUpModal";

function App() {
  const [display, setDisplay] = useState();

  const onClick = (btn) => {
    setDisplay(btn);
  };

  return (
    <>
      <Header onClick={onClick} />
      <Outlet />
      {display === BtnId.LOG_IN && <LoginModal />}
      {display === BtnId.SIGN_UP && <SignUpModal />}
    </>
  );
}

export default App;
