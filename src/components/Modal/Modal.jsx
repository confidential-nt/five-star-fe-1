import React from "react";

export default function Modal({ onClick, children }) {
  const handleClick = () => {
    onClick(null);
  };
  return (
    <div>
      <header>
        <button onClick={handleClick}>X</button>
      </header>
      {children}
    </div>
  );
}
