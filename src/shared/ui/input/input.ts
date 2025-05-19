import "./input.css";

type InputOptions = {
  placeholder?: string;
  type?: string;
  value?: string;
  className?: string;
  maxLength?: number;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
  onEscape?: () => void;
  showCharCount?: boolean;
  validator?: (value: string) => { valid: boolean; message?: string };
};

function createInput(options: InputOptions = {}): {
  container: HTMLDivElement;
  input: HTMLInputElement;
  setError: (message?: string) => void;
  clearError: () => void;
} {
  const container = document.createElement("div");
  container.classList.add("ui-input-container");

  const input = document.createElement("input");
  input.classList.add("ui-input");

  if (options.className) {
    input.classList.add(options.className);
  }

  input.type = options.type || "text";

  if (options.placeholder) {
    input.placeholder = options.placeholder;
  }

  if (options.value) {
    input.value = options.value;
  }

  if (options.maxLength) {
    input.maxLength = options.maxLength;
  }

  container.appendChild(input);

  let errorElement: HTMLDivElement | null = null;
  let charCountElement: HTMLDivElement | null = null;

  if (options.showCharCount && options.maxLength) {
    charCountElement = document.createElement("div");
    charCountElement.classList.add("char-counter");
    charCountElement.textContent = `${input.value.length}/${options.maxLength}`;
    container.appendChild(charCountElement);

    input.addEventListener("input", () => {
      if (charCountElement) {
        charCountElement.textContent = `${input.value.length}/${options.maxLength}`;

        if (options.maxLength && input.value.length > options.maxLength * 0.8) {
          charCountElement.style.color = "#ff3b30";
        } else {
          charCountElement.style.color = "#666";
        }
      }
    });
  }

  function setError(message?: string): void {
    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.classList.add("ui-input-error");
      container.appendChild(errorElement);
    }

    if (message) {
      errorElement.textContent = message;
      errorElement.style.display = "block";
      input.classList.add("error");
    } else {
      clearError();
    }
  }

  function clearError(): void {
    if (errorElement) {
      errorElement.style.display = "none";
      input.classList.remove("error");
    }
  }

  if (options.onChange) {
    input.addEventListener("input", () => {
      options.onChange!(input.value);

      if (options.validator) {
        const validationResult = options.validator(input.value);
        if (!validationResult.valid) {
          setError(validationResult.message);
        } else {
          clearError();
        }
      }
    });
  }

  if (options.onEnter || options.onEscape) {
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && options.onEnter) {
        e.preventDefault();
        options.onEnter(input.value);
      } else if (e.key === "Escape" && options.onEscape) {
        e.preventDefault();
        options.onEscape();
      }
    });
  }

  return {
    container,
    input,
    setError,
    clearError,
  };
}

export const Input = {
  create: createInput,
};
