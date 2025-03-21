
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/Layout';
import { ProjectCard } from '@/components/ProjectCard';
import { TaskItem } from '@/components/TaskItem';
import { projects, tasks } from '@/lib/data';
import { StaggeredContainer, StaggeredItem } from '@/components/AnimatedTransition';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, LayoutGrid, LayoutList, ArrowUpRight, Search, BellRing } from 'lucide-react';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Filter projects based on search and category
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        project.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || project.category.toLowerCase() === filterCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });
  
  // Recent tasks (just the first 5)
  const recentTasks = tasks.slice(0, 5);
  
  return (
    <Layout>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <StaggeredContainer>
            <StaggeredItem>
              <h1 className="text-3xl font-semibold">
                Dashboard
              </h1>
            </StaggeredItem>
            <StaggeredItem>
              <p className="text-muted-foreground">
                Welcome back! Here's an overview of your projects and tasks.
              </p>
            </StaggeredItem>
          </StaggeredContainer>
          
          <StaggeredItem>
            <div className="flex items-center space-x-2">
              <div className="relative glass-effect rounded-full hover:shadow-sm transition-all">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-full bg-transparent w-48 md:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 border-none"
                />
              </div>
              
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <BellRing className="w-5 h-5" />
              </Button>
              
              <Button className="rounded-full">
                <PlusCircle className="w-5 h-5 mr-2" />
                New Project
              </Button>
            </div>
          </StaggeredItem>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Projects', value: projects.length, icon: 'project', color: 'blue' },
            { label: 'Tasks In Progress', value: tasks.filter(t => t.status === 'in-progress').length, icon: 'task', color: 'amber' },
            { label: 'Completed Tasks', value: tasks.filter(t => t.status === 'completed').length, icon: 'completed', color: 'green' },
            { label: 'Team Members', value: 8, icon: 'team', color: 'purple' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="glass-card p-4 md:p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <h3 className="text-2xl md:text-3xl font-semibold">{stat.value}</h3>
                </div>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/20 text-${stat.color}-600 dark:text-${stat.color}-400`}>
                  {stat.icon === 'project' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 9H21M9 21V9M19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {stat.icon === 'task' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 20H21M3.6 3.6L7.2 7.2M7.2 3.6L3.6 7.2M16.8 16.8L20.4 20.4M20.4 16.8L16.8 20.4M12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {stat.icon === 'completed' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {stat.icon === 'team' && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13M16 3.13C16.8604 3.3503 17.623 3.8507 18.1676 4.55231C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88M13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Projects section */}
          <div className="md:col-span-2">
            <div className="mb-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Your Projects</h2>
                
                <div className="flex items-center space-x-2">
                  <div className="glass-effect rounded-lg p-1 flex">
                    <button 
                      className={`p-1.5 rounded-md transition-colors ${filterCategory === 'all' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                      onClick={() => setFilterCategory('all')}
                    >
                      All
                    </button>
                    <button 
                      className={`p-1.5 rounded-md transition-colors ${filterCategory === 'development' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                      onClick={() => setFilterCategory('development')}
                    >
                      Development
                    </button>
                    <button 
                      className={`p-1.5 rounded-md transition-colors ${filterCategory === 'design' ? 'bg-accent text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                      onClick={() => setFilterCategory('design')}
                    >
                      Design
                    </button>
                  </div>
                  
                  <div className="glass-effect rounded-lg p-1 flex">
                    <button className="p-1.5 rounded-md bg-accent text-foreground">
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground">
                      <LayoutList className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              {filteredProjects.length === 0 ? (
                <div className="glass-card p-8 text-center">
                  <p className="text-muted-foreground">No projects match your search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProjects.map((project, index) => (
                    <ProjectCard key={project.id} project={project} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Tasks & Activity section */}
          <div>
            <div className="glass-card overflow-hidden">
              <Tabs defaultValue="tasks">
                <div className="p-4 border-b border-border/40">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-xl font-semibold">Activity</h2>
                    
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                      View All
                      <ArrowUpRight className="ml-1 w-4 h-4" />
                    </Button>
                  </div>
                  
                  <TabsList className="w-full">
                    <TabsTrigger value="tasks" className="flex-1">Recent Tasks</TabsTrigger>
                    <TabsTrigger value="activity" className="flex-1">Activity Feed</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="tasks" className="m-0">
                  <div className="space-y-2 p-4">
                    {recentTasks.map((task, index) => (
                      <TaskItem key={task.id} task={task} index={index} />
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="activity" className="m-0">
                  <div className="p-4 space-y-4">
                    {[
                      { user: 'Sarah', action: 'completed task', object: 'Design Homepage Mockup', time: '2 hours ago' },
                      { user: 'Alex', action: 'commented on', object: 'Mobile App Development', time: '3 hours ago' },
                      { user: 'Miguel', action: 'created task', object: 'Implement Authentication System', time: '5 hours ago' },
                      { user: 'Jessica', action: 'updated project', object: 'Q4 Marketing Campaign', time: '1 day ago' },
                      { user: 'David', action: 'assigned task to you', object: 'Optimize Image Assets', time: '1 day ago' }
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center border-2 border-background text-xs font-medium flex-shrink-0">
                          {activity.user.charAt(0)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            <span className="font-medium">{activity.user}</span>
                            {' '}
                            <span className="text-muted-foreground">{activity.action}</span>
                            {' '}
                            <span className="font-medium">{activity.object}</span>
                          </p>
                          <span className="text-xs text-muted-foreground">{activity.time}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
