import { removeLocalTodos, updateTodoState } from "../utils/localStorage.js";
import { editTodo } from "./editTodo.js";

export function handleTodoActions(event, todoInput) {
  const item = event.target;
  const todo = item.parentElement;
  const action = item.dataset.action;

  if (action === "delete") {
    removeLocalTodos(todo);
    todo.remove();
  }

  if (action === "complete") {
    todo.classList.toggle("completed");
    updateTodoState(todo);
  }

  if (action === "edit") {
    editTodo(todo, todoInput);
  }
}
