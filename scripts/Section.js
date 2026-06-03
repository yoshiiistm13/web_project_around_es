class Section {
  constructor(
    { items: initialCards, renderer: renderCards },
    containerSelector,
  ) {
    this._items = initialCards;
    this._renderer = renderCards;
    this._container = document.querySelector(containerSelector); // Buscará '.cards__list'
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
