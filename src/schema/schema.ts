import { z } from 'zod';
export type ProjectFormValues = z.infer<typeof projectSchema>;

export const projectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(100, 'Project name must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  id: z.string().optional(),
  createdAt: z.string().optional(),
});