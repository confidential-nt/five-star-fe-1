import React, { axios, useState } from "react";

const PostCreate = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.prevent.default();

    setTitle("");
    setContent("");
  };

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
        <button type="submit">Post</button>
      </form>
    </div>
  );

  async function postData() {
    try {
      const response = await axios.post("http://3.38.117.203/posts", {
        title: { title },
        content: { content },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
};

export default PostCreate;
