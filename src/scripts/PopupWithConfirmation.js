// PopupWithConfirmation.js
import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // Seleccionamos todos los botones dentro del contenido del popup
    this._buttons = this._popupElement.querySelectorAll(".popup__button");
    this._confirmButton = this._buttons[0]; // Botón "Sí"
    this._cancelButton = this._buttons[1]; // Botón "No"
  }

  setAction(action) {
    this._handleConfirm = action;
  }

  setEventListeners() {
    super.setEventListeners();

    // Listener para el botón "Sí"
    this._confirmButton.addEventListener("click", () => {
      if (this._handleConfirm) {
        this._handleConfirm();
      }
    });

    // Listener para el botón "No": Cierra el popup inmediatamente
    if (this._cancelButton) {
      this._cancelButton.addEventListener("click", () => {
        this.close();
      });
    }
  }
}
