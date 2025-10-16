import { type Service } from '@/types/Service';
import { type User } from '@/types/User';

export interface Trip {
  id: number,
  name: string,
  price: number,
  passengers: Array<User>,
  services: Service[],
  status: 'ended' | 'new' | '',
}
