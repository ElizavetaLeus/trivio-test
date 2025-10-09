import { type User } from '@/utils/UtilUser';

const searchUser = (id: string | number, userList: User[]) => {
  const user = userList.find(user => user.id === id);
  console.log(id);
  return user;
};
export default searchUser;
