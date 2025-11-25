import HTTP from '@/helper/http';
import { type Ticket } from '@/types/Ticket';

const http = new HTTP();
export const AviaVariantApi = {
  async getAviaVariants() {
    const response = await http.get<Ticket[]>('/aviaVariants');
    if (response.data) {
      return response.data;
    }
    return [];
  },
};
