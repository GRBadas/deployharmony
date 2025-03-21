
import React from 'react';

interface MonthViewProps {
  activitiesCount: number;
}

export const MonthView: React.FC<MonthViewProps> = ({ activitiesCount }) => {
  return (
    <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
      <div className="text-center">
        <p>Month view calendar</p>
        <p className="text-sm mt-2">Total activities this month: {activitiesCount}</p>
      </div>
    </div>
  );
};
