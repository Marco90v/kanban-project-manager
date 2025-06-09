import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Project name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  id: z.string().optional(),
  createdAt: z.string(),
});

export const taskSchema = z.object({
  title: z.string().min(1, 'Task title is required').max(100, 'Task title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  status: z.string({message: 'Task status is required'}).array()
  .refine((val) => val.length > 0, {message: 'Task status is required'}),
  priority: z.string({message: 'Task priority is required'}).array()
  .refine((val) => val.length > 0, {message: 'Task priority is required'}),
  dueDate: z.string().optional(),
  assignee: z.string().optional(),
  id: z.string().optional(),
  projectId: z.string().optional(),
  createdAt: z.string(),
});
