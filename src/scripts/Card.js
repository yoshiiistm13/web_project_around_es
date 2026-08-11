import { openModal } from "./utils.js";

export default class Card {
  constructor(
    data,
    cardSelector,
    handleCardClick,
    handleLikeClick,
    handleDeleteClick, // ◄ Guardamos la función correctamente
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    // Envía el ID, el estado actual y la propia instancia (this)
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this._isLiked, this);
    });

    // ◄ CORREGIDO: Ahora le avisa a index.js pasándole su ID y su propia instancia
    this._deleteButton.addEventListener("click", () => {
      if (this._handleDeleteClick) {
        this._handleDeleteClick(this._id, this);
      }
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  // Método público que actualiza el estado lógico y visual del corazón
  updateLikes(newIsLiked) {
    this._isLiked = newIsLiked;
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    } else {
      if (this._likeButton) {
        this._likeButton.classList.remove("card__like-button_is-active");
      }
    }
  }

  // ◄ CORREGIDO: Agregamos el método público para que index.js lo borre tras confirmación de la API
  removeCardFromDOM() {
    if (this._element) {
      this._element.remove();
      this._element = null; // Limpieza de referencia
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

    // Si el servidor dice que ya tiene like al cargar la página, la pintamos activa
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_is-active");
    }

    this._setEventListeners();

    return this._element;
  }
}
