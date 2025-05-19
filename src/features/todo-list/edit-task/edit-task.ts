import { Task } from "../../../entities/task";
import { todoListModel } from "../model";

function setupEditTask(): (taskId: string, newTitle: string) => Task | null {
  return (taskId: string, newTitle: string) => {
    return todoListModel.editTask(taskId, newTitle);
  };
}

export const editTaskFeature = {
  setupEditTask,
};
