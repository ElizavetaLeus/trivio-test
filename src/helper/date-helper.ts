import type { User } from '@/utils/UtilUser';
export type passengers = Array<User>;
export interface Ticket {
  id: number,
  provider: string,
  placeFrom: string,
  placeTo: string,
  dateFrom: string,
  dateTo: string,
  timeFrom: string,
  timerTo: string,
  iataFrom: string,
  iataTo: string,
  price: number,
}
export interface Service {
  user: User,
  ticket: Ticket,
}
export interface Trip {
  id: number,
  name: string,
  price: number,
  passengers: passengers,
  services: Service[],
  status: string,
}

export const dateReverse = (date:string) => {
  return date.split('-').reverse().join('-');
};
export const getStartTrip =(trip: Trip) => {
  const allServices = trip.services;
  const dateTimes = allServices.map(service => {
    const dateTime = `${dateReverse(service.ticket.dateFrom)} ${service.ticket.timeFrom}`;
    return {
      dateTime: new Date(dateTime).toISOString(),
      timeStamp: new Date(dateTime).getTime(),
    };
  });
  return dateTimes.sort((a, b) => a.timeStamp - b.timeStamp);
};

export const dateToFormat = (dateTime: string, format: string): string => {
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error(`${format} is not a valid date`);
  }
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = String(date.getFullYear());

  return format
    .replace('DD', dd)
    .replace('MM', mm)
    .replace('YYYY', yyyy);
};
