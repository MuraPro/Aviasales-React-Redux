import { add } from 'date-fns';

export const getStartTime = (date) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();

  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const getEndTime = (date, durationInMinutes) => {
  const addedDate = add(new Date(date), { minutes: durationInMinutes });

  const hours = new Date(addedDate).getHours();
  const minutes = new Date(addedDate).getHours();

  return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}`;
};

export const getTravelTime = (durationInMinutes) => {
  const hoursAndMinutes = `${
    durationInMinutes < 24 * 60
      ? Math.floor(durationInMinutes / 60)
      : Math.floor((durationInMinutes / 60) % 24)
  }ч ${durationInMinutes % 60}м`;

  return durationInMinutes >= 60 * 24
    ? `${Math.floor(durationInMinutes / (60 * 24))}д ${hoursAndMinutes}`
    : hoursAndMinutes;
};

export function getStops(stops) {
  if (stops === 0) return '0 пересадок';
  if (stops === 1) return '1 пересадка';
  return `${stops} пересадки`;
}
