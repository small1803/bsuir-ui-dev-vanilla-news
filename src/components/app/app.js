import BaseComponent from "../baseComponent";
import Menu from "../sources/sources";
import { Article, LoadMoreButton } from "../news/news";
import Store from "../../store";
import Search from "../search/search";
import { createElement } from "../../util/templates";
import { loadNews } from "../news/news.service";
import styles from "./app.module.scss";
import Message from "../message/message";

class App extends BaseComponent {
  store;
  header;
  container;
  content;
  newsContainer;
  articles = [];
  loadMoreButton;
  loadingFailed;
  noItemsMessage;

  constructor() {
    super(`<div class="${styles.wrapper}"></div>`);

    this.store = new Store();
    this.store.updateCallback = this.updateNews.bind(this);

    this.header = createElement(`
      <header class="${styles.header}">
        <h1 class="${styles.headline}">News API</h1>
      </header>
    `);
    this.element.append(this.header);

    const search = new Search(this.store);
    search.render(this.header);

    this.container = createElement(`<div class="${styles.container}"></div>`);
    this.element.append(this.container);

    const menu = new Menu(this.store);
    menu.render(this.container);

    this.content = createElement(`<main class="${styles.content}"></main>`);
    this.container.append(this.content);

    this.newsContainer = createElement(`<div class="${styles.newsContainer}"></div>`);
    this.content.append(this.newsContainer);

    this.loadMoreButton = new LoadMoreButton(this.store);
    this.loadMoreButton.render(this.content);

    this.updateNews();
  }

  async updateNews() {
    const { articles, totalResults, isFailed, message } = await loadNews(this.store);

    if (isFailed) {
      if (this.loadingFailed) {
        return;
      }

      this.loadingFailed = new Message(message);
      this.loadingFailed.append(this.content);
      this.loadMoreButton.isShown = false;

      return;
    }


    if (!articles || !articles.length) {
      if (this.noItemsMessage) {
        return;
      }

      this.noItemsMessage = new Message('There are no articles matching your request.');
      this.noItemsMessage.render(this.content);
      this.loadMoreButton.isShown = false;

      return;
    }

    const { page, pageSize } = this.store.state;

    if (page === 1) {
      this.newsContainer.innerHTML = '';
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      this.articles = [];
    }

    const newArticles = articles.map((article) => new Article(article));
    this.articles.push(...newArticles);
    newArticles.forEach((article) => article.render(this.newsContainer));

    this.loadMoreButton.isShown = (page * pageSize) < Math.min(40, totalResults);
  }
}

export default App;
