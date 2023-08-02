import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import styles from "./Pagination.module.css";

export default function Pagination({
  onNumberClick,
  onPrevClick,
  onNextClick,
  currentPage,
}) {
  const [totalPosts, setTotalPosts] = useState();

  const handleNumberClick = (page) => {
    onNumberClick(page);
  };

  const handlePrevClick = () => {
    onPrevClick();
  };
  const handleNextClick = () => {
    onNextClick();
  };

  useEffect(() => {
    axios.get("/posts/total").then((res) => setTotalPosts(res.data.message));
  }, []);
  return (
    <nav>
      <ul className={styles.btns}>
        <li onClick={handlePrevClick}>
          <button className={styles.pageBtn} disabled={currentPage === 1}>
            &lt;
          </button>
        </li>
        {totalPosts &&
          Array.from({ length: Math.ceil(totalPosts / 10) }, (_, k) => (
            <li
              className={currentPage - 1 === k ? styles.currentBtn : ""}
              key={k}
              onClick={() => handleNumberClick(k + 1)}
            >
              <Link to={`/posts?page=${k + 1}`}>{k + 1}</Link>
            </li>
          ))}
        <li onClick={handleNextClick}>
          <button
            className={styles.pageBtn}
            disabled={Math.ceil(totalPosts / 10) === currentPage}
          >
            &gt;
          </button>
        </li>
      </ul>
    </nav>
  );
}
