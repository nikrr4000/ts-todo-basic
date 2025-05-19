import { v4 as uuid } from "uuid";
import { Task } from "../types";

function create(title: string): Task {
  // TODO: ADD VALIDATION
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

export const task = { create, edit };
