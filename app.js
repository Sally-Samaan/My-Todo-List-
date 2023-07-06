import createButton from "./components/button.js";
import { filterTodos } from "./components/filter.js";
import {
  saveLocalTodos,
  removeLocalTodos,
  updateTodoState,
} from "./utils/localStorage.js";

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
 * Creates a new todo element.
 * @param {string} text - The text content of the todo.
 * @returns {HTMLDivElement} - The created todo element.
 */

function createTodoElement(text) {
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
    editTodo(todo);
  }
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

/**
 * Edits the text of the todo.
 * @param {HTMLDivElement} todo - The todo element.
 */

function editTodo(todo) {
  const todoText = todo.querySelector(".todo-item").innerText;
  todoInput.value = todoText;
  todoInput.dataset.todoId = todoText;

  removeLocalTodos(todo);
  todo.remove();
}
