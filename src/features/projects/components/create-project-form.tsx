"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { createProjectSchema } from "../schemas";
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
import { useParams } from "next/navigation";
import { createProject, updateProject } from "../server/route";
import { toast } from "react-hot-toast";
import { useCreateProjectModal } from "../hooks/use-create-project-modal";
import { useEditProjectModal } from "../hooks/use-edit-project-modal";

type InputType = z.infer<typeof createProjectSchema>;

interface CreateProjectFormProps {
  initialData?: any;
}

export const CreateProjectForm = ({ initialData }: CreateProjectFormProps) => {
  const params = useParams();
  const isEdit = !!initialData;

  const { onClose: closeCreate } = useCreateProjectModal();
  const { onClose: closeEdit } = useEditProjectModal();

  const form = useForm<InputType>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: initialData?.name || "",
      imageUrl: initialData?.imageUrl || "/file.svg",
      workspaceId: params.workspaceId as string,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: InputType) => {
    try {
      if (isEdit) {
        await updateProject({ ...values, projectId: initialData.$id });
        toast.success("Project updated!");
        closeEdit();
      } else {
        await createProject(values);
        toast.success("Project created!");
        closeCreate();
      }
      form.reset();
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
                <Input disabled={isLoading} placeholder="Enter project name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isLoading} type="submit" className="w-full">
          {isEdit ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};