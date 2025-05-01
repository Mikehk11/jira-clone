"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { createWorkspaceSchema } from "../schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createWorkspace } from "../server/route";
import { toast } from "react-hot-toast";
import { useCreateWorkspaceModal } from "../hooks/use-create-workspace-modal";

type InputType = z.infer<typeof createWorkspaceSchema>;

export const CreateWorkspaceForm = () => {
  const { onClose } = useCreateWorkspaceModal();

  const form = useForm<InputType>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      imageUrl: "/file.svg",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: InputType) => {
    try {
      await createWorkspace(values);
      toast.success("Workspace created!");
      form.reset();
      onClose();
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="Enter workspace name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit" className="w-full">
          Create
        </Button>
      </form>
    </Form>
  );
};