import React from "react";
import { Link } from "react-router-dom";
import { BtnId } from "../../constant/btn-id";

export default function Header({ onClick }) {
  const handleClick = (e) => {
    onClick(e.target.id);
  };
  return (
    <header>
      <button type="button" onClick={handleClick} id={BtnId.LOG_IN}>
        로그인
      </button>
      <button type="button" onClick={handleClick} id={BtnId.SIGN_UP}>
        회원가입
      </button>
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
