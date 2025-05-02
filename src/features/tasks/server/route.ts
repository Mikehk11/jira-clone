"use server";

import { ID, Permission, Role, Query, Models } from "appwrite";
import { appwrite } from "@/lib/appwrite";
import { createTaskSchema } from "../schemas";

// Create a task
export const createTask = async (values: unknown): Promise<Models.Document> => {
  const validated = createTaskSchema.safeParse(values);
  if (!validated.success) {
    throw new Error("Invalid fields");
  }

  const { title, status, projectId, description, dueDate, labels } = validated.data;

  const task = await appwrite.database.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID!,
    ID.unique(),
    {
      title,
      status,
      projectId,
      description,
      dueDate,
      labels,
    },
    [
      Permission.read(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any()),
    ]
  );

  return task;
};

// Get tasks by projectId
export const getTasksByProject = async (projectId: string): Promise<Models.Document[]> => {
  const result = await appwrite.database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID!,
    [Query.equal("projectId", projectId)]
  );

  return result.documents;
};

// Update a task status
export const updateTask = async (values: { taskId: string; status: string }): Promise<Models.Document> => {
  const { taskId, status } = values;

  const task = await appwrite.database.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID!,
    taskId,
    { status }
  );

  return task;
};