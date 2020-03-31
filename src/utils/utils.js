export const getDifferenceBetweenDatesSeconds = (startDate, endDate) => {
  let seconds;

  if (!startDate || !endDate) {
    return null;
  }

  seconds = (endDate.getTime() - startDate.getTime()) / 1000;

  return seconds;
};
