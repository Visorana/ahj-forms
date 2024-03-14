// Defines the Popover class responsible for managing the popover functionality.

export default class Popover {
  constructor(element) {
    this.buttonContainer = element;
    this.button = this.buttonContainer.querySelector(".pop-button");
  }

  init() {
    this.createPopover();
    this.button.addEventListener("click", this.togglePopover.bind(this));
  }

  createPopover() {
    const title = this.button.dataset.title;
    const content = this.button.dataset.content;
    this.popover = document.createElement("div");
    this.popover.classList.add("popover");
    this.popover.innerHTML = `
        <h3 class="popover-title">${title}</h3>
        <div class="popover-content">${content}</div>
        <div class="arrow"></div>
    `;
  }

  // Toggles the visibility of the popover.
  togglePopover() {
    if (this.buttonContainer.contains(this.popover)) {
      this.popover.remove();
      this.button.classList.remove("visible");
      return;
    }
    this.button.after(this.popover);
    this.button.classList.add("visible");
    this.positionPopover();
  }

  // Positions the popover relative to the button.
  positionPopover() {
    const buttonRect = this.button.getBoundingClientRect();
    const popoverRect = this.popover.getBoundingClientRect();

    const popoverLeft =
      buttonRect.left + buttonRect.width / 2 - popoverRect.width / 2;
    const popoverTop = buttonRect.top - popoverRect.height - 8;
    this.popover.style.left = `${popoverLeft}px`;
    this.popover.style.top = `${popoverTop}px`;

    const arrow = this.popover.querySelector(".arrow");
    const arrowLeft = popoverRect.width / 2 - arrow.offsetWidth / 2;
    arrow.style.left = `${arrowLeft}px`;
  }
}
