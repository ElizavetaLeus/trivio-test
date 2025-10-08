import type { User } from '@/utils/UtilUser';
import { type Ticket } from '@/types/Ticket';

export interface Service {
  user: User,
  ticket: Ticket,
}
