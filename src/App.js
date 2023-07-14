import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import { useState } from "react";
import LoginModal from "./components/LoginModal/LoginModal";

function App() {
  const [display, setDisplay] = useState(false);

  const onClick = () => {
    setDisplay((prev) => !prev);
  };

  return (
    <>
      <Header onClick={onClick} />
      <Outlet />
      {display && <LoginModal />}
    </>
  );
}

export default App;
