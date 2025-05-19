import { v4 as uuid } from "uuid";
import { Task } from "./types";

function create(title: string): Task {
  return {
    id: uuid(),
    title,
    completed: false,
    createdAt: new Date(),
  };
}

function edit(task: Task, title: string): Task {
  return { ...task, title };
}

function toggleComplete(task: Task): Task {
  return { ...task, completed: !task.completed };
}

export const taskModel = {
  create,
  edit,
  toggleComplete,
};
