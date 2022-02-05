export const mysqlDateFormat = () => {
  const today = new Date(Date.now());
  const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

  return date;
}