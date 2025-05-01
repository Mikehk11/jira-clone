import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  status: z.enum(["todo", "in_progress", "done"]),
  projectId: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  labels: z.array(z.string()).optional(), // ✅ New
});

export const updateTaskSchema = createTaskSchema.extend({
  taskId: z.string().min(1),
});