import React, { useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./SignUpModal.module.css";

export default function SignUpModal({ onClick }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      alert("비밀번호가 다릅니다");
      return;
    }

    const result = await axios.post("/users/signup", {
      email,
      name,
      password: password1,
    });
    console.log(result);
    onClick(null);
    navigate("/");
  };

  return (
    <Modal onClick={onClick}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="email"
          placeholder="이메일"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="on"
          minLength={5}
          maxLength={320}
          pattern="^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]+$"
          required
        />
        <input
          type="text"
          placeholder="이름"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="on"
          minLength={2}
          maxLength={20}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          autoComplete="on"
          name="password1"
          value={password1}
          onChange={(e) => setPassword1(e.target.value)}
          minLength={4}
          maxLength={20}
          required
        />
        <input
          type="password"
          placeholder="비밀번호를 한번 더 입력해주세요"
          autoComplete="on"
          name="password2"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
          minLength={4}
          maxLength={20}
          required
        />
        <button type="submit">회원가입</button>
      </form>
    </Modal>
  );
}
