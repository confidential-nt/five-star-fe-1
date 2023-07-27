import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import styles from "./ResignPage.module.css";

export default function ResignPage() {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { logUserIn, isLogined } = useUserContext();

  useEffect(() => {
    if (!isLogined) {
      navigate("/");
    }
  }, [isLogined, navigate]);

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.delete("/users/resign", {
        data: { password },
        withCredentials: true,
      });
      console.log(result);
      logUserIn(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요."
          value={password}
          onChange={handleChange}
          required
          autoComplete="on"
        />
        <button type="submit">회원탈퇴</button>
      </div>
    </form>
  );
}
