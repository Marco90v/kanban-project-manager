import { TaskFormValues } from "@/types";
import { Board } from "@/types";

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  }).format(date);
};

export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'high':
      return 'red.500';
    case 'medium':
      return 'orange.400';
    case 'low':
      return 'green.400';
    default:
      return 'gray.400';
  }
};

export const getPriorityOptions = () => [
  { value: 'low', label: 'Low', color: 'green.400' },
  { value: 'medium', label: 'Medium', color: 'orange.400' },
  { value: 'high', label: 'High', color: 'red.500' }
];

export const getStatusOptions = () => [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' }
];

export const createBoardFromTasks = (projectId: string, tasks: TaskFormValues[]): Board => {
  const todoTasks = tasks.filter(task => task.projectId === projectId && task.status[0] === 'todo');
  const inProgressTasks = tasks.filter(task => task.projectId === projectId && task.status[0] === 'in-progress');
  const doneTasks = tasks.filter(task => task.projectId === projectId && task.status[0] === 'done');

  return {
    id: generateId(),
    projectId,
    columns: [
      { id: 'todo', title: 'To Do', tasks: todoTasks },
      { id: 'in-progress', title: 'In Progress', tasks: inProgressTasks },
      { id: 'done', title: 'Done', tasks: doneTasks },
    ],
  };
};