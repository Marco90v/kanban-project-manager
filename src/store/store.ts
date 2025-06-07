import { ProjectFormValues, TaskFormValues } from '@/schema/schema';
import { Board } from '@/types';
import { createBoardFromTasks } from '@/utils/helpers';
import { DragEndEvent } from '@dnd-kit/core';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StoreState {
  // Data
  Projects: ProjectFormValues[];
  Tasks: TaskFormValues[];
  projectId: string | null;
  Boards: Board | null;

  // Actions Projects
  setProjects: (projects: ProjectFormValues[]) => void;
  addProject: (project: ProjectFormValues) => void;
  updateProject: (project: ProjectFormValues) => void;
  deleteProject: (id: string) => void;
  getProjects: () => ProjectFormValues[];
  setProjectId: (id: string | null) => void;

  // Actions Tasks
  setTasks: (tasks: TaskFormValues[]) => void;
  addTask: (task: TaskFormValues) => void;
  updateTask: (task: TaskFormValues) => void;
  deleteTask: (id: string) => void;
  getTasks: (id: string) => Board;

  setBoards: (string: string) => void;
  updateStatusTask: (event:DragEndEvent) => void;
}

export const useMyStore = create<StoreState>()(
  persist(
    (set, get) => ({
      Projects:[],
      Tasks:[],
      projectId: null,
      Boards:null,
      setProjects: (projects) => set((state) => ({ ...state, Projects: projects })),
      addProject: (project) => set((state) => ({
        ...state,
        Projects: [
          ...state.Projects,
          {
            ...project,
            id: self.crypto.randomUUID(),
            createdAt: new Date().toISOString(),
          }
        ]
      })), 
      updateProject: (project) => set((state) => ({ ...state, Projects: state.Projects.map(p => p.id === project.id ? project : p) })),
      deleteProject: (id) => set((state) => ({ ...state, Projects: state.Projects.filter(p => p.id !== id) })),
      getProjects: () => get().Projects,
      setProjectId: (id) => set((state) => ({ ...state, projectId: id })),

      setTasks: (tasks) => set((state) => ({ ...state, Tasks: tasks })),
      addTask: (task) => set((state) => ({ ...state, Tasks: [...state.Tasks, task] })),
      updateTask: (task) => set((state) => ({ ...state, Tasks: state.Tasks.map(t => t.id === task.id ? task : t) })),
      deleteTask: (id) => set((state) => ({ ...state, Tasks: state.Tasks.filter(t => t.id !== id) })),
      getTasks: (id) => {
        const task = get().Tasks.filter(t => t.projectId === id);
        return createBoardFromTasks(id, task);
      },

      setBoards: (id:string) => {
        const task = get().Tasks.filter(t => t.projectId === id);
        const board = createBoardFromTasks(id, task);
        // set((state) => ({ ...state, Boards: [...state.Boards.filter(b => b.projectId !== id), board] }));
        set((state) => ({ ...state, Boards: board }));
      },

      updateStatusTask: (event) => {
        const { active, over } = event;
        if(!over || active.data.current?.status[0] === over?.id) return;
        const data = active.data.current as TaskFormValues;
        const newStatus = [over.id] as string[];
        data.status = newStatus;
        set((state) => ({ ...state, Tasks: state.Tasks.map(t => t.id === data.id ? data : t) }));
        if(data.projectId) get().setBoards(data.projectId);
      },

    }),
    {name: 'useMyStore'}
  )
);