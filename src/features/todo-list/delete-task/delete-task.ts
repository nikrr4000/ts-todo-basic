import { todoListModel } from "../model";

function setupDeleteTask(): (taskId: string) => boolean {
  return (taskId: string) => {
    return todoListModel.deleteTask(taskId);
  };
}

export const deleteTaskFeature = {
  setupDeleteTask,
};
