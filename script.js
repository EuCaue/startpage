const searchInput = document.querySelector("input[type='search']");
const dialog = document.querySelector("dialog");
const clock = document.querySelector("[data-clock]");
const date = document.querySelector("[data-date]");

const timeFormat = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});
const dateFormat = new Intl.DateTimeFormat(undefined, {
  weekday: "long",
  day: "numeric",
  month: "long",
});

function isTyping(element) {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element?.isContentEditable
  );
}

/**
 * @param {KeyboardEvent} event **KeyboardEvent**
 */
function handleKeydown(event) {
  const { key } = event;
  if (event.ctrlKey || event.metaKey || event.altKey) return;

  if (isTyping(document.activeElement)) {
    if (key === "Escape") {
      document.activeElement.blur();
    }
    return;
  }

  if (key === "Escape") {
    document.activeElement?.blur();
  }
  // preventDefault keeps the shortcut letter out of the input it just focused
  if ((key === "s" || key === "i") && !dialog.open) {
    event.preventDefault();
    searchInput.focus();
  }
  if (key === "?") {
    toggleHelpMenu();
  }
}

function toggleHelpMenu() {
  dialog.open ? dialog.close() : dialog.showModal();
}

function updateClock() {
  const now = new Date();
  clock.textContent = timeFormat.format(now);
  clock.dateTime = now.toISOString();
  date.textContent = dateFormat.format(now);
  // re-sync on the next minute boundary so the clock never lags
  setTimeout(updateClock, 60_000 - (now.getTime() % 60_000));
}

updateClock();
document.addEventListener("keydown", handleKeydown);
document
  .querySelector("[data-close-help]")
  .addEventListener("click", () => dialog.close());
// the backdrop counts as the dialog itself, so check the click lands outside its box
dialog.addEventListener("click", (event) => {
  const box = dialog.getBoundingClientRect();
  const outside =
    event.clientX < box.left ||
    event.clientX > box.right ||
    event.clientY < box.top ||
    event.clientY > box.bottom;
  if (outside) dialog.close();
});
