import "./App.css";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* Outlet 컴포넌트는 라우터의 경로에 따라 다른 컴포넌트를 렌더링하는 역할*/}
      <Outlet />
    </div>
  );
}

export default App;
