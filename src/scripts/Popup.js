export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
  }

  open() {
    this._popupElement.classList.add("popup_opened"); // Recuerda configurar esta clase en tu CSS para dar visibilidad
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    // CORRECCIÓN: Usamos '.popup__close' que es la clase real en tu HTML
    const closeButton = this._popupElement.querySelector(".popup__close");

    closeButton.addEventListener("click", () => {
      this.close();
    });

    // Cierre al hacer clic en el fondo sombreado (overlay)
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target === this._popupElement) {
        this.close();
      }
    });
  }
}
