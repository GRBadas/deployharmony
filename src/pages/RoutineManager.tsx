
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { addDays, format, isSameDay, startOfDay, startOfWeek, endOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DayView } from '@/components/routine/DayView';
import { WeekView } from '@/components/routine/WeekView';
import { MonthView } from '@/components/routine/MonthView';
import { RoutineSidebar } from '@/components/routine/RoutineSidebar';
import { AddActivityForm } from '@/components/routine/AddActivityForm';
import { EditActivityForm } from '@/components/routine/EditActivityForm';
import { initialActivities } from '@/constants/initialActivities';
import { ActivityFormValues } from '@/schemas/activitySchema';
import { v4 as uuidv4 } from 'uuid';
import { Activity } from '@/types/activity';
import { useToast } from '@/hooks/use-toast';

const RoutineManager = () => {
  const { toast } = useToast();
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentView, setCurrentView] = useState<'day' | 'week' | 'month'>('day');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEditActivity, setCurrentEditActivity] = useState<Activity | null>(null);
  
  // Get activities for the selected date
  const getActivitiesForDate = (date: Date) => {
    return activities.filter(activity => isSameDay(activity.date, date));
  };
  
  // Get week days
  const getWeekDays = () => {
    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = endOfWeek(selectedDate, { weekStartsOn: 1 });
    const days: Date[] = [];
    let day = start;
    
    while (day <= end) {
      days.push(day);
      day = addDays(day, 1);
    }
    
    return days;
  };
  
  // Handle date navigation
  const handleDateChange = (direction: 'prev' | 'next') => {
    if (currentView === 'day') {
      setSelectedDate(prev => direction === 'prev' ? addDays(prev, -1) : addDays(prev, 1));
    } else if (currentView === 'week') {
      setSelectedDate(prev => direction === 'prev' ? addDays(prev, -7) : addDays(prev, 7));
    } else {
      setSelectedDate(prev => {
        const newDate = new Date(prev);
        newDate.setMonth(newDate.getMonth() + (direction === 'prev' ? -1 : 1));
        return newDate;
      });
    }
  };
  
  // Toggle add activity dialog
  const toggleAddDialog = () => {
    setIsAddDialogOpen(prev => !prev);
  };
  
  // Handle form submission to add a new activity
  const handleAddActivity = (values: ActivityFormValues) => {
    const newActivity: Activity = {
      id: uuidv4(),
      title: values.title,
      description: values.description || '',
      date: values.date,
      time: values.time,
      categoryId: values.categoryId,
    };
    
    setActivities(prev => [...prev, newActivity]);
    setIsAddDialogOpen(false);
    
    toast({
      title: "Activity added",
      description: `${values.title} has been added to your routine.`,
    });
  };
  
  // Handle activity deletion
  const handleDeleteActivity = (id: string) => {
    setActivities(prev => prev.filter(activity => activity.id !== id));
    
    toast({
      title: "Activity deleted",
      description: "The activity has been removed from your routine.",
      variant: "destructive",
    });
  };
  
  // Handle edit dialog
  const handleEditActivity = (id: string) => {
    const activityToEdit = activities.find(activity => activity.id === id);
    if (activityToEdit) {
      setCurrentEditActivity(activityToEdit);
      setIsEditDialogOpen(true);
    }
  };
  
  // Handle form submission to update an activity
  const handleUpdateActivity = (values: ActivityFormValues) => {
    if (!currentEditActivity) return;
    
    setActivities(prev => prev.map(activity => 
      activity.id === currentEditActivity.id 
        ? {
            ...activity,
            title: values.title,
            description: values.description || '',
            date: values.date,
            time: values.time,
            categoryId: values.categoryId,
          }
        : activity
    ));
    
    setIsEditDialogOpen(false);
    setCurrentEditActivity(null);
    
    toast({
      title: "Activity updated",
      description: `${values.title} has been updated.`,
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-6 py-6 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <RoutineSidebar 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          activities={activities}
        />
        
        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-2xl font-semibold">Daily Routine</h1>
              <p className="text-muted-foreground">
                Manage your daily activities and routines
              </p>
            </div>
            
            <Button onClick={toggleAddDialog} className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </div>
          
          {/* Date Navigation */}
          <div className="glass-card mb-6 p-4">
            <div className="flex items-center justify-between mb-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleDateChange('prev')}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <div className="text-center">
                <h2 className="text-xl font-medium">
                  {currentView === 'day' && format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  {currentView === 'week' && `Week of ${format(getWeekDays()[0], 'MMM d')} - ${format(getWeekDays()[6], 'MMM d, yyyy')}`}
                  {currentView === 'month' && format(selectedDate, 'MMMM yyyy')}
                </h2>
              </div>
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => handleDateChange('next')}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            
            <Tabs 
              defaultValue="day" 
              value={currentView}
              onValueChange={(value) => setCurrentView(value as 'day' | 'week' | 'month')}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="day">Day</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="month">Month</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {/* View Content */}
          <div className="glass-card p-6">
            {currentView === 'day' && (
              <DayView 
                activities={getActivitiesForDate(selectedDate)}
                onDeleteActivity={handleDeleteActivity}
                onEditActivity={handleEditActivity}
                onAddActivity={toggleAddDialog}
              />
            )}
            
            {currentView === 'week' && (
              <WeekView 
                days={getWeekDays()}
                getActivitiesForDate={getActivitiesForDate}
              />
            )}
            
            {currentView === 'month' && (
              <MonthView activitiesCount={activities.length} />
            )}
          </div>
        </div>
      </div>
      
      {/* Add Activity Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Activity</DialogTitle>
          </DialogHeader>
          <AddActivityForm 
            onSubmit={handleAddActivity}
            onCancel={() => setIsAddDialogOpen(false)}
            defaultDate={selectedDate}
          />
        </DialogContent>
      </Dialog>
      
      {/* Edit Activity Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Activity</DialogTitle>
          </DialogHeader>
          {currentEditActivity && (
            <EditActivityForm 
              activity={currentEditActivity}
              onSubmit={handleUpdateActivity}
              onCancel={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default RoutineManager;
