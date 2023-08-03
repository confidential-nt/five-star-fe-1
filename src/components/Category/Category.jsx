import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Category.module.css";

export default function Category() {
  const [category, setCategory] = useState();

  useEffect(() => {
    axios.get("/posts/users/info").then((res) => setCategory(res.data));
  }, []);

  return (
    <ul className={styles.category}>
      <h3>카테고리</h3>
      <li>
        <Link to="/">전체</Link>
      </li>
      {category &&
        category.map((c) => (
          <li key={c.name}>
            <Link to={`/posts/users?name=${c.name}`}>{c.name}</Link>
          </li>
        ))}
    </ul>
  );
}
