"use server";

import { ID, Permission, Role, Models } from "appwrite";
import { appwrite } from "@/lib/appwrite";
import { createWorkspaceSchema } from "../schemas";
import { v4 as uuidv4 } from "uuid";

// Create workspace
export const createWorkspace = async (values: unknown): Promise<Models.Document> => {
  const validated = createWorkspaceSchema.safeParse(values);
  if (!validated.success) {
    throw new Error("Invalid fields");
  }

  const { name, imageUrl } = validated.data;

  const workspace = await appwrite.database.createDocument(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_WORKSPACES_COLLECTION_ID!,
    ID.unique(),
    {
      name,
      imageUrl,
      inviteCode: uuidv4(),
    },
    [
      Permission.read(Role.any()),
      Permission.update(Role.any()),
      Permission.delete(Role.any()),
    ]
  );

  return workspace;
};

// Get all workspaces
export const getWorkspaces = async (): Promise<Models.Document[]> => {
  const result = await appwrite.database.listDocuments(
    process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
    process.env.NEXT_PUBLIC_APPWRITE_WORKSPACES_COLLECTION_ID!
  );

  return result.documents;
};