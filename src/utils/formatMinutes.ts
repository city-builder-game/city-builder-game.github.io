export default function formatMinutes(minutes: number) {
    const days = Math.floor(minutes / 1440);
    const hours = Math.floor((minutes % 1440) / 60);
    const mins = minutes % 60;
  
    let result = "";
  
    if (days > 0) {
      result += `${days}d:`;
    }
  
    if (hours > 0) {
      result += `${hours}h:`;
    }
  
    return result + `${mins}m`;
}
