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