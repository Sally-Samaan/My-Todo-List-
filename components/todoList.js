import { createTodoElement } from "./todoElement.js";

export function displayTodos(todoList) {
  let todos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  todos.forEach((todo) => {
    const todoDiv = createTodoElement(todo.text);
    if (todo.completed) {
      todoDiv.classList.add("completed");
    }
    todoList.appendChild(todoDiv);
  });
}
