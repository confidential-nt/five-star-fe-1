import React from "react";
import MainOptions from "../components/Main/MainOptions";
import styles from "./Main.module.css";

export default function Main() {
  return (
    <div className={styles.container}>
      <MainOptions />
    </div>
  );
}
