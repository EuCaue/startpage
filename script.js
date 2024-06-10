const searchInput = document.querySelector("input[type='search']");

/**
 * @param {KeyboardEvent} event **KeyboardEvent**
 */
function handleKeypress(event) {
  const { key, keyCode } = event;
  if (document.activeElement === searchInput) {
    if (key === "Escape" || keyCode === 27) {
      searchInput.blur();
    }
    return;
  }

  if (key === "Escape" || keyCode === 27) {
    document.activeElement.blur();
  }
  if (key === "s" || key === "i" || keyCode === 83 || keyCode === 73) {
    searchInput.focus();
  }
  if (key === "?" || keyCode === 191) {
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
