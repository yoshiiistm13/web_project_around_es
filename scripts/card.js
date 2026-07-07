import { openModal } from "./utils.js";

export default class Card {
  constructor(data, cardSelector, handleCardClick, handleLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id; // ◄ Es vital guardar el ID que viene del servidor
    this._isLiked = data.isLiked; // ◄ Guardamos el estado inicial del like
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick; // ◄ Guardamos el callback de la API
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    // Cambiamos esto para enviar el ID, el estado actual y la propia instancia (this)
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked, this);
    });

    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteCard(),
    );

    this._cardImage.addEventListener("click", () => {
      console.log("¡Clic en la imagen detectado!", this._name, this._link);
      this._handleCardClick(this._name, this._link);
    });
  }

  // 1. Método público que actualiza el estado lógico y visual del corazón
  updateLikes(newIsLiked) {
    this._isLiked = newIsLiked;
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      this._likeButton.classList.remove("card__like-button_is-active");
    }
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    // 2. Si el servidor dice que ya tiene like al cargar la página, la pintamos activa
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    }

    this._setEventListeners();

    return this._element;
  }

  _handleDeleteCard() {
    this._element.remove();
    this._element = null; // Limpieza de referencia
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".card__image");
    this._cardTitle = this._element.querySelector(".card__title");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._element;
  }
}
