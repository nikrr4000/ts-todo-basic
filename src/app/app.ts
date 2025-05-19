import "./styles";
import { createTaskListWidget } from "../widgets/task-list";
import { todoList } from "../features/todo-list";

export function initApp(): void {
  // Загружаем задачи при старте
  todoList.loadTasks();

  // Инициализируем виджет списка задач в контейнере
  createTaskListWidget(".todo-wrapper");
}
