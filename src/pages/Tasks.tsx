
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { TaskItem } from '@/components/TaskItem';
import { tasks, projects, Task } from '@/lib/data';
import { StaggeredContainer, StaggeredItem } from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Search, Filter, SortAsc, MoreHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Tasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Task['status'] | 'all'>('all');
  
  // Filter tasks based on search and status
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        task.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Get tasks by status
  const todoTasks = filteredTasks.filter(task => task.status === 'todo');
  const inProgressTasks = filteredTasks.filter(task => task.status === 'in-progress');
  const reviewTasks = filteredTasks.filter(task => task.status === 'review');
  const completedTasks = filteredTasks.filter(task => task.status === 'completed');
  
  return (
    <Layout>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <StaggeredContainer>
            <StaggeredItem>
              <h1 className="text-3xl font-semibold">
                Tasks
              </h1>
            </StaggeredItem>
            <StaggeredItem>
              <p className="text-muted-foreground">
                Manage all your tasks and stay on top of your deadlines.
              </p>
            </StaggeredItem>
          </StaggeredContainer>
          
          <StaggeredItem>
            <div className="flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
              
              <Button variant="outline" size="icon">
                <SortAsc className="w-4 h-4" />
              </Button>
              
              <Button>
                <PlusCircle className="w-5 h-5 mr-2" />
                New Task
              </Button>
            </div>
          </StaggeredItem>
        </div>
        
        <div className="mb-8">
          <Tabs defaultValue="kanban" className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
              
              <div className="glass-effect rounded-lg p-1 flex">
                <button 
                  className={`px-3 py-1 rounded-md transition-colors ${statusFilter === 'all' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </button>
                <button 
                  className={`px-3 py-1 rounded-md transition-colors ${statusFilter === 'todo' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setStatusFilter('todo')}
                >
                  To Do
                </button>
                <button 
                  className={`px-3 py-1 rounded-md transition-colors ${statusFilter === 'in-progress' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setStatusFilter('in-progress')}
                >
                  In Progress
                </button>
                <button 
                  className={`px-3 py-1 rounded-md transition-colors ${statusFilter === 'review' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setStatusFilter('review')}
                >
                  Review
                </button>
                <button 
                  className={`px-3 py-1 rounded-md transition-colors ${statusFilter === 'completed' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                  onClick={() => setStatusFilter('completed')}
                >
                  Completed
                </button>
              </div>
            </div>
            
            <TabsContent value="kanban" className="m-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* To Do Column */}
                <div className="glass-card overflow-hidden">
                  <div className="bg-accent/50 px-4 py-3 border-b border-border/40 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-gray-400 mr-2"></div>
                      <h3 className="font-medium">To Do</h3>
                      <span className="ml-2 bg-secondary text-secondary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                        {todoTasks.length}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="p-3 space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto">
                    {todoTasks.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        No tasks to do
                      </div>
                    ) : (
                      todoTasks.map((task, index) => (
                        <TaskItem key={task.id} task={task} index={index} />
                      ))
                    )}
                  </div>
                </div>
                
                {/* In Progress Column */}
                <div className="glass-card overflow-hidden">
                  <div className="bg-accent/50 px-4 py-3 border-b border-border/40 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <h3 className="font-medium">In Progress</h3>
                      <span className="ml-2 bg-secondary text-secondary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                        {inProgressTasks.length}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="p-3 space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto">
                    {inProgressTasks.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        No tasks in progress
                      </div>
                    ) : (
                      inProgressTasks.map((task, index) => (
                        <TaskItem key={task.id} task={task} index={index} />
                      ))
                    )}
                  </div>
                </div>
                
                {/* Review Column */}
                <div className="glass-card overflow-hidden">
                  <div className="bg-accent/50 px-4 py-3 border-b border-border/40 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                      <h3 className="font-medium">Review</h3>
                      <span className="ml-2 bg-secondary text-secondary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                        {reviewTasks.length}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="p-3 space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto">
                    {reviewTasks.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        No tasks in review
                      </div>
                    ) : (
                      reviewTasks.map((task, index) => (
                        <TaskItem key={task.id} task={task} index={index} />
                      ))
                    )}
                  </div>
                </div>
                
                {/* Completed Column */}
                <div className="glass-card overflow-hidden">
                  <div className="bg-accent/50 px-4 py-3 border-b border-border/40 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <h3 className="font-medium">Completed</h3>
                      <span className="ml-2 bg-secondary text-secondary-foreground text-xs font-medium px-2 py-0.5 rounded-full">
                        {completedTasks.length}
                      </span>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="p-3 space-y-3 max-h-[calc(100vh-280px)] overflow-y-auto">
                    {completedTasks.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground text-sm">
                        No completed tasks
                      </div>
                    ) : (
                      completedTasks.map((task, index) => (
                        <TaskItem key={task.id} task={task} index={index} />
                      ))
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="list" className="m-0">
              <div className="glass-card overflow-hidden">
                <div className="space-y-2 p-4">
                  {filteredTasks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No tasks match your criteria
                    </div>
                  ) : (
                    filteredTasks.map((task, index) => (
                      <TaskItem key={task.id} task={task} index={index} />
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="calendar" className="m-0">
              <div className="glass-card p-8 text-center">
                <p className="text-muted-foreground">Calendar view coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Tasks;
