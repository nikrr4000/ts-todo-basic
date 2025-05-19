import "./add-task.css";
import { todoListModel } from "../model";

type AddTaskCallback = (title: string) => void;

function setupAddTaskForm(
  formSelector: string,
  inputSelector: string,
  onTaskAdded?: AddTaskCallback
): void {
  const form = document.querySelector(formSelector) as HTMLFormElement;
  const input = document.querySelector(inputSelector) as HTMLInputElement;

  if (!form || !input) {
    console.error(
      `Form (${formSelector}) or input (${inputSelector}) not found`
    );
    return;
  }

  let errorMessage: HTMLElement | null = null;

  function showError(message: string): void {
    if (!errorMessage) {
      errorMessage = document.createElement("div");
      errorMessage.className = "task-input-error";

      if (form) {
        form.insertAdjacentElement("afterend", errorMessage);
      }
    }

    errorMessage.textContent = message;
    errorMessage.style.display = "block";

    if (input) {
      input.classList.add("input-error");
    }
  }

  function hideError(): void {
    if (errorMessage) {
      errorMessage.style.display = "none";

      if (input) {
        input.classList.remove("input-error");
      }
    }
  }

  function validateInput(value: string): { valid: boolean; message?: string } {
    if (value.trim() === "") {
      return { valid: false, message: "Задача не может быть пустой" };
    }

    if (value.length > 15) {
      return {
        valid: false,
        message: "Задача не может быть длиннее 15 символов",
      };
    }

    return { valid: true };
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const validation = validateInput(input.value);

    if (!validation.valid) {
      showError(validation.message || "Ошибка валидации");
      return;
    }

    hideError();

    const task = todoListModel.addTask(input.value.trim());
    if (onTaskAdded) {
      onTaskAdded(input.value.trim());
    }

    input.value = "";
  });

  input.addEventListener("input", () => {
    const validation = validateInput(input.value);

    if (!validation.valid) {
      showError(validation.message || "Ошибка валидации");
    } else {
      hideError();
    }
  });
}

export const addTaskFeature = {
  setupAddTaskForm,
};
