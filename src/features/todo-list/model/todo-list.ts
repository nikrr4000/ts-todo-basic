import { Task, taskModel } from "../../../entities/task";

let tasks: Task[] = [];

function addTask(title: string): Task {
  const newTask = taskModel.create(title);
  tasks.push(newTask);
  saveTasks();
  return newTask;
}

function editTask(taskId: string, title: string): Task | null {
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index === -1) return null;

  const updatedTask = { ...tasks[index], title };
  tasks[index] = updatedTask;
  saveTasks();
  return updatedTask;
}

function deleteTask(taskId: string): boolean {
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index === -1) return false;

  tasks.splice(index, 1);
  saveTasks();
  return true;
}

function toggleTaskComplete(taskId: string): Task | null {
  const index = tasks.findIndex((t) => t.id === taskId);
  if (index === -1) return null;

  const updatedTask = { ...tasks[index], completed: !tasks[index].completed };
  tasks[index] = updatedTask;
  saveTasks();
  return updatedTask;
}

function getAllTasks(): Task[] {
  return [...tasks];
}

function loadTasks(): void {
  try {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks) as Task[];
      tasks = parsedTasks;
    }
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

function saveTasks(): void {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
}

export const todoListModel = {
  addTask,
  editTask,
  deleteTask,
  toggleTaskComplete,
  getAllTasks,
  loadTasks,
  saveTasks,
};
