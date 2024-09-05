const searchInput = document.querySelector("input[type='search']");

/**
 * @param {KeyboardEvent} event **KeyboardEvent**
 */
function handleKeypress(event) {
  const { key } = event;
  if (document.activeElement === searchInput) {
    if (key === "Escape") {
      searchInput.blur();
    }
    return;
  }

  if (key === "Escape") {
    document.activeElement.blur();
  }
  if (key === "s" || key === "i") {
    searchInput.focus();
  }
  if (key === "?") {
    toggleHelpMenu();
  }
}

function toggleHelpMenu() {
  const dialog = document.querySelector("dialog");
  dialog.open ? dialog.close() : dialog.showModal();
}

window.document.addEventListener("DOMContentLoaded", () => {
  window.document.addEventListener("keyup", handleKeypress);
});
