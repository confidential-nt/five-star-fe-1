import React from 'react';

//  컴포넌트 이름은 대문자로 시작해야함
const MainHeader = () => {
  return (
    <div>
      <div className="blog-name">
        5Star Blog
      </div>
      <div className="addNewPostBtn">
        <button>새 글 작성</button>
      </div>
      <div className="loginBtn">
        <button>로그인</button>
      </div>
    </div>
  )
}

export default MainHeader