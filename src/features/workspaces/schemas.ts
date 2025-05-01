import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(3, { message: "Name is required" }),
  imageUrl: z.string().min(1, { message: "Image is required" }),
});

export const updateWorkspaceSchema = createWorkspaceSchema.extend({
  workspaceId: z.string().min(1),
});