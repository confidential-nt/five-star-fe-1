import React from "react";

export default function Header({ onClick }) {
  const handleClick = () => {
    onClick();
  };
  return (
    <header>
      <button type="button" onClick={handleClick}>
        로그인
      </button>
    </header>
  );
}
