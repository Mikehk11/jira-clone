"use client";

import { CreateProjectModal } from "@/features/projects/components/create-project-modal";
import { Button } from "@/components/ui/button";
import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal";
import { useParams } from "next/navigation";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useDeleteProject } from "@/features/projects/api/use-delete-project";
import { CreateTaskForm } from "@/features/tasks/components/create-task-form";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useUpdateTask } from "@/features/tasks/api/use-update-task";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

export default function ProjectPage() {
  const { onOpen } = useCreateProjectModal();
  const params = useParams();
  const workspaceId = params.workspaceId as string;
  const projectId = params.projectId as string;

  const { data: projects, isLoading } = useGetProjects(workspaceId);
  const { deleteProject, isLoading: isDeleting } = useDeleteProject();
  const { data: tasks, isLoading: isTasksLoading } = useGetTasks(projectId);
  const { updateTask } = useUpdateTask();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;
    updateTask({ taskId: draggableId, status: destination.droppableId });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Projects</h1>
        <Button onClick={onOpen}>Create New Project</Button>
      </div>

      <CreateProjectModal />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading && <p>Loading projects...</p>}
        {projects?.map((project: any) => (
          <div key={project.$id} className="border p-4 rounded shadow space-y-2">
            <h2 className="font-semibold text-lg">{project.name}</h2>
            <p className="text-xs text-muted-foreground">{project.imageUrl}</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => console.log("Edit", project)}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                disabled={isDeleting}
                onClick={() => deleteProject(project.$id)}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Task creation form */}
      <div className="max-w-lg mt-10">
        <h2 className="text-xl font-semibold mb-4">Create Task</h2>
        <CreateTaskForm />
      </div>

      {/* Drag and Drop Task Board */}
      <div className="mt-10 space-y-2">
        <h2 className="text-xl font-semibold mb-4">Tasks by Status</h2>
        {isTasksLoading && <p>Loading tasks...</p>}

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["todo", "in_progress", "done"].map((status) => (
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="bg-gray-50 border rounded p-3 min-h-[150px]"
                  >
                    <h3 className="text-md font-semibold capitalize mb-2">
                      {status.replace("_", " ")}
                    </h3>

                    {tasks
                      ?.filter((task: any) => task.status === status)
                      .map((task: any, index: number) => (
                        <Draggable
                          key={task.$id}
                          draggableId={task.$id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="border p-3 mb-2 bg-white rounded shadow-sm space-y-1"
                            >
                              <p className="font-medium">{task.title}</p>

                              {task.description && (
                                <p className="text-sm text-muted-foreground">
                                  {task.description}
                                </p>
                              )}

                              {task.dueDate && (
                                <p className="text-xs text-orange-500">
                                  Due: {task.dueDate}
                                </p>
                              )}

                              {task.labels?.length > 0 && (
                                <div className="flex flex-wrap gap-1 text-xs">
                                  {task.labels.map((label: string) => (
                                    <span
                                      key={label}
                                      className="px-2 py-0.5 rounded bg-blue-100 text-blue-600 border text-xs"
                                    >
                                      {label}
                                    </span>
                                  ))}
                                </div>
                              )}

                              <select
                                className="text-xs border rounded p-1"
                                defaultValue={task.status}
                                onChange={(e) =>
                                  updateTask({
                                    taskId: task.$id,
                                    status: e.target.value,
                                  })
                                }
                              >
                                <option value="todo">Todo</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                              </select>
                            </div>
                          )}
                        </Draggable>
                      ))}

                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}