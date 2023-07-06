import createButton from "./button.js";

/**
 * Creates a new todo element.
 * @param {string} text - The text content of the todo.
 * @returns {HTMLDivElement} - The created todo element.
 */

export function createTodoElement(text) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = text;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  const editButton = createButton("edit", "fa-pen");
  const completedButton = createButton("complete", "fa-check");
  const trashButton = createButton("delete", "fa-square-minus");

  todoDiv.append(editButton, completedButton, trashButton);
  return todoDiv;
}
