import HTTP from '@/helper/http';
import { type Trip } from '@/types/Trip';
import { notification } from '@/libs/notification';
import { type Service } from '@/types/Service';
import { type User } from '@/types/User';
import { type Ticket } from '@/types/Ticket';

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
  async getTripById(id: string | string[]) {
    const response = await http.get<Trip>(`/trips/${id}`);
    if (response.data) {
      return response.data;
    }
    return null;
  },

  async completeTripById<Body>(id: string, body: Body) {
    const response = await http.patch<Trip, Body>(`/trips/${id}`, body);
    if (response.error) {
      notification.error('Ошибка обновления статуса поездки');
    }
    if (response.data) {
      return response.data;
    }
    return null;
  },
  async addServiceToTrip(tripId: string, users: User[], ticket: Ticket) {
    const services: Service[] = users.map((user) =>
      ({ user, ticket }));

    for (const service of services) {
      const response = await http.patch<Trip, { services: Service[], status: string }>(
        `/trips/${tripId}`,
        {
          services: [service],
          status: '', // Добавляем изменение статуса
        },
      );
      if (response.error) {
        notification.error('Ошибка добавления сервиса в поездку');
      }
      if (response.data) {
        return response.data;
      }
      return null;
    }
  },
};
