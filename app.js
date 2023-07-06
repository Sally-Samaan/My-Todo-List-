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
 * Creates a button element for the todo.
 * @param {string} action - The action associated with the button.
 * @param {string} icon - The class name for the button's icon.
 * @returns {HTMLButtonElement} - The created button element.
 */

function createButton(action, icon) {
  const button = document.createElement("button");
  button.innerHTML = `<i class="fa-solid ${icon}"></i>`;
  button.classList.add(`${action}-btn`);
  button.setAttribute("data-action", action);
  return button;
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

  todos.forEach((todo) => {
    switch (selectedOption) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        todo.style.display = todo.classList.contains("completed")
          ? "flex"
          : "none";
        break;
      case "uncompleted":
        todo.style.display = !todo.classList.contains("completed")
          ? "flex"
          : "none";
        break;
    }
  });
}

/**
 * Saves the todo to the local storage.
 * @param {string} todoText - The text content of the todo.
 */

function saveLocalTodos(todoText) {
  let todos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  todos.push({ text: todoText, completed: false });
  localStorage.setItem("todos", JSON.stringify(todos));
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
 * Updates the state of the todo (completed or not) in local storage.
 * @param {HTMLDivElement} todo - The todo element.
 */

function updateTodoState(todo) {
  const todoText = todo.querySelector(".todo-item").innerText;
  let todos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  todos.forEach((todoItem) => {
    if (todoItem.text === todoText) {
      todoItem.completed = todo.classList.contains("completed");
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
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

/**
 * Removes the todo from local storage.
 * @param {HTMLDivElement} todo - The todo element.
 */

function removeLocalTodos(todo) {
  const todoText = todo.querySelector(".todo-item").innerText;
  let todos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  todos = todos.filter((todoItem) => todoItem.text !== todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
}
