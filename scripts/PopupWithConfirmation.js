import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // Guardamos la referencia al botón "Sí" de tu HTML
    this._confirmButton = this._popupElement.querySelector(".popup__button");
  }

  // Almacena la función que viene desde index.js (el fetch de eliminación)
  setAction(callback) {
    this._handleConfirmation = callback;
  }

  // Activa los oyentes de eventos para este popup
  setEventListeners() {
    super.setEventListeners(); // Mantiene el cierre con la 'X', la tecla Esc o clic fuera

    // Cuando el usuario hace clic en el botón "Sí":
    this._confirmButton.addEventListener("click", () => {
      if (this._handleConfirmation) {
        this._handleConfirmation(); // Ejecuta la función que guardamos en la mochila
      }
    });
  }
}
