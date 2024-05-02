
const timeDurationWithFormat = (start, end) => {
  const diff = new Date(end)- new Date(start);
  
  return formatRemainingTime({
    timeRemaining: Math.floor(diff/(1000*60))
  })
}

const formatRemainingTime = ({timeRemaining}) => {
  const days = Math.floor(timeRemaining / (60 * 24));
  const hours = Math.floor((timeRemaining % (60 * 24)) / 60);
  const minutes = timeRemaining % 60;

  let timeComponents = []; 
  if (days > 0) { timeComponents.push(`${days}d`); } 
  if (hours > 0) { timeComponents.push(`${hours}h`); }
  timeComponents.push(`${minutes}m`);

  return timeComponents.join(' '); 
}

export default timeDurationWithFormat;