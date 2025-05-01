"use server";

import { ID, Permission, Role, Query } from "appwrite";
import { appwrite } from "@/lib/appwrite";
import { createTaskSchema, updateTaskSchema } from "../schemas";

// Create task
export const createTask = async (values: unknown) => {
  const validated = createTaskSchema.safeParse(values);
  if (!validated.success) {
    throw new Error("Invalid fields");
  }

  const { title, status, projectId, description } = validated.data;

  const task = await appwrite.database.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID!,
    ID.unique(),
    {
      title,
      status,
      projectId,
      description,
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
export const getTasksByProject = async (projectId: string) => {
  const result = await appwrite.database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID!,
    [Query.equal("projectId", projectId)]
  );

  return result.documents;
};

// Update task status
export const updateTask = async (values: { taskId: string; status: string }) => {
  const { taskId, status } = values;

  const task = await appwrite.database.updateDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_TASKS_COLLECTION_ID!,
    taskId,
    { status }
  );

  return task;
};