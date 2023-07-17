import React, { useState } from "react";
import Modal from "../Modal";
import { BtnId } from "../../../constant/btn-id";
import SignUpModal from "../SignUpModal/SignUpModal";

export default function LoginModal() {
  const [display, setDisplay] = useState(BtnId.LOG_IN);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = () => {
    setDisplay(display === BtnId.SIGN_UP ? BtnId.LOG_IN : BtnId.SIGN_UP);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 관련
  };

  return (
    <div>
      {display === BtnId.LOG_IN ? (
        <Modal>
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
      ) : (
        <>
          <SignUpModal />
          <button onClick={handleClick}>뒤로가기</button>
        </>
      )}
    </div>
  );
}
