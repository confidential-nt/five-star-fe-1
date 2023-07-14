import { register, format } from "timeago.js";
import koLocaleFunc from "timeago.js/lib/lang/ko";

register("ko-KR", koLocaleFunc);

export default function timeAgo(time, lang = "ko-KR") {
  return format(time, lang);
}
