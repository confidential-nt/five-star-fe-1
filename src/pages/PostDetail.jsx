import React from "react";
import timeAgo from "../utils/time-ago";

const post = {
  id: 1,
  title: "잘먹고 잘사는 법",
  content:
    "국회에서 의결된 법률안은 정부에 이송되어 15일 이내에 대통령이 공포한다. 사면·감형 및 복권에 관한 사항은 법률로 정한다. 국민경제자문회의의 조직·직무범위 기타 필요한 사항은 법률로 정한다. 국가는 농수산물의 수급균형과 유통구조의 개선에 노력하여 가격안정을 도모함으로써 농·어민의 이익을 보호한다. 선거운동은 각급 선거관리위원회의 관리하에 법률이 정하는 범위안에서 하되, 균등한 기회가 보장되어야 한다.",
  createAt: "2023-07-13T14:10:17.131Z",
  modifiedAt: "2023-07-13T14:10:17.131Z",
};

export default function PostDetail() {
  return (
    <div>
      <span>생성날짜: {timeAgo(post.createAt, navigator.language)}</span>
      <br />
      <span>수정된 날짜: {timeAgo(post.modifiedAt, navigator.language)}</span>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <div>
        <button>수정하기</button>
        <button>삭제하기</button>
      </div>
    </div>
  );
}
