import { taskElementFactory } from "../task/main";
import { Task } from "../types";

const tasks: Task[] = [];
const list = document.querySelector(".todo-list") as HTMLUListElement;

function getListElement() {
  return list;
}

const deleteTaskCb = (id: string) => {
  const inx = tasks.findIndex((el) => el.id === id);

  if (inx !== -1) {
    tasks.splice(inx, 1);

    const taskElement = list.querySelector(`[data-task-id="${id}"]`);
    if (taskElement) {
      taskElement.remove();
    }
  }
};

const editTaskCb = (updatedTask: Task) => {
  const inx = tasks.findIndex((el) => el.id === updatedTask.id);

  if (inx !== -1) {
    tasks[inx] = updatedTask;

    updateTaskElement(updatedTask);
  }
};

// Функция для обновления DOM-элемента задачи
function updateTaskElement(task: Task) {
  const taskElement = list.querySelector(`[data-task-id="${task.id}"]`);

  if (taskElement) {
    const titleElement = taskElement.querySelector(".task-title");
    if (titleElement) {
      titleElement.textContent = task.title;
    }

    const checkbox = taskElement.querySelector(`#task-checkbox-${task.id}`);
    if (checkbox && checkbox instanceof HTMLInputElement) {
      checkbox.checked = task.completed;
    }
  }
}

async function appendListChild(task: Task) {
  const taskElement = await taskElementFactory.createTaskElement(
    task,
    deleteTaskCb,
    editTaskCb
  );

  tasks.push(task);
  list.append(taskElement);
}

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks) as Task[];

      tasks.length = 0;
      list.innerHTML = "";

      parsedTasks.forEach((task) => {
        appendListChild(task);
      });
    }
  } catch (error) {
    console.error("Error loading tasks:", error);
  }
}

function saveTasks() {
  try {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
}

function handleTasksChanged() {
  saveTasks();
}

setInterval(() => {
  handleTasksChanged();
}, 2000);

loadTasks();

export const taskList = {
  getListElement,
  appendListChild,
  getTasks: () => [...tasks],
};
