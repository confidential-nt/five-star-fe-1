import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./PostCreate.module.css";

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // postData 호출하기
    await postData();

    setTitle("");
    setContent("");
    navigate("/"); // post 완료 후 메인페이지로 이동
  };

  // 게시글 post 기능
  async function postData() {
    if (!loading) {
      try {
        const response = await axios.post(
          "/posts",
          {
            title: title,
            content: content,
          },
          { withCredentials: true }
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  }

  // 뒤로가기
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.editor}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title"></label>
          <input
            className={styles.input}
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="제목을 입력하세요"
          />
        </div>
        <div>
          <label htmlFor="content"></label>
          <textarea
            className={styles.textarea}
            id="content"
            value={content}
            onChange={handleContentChange}
            placeholder="내용을 입력하세요"
          />
        </div>
      </form>
      <div className={styles.buttons}>
        <button className={styles.backBtn} onClick={handleBack}>
          ↩ 뒤로가기
        </button>
        <button
          className={styles.submitBtn}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "💬 작성글 등록 중..." : "✔ 등록하기"}
        </button>
      </div>
    </div>
  );
};

export default PostCreate;
