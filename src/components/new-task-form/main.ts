const form = document.querySelector(".new-task-form") as HTMLFormElement | null;
const input = document.querySelector(
  ".new-task-input"
) as HTMLInputElement | null;

let errorMessage: HTMLElement | null = null;

function showError(message: string): void {
  if (!errorMessage) {
    errorMessage = document.createElement("div");
    errorMessage.className = "task-input-error";
    errorMessage.style.color = "red";
    errorMessage.style.fontSize = "0.8em";
    errorMessage.style.marginTop = "5px";

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

function hideError() {
  if (errorMessage) {
    errorMessage.style.display = "none";

    if (input) {
      input.classList.remove("input-error");
    }
  }
}

function validateInput(value: string) {
  if (value.length > 15) {
    return {
      valid: false,
      message: "Задача не может быть длиннее 15 символов",
    };
  }

  return { valid: true };
}

function addEventListenerOnForm<K extends keyof HTMLElementEventMap>(
  action: K,
  listener: (
    event: HTMLElementEventMap[K],
    form: HTMLFormElement,
    input: HTMLInputElement,
    isValid: boolean
  ) => void | Promise<void>
): void {
  if (!form) throw new Error("Form not found");
  if (!input) throw new Error("Input not found");

  form.addEventListener(action, (e) => {
    e.preventDefault();

    const validation = validateInput(input.value);

    if (!validation.valid) {
      showError(validation.message || "Ошибка валидации");
      return;
    }

    hideError();

    return listener(e, form, input, validation.valid);
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

function getForm() {
  return form;
}

function getInput() {
  return input;
}

function resetForm() {
  if (input) {
    input.value = "";
    hideError();
  }
}

export const taskForm = {
  getForm,
  getInput,
  addEventListenerOnForm,
  resetForm,
  validateInput,
};
