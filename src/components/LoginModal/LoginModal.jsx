import React from "react";

export default function LoginModal() {
  return (
    <form>
      <input type="email" placeholder="이메일" />
      <input type="password" placeholder="비밀번호" autoComplete="on" />
    </form>
  );
}
