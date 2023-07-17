import React, { useState } from "react";
import Modal from "../Modal";
import axios from "axios";

export default function SignUpModal() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // post 요청..근데 서버 주소가 어디??
  };

  return (
    <Modal>
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
