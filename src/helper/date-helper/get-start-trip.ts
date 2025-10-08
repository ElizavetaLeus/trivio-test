import type { Service } from '@/types/Service';
import { dateReverse } from '@/helper/date-helper/index';

const getStartTrip =(allServices: Service[]) => {
  const dateTimes = allServices.map(service => {
    const dateTime = `${dateReverse(service.ticket.dateFrom)} ${service.ticket.timeFrom}`;
    return {
      dateTime: new Date(dateTime).toISOString(),
      timeStamp: new Date(dateTime).getTime(),
    };
  });
  return dateTimes.sort((a, b) => a.timeStamp - b.timeStamp);
};
export default getStartTrip;
