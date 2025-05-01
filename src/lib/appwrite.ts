import { Account, Client, Databases, Storage } from "appwrite";

const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

const account = new Account(client);

function ensureSession() {
  account.get().catch(() => {
    account.createAnonymousSession().catch((err) => {
      console.error("Failed to create anonymous session:", err);
    });
  });
}

ensureSession(); // no await — run it but don't block module

export const appwrite = {
  client,
  account,
  database: new Databases(client),
  storage: new Storage(client),
};