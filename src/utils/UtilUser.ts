import { type User } from '@/types/User';

const getFullName = (user: User) => {
  return `${user.first_name} ${user.second_name} ${user.last_name}`;
};
const getShortName = (user: User) => {
  return `${user.first_name} ${user.second_name}`;
};
const getInitialFullName = (user: User) => {
  return `${user.first_name} ${user.second_name[0]}. ${user.last_name[0]}.`;
};
const UtilUser = {
  getFullName,
  getShortName,
  getInitialFullName,
};
export default UtilUser;
