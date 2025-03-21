
import React from 'react';
import { Activity } from '@/types/activity';
import { getCategoryById } from '@/constants/categories';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Tag, Trash } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
  category?: { id: string; label: string; color: string };
  onDelete: () => void;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({ activity, category, onDelete }) => {
  return (
    <Card className="shadow-sm border-purple-100 dark:border-purple-800/30 hover:shadow-md transition-shadow">
      <CardHeader className="py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${category?.color}`}></div>
            <CardTitle className="text-base font-semibold">{activity.title}</CardTitle>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={onDelete}
            >
              <Trash size={15} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="py-0">
        {activity.description && (
          <CardDescription className="mb-2">{activity.description}</CardDescription>
        )}
        <div className="text-sm text-muted-foreground flex items-center gap-4">
          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            {activity.time}
          </div>
          <div className="flex items-center">
            <Tag size={14} className="mr-1" />
            {category?.label}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
