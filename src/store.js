class Store {

  #state;
  #updateCallback

  constructor() {
    this.state = {
      pageSize: 5,
      page: 1,
      sources: [],
      q: '',
    };
  }

  get state() {
    return this.#state;
  }

  set state(state) {
    this.#state = Object.assign({}, this.state, state);

    this.#updateCallback && this.#updateCallback();
  }

  set updateCallback(updateCallback) {
    this.#updateCallback = updateCallback;
  }

  loadNextPage () {
    this.state = ({ page: this.state.page + 1 });
  }

  updateSources (source) {
    const sources = [...this.state.sources];
    const sourceIndex = sources.indexOf(source);
    if (sourceIndex !== -1) {
      sources.splice(sourceIndex, 1);
    } else {
      sources.push(source);
    }

    this.state = ({ page: 1, sources });
  }

  filterByQuery (q) {
    this.state = ({ page: 1, q });
  }
}

export default Store;
