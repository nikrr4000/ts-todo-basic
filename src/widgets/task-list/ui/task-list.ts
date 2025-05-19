import "./task-list.css";
import { TaskView } from "../../../entities/task";
import { todoList } from "../../../features/todo-list";
import { TaskListEvents } from "../model/types";
import { Button, Input } from "../../../shared/ui";

export function createTaskListWidget(
  containerSelector: string,
  events?: TaskListEvents
): void {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Container ${containerSelector} not found`);
    return;
  }

  const tasks = todoList.getAllTasks();

  setInterval(() => {
    todoList.saveTasks();
  }, 2000);

  const widget = document.createElement("div");
  widget.classList.add("task-list-widget");

  const formContainer = document.createElement("form");
  formContainer.classList.add("new-task-form");

  const { container: inputContainer, input } = Input.create({
    placeholder: "Enter a new task",
    maxLength: 15,
    showCharCount: true,
    validator: (value) => {
      if (value.trim() === "") {
        return { valid: false, message: "Task cannot be empty" };
      }
      if (value.length > 15) {
        return {
          valid: false,
          message: "Task cannot be longer than 15 characters",
        };
      }
      return { valid: true };
    },
  });

  const addButton = Button.create({
    text: "Add",
    className: "new-task-button",
  });

  formContainer.appendChild(inputContainer);
  formContainer.appendChild(addButton);

  const taskListElement = document.createElement("ul");
  taskListElement.classList.add("task-list", "todo-list");

  widget.appendChild(formContainer);
  widget.appendChild(taskListElement);

  container.appendChild(widget);

  function updateTaskList(): void {
    taskListElement.innerHTML = "";

    const currentTasks = todoList.getAllTasks();

    if (currentTasks.length === 0) {
      const emptyMessage = document.createElement("li");
      emptyMessage.classList.add("task-list-empty");
      emptyMessage.textContent = "No tasks yet. Add your first task!";
      taskListElement.appendChild(emptyMessage);
      return;
    }

    currentTasks.forEach((task) => {
      const taskElement = TaskView.createTaskElement({
        task,
        onEdit: (updatedTask) => {
          todoList.editTask(updatedTask.id, updatedTask.title);
          updateTaskList();
          if (events?.onTaskEdited) {
            events.onTaskEdited(updatedTask);
          }
        },
        onDelete: (taskId) => {
          todoList.deleteTask(taskId);
          updateTaskList();
          if (events?.onTaskDeleted) {
            events.onTaskDeleted(taskId);
          }
        },
        onToggleComplete: (updatedTask) => {
          todoList.toggleTaskComplete(updatedTask.id);
          updateTaskList();
          if (events?.onTaskToggled) {
            events.onTaskToggled(updatedTask);
          }
        },
      });

      taskListElement.appendChild(taskElement);
    });
  }

  formContainer.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value.trim() === "" || input.value.length > 15) {
      return;
    }

    const newTask = todoList.addTask(input.value);
    input.value = "";

    updateTaskList();

    if (newTask && events?.onTaskAdded) {
      events.onTaskAdded(newTask);
    }
  });

  updateTaskList();
}
