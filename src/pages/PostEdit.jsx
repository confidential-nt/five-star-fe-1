import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./PostCreate.module.css";
import { useUserContext } from "../context/UserContext";

export default function PostEdit() {
  const [post, setPost] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [loading, setLoading] = useState(false);

  const { isLogined, checkLogin } = useUserContext();
  const navigate = useNavigate();

  const { state } = useLocation();

  const { postid } = useParams();

  useEffect(() => {
    if (!state) {
      if (!isLogined) {
        checkLogin().catch(() => navigate("/"));
      }
      axios.get(`/posts/${postid}`).then((res) => {
        setPost(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      });
    } else {
      setPost(state.post);
      setTitle(state.post.title);
      setContent(state.post.content);
    }
  }, [isLogined, navigate, state, postid, checkLogin]);

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

  const handleBack = () => {
    navigate(-1);
  };

  async function postData() {
    if (!loading) {
      try {
        const response = await axios.patch(
          `/posts/${postid}`,
          {
            title,
            content,
          },
          {
            withCredentials: true,
          }
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    setLoading(false);
  }

  return (
    <>
      {post && (
        <div className="blog-editor">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title"></label>
              <input
                type="text"
                id="title"
                className={styles.input}
                value={title}
                onChange={handleTitleChange}
              />
            </div>
            <div>
              <label htmlFor="content"></label>
              <textarea
                id="content"
                className={styles.textarea}
                value={content}
                onChange={handleContentChange}
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
              {loading ? "💬 작성글 수정 중..." : "✔ 수정하기"}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
