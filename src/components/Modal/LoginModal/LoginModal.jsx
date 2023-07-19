import React, { useState } from "react";
import Modal from "../Modal";
import { BtnId } from "../../../constant/btn-id";
import axios from "axios";
import { useUserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ onClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { logUserIn } = useUserContext();

  const navigate = useNavigate();

  const handleClick = (e) => {
    onClick(BtnId.SIGN_UP);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await axios.post("http://3.38.117.203/login", {
      email,
      password,
    });
    console.log(result);
    logUserIn(result.data.message);
    onClick(null);
    navigate("/");
  };

  return (
    <Modal onClick={onClick}>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="이메일"
          autoComplete="on"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="비밀번호"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">로그인</button>
      </form>
      <p>
        아직 회원이 아니십니까?
        <button type="button" onClick={handleClick}>
          회원가입
        </button>
      </p>
    </Modal>
  );
}
