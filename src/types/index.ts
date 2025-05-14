export interface Project {
  name: string;
  id?: string;
  createdAt?: string;
  description?: string;
}

export interface Task {
  id?: string;
  projectId?: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  createdAt?: string;
  dueDate?: string;
  assignee?: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Board {
  id: string;
  projectId: string;
  columns: Column[];
}