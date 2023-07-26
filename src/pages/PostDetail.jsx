import React, { useEffect, useState } from "react";
import timeAgo from "../utils/time-ago";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PostDetail() {
  const [post, setPost] = useState();
  const { postid } = useParams();

  useEffect(() => {
    axios.get(`/posts/${postid}`).then((post) => setPost(post));
  }, [postid]);

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/posts/${postid}/edit`, {
      state: {
        post: post.data,
      },
    });
  };

  const handleDelete = async () => {
    console.log(postid);
    await axios.delete(`/posts/${postid}`, { withCredentials: true });
    navigate("/");
  };

  return (
    <div>
      {post && (
        <>
          <span>생성날짜: {timeAgo(post.createAt, navigator.language)}</span>
          <br />
          <span>
            수정된 날짜: {timeAgo(post.modifiedAt, navigator.language)}
          </span>
          <h1>{post.data.title}</h1>
          <p>{post.data.content}</p>
          <div>
            <button onClick={handleEdit}>수정하기</button>
            <button onClick={handleDelete}>삭제하기</button>
          </div>
        </>
      )}
    </div>
  );
}
