const dateFormatter = (_date) => {
  const date = new Date(_date)
  const months = [
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
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];
  const month = months[date.getMonth()];
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const amPm = hours >= 12? "PM" : "AM";
  const hour = hours % 12;
  const minute = minutes < 10? `0${minutes}` : minutes;
  const time = `${hour}:${minute} ${amPm}`;
  const currentDate = new Date();
  const remainingTime = date - currentDate;
  const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const remainingMinutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
  const remainingTimeString = `${(remainingDays>0)?remainingDays+"d":""} ${(remainingHours>0)?remainingHours+"d":""} ${remainingMinutes}m`;

  const newDateString = `${month} • ${date.getDate()} • ${day} • ${time} • ${remainingTimeString}`
  return newDateString;
}

export default dateFormatter