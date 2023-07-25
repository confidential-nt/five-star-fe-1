import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { BtnId } from "../../constant/btn-id";
import { useUserContext } from "../../context/UserContext";
import axios from "axios";
import styles from "./Header.module.css";

export default function Header({ onClick }) {
  const handleClick = (e) => {
    onClick(e.target.id);
  };
  const { isLogined, logUserIn } = useUserContext();

  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await axios.post("/logout", {}, { withCredentials: true });
    console.log(result);
    logUserIn(null);
    navigate("/");
  };

  return (
    <header className={styles.header}>
      {isLogined ? (
        <div className={styles.headerLeft}>
          <button type="button" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      ) : (
        <div className={styles.headerLeft}>
          <button type="button" onClick={handleClick} id={BtnId.LOG_IN}>
            로그인
          </button>
          <button type="button" onClick={handleClick} id={BtnId.SIGN_UP}>
            회원가입
          </button>
        </div>
      )}
      <div className={styles.headerRight}>
        <Link to="/">메인페이지</Link>
        <Link to="/posts/create">작성페이지</Link>
        <Link to="/resign">회원탈퇴</Link>
      </div>
    </header>
  );
}
