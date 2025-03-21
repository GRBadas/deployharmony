
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Plus } from 'lucide-react';
import { categories } from '@/constants/categories';

interface RoutineSidebarProps {
  date: Date;
  onDateChange: (date: Date | undefined) => void;
  onAddActivity: () => void;
}

export const RoutineSidebar: React.FC<RoutineSidebarProps> = ({ date, onDateChange, onAddActivity }) => {
  return (
    <div className="w-full lg:w-80 flex flex-col gap-4">
      <Card className="shadow-md border-purple-100 dark:border-purple-800/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-purple-800 dark:text-purple-300">Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            className="rounded-md border shadow-sm p-3 pointer-events-auto"
          />
        </CardContent>
      </Card>

      <Card className="shadow-md border-purple-100 dark:border-purple-800/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-purple-800 dark:text-purple-300">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-purple-100/50 dark:hover:bg-purple-800/10">
                <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                <span>{category.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Button onClick={onAddActivity} className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white">
        <Plus size={18} className="mr-2" />
        Add New Activity
      </Button>
    </div>
  );
};
