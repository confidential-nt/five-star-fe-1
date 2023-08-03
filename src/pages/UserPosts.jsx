import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MainOptions from "../components/Main/MainOptions";

export default function UserPosts() {
  const [posts, setPosts] = useState();
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") || "");
  // eslint-disable-next-line
  useEffect(() => {
    setName(searchParams.get("name") || "");
  });

  useEffect(() => {
    if (name) {
      axios.get(`/posts/users?name=${name}`).then((res) => {
        setPosts(res.data);
      });
    }
  }, [name]);

  return <>{posts && <MainOptions posts={posts} />}</>;
}
