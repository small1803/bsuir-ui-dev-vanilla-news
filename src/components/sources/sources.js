import BaseComponent from "../baseComponent";
import { loadSources } from "./sources.service";
import styles from './sources.module.scss';
import {createElement} from "../../util/templates";
import Message from "../message/message";

class Source extends BaseComponent {
  id;
  store;
  constructor({ id, name }, store) {
    super(`
      <li class="${styles.source}">
        <input class="${styles.checkbox}" id="${id}" type="checkbox" name="source-${name}">
        <label class="source__label" for="${id}">${name}</label>
      </li>
    `);

    this.id = id;
    this.store = store;

    const checkbox = this.element.querySelector(`#${id}`);
    checkbox.addEventListener('change', this.onChangeHandler.bind(this))
  }

  onChangeHandler () {
    this.store.updateSources(this.id);
  }
}


class Menu extends BaseComponent {
  store;
  sources;
  sourcesContainer;

  constructor(store) {
    super(`
      <aside class="${styles.menu}">
        <h3 class="${styles.title}">Sources</h3>
      </aside>
    `);

    this.sourcesContainer = createElement(`<ul class="${styles.sources}"></ul>`)
    this.element.append(this.sourcesContainer);

    loadSources().then((sources) => {
      this.store = store;
      sources.forEach(source => new Source(source, this.store).render(this.sourcesContainer));
    }).catch(({ message }) => {
      const loadingFailed = new Message(message);
      loadingFailed.render(this.element);
    });
  }
}

export default Menu;

