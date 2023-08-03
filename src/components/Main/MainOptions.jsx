import React, { useState } from "react";
import MainContents from "./MainContents";
import styles from "./MainOptionsStyle.module.css";

const MainOptions = ({ posts }) => {
  const [sortBy, setSortBy] = useState("id,DESC");
  const [isClickedLatest, setIsClickedLatest] = useState(true);
  const [isClickedOldest, setIsClickedOldest] = useState(false);

  const handleSortByLatest = () => {
    setSortBy("id,DESC");
    setIsClickedLatest(true);
    setIsClickedOldest(false);
  };

  const handleSortByOldest = () => {
    setSortBy("id,ASC");
    setIsClickedLatest(false);
    setIsClickedOldest(true);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.options}>
        <button
          className={`${styles.latestBtn} ${
            isClickedLatest ? styles.clickedLatest : ""
          }`}
          onClick={handleSortByLatest}
        >
          최신순
        </button>
        <button
          className={`${styles.oldestBtn} ${
            isClickedOldest ? styles.clickedOldest : ""
          }`}
          onClick={handleSortByOldest}
        >
          오래된순
        </button>
      </div>
      <MainContents sortBy={sortBy} posts={posts} />
    </div>
  );
};

export default MainOptions;
