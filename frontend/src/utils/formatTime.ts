export const formatTime = (seconds: number) => {
  const days = Math.floor(seconds / (24 * 60 * 60));
  const hours = Math.floor((seconds % (24 * 60 * 60)) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${days}d ${hours}h ${minutes}m ${secs}s`;
};

export const countdownFromDate = (lastCallDate: string): number[] => {
  // Parse the provided date string
  const targetDate: Date = new Date(lastCallDate);

  // Add 4 days
  const daysAfter: Date = new Date(targetDate);
  daysAfter.setDate(daysAfter.getDate() + 4);

  const currentDate = new Date();

  // Calculate the difference in milliseconds (number)
  const timeRemaining: number = daysAfter.getTime() - currentDate.getTime();

  // Calculate days, hours, and minutes from the time difference
  const days: number = Math.floor(timeRemaining / (1000 * 60 * 60 * 24)); // Days left
  const hours: number = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  ); // Hours left
  const minutes: number = Math.floor(
    (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
  ); // Minutes left
  const seconds: number = Math.floor((timeRemaining % (1000 * 60)) / 1000); // Seconds left

  return [days, hours, minutes, seconds];
};
