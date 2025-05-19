import "./task.css";
import { Task } from "../model/types";

type TaskProps = {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: string) => void;
  onToggleComplete?: (task: Task) => void;
};

function createTaskContainer(
  task: Task,
  onToggleComplete?: (task: Task) => void
) {
  const container = document.createElement("div");
  container.classList.add("task-container");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = `task-checkbox-${task.id}`;
  checkbox.classList.add("task-checkbox");
  checkbox.checked = task.completed;

  if (onToggleComplete) {
    checkbox.addEventListener("change", () => {
      const updatedTask = { ...task, completed: checkbox.checked };
      onToggleComplete(updatedTask);
    });
  }

  const textSpan = document.createElement("span");
  textSpan.textContent = task.title;
  textSpan.classList.add("task-title");

  container.append(checkbox, textSpan);
  return { container, textSpan };
}

function createTaskElement({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}: TaskProps): HTMLElement {
  const taskElement = document.createElement("li");
  taskElement.classList.add("task");
  taskElement.setAttribute("data-task-id", task.id);

  const { container, textSpan } = createTaskContainer(task, onToggleComplete);

  if (onEdit) {
    textSpan.addEventListener("dblclick", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const currentText = textSpan.innerText;

      const editContainer = document.createElement("div");
      editContainer.classList.add("task-edit-container");

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

      editContainer.append(input, charCounter, errorMessage);
      textSpan.replaceWith(editContainer);

      input.focus();
      input.select();

      const validateInput = (text: string): boolean => {
        const isValid = text.length <= 15;

        charCounter.textContent = `${text.length}/15`;
        charCounter.style.color = isValid ? "#666" : "#ff3b30";

        errorMessage.style.display = isValid ? "none" : "block";
        input.classList.toggle("input-error", !isValid);

        return isValid;
      };

      input.addEventListener("input", () => {
        validateInput(input.value);
      });

      const finishEditing = () => {
        const newText = input.value.trim();

        if (newText && newText !== currentText && validateInput(newText)) {
          const updatedTask = { ...task, title: newText };
          onEdit(updatedTask);
          textSpan.textContent = newText;
          editContainer.replaceWith(textSpan);
        } else if (newText.length > 15) {
          input.focus();
        } else {
          editContainer.replaceWith(textSpan);
        }
      };

      input.addEventListener("blur", () => {
        setTimeout(() => {
          if (editContainer.isConnected) {
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
          editContainer.replaceWith(textSpan);
        }
      });
    });
  }

  if (onDelete || onEdit) {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("task-buttons");

    if (onEdit) {
      const editButton = document.createElement("button");
      editButton.classList.add("task-button", "edit-button");
      editButton.innerHTML =
        '<svg viewBox="0 0 16 16" fill="#a6d6d6" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M9.70711 2.29289L13.7071 6.29289L15.1716 4.82843C15.702 4.29799 16 3.57857 16 2.82843C16 1.26633 14.7337 0 13.1716 0C12.4214 0 11.702 0.297995 11.1716 0.828428L9.70711 2.29289Z" fill="#000000"></path> <path d="M8.29289 3.70711L1 11V15H5L12.2929 7.70711L8.29289 3.70711Z" fill="#000000"></path></g></svg>';
      editButton.addEventListener("click", () => {
        textSpan.dispatchEvent(new MouseEvent("dblclick", { bubbles: true }));
      });
      buttonsContainer.appendChild(editButton);
    }

    if (onDelete) {
      const deleteButton = document.createElement("button");
      deleteButton.classList.add("task-button", "delete-button");
      deleteButton.innerHTML =
        '<svg viewBox="0 0 16 16" fill="#a6d6d6" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 2H1V4H15V2H12V0H4V2Z" fill="#000000"></path> <path fill-rule="evenodd" clip-rule="evenodd" d="M3 6H13V16H3V6ZM7 9H9V13H7V9Z" fill="#000000"></path> </g></svg>';
      deleteButton.addEventListener("click", () => {
        onDelete(task.id);
      });
      buttonsContainer.appendChild(deleteButton);
    }

    taskElement.append(container, buttonsContainer);
  } else {
    taskElement.appendChild(container);
  }

  return taskElement;
}

export const TaskView = {
  createTaskElement,
};
