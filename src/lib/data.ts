
// Mock data for the application

export type Project = {
  id: string;
  title: string;
  description: string;
  progress: number;
  category: 'Development' | 'Design' | 'Marketing' | 'Research';
  dueDate: string;
  tasks: number;
  completedTasks: number;
  collaborators: string[];
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  projectId: string;
  assignedTo: string[];
  createdAt: string;
};

// Projects data
export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Website Redesign',
    description: 'Modernize the company website with a fresh look focusing on user experience and conversion optimization.',
    progress: 75,
    category: 'Design',
    dueDate: '2023-12-15',
    tasks: 12,
    completedTasks: 9,
    collaborators: ['user1', 'user2', 'user3']
  },
  {
    id: 'p2',
    title: 'Mobile App Development',
    description: 'Create a cross-platform mobile application to complement our web services and improve customer engagement.',
    progress: 40,
    category: 'Development',
    dueDate: '2024-01-30',
    tasks: 24,
    completedTasks: 10,
    collaborators: ['user1', 'user4', 'user5']
  },
  {
    id: 'p3',
    title: 'Q4 Marketing Campaign',
    description: 'Plan and execute a comprehensive marketing campaign for the holiday season to boost Q4 revenue.',
    progress: 60,
    category: 'Marketing',
    dueDate: '2023-11-01',
    tasks: 18,
    completedTasks: 11,
    collaborators: ['user2', 'user6']
  },
  {
    id: 'p4',
    title: 'Customer Research Study',
    description: 'Conduct in-depth research on customer preferences and usage patterns to inform future product development.',
    progress: 25,
    category: 'Research',
    dueDate: '2024-02-28',
    tasks: 15,
    completedTasks: 4,
    collaborators: ['user3', 'user7', 'user8']
  }
];

// Tasks data
export const tasks: Task[] = [
  {
    id: 't1',
    title: 'Design Homepage Mockup',
    description: 'Create high-fidelity mockups for the new homepage design following the approved wireframes.',
    status: 'completed',
    priority: 'high',
    dueDate: '2023-11-10',
    projectId: 'p1',
    assignedTo: ['user2'],
    createdAt: '2023-10-01'
  },
  {
    id: 't2',
    title: 'Implement Responsive Navigation',
    description: 'Develop a responsive navigation system that works well across all device sizes.',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2023-11-20',
    projectId: 'p1',
    assignedTo: ['user1'],
    createdAt: '2023-10-05'
  },
  {
    id: 't3',
    title: 'Set Up API Endpoints',
    description: 'Create the necessary API endpoints for user authentication and data retrieval in the mobile app.',
    status: 'todo',
    priority: 'high',
    dueDate: '2023-12-10',
    projectId: 'p2',
    assignedTo: ['user4', 'user5'],
    createdAt: '2023-10-15'
  },
  {
    id: 't4',
    title: 'Create Social Media Content Calendar',
    description: 'Develop a content calendar for social media posts as part of the Q4 marketing campaign.',
    status: 'review',
    priority: 'medium',
    dueDate: '2023-10-25',
    projectId: 'p3',
    assignedTo: ['user6'],
    createdAt: '2023-10-10'
  },
  {
    id: 't5',
    title: 'Design User Survey',
    description: 'Create a comprehensive user survey to gather insights on customer preferences and pain points.',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2023-12-05',
    projectId: 'p4',
    assignedTo: ['user7'],
    createdAt: '2023-10-20'
  },
  {
    id: 't6',
    title: 'Implement Authentication System',
    description: 'Set up secure user authentication for the web and mobile applications.',
    status: 'todo',
    priority: 'high',
    dueDate: '2023-12-20',
    projectId: 'p2',
    assignedTo: ['user1', 'user5'],
    createdAt: '2023-10-22'
  },
  {
    id: 't7',
    title: 'Optimize Image Assets',
    description: 'Optimize all image assets for the website to improve load times while maintaining quality.',
    status: 'todo',
    priority: 'low',
    dueDate: '2023-11-30',
    projectId: 'p1',
    assignedTo: ['user3'],
    createdAt: '2023-10-18'
  },
  {
    id: 't8',
    title: 'Prepare Email Marketing Templates',
    description: 'Design and code responsive email templates for the holiday promotional campaigns.',
    status: 'in-progress',
    priority: 'medium',
    dueDate: '2023-10-30',
    projectId: 'p3',
    assignedTo: ['user2', 'user6'],
    createdAt: '2023-10-12'
  }
];

// Get tasks by project
export const getTasksByProject = (projectId: string): Task[] => {
  return tasks.filter(task => task.projectId === projectId);
};

// Get tasks by status
export const getTasksByStatus = (status: Task['status']): Task[] => {
  return tasks.filter(task => task.status === status);
};

// Get project by id
export const getProjectById = (projectId: string): Project | undefined => {
  return projects.find(project => project.id === projectId);
};
