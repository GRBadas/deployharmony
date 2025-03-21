
import React from 'react';
import { Activity } from '@/types/activity';
import { getCategoryById } from '@/constants/categories';
import { Button } from '@/components/ui/button';
import { ActivityCard } from './ActivityCard';

interface DayViewProps {
  activities: Activity[];
  onDeleteActivity: (id: string) => void;
  onAddActivity: () => void;
}

export const DayView: React.FC<DayViewProps> = ({ 
  activities, 
  onDeleteActivity, 
  onAddActivity 
}) => {
  return (
    <div className="space-y-4">
      {activities.length > 0 ? (
        activities
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((activity) => (
            <ActivityCard 
              key={activity.id} 
              activity={activity} 
              category={getCategoryById(activity.categoryId)} 
              onDelete={() => onDeleteActivity(activity.id)}
            />
          ))
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <p>No activities scheduled for this day.</p>
          <Button onClick={onAddActivity} variant="link" className="mt-2 text-purple-600">
            Add an activity
          </Button>
        </div>
      )}
    </div>
  );
};
