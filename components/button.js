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

export default createButton;
