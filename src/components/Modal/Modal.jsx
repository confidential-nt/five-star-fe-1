import React from "react";
import styles from "./Modal.module.css";

export default function Modal({ onClick, children }) {
  const handleClick = () => {
    onClick(null);
  };
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
