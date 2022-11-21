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
  const createdTodo = new Date(createdAt);

  const mon = month[createdTodo.getMonth()];
  const day = createdTodo.getDate();
  const year = createdTodo.getFullYear();
  return `${mon} ${day}, ${year}`;
};
