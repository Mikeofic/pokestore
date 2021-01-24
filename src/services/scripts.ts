export const timeConverter = (timestamp: number): string => {
  const d = new Date(timestamp);
  const year = d.getFullYear();
  let month: string | number = d.getMonth() + 1;
  month = month.toString().length === 1 ? `0${month}` : month;

  let date: string | number = d.getDate();
  date = date.toString().length === 1 ? `0${date}` : date;

  let hour: string | number = d.getHours();
  hour = hour.toString().length === 1 ? `0${hour}` : hour;

  let min: string | number = d.getMinutes();
  min = min.toString().length === 1 ? `0${min}` : min;

  let sec: string | number = d.getSeconds();
  sec = sec.toString().length === 1 ? `0${sec}` : sec;

  const time = `${date}/${month}/${year} - ${hour}:${min}:${sec}`;
  `${date}/${month}/${year} ${hour}:${min}:${sec}`;

  return time;
};
