import HTTP from '@/helper/http';
import { type Trip } from '@/types/Trip';
import { useRouter } from 'vue-router';

const http = new HTTP();
const router = useRouter();

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
  async getTripById(id: string | string[]) {
    const response = await http.get<Trip>(`/trips/${id}`);
    if (response.data) {
      return response.data;
    }
    if (response.error || response.data === undefined) {
      router.push({ name: 'home' });
    }
    return null;
  },
};
