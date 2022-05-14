import BaseComponent from "../baseComponent";
import styles from './news.module.scss';

export class Article extends BaseComponent {
  constructor({ title, description, urlToImage, url, source }) {
    super(`
      <article class="${styles.article}">
        <img class="${styles.image}" src="${urlToImage}" alt="${title}"/>
        <h2 class="${styles.title}">${title}</h2>
        <p class="${styles.description}">${description}</p>
        <a class="${styles.url}" href="${url}" target="_blank">Read more on ${source.name}</a>
      </article>
    `);
  }
}

export class LoadMoreButton extends BaseComponent {
  store;

  constructor(store) {
    super(`<button class="${styles.loadMoreButton}">Load more</button>`);

    this.store = store;

    this.element.addEventListener('click', this.store.loadNextPage.bind(this.store))
  }

  set isShown(value) {
    if (value) {
      this.element.classList.remove(styles.isHidden);

      return;
    }

    this.element.classList.add(styles.isHidden);
  }
}
