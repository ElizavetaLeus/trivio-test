import type { User } from '@/utils/UtilUser';
import { type Service } from '@/types/Service';

export interface Trip {
  id: number,
  name: string,
  price: number,
  passengers: Array<User>,
  services: Service[],
  status: 'ended' | 'new' | '',
}
