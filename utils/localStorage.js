/**
 * Saves the todo to the local storage.
 * @param {string} todoText - The text content of the todo.
 */

export function saveLocalTodos(todoText) {
  let todos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];
  todos.push({ text: todoText, completed: false });
  localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * Removes the todo from local storage.
 * @param {HTMLDivElement} todo - The todo element.
 */
export function removeLocalTodos(todo) {
  const todoText = todo.querySelector(".todo-item").innerText;
  let todos = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  todos = todos.filter((todoItem) => todoItem.text !== todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * Updates the state of the todo (completed or not) in local storage.
 * @param {HTMLDivElement} todo - The todo element.
 */
export function updateTodoState(todo) {
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
