import HTTP from '@/helper/http';
import { type User } from '@/types/User';

const http = new HTTP();

export const usersApi = {
  async getUsers() {
    const response = await http.get<User[]>('/users');
    if(response.data) {
      return response.data;
    }
    return [];
  },
};
