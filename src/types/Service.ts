import { type Ticket } from '@/types/Ticket';
import { type User } from '@/types/User';

export interface Service {
  user: User,
  ticket: Ticket,
}
