import HTTP from '@/helper/http';

const http = new HTTP();

export const cityApi = {
  async getCities() {
    const response = await http.get<string[]>('/cities');
    if(response.data) {
      return response.data;
    }
    return [];
  },
};
