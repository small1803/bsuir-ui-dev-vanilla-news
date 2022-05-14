import { createElement } from '../util/templates';

class BaseComponent {
  element;

  constructor(templateString) {
    this.element = createElement(templateString);
  }

  render(container) {
    container.append(this.element);
  }
}

export default BaseComponent;
