import { removeLocalTodos } from "../utils/localStorage.js";

/**
 * Edits the text of the todo.
 * @param {HTMLDivElement} todo - The todo element.
 * @param {HTMLInputElement} todoInput - The todo input element.
 */
export function editTodo(todo, todoInput) {
  const todoText = todo.querySelector(".todo-item").innerText;
  todoInput.value = todoText;
  todoInput.dataset.todoId = todoText;

  removeLocalTodos(todo);
  todo.remove();
}
