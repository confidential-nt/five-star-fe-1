import React, { useEffect, useState } from "react";
import timeAgo from "../utils/time-ago";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./PostDetail.module.css";
import { useUserContext } from "../context/UserContext";

export default function PostDetail() {
  const [post, setPost] = useState();
  const { postid } = useParams();

  useEffect(() => {
    axios.get(`/posts/${postid}`).then((post) => setPost(post.data));
  }, [postid]);

  const navigate = useNavigate();

  const { isLogined } = useUserContext();

  const handleEdit = () => {
    navigate(`/posts/${postid}/edit`, {
      state: {
        post,
      },
    });
  };

  const handleDelete = async () => {
    await axios.delete(`/posts/${postid}`, { withCredentials: true });
    navigate("/");
  };

  return (
    <div className={styles.content}>
      {post && (
        <>
          <h1>{post.title}</h1>
          <div className={styles.container}>
            <div className={styles.timeInfo}>
              <span>
                생성된 날짜: {timeAgo(post.createAt, navigator.language)}{" "}
                {`(${new Date(post.createAt).toLocaleString()})`}
              </span>
              <span>
                마지막으로 수정된 날짜:{" "}
                {timeAgo(post.modifiedAt, navigator.language)}{" "}
                {`(${new Date(post.modifiedAt).toLocaleString()})`}
              </span>
            </div>
            {isLogined && (
              <div className={styles.btnContainer}>
                <button onClick={handleEdit}>수정</button>
                <button onClick={handleDelete}>삭제</button>
              </div>
            )}
          </div>
          <p>{post.content}</p>
        </>
      )}
    </div>
  );
}
