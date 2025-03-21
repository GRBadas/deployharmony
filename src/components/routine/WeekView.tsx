
import React from 'react';
import { Activity } from '@/types/activity';
import { format, isSameDay } from 'date-fns';
import { getCategoryById } from '@/constants/categories';
import { cn } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface WeekViewProps {
  days: Date[];
  getActivitiesForDate: (date: Date) => Activity[];
}

export const WeekView: React.FC<WeekViewProps> = ({ days, getActivitiesForDate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
      {days.map((day) => (
        <div key={day.toString()} className="border rounded-md p-2 h-full">
          <div className={cn(
            "text-sm font-medium py-1 text-center rounded-md mb-2",
            isSameDay(day, new Date()) ? "bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300" : ""
          )}>
            {format(day, 'EEE')}
            <div className="text-xs text-muted-foreground">
              {format(day, 'MMM d')}
            </div>
          </div>
          
          <div className="space-y-2">
            {getActivitiesForDate(day)
              .sort((a, b) => a.time.localeCompare(b.time))
              .map((activity) => (
                <div 
                  key={activity.id}
                  className="text-xs p-1.5 rounded-md bg-white dark:bg-gray-800 border border-purple-100 dark:border-purple-800/30 shadow-sm"
                >
                  <div className="font-medium mb-0.5">{activity.title}</div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock size={10} className="mr-1" />
                    {activity.time}
                  </div>
                  <div className="flex items-center mt-1">
                    <div className={`w-2 h-2 rounded-full ${getCategoryById(activity.categoryId)?.color}`}></div>
                    <span className="text-xs ml-1 text-muted-foreground">{getCategoryById(activity.categoryId)?.label}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};
