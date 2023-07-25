import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

  return (
    <div className="blog-editor">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
          />
        </div>
      </form>
      <div>
        <button onClick={() => navigate(-1)}>Back</button>
        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default PostCreate;
