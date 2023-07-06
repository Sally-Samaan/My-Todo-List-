import { createTodoElement } from "./todoElement.js";
import { saveLocalTodos } from "../utils/localStorage.js";

/**
 * Handles the add todo action.
 * @param {string} todoText - The text content of the todo.
 */
export function addTodo(todoText, todoList, todoInput) {
  const todoDiv = createTodoElement(todoText);
  todoList.appendChild(todoDiv);
  saveLocalTodos(todoText);

  todoInput.value = "";
}
