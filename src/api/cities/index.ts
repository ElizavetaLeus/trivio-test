import HTTP from '@/helper/http';
import { type City } from '@/types/City';

const http = new HTTP();

export const cityApi = {
  async getCities() {
    const response = await http.get<City[]>('/cities');
    if(response.data) {
      return response.data.map(city => city.name);
    }
    return [];
  },
};
