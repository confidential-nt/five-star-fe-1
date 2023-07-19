import React from "react";
import { Link } from "react-router-dom";

export default function Header({ onClick }) {
  const handleClick = () => {
    onClick();
  };
  return (
    <header>
      <button type="button" onClick={handleClick}>
        로그인
      </button>

      <Link to="/" style={{ marginRight: "10px" }}>

      <Link to="/" style={{ marginRight: "10px" }}>

        메인페이지
      </Link>
      <Link to="/posts/123213" style={{ marginRight: "10px" }}>
        상세페이지
      </Link>
      <Link to="/posts/create">작성페이지</Link>
    </header>
  );
}
