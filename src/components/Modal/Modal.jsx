import React, { useEffect } from "react";
import styles from "./Modal.module.css";

const onScroll = (e) => {
  e.preventDefault();
  e.stopPropagation();

  return false;
};

export default function Modal({ onClick, children }) {
  const handleClick = () => {
    onClick(null);
  };

  useEffect(() => {
    window.addEventListener("wheel", onScroll, {
      passive: false,
    });

    return () => window.removeEventListener("wheel", onScroll);
  });

  return (
    <div className={styles.container}>
      <div className={styles.modal}>
        <header>
          <button onClick={handleClick}>X</button>
        </header>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
}
