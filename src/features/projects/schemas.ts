import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
  workspaceId: z.string().min(1, { message: "Workspace ID is required" }),
});

export const updateProjectSchema = createProjectSchema.extend({
  projectId: z.string().min(1, { message: "Project ID is required" }),
});