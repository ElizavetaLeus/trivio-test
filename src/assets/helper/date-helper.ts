const trip =
  {
    id: 2,
    name: 'Поездка в Москву',
    price: 10600,
    passengers: [
      {
        id: 3,
        first_name: 'Попов',
        second_name: 'Михаил',
        last_name: 'Андреевич',
      },
    ],
    services: [
      {
        user: {
          id: 3,
          first_name: 'Попов',
          second_name: 'Михаил',
          last_name: 'Андреевич',
        },
        ticket: {
          id: 3,
          provider: 'Pobeda',
          placeFrom: 'Казань',
          placeTo: 'Москва',
          dateFrom: '27-08-2025',
          dateTo: '27-08-2025',
          timeFrom: '07:12',
          timerTo: '09:05',
          iataFrom: 'KZN',
          iataTo: 'DME',
          price: 5100,
        },
      },
      {
        user: {
          id: 3,
          first_name: 'Попов',
          second_name: 'Михаил',
          last_name: 'Андреевич',
        },
        ticket: {
          id: 4,
          provider: 'Pobeda',
          placeFrom: 'Казань',
          placeTo: 'Москва',
          dateFrom: '29-08-2025',
          dateTo: '29-08-2025',
          timeFrom: '07:15',
          timerTo: '09:13',
          iataFrom: 'KZN',
          iataTo: 'DME',
          price: 5500,
        },
      },
    ],
    status: 'ended',
  };

const dateReverse = (date:string) => {
  return date.split('-').reverse().join('-');
};
export const getStartTrip =() => {
  const allServices = trip.services;
  const dateTimes = allServices.map(service => {
    const dateTime = `${dateReverse(service.ticket.dateFrom)} ${service.ticket.timeFrom}`;
    return {
      dateTime: new Date(dateTime).toISOString(),
      timeStamp: new Date(dateTime).getTime(),
    };
  });
  const sortedDateTimes = dateTimes.sort((a, b) => a.timeStamp - b.timeStamp);
  return sortedDateTimes[0].dateTime;
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
