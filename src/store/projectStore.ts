import { create } from 'zustand';
import { Project, Task, Board } from '@/types/index';
import { generateId } from '@/utils/helpers';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  tasks: Task[];
  boards: Board[];
  isLoading: boolean;
  error: string | null;

  // Project actions
  fetchProjects: () => Promise<void>;
  addProject: (project: Omit<Project, 'id' | 'createdAt'>) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setCurrentProject: (id: string) => void;

  // Task actions
  fetchTasks: (projectId: string) => Promise<void>;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (taskId: string, sourceColumn: string, destinationColumn: string) => Promise<void>;

  // Board actions
  fetchBoard: (projectId: string) => Promise<void>;
}

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Redesign company website with new brand guidelines',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Build iOS and Android app for customer engagement',
    createdAt: new Date().toISOString(),
  },
];

const mockTasks: Task[] = [
  {
    id: '101',
    projectId: '1',
    title: 'Create wireframes',
    description: 'Design initial wireframes for homepage and product pages',
    status: 'done',
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
  {
    id: '102',
    projectId: '1',
    title: 'Design system',
    description: 'Develop a comprehensive design system with components',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date().toISOString(),
  },
  {
    id: '103',
    projectId: '1',
    title: 'Frontend implementation',
    description: 'Implement the new design using React',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date().toISOString(),
  },
  {
    id: '201',
    projectId: '2',
    title: 'App architecture',
    description: 'Define app architecture and technology stack',
    status: 'done',
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
  {
    id: '202',
    projectId: '2',
    title: 'User authentication',
    description: 'Implement user authentication flow',
    status: 'in-progress',
    priority: 'high',
    createdAt: new Date().toISOString(),
  },
  {
    id: '203',
    projectId: '2',
    title: 'Push notifications',
    description: 'Set up push notification system',
    status: 'todo',
    priority: 'low',
    createdAt: new Date().toISOString(),
  },
];

// Helper to create board structure from tasks
const createBoardFromTasks = (projectId: string, tasks: Task[]): Board => {
  const todoTasks = tasks.filter(task => task.projectId === projectId && task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.projectId === projectId && task.status === 'in-progress');
  const doneTasks = tasks.filter(task => task.projectId === projectId && task.status === 'done');

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

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  tasks: [],
  boards: [],
  isLoading: false,
  error: null,

  // Project actions
  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ projects: mockProjects, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch projects', isLoading: false });
    }
  },

  addProject: async (project) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newProject: Project = {
        ...project,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      set(state => ({ 
        projects: [...state.projects, newProject],
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add project', isLoading: false });
    }
  },

  updateProject: async (project) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        projects: state.projects.map(p => p.id === project.id ? project : p),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update project', isLoading: false });
    }
  },

  deleteProject: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set(state => ({
        projects: state.projects.filter(p => p.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete project', isLoading: false });
    }
  },

  setCurrentProject: (id) => {
    const { projects } = get();
    const currentProject = projects.find(p => p.id === id) || null;
    set({ currentProject });
  },

  // Task actions
  fetchTasks: async (projectId) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      const filteredTasks = mockTasks.filter(task => task.projectId === projectId);
      set({ tasks: filteredTasks, isLoading: false });
      
      // Also create the board structure
      const board = createBoardFromTasks(projectId, filteredTasks);
      set(state => ({ 
        boards: [...state.boards.filter(b => b.projectId !== projectId), board]
      }));
    } catch (error) {
      set({ error: 'Failed to fetch tasks', isLoading: false });
    }
  },

  addTask: async (task) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const newTask: Task = {
        ...task,
        id: generateId(),
        createdAt: new Date().toISOString(),
      };
      
      set(state => {
        const updatedTasks = [...state.tasks, newTask];
        
        // Update the board
        const boardIndex = state.boards.findIndex(b => b.projectId === task.projectId);
        if (boardIndex >= 0) {
          const updatedBoard = { ...state.boards[boardIndex] };
          const columnIndex = updatedBoard.columns.findIndex(c => c.id === task.status);
          
          if (columnIndex >= 0) {
            updatedBoard.columns[columnIndex].tasks.push(newTask);
            const updatedBoards = [...state.boards];
            updatedBoards[boardIndex] = updatedBoard;
            
            return { 
              tasks: updatedTasks, 
              boards: updatedBoards,
              isLoading: false
            };
          }
        }
        
        return { tasks: updatedTasks, isLoading: false };
      });
    } catch (error) {
      set({ error: 'Failed to add task', isLoading: false });
    }
  },

  updateTask: async (task) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => {
        // Update tasks array
        const updatedTasks = state.tasks.map(t => t.id === task.id ? task : t);
        
        // Update the board
        const boardIndex = state.boards.findIndex(b => b.projectId === task.projectId);
        if (boardIndex >= 0) {
          // Create a deep copy of the board
          const updatedBoard = JSON.parse(JSON.stringify(state.boards[boardIndex]));
          
          // Remove task from all columns
          updatedBoard.columns.forEach(column => {
            column.tasks = column.tasks.filter(t => t.id !== task.id);
          });
          
          // Add task to the correct column
          const columnIndex = updatedBoard.columns.findIndex(c => c.id === task.status);
          if (columnIndex >= 0) {
            updatedBoard.columns[columnIndex].tasks.push(task);
          }
          
          const updatedBoards = [...state.boards];
          updatedBoards[boardIndex] = updatedBoard;
          
          return { 
            tasks: updatedTasks, 
            boards: updatedBoards,
            isLoading: false
          };
        }
        
        return { tasks: updatedTasks, isLoading: false };
      });
    } catch (error) {
      set({ error: 'Failed to update task', isLoading: false });
    }
  },

  deleteTask: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => {
        const taskToDelete = state.tasks.find(t => t.id === id);
        if (!taskToDelete) return { isLoading: false };
        
        // Update tasks array
        const updatedTasks = state.tasks.filter(t => t.id !== id);
        
        // Update the board
        const boardIndex = state.boards.findIndex(b => b.projectId === taskToDelete.projectId);
        if (boardIndex >= 0) {
          // Create a deep copy of the board
          const updatedBoard = JSON.parse(JSON.stringify(state.boards[boardIndex]));
          
          // Remove task from all columns
          updatedBoard.columns.forEach(column => {
            column.tasks = column.tasks.filter(t => t.id !== id);
          });
          
          const updatedBoards = [...state.boards];
          updatedBoards[boardIndex] = updatedBoard;
          
          return { 
            tasks: updatedTasks, 
            boards: updatedBoards,
            isLoading: false
          };
        }
        
        return { tasks: updatedTasks, isLoading: false };
      });
    } catch (error) {
      set({ error: 'Failed to delete task', isLoading: false });
    }
  },

  moveTask: async (taskId, sourceColumn, destinationColumn) => {
    set({ isLoading: true, error: null });
    try {
      // Find the task
      const { tasks, boards } = get();
      const task = tasks.find(t => t.id === taskId);
      
      if (!task) {
        set({ isLoading: false });
        return;
      }
      
      // Create updated task with new status
      const updatedTask = {
        ...task,
        status: destinationColumn as 'todo' | 'in-progress' | 'done'
      };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      set(state => {
        // Update tasks array
        const updatedTasks = state.tasks.map(t => t.id === taskId ? updatedTask : t);
        
        // Update the board
        const boardIndex = state.boards.findIndex(b => b.projectId === task.projectId);
        if (boardIndex >= 0) {
          // Create a deep copy of the board
          const updatedBoard = JSON.parse(JSON.stringify(state.boards[boardIndex]));
          
          // Remove task from source column
          const sourceColumnIndex = updatedBoard.columns.findIndex(c => c.id === sourceColumn);
          if (sourceColumnIndex >= 0) {
            updatedBoard.columns[sourceColumnIndex].tasks = 
              updatedBoard.columns[sourceColumnIndex].tasks.filter(t => t.id !== taskId);
          }
          
          // Add task to destination column
          const destColumnIndex = updatedBoard.columns.findIndex(c => c.id === destinationColumn);
          if (destColumnIndex >= 0) {
            updatedBoard.columns[destColumnIndex].tasks.push(updatedTask);
          }
          
          const updatedBoards = [...state.boards];
          updatedBoards[boardIndex] = updatedBoard;
          
          return { 
            tasks: updatedTasks, 
            boards: updatedBoards,
            isLoading: false
          };
        }
        
        return { tasks: updatedTasks, isLoading: false };
      });
    } catch (error) {
      set({ error: 'Failed to move task', isLoading: false });
    }
  },

  fetchBoard: async (projectId) => {
    set({ isLoading: true, error: null });
    try {
      // If tasks are not loaded yet, load them first
      if (get().tasks.filter(t => t.projectId === projectId).length === 0) {
        await get().fetchTasks(projectId);
        set({ isLoading: false });
        return;
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get tasks for this project
      const projectTasks = get().tasks.filter(t => t.projectId === projectId);
      
      // Create board structure
      const board = createBoardFromTasks(projectId, projectTasks);
      
      set(state => ({ 
        boards: [...state.boards.filter(b => b.projectId !== projectId), board],
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to fetch board', isLoading: false });
    }
  },
}));