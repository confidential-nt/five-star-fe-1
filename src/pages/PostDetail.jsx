import React, { useEffect, useState } from "react";
import timeAgo from "../utils/time-ago";
import { useNavigate, useParams } from "react-router-dom";

export default function PostDetail() {
  const [post, setPost] = useState();
  const { postid } = useParams();

  useEffect(() => {
    fetch("/data/posts-detail.json") // 나중에는 axios를 통한 실제 db와의 get요청으로 바꿀 것. get /posts/postsid
      .then((res) => res.json())
      .then((post) => setPost(post[0]));
  }, [postid]);

  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/posts/edit", {
      // 아니면 edit이라는 새로운 path 추가. -> 나누는 게 나을 것 같다.
      state: {
        post,
      },
    });
  };

  const handleDelete = () => {
    // 나중에는 aixos를 통한 실제 db와의 delete요청으로 바꿀 것.
    // delete /posts/{postid}
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
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <div>
            <button onClick={handleEdit}>수정하기</button>
            <button onClick={handleDelete}>삭제하기</button>
          </div>
        </>
      )}
    </div>
  );
}
