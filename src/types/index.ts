import { projectSchema, taskSchema } from "@/schema/schema";
import { z } from "zod";

export type ProjectFormValues = z.infer<typeof projectSchema>;
export type TaskFormValues = z.infer<typeof taskSchema>;

export interface Column {
  id: string;
  title: string;
  tasks: TaskFormValues[];
}

export interface Board {
  id: string;
  projectId: string;
  columns: Column[];
}