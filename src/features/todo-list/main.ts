import { task, taskForm, taskList } from "../../storage/components";

function initializeForm() {
  taskForm.addEventListenerOnForm("submit", (e, _, input) => {
    if (input.value === "") return;

    const taskEntity = task.create(input.value);
    taskList.appendListChild(taskEntity);
    input.value = "";
  });
}

export const todo = { initializeForm };
