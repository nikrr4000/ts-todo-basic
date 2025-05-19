import "./main.css";
import { loadSVG, SVGFiles } from "../../utils";
import { Task } from "../types";

async function createTaskButton(icon: SVGFiles) {
  const button = document.createElement("button");
  await loadSVG(icon, button);
  return button;
}

async function createTaskButtonsContainer(
  task: Task,
  deleteCb: (id: string) => void,
  editCb: (task: Task) => void
) {
  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("task-buttons");

  const editTaskButton = await createTaskButton("pencil");
  editTaskButton.classList.add("task-button");
  editTaskButton.addEventListener("click", () => {
    const taskElement = document.querySelector(`[data-task-id="${task.id}"]`);
    if (taskElement) {
      const textSpan = taskElement.querySelector(".task-title");
      if (textSpan) {
        handleTaskTitleEdit(task, textSpan as HTMLElement, editCb);
      }
    }
  });

  const deleteTaskButton = await createTaskButton("trashCan");
  deleteTaskButton.classList.add("task-button");
  deleteTaskButton.addEventListener("click", () => {
    deleteCb(task.id);
  });

  buttonsContainer.append(editTaskButton, deleteTaskButton);
  return buttonsContainer;
}

function createTaskLabel(task: Task, editCb: (task: Task) => void) {
  const container = document.createElement("div");
  container.classList.add("task-container");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `task-checkbox-${task.id}`;
  checkbox.classList.add("task-checkbox");
  checkbox.checked = task.completed;

  checkbox.addEventListener("change", () => {
    const updatedTask = { ...task, completed: checkbox.checked };
    editCb(updatedTask);
  });

  const textSpan = document.createElement("span");
  textSpan.textContent = task.title;
  textSpan.classList.add("task-title");

  textSpan.addEventListener("dblclick", (e) => {
    e.preventDefault();
    e.stopPropagation();
    handleTaskTitleEdit(task, textSpan, editCb);
  });

  container.append(checkbox, textSpan);
  return container;
}

function handleTaskTitleEdit(
  task: Task,
  textSpan: HTMLElement,
  editCb: (task: Task) => void
) {
  const currentText = textSpan.innerText;

  const inputContainer = document.createElement("div");
  inputContainer.classList.add("task-edit-container");

  const input = document.createElement("input");
  input.type = "text";
  input.value = currentText;
  input.classList.add("task-edit-input");

  const charCounter = document.createElement("div");
  charCounter.classList.add("char-counter");
  charCounter.textContent = `${currentText.length}/15`;

  const errorMessage = document.createElement("div");
  errorMessage.classList.add("task-edit-error");
  errorMessage.textContent =
    "Название задачи не может быть длиннее 15 символов";

  inputContainer.appendChild(input);
  inputContainer.appendChild(charCounter);
  inputContainer.appendChild(errorMessage);

  textSpan.replaceWith(inputContainer);
  input.focus();
  input.select();

  const validateInput = (text: string): boolean => {
    const isValid = text.length <= 15;

    charCounter.textContent = `${text.length}/15`;

    if (isValid) {
      charCounter.style.color = "#666";
    } else {
      charCounter.style.color = "#ff3b30";
    }

    if (isValid) {
      errorMessage.style.display = "none";
      input.classList.remove("input-error");
    } else {
      errorMessage.style.display = "block";
      input.classList.add("input-error");
    }

    return isValid;
  };

  input.addEventListener("input", () => {
    validateInput(input.value);
  });

  const finishEditing = () => {
    const newText = input.value.trim();

    if (newText && newText !== currentText && validateInput(newText)) {
      const updatedTask = { ...task, title: newText };
      editCb(updatedTask);
      textSpan.textContent = newText;

      inputContainer.replaceWith(textSpan);
    } else if (newText.length > 15) {
      input.focus();
    } else {
      inputContainer.replaceWith(textSpan);
    }
  };

  input.addEventListener("blur", () => {
    setTimeout(() => {
      if (inputContainer.isConnected) {
        finishEditing();
      }
    }, 100);
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      finishEditing();
    } else if (e.key === "Escape") {
      e.preventDefault();
      inputContainer.replaceWith(textSpan);
    }
  });
}

async function createTaskElement(
  task: Task,
  deleteCb: (id: string) => void,
  editCb: (task: Task) => void
) {
  const taskElement = document.createElement("li");
  taskElement.classList.add("task");
  taskElement.setAttribute("data-task-id", task.id);

  const label = createTaskLabel(task, editCb);
  const buttonsContainer = await createTaskButtonsContainer(
    task,
    deleteCb,
    editCb
  );

  taskElement.append(label, buttonsContainer);
  return taskElement;
}

export const taskElementFactory = {
  createTaskElement,
};
