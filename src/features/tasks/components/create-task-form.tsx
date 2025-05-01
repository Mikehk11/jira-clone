"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createTaskSchema } from "../schemas";
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
import { Textarea } from "@/components/ui/textarea";
import { useParams } from "next/navigation";
import { createTask } from "../server/route";
import { toast } from "react-hot-toast";

type InputType = z.infer<typeof createTaskSchema>;

const predefinedLabels = ["Bug", "Feature", "Urgent", "Low Priority"];

export const CreateTaskForm = () => {
  const params = useParams();
  const projectId = params.projectId as string;

  const form = useForm<InputType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      status: "todo",
      description: "",
      dueDate: "",
      labels: [],
      projectId,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: InputType) => {
    try {
      await createTask(values);
      toast.success("Task created!");
      form.reset();
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const handleLabelToggle = (label: string) => {
    const current = form.getValues("labels") || [];
    if (current.includes(label)) {
      form.setValue("labels", current.filter((l) => l !== label));
    } else {
      form.setValue("labels", [...current, label]);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="e.g. Fix login bug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (optional)</FormLabel>
              <FormControl>
                <Textarea disabled={isLoading} placeholder="Optional task notes..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Due Date</FormLabel>
              <FormControl>
                <Input type="date" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Labels</FormLabel>
          <div className="flex flex-wrap gap-2">
            {predefinedLabels.map((label) => (
              <Button
                key={label}
                type="button"
                variant={
                  form.watch("labels")?.includes(label) ? "default" : "outline"
                }
                size="sm"
                onClick={() => handleLabelToggle(label)}
              >
                {label}
              </Button>
            ))}
          </div>
        </FormItem>

        <Button disabled={isLoading} type="submit" className="w-full">
          Create Task
        </Button>
      </form>
    </Form>
  );
};