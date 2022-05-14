import BaseComponent from "../baseComponent";
import { createElement } from "../../util/templates";
import styles from "./search.module.scss";

class Search extends BaseComponent {
  store;
  input;
  button;

  constructor(store) {
    super(`<div class="${styles.wrapper}"></div>`);

    this.store = store;

    this.input = createElement(`<input type="text" class="${styles.input}" />`);
    this.element.append(this.input);
    this.input.addEventListener('keyup', this.filterNewsByQuery.bind(this))

    this.button = createElement(`<button class="${styles.button}">Search</button>`);
    this.element.append(this.button);
    this.button.addEventListener('click', this.filterNewsByQuery.bind(this))
  }

  filterNewsByQuery () {
    this.store.filterByQuery(this.input.value);
  }
}

export default Search;
