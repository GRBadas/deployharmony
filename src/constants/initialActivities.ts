
import { Activity } from '@/types/activity';
import { addDays } from 'date-fns';

export const initialActivities: Activity[] = [
  {
    id: '1',
    title: 'Morning Yoga',
    description: 'Start the day with 30 minutes of yoga',
    date: new Date(),
    time: '07:00',
    categoryId: 'health',
  },
  {
    id: '2',
    title: 'Team Meeting',
    description: 'Weekly team sync meeting',
    date: new Date(),
    time: '10:00',
    categoryId: 'work',
  },
  {
    id: '3',
    title: 'Study Python',
    description: 'Practice algorithms for 1 hour',
    date: addDays(new Date(), 1),
    time: '18:00',
    categoryId: 'study',
  },
];
