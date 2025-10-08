const dateToFormat = (dateTime: string, format: string): string => {
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
export default dateToFormat;
