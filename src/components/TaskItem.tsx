
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Task } from '@/lib/data';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';

type TaskItemProps = {
  task: Task;
  index: number;
};

export const TaskItem: React.FC<TaskItemProps> = ({ task, index }) => {
  // Get status icon
  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Circle className="w-5 h-5 text-blue-500 animate-pulse" />;
      case 'review':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'todo':
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  // Get priority styling
  const getPriorityStyles = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400';
      case 'medium':
        return 'text-amber-600 bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400';
      case 'low':
      default:
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
    }
  };

  // Check if task is overdue
  const isOverdue = () => {
    const today = new Date();
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.status !== 'completed';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className={cn(
        "relative p-4 rounded-lg border-l-4 glass-effect transition-all duration-300",
        isOverdue() ? "border-l-red-500" : "border-l-transparent"
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-1">{getStatusIcon(task.status)}</div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className={cn(
              "font-medium text-base truncate",
              task.status === 'completed' && "line-through text-muted-foreground"
            )}>
              {task.title}
            </h4>
            
            <span className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              getPriorityStyles(task.priority)
            )}>
              {task.priority}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {task.description}
          </p>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <span>Project: {task.projectId}</span>
              <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground"></span>
              <span>{new Date(task.createdAt).toLocaleDateString()}</span>
            </div>
            
            <div className={cn(
              "flex items-center gap-1",
              isOverdue() && "text-red-500"
            )}>
              {isOverdue() && <AlertCircle className="w-3 h-3" />}
              <span>Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-3 right-3 flex -space-x-1">
        {task.assignedTo.slice(0, 2).map((user, i) => (
          <div 
            key={i}
            className="w-6 h-6 rounded-full bg-accent flex items-center justify-center border-2 border-background text-[10px] font-medium"
          >
            {user.charAt(0).toUpperCase()}
          </div>
        ))}
        {task.assignedTo.length > 2 && (
          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center border-2 border-background text-[10px] font-medium">
            +{task.assignedTo.length - 2}
          </div>
        )}
      </div>
    </motion.div>
  );
};
