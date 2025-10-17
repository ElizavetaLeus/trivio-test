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
  async createTrip<Body>(body: Body) {
    const response = await http.post<Trip, Body>('/trips', body);
    if (response.data) {
      return response.data;
    }
    return null;
  },
};
