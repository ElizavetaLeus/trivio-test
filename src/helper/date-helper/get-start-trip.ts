import type { Service } from '@/types/Service';
import { dateFormat } from '@/helper/date-helper/index';

const getStartTrip = (allServices: Service[]) => {
  const dateTimes = allServices.map(service => {
    return dateFormat(service.ticket.dateFrom, service.ticket.timeFrom);

  });
  return dateTimes.sort((a, b) => a.timeStamp - b.timeStamp);
};
export default getStartTrip;
