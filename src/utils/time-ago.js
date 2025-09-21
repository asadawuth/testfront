import TimeAgo from "javascript-time-ago";
import th from "javascript-time-ago/locale/th";

TimeAgo.addLocale(th);
const timeAgo = new TimeAgo("th-TH");

const formatTimeAgo = (date) => timeAgo.format(new Date(date), "mini-now");
export default formatTimeAgo;
