export * from "./add-task";
export * from "./edit-task";
export * from "./delete-task";
export * from "./model";

import { addTaskFeature } from "./add-task";
import { todoListModel } from "./model";

function initializeTodoList(): void {
  todoListModel.loadTasks();

  addTaskFeature.setupAddTaskForm(".new-task-form", ".new-task-input");

  setInterval(() => {
    todoListModel.saveTasks();
  }, 2000);
}

export const todoList = {
  initializeTodoList,
  getAllTasks: todoListModel.getAllTasks,
  addTask: todoListModel.addTask,
  editTask: todoListModel.editTask,
  deleteTask: todoListModel.deleteTask,
  saveTasks: todoListModel.saveTasks,
  loadTasks: todoListModel.loadTasks,
  toggleTaskComplete: todoListModel.toggleTaskComplete,
};
