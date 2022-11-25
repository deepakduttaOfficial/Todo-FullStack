const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const formateDate = (createdAt) => {
  const d = new Date(createdAt);

  const mon = month[d.getMonth()];
  const day = d.getDate();
  const year = d.getFullYear();
  return `${mon} ${day}, ${year}`;
};

export const formateTime = (ms) => {
  // const time = new Date(createdAt);

  // console.log(time.getTime() - new Date(Date.now()).getTime());

  return new Date(ms).toISOString().slice(11, 19);
};
