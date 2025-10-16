import HTTP from '@/helper/http';
import { type Trip } from '@/types/Trip';

const http = new HTTP();

export const tripsApi = {
  async getTrips() {
    const response = await http.get<Trip[]>('/trips');
    if (response.data) {
      return response.data;
    }
    return [];
  },
};
