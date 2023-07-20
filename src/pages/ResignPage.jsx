import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function ResignPage() {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { logUserIn } = useUserContext();

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.delete("http://3.38.117.203/users/resign", {
        password,
      });
      console.log(result);
      logUserIn(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="비밀번호를 입력하세요."
        value={password}
        onChange={handleChange}
        required
        autoComplete="on"
      />
      <button type="submit">회원탈퇴</button>
    </form>
  );
}
