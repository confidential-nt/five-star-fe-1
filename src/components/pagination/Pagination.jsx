import axios from "axios";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Pagination({
  onNumberClick,
  onPrevClick,
  onNextClick,
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
      <li onClick={handlePrevClick}>
        <button>&lt;</button>
      </li>
      {totalPosts &&
        Array.from({ length: Math.ceil(totalPosts / 10) }, (_, k) => (
          <li key={k} onClick={() => handleNumberClick(k + 1)}>
            <Link to={`/posts?page=${k + 1}`}>{k + 1}</Link>
          </li>
        ))}
      <li onClick={handleNextClick}>
        <button>&gt;</button>
      </li>
    </nav>
  );
}
