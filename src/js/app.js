// Initializes the Popover class and sets up event listener.

import Popover from "./popover";

document.addEventListener("DOMContentLoaded", () => {
  const buttonContainer = new Popover(document.querySelector(".button-container"));
  buttonContainer.init();
});
