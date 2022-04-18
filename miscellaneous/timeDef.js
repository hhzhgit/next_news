import timediff from "timediff";
export default function timeDiff(start, end, format = "YMWDHmS") {
  const timeObj = timediff(start, end || new Date(), format);
  let result = {};
  for (const key in timeObj) {
    if (timeObj[key] != 0) return (result = [timeObj[key], " ", key]);
  }
  return result;
}
