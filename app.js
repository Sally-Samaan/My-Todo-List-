import { filterTodos } from "./components/filter.js";
import { createTodoElement } from "./components/todoElement.js";
import { handleTodoActions } from "./components/todoActions.js";
import { saveLocalTodos, removeLocalTodos } from "./utils/localStorage.js";
import { displayTodos } from "./components/todoList.js";
import { editTodo } from "./components/editTodo.js";

// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

// Functions

/**
 * Adds a new todo to the list.
 */
function addTodo() {
  event.preventDefault();
  const todoText = todoInput.value;

  if (todoText.trim() === "") {
    return;
  }

  const todoDiv = createTodoElement(todoText);
  todoList.appendChild(todoDiv);
  saveLocalTodos(todoText);

  todoInput.value = "";
}

/**
 * Handles the delete, complete, and edit actions for a todo.
 * @param {Event} event - The click event object.
 */
function deleteCheck(event) {
  handleTodoActions(event, todoInput);
}

/**
 * Filters the todos based on the selected option.
 */
function filterTodo() {
  const todos = Array.from(todoList.childNodes);
  const selectedOption = filterOption.value;

  filterTodos(todos, selectedOption);
}

/**
 * Retrieves todos from local storage and displays them.
 */
function getTodos() {
  displayTodos(todoList);
}

/**
 * Handles the edit action for a todo.
 * @param {HTMLDivElement} todo - The todo element.
 */
function handleEdit(todo) {
  editTodo(todo, todoInput);
}
