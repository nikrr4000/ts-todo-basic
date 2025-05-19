import { todo } from "./features/todo-list/main";
import "./global.css";
import "./main.css";

todo.initializeForm();
// const list = document.querySelector<HTMLUListElement>("#list");
// const form = document.getElementById("new-task-form") as HTMLFormElement | null;
// const input = document.querySelector<HTMLInputElement>("#new-task-title");

// const tasks: Task[] = loadTasks();
// for (const task of tasks) {
//   addListItem(task);
// }

// form?.addEventListener("submit", (e) => {
//   e.preventDefault();

//   if (!input || input.value === "" || input.value === null) return;

//   const newTask: Task = {
//     id: "12",
//     title: input.value,
//     completed: false,
//     createdAt: new Date(),
//   };
//   tasks.push(newTask);
//   saveTasks();
//   addListItem(newTask);
//   input.value = "";
// });

// function addListItem(task: Task) {
//   const item = document.createElement("li");
//   const label = document.createElement("label");
//   const checkbox = document.createElement("input");
//   checkbox.type = "checkbox";

//   checkbox.addEventListener("change", () => {
//     task.completed = !task.completed;
//     saveTasks();
//   });

//   label.append(checkbox, task.title);
//   item.append(label);
//   list?.append(item);
// }

// function saveTasks() {
//   localStorage.setItem("TASKS", JSON.stringify(tasks));
// }

// function loadTasks(): Task[] {
//   const taskJSON = localStorage.getItem("TASKS");
//   return taskJSON ? JSON.parse(taskJSON) : [];
// }
