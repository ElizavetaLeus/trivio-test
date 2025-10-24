import { dateReverse } from '@/helper/date-helper/index';

const dateFormat = (date: string, time: string) => {
  const dateTime = `${dateReverse(date)} ${time}`;
  return {
    dateTime: new Date(dateTime).toISOString(),
    timeStamp: new Date(dateTime).getTime(),
  };
};

export default dateFormat;
