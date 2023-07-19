import React, { useState } from "react";
import Modal from "../Modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUpModal({ onClick }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://3.38.117.203/users/signup", {
      email,
      name,
      password,
    });
    onClick(null);
    navigate("/");
  };

  return (
    <Modal onClick={onClick}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="on"
          required
        />
        <input
          type="text"
          placeholder="이름"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="on"
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          autoComplete="on"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">회원가입</button>
      </form>
    </Modal>
  );
}
