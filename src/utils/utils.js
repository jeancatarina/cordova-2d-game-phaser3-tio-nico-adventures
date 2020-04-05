export const getDifferenceBetweenDatesSeconds = (startDate, endDate) => {
  let seconds;

  if (!startDate || !endDate) {
    return null;
  }

  seconds = (endDate.getTime() - startDate.getTime()) / 1000;

  return seconds;
};

export const randomId = () => {
  return (
    "_" +
    (
      Number(String(Math.random()).slice(2)) +
      Date.now() +
      Math.round(performance.now())
    ).toString(36)
  );
};
