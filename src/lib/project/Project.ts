import { Time } from '../time/Time';

export interface Project {
  id: string;
  name: string;
  deadline: string;
  status: 'open' | 'closed';
  timeSpent: Time<'minutes'>;
}
