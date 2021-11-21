export class LoadMoreBtn {
  constructor({ selector }) {
    this.button = document.querySelector(selector);
    this.label = document.querySelector('.label');
    this.spinner = document.querySelector('.spinner');
  }

  enable() {
    this.button.disabled = false;
    this.label.textContent = 'Load more';
    this.spinner.classList.add('is-hidden');
  }

  disable() {
    this.button.disabled = true;
    this.label.textContent = 'Loading...';
    this.spinner.classList.remove('is-hidden');
  }

  show() {
    this.button.classList.remove('is-hidden');
  }

  hide() {
    this.button.classList.add('is-hidden');
  }
}