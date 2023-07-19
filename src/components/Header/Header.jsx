import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BtnId } from "../../constant/btn-id";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";

export default function Header({ onClick }) {
  const handleClick = (e) => {
    onClick(e.target.id);
  };
  const { isLogined, logUserIn } = useUserContext();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post("http://3.38.117.203/logout");
    logUserIn(null);
    navigate("/");
  };

  return (
    <header>
      {isLogined ? (
        <>
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
        </>
      ) : (
        <>
          <button type="button" onClick={handleClick} id={BtnId.LOG_IN}>
            로그인
          </button>
          <button type="button" onClick={handleClick} id={BtnId.SIGN_UP}>
            회원가입
          </button>
        </>
      )}
      <Link to="/" style={{ marginRight: "10px" }}>
        메인페이지
      </Link>
      <Link to="/posts/1" style={{ marginRight: "10px" }}>
        상세페이지
      </Link>
      <Link to="/posts/create">작성페이지</Link>
    </header>
  );
}
