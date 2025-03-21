
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TabsList, TabsTrigger, Tabs } from '@/components/ui/tabs';
import { StaggeredContainer, StaggeredItem } from '@/components/AnimatedTransition';
import { ActivityFormValues } from '@/schemas/activitySchema';
import { Activity } from '@/types/activity';
import { initialActivities } from '@/constants/initialActivities';
import { RoutineSidebar } from '@/components/routine/RoutineSidebar';
import { DayView } from '@/components/routine/DayView';
import { WeekView } from '@/components/routine/WeekView';
import { MonthView } from '@/components/routine/MonthView';
import { AddActivityForm } from '@/components/routine/AddActivityForm';

const RoutineManager = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);

  const onSubmit = (values: ActivityFormValues) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      title: values.title,
      description: values.description || "",
      date: values.date,
      time: values.time,
      categoryId: values.categoryId,
    };
    
    setActivities([...activities, newActivity]);
    setIsAddActivityOpen(false);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  const getActivitiesForDate = (date: Date) => {
    return activities.filter(activity => isSameDay(activity.date, date));
  };

  const weekDays = eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  });

  const currentViewActivities = view === 'day' 
    ? getActivitiesForDate(date)
    : view === 'week'
    ? activities.filter(activity => 
        weekDays.some(day => isSameDay(activity.date, day))
      )
    : activities;

  return (
    <Layout className="bg-purple-50/50 dark:bg-purple-900/10">
      <div className="container mx-auto px-4">
        <StaggeredContainer>
          <StaggeredItem>
            <h1 className="text-3xl font-bold text-purple-800 dark:text-purple-300">
              Routine Manager
            </h1>
          </StaggeredItem>
          <StaggeredItem>
            <p className="text-muted-foreground mb-8">
              Manage your daily activities and routines
            </p>
          </StaggeredItem>
        </StaggeredContainer>

        <div className="flex flex-col lg:flex-row gap-6">
          <RoutineSidebar 
            date={date} 
            onDateChange={(newDate) => newDate && setDate(newDate)} 
            onAddActivity={() => {
              setIsAddActivityOpen(true);
            }}
          />

          <div className="flex-1">
            <Card className="shadow-md border-purple-100 dark:border-purple-800/30">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-purple-800 dark:text-purple-300">
                    {view === 'day' && format(date, 'EEEE, MMMM d, yyyy')}
                    {view === 'week' && `Week of ${format(weekDays[0], 'MMM d')} - ${format(weekDays[6], 'MMM d, yyyy')}`}
                    {view === 'month' && format(date, 'MMMM yyyy')}
                  </CardTitle>
                  <Tabs defaultValue={view} onValueChange={(v) => setView(v as 'day' | 'week' | 'month')}>
                    <TabsList>
                      <TabsTrigger 
                        value="day" 
                        className={view === 'day' ? 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300' : ''}
                      >
                        Day
                      </TabsTrigger>
                      <TabsTrigger 
                        value="week" 
                        className={view === 'week' ? 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300' : ''}
                      >
                        Week
                      </TabsTrigger>
                      <TabsTrigger 
                        value="month" 
                        className={view === 'month' ? 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300' : ''}
                      >
                        Month
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {view === 'day' && (
                  <DayView 
                    activities={currentViewActivities} 
                    onDeleteActivity={handleDeleteActivity}
                    onAddActivity={() => {
                      setIsAddActivityOpen(true);
                    }}
                  />
                )}

                {view === 'week' && (
                  <WeekView 
                    days={weekDays} 
                    getActivitiesForDate={getActivitiesForDate} 
                  />
                )}

                {view === 'month' && (
                  <MonthView activitiesCount={activities.length} />
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={isAddActivityOpen} onOpenChange={setIsAddActivityOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-purple-800 dark:text-purple-300">Add New Activity</DialogTitle>
              <DialogDescription>
                Create a new activity for your routine.
              </DialogDescription>
            </DialogHeader>
            <AddActivityForm 
              onSubmit={onSubmit}
              onCancel={() => setIsAddActivityOpen(false)}
              defaultDate={date}
            />
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default RoutineManager;
