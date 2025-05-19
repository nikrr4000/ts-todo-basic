import { Task } from "../../../entities/task";

export interface TaskListEvents {
  onTaskAdded?: (task: Task) => void;
  onTaskEdited?: (task: Task) => void;
  onTaskDeleted?: (taskId: string) => void;
  onTaskToggled?: (task: Task) => void;
}
