/**
 * Filters the todos based on the selected option.
 */

export function filterTodos(todos, selectedOption) {
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
