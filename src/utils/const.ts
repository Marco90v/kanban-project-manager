import { ProjectFormValues, TaskFormValues } from "@/schema/schema";

// Mock data
export const mockProjects: ProjectFormValues[] = [
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

export const mockTasks: TaskFormValues[] = [
  {
    id: '101',
    projectId: '1',
    title: 'Create wireframes',
    description: 'Design initial wireframes for homepage and product pages',
    status: ['done'],
    priority: ['high'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '102',
    projectId: '1',
    title: 'Design system',
    description: 'Develop a comprehensive design system with components',
    status: ['in-progress'],
    priority: ['medium'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '103',
    projectId: '1',
    title: 'Frontend implementation',
    description: 'Implement the new design using React',
    status: ['todo'],
    priority: ['medium'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '201',
    projectId: '2',
    title: 'App architecture',
    description: 'Define app architecture and technology stack',
    status: ['done'],
    priority: ['high'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '202',
    projectId: '2',
    title: 'User authentication',
    description: 'Implement user authentication flow',
    status: ['in-progress'],
    priority: ['high'],
    createdAt: new Date().toISOString(),
  },
  {
    id: '203',
    projectId: '2',
    title: 'Push notifications',
    description: 'Set up push notification system',
    status: ['todo'],
    priority: ['low'],
    createdAt: new Date().toISOString(),
  },
];