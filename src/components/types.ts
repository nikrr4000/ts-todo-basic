export type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

export type DOMElementEvent<
  T extends HTMLElement,
  K extends keyof HTMLElementEventMap
> = (event: HTMLElementEventMap[K], element: T) => void | Promise<void>;

// Специализированные типы
export type ButtonEvent<K extends keyof HTMLElementEventMap = "click"> =
  DOMElementEvent<HTMLButtonElement, K>;

export type InputEvent<K extends keyof HTMLElementEventMap = "input"> =
  DOMElementEvent<HTMLInputElement, K>;

export type FormEvent<K extends keyof HTMLElementEventMap = "submit"> =
  DOMElementEvent<HTMLFormElement, K>;
