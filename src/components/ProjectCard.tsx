
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Project } from '@/lib/data';
import { Users, Calendar, CheckSquare } from 'lucide-react';

type ProjectCardProps = {
  project: Project;
  index: number;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  // Determine category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Development':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400';
      case 'Design':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400';
      case 'Marketing':
        return 'bg-green-500/10 text-green-600 dark:text-green-400';
      case 'Research':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/project/${project.id}`}>
        <div className="glass-card p-6 h-full overflow-hidden">
          <div className="flex justify-between items-start mb-4">
            <span className={cn(
              "text-xs font-medium px-2.5 py-1 rounded-full",
              getCategoryColor(project.category)
            )}>
              {project.category}
            </span>
            
            <div className="relative h-8 w-8">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-blue-400 opacity-20 group-hover:opacity-30 transition-opacity" />
              <motion.div 
                className="absolute inset-0 flex items-center justify-center text-primary"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            </div>
          </div>
          
          <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
          
          <div className="space-y-4">
            <div className="relative w-full h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div 
                className="absolute left-0 top-0 bottom-0 bg-primary rounded-full"
                style={{ width: `${project.progress}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{project.progress}% completed</span>
              <span className="text-muted-foreground">{project.completedTasks}/{project.tasks} tasks</span>
            </div>
          </div>
          
          <div className="mt-6 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
            
            <div className="flex -space-x-2">
              {project.collaborators.slice(0, 3).map((user, i) => (
                <div 
                  key={i}
                  className="w-8 h-8 rounded-full bg-accent flex items-center justify-center border-2 border-background text-xs font-medium"
                >
                  {user.charAt(0).toUpperCase()}
                </div>
              ))}
              {project.collaborators.length > 3 && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center border-2 border-background text-xs font-medium">
                  +{project.collaborators.length - 3}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
