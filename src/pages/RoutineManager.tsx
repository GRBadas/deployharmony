
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addDays, isSameDay } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, Clock, Plus, Tag, Trash } from 'lucide-react';
import { StaggeredContainer, StaggeredItem } from '@/components/AnimatedTransition';

// Define category options
const categories = [
  { id: 'work', label: 'Work', color: 'bg-purple-500' },
  { id: 'personal', label: 'Personal', color: 'bg-blue-500' },
  { id: 'health', label: 'Health', color: 'bg-green-500' },
  { id: 'study', label: 'Study', color: 'bg-amber-500' },
  { id: 'social', label: 'Social', color: 'bg-pink-500' },
];

// Define activity type
type Activity = {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  categoryId: string;
};

// Validation schema for activity form
const activityFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.date({
    required_error: "Date is required",
  }),
  time: z.string().min(1, "Time is required"),
  categoryId: z.string().min(1, "Category is required"),
});

// Example activities
const initialActivities: Activity[] = [
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

const RoutineManager = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [isAddActivityOpen, setIsAddActivityOpen] = useState(false);

  // Create form
  const form = useForm<z.infer<typeof activityFormSchema>>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      title: '',
      description: '',
      date: new Date(),
      time: '',
      categoryId: '',
    },
  });

  // Form submission handler
  const onSubmit = (values: z.infer<typeof activityFormSchema>) => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      ...values,
    };
    
    setActivities([...activities, newActivity]);
    setIsAddActivityOpen(false);
    form.reset();
  };

  // Delete activity handler
  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter(activity => activity.id !== id));
  };

  // Filter activities by date
  const getActivitiesForDate = (date: Date) => {
    return activities.filter(activity => isSameDay(activity.date, date));
  };

  // Get days for the current week
  const weekDays = eachDayOfInterval({
    start: startOfWeek(date, { weekStartsOn: 1 }),
    end: endOfWeek(date, { weekStartsOn: 1 }),
  });

  // Get activities for the current view
  const currentViewActivities = view === 'day' 
    ? getActivitiesForDate(date)
    : view === 'week'
    ? activities.filter(activity => 
        weekDays.some(day => isSameDay(activity.date, day))
      )
    : activities;

  // Get category by ID
  const getCategoryById = (categoryId: string) => {
    return categories.find(category => category.id === categoryId);
  };

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
          {/* Sidebar */}
          <div className="w-full lg:w-80 flex flex-col gap-4">
            <Card className="shadow-md border-purple-100 dark:border-purple-800/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-purple-800 dark:text-purple-300">Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(newDate) => newDate && setDate(newDate)}
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

            <Button onClick={() => {
              form.reset();
              setIsAddActivityOpen(true);
            }} className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white">
              <Plus size={18} className="mr-2" />
              Add New Activity
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Card className="shadow-md border-purple-100 dark:border-purple-800/30">
              <CardHeader className="pb-0">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl text-purple-800 dark:text-purple-300">
                    {view === 'day' && format(date, 'EEEE, MMMM d, yyyy')}
                    {view === 'week' && `Week of ${format(weekDays[0], 'MMM d')} - ${format(weekDays[6], 'MMM d, yyyy')}`}
                    {view === 'month' && format(date, 'MMMM yyyy')}
                  </CardTitle>
                  <TabsList>
                    <TabsTrigger 
                      value="day" 
                      onClick={() => setView('day')}
                      className={view === 'day' ? 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300' : ''}
                    >
                      Day
                    </TabsTrigger>
                    <TabsTrigger 
                      value="week" 
                      onClick={() => setView('week')}
                      className={view === 'week' ? 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300' : ''}
                    >
                      Week
                    </TabsTrigger>
                    <TabsTrigger 
                      value="month" 
                      onClick={() => setView('month')}
                      className={view === 'month' ? 'bg-purple-100 text-purple-800 dark:bg-purple-800/20 dark:text-purple-300' : ''}
                    >
                      Month
                    </TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                {view === 'day' && (
                  <div className="space-y-4">
                    {currentViewActivities.length > 0 ? (
                      currentViewActivities
                        .sort((a, b) => a.time.localeCompare(b.time))
                        .map((activity) => (
                          <ActivityCard 
                            key={activity.id} 
                            activity={activity} 
                            category={getCategoryById(activity.categoryId)} 
                            onDelete={() => handleDeleteActivity(activity.id)}
                          />
                        ))
                    ) : (
                      <div className="text-center py-10 text-muted-foreground">
                        <p>No activities scheduled for this day.</p>
                        <Button onClick={() => {
                          form.reset({ date });
                          setIsAddActivityOpen(true);
                        }} variant="link" className="mt-2 text-purple-600">
                          Add an activity
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {view === 'week' && (
                  <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
                    {weekDays.map((day) => (
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
                )}

                {view === 'month' && (
                  <div className="min-h-[400px] flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <p>Month view calendar</p>
                      <p className="text-sm mt-2">Total activities this month: {activities.length}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Add Activity Dialog */}
        <Dialog open={isAddActivityOpen} onOpenChange={setIsAddActivityOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-purple-800 dark:text-purple-300">Add New Activity</DialogTitle>
              <DialogDescription>
                Create a new activity for your routine.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Activity title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Describe your activity" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              className="p-3 pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-3 gap-2">
                          {categories.map((category) => (
                            <div
                              key={category.id}
                              className={cn(
                                "cursor-pointer border rounded-md p-2 flex items-center gap-2",
                                field.value === category.id 
                                  ? "bg-purple-100 border-purple-300 dark:bg-purple-800/20 dark:border-purple-600" 
                                  : "hover:bg-purple-50 dark:hover:bg-purple-900/10"
                              )}
                              onClick={() => field.onChange(category.id)}
                            >
                              <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                              <span className="text-sm">{category.label}</span>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsAddActivityOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-purple-600 hover:bg-purple-700">Save Activity</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

// Activity Card Component
interface ActivityCardProps {
  activity: Activity;
  category?: { id: string; label: string; color: string };
  onDelete: () => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, category, onDelete }) => {
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

export default RoutineManager;
