"use server";

import { appwrite } from "@/lib/appwrite";
import { ID, Permission, Role, Query, Models } from "appwrite";
import { createProjectSchema, updateProjectSchema } from "../schemas";

// Create project
export const createProject = async (values: unknown): Promise<Models.Document> => {
  const validatedFields = createProjectSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  const { name, imageUrl, workspaceId } = validatedFields.data;

  const project = await appwrite.database.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID!,
    ID.unique(),
    { name, imageUrl, workspaceId },
    [
      Permission.read(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any()),
    ]
  );

  return project;
};

// Update project
export const updateProject = async (values: unknown): Promise<Models.Document> => {
  const validatedFields = updateProjectSchema.safeParse(values);
  if (!validatedFields.success) {
    throw new Error("Invalid fields");
  }

  const { name, imageUrl, workspaceId, projectId } = validatedFields.data;

  const project = await appwrite.database.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID!,
    projectId,
    { name, imageUrl, workspaceId }
  );

  return project;
};

// Delete project
export const deleteProject = async (projectId: string): Promise<void> => {
  await appwrite.database.deleteDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID!,
    projectId
  );
};

// Get all projects by workspaceId
export const getProjects = async (workspaceId: string): Promise<Models.Document[]> => {
  const result = await appwrite.database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_PROJECTS_COLLECTION_ID!,
    [Query.equal("workspaceId", workspaceId)]
  );

  return result.documents;
};