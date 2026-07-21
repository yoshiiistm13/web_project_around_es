// PopupWithForm.js
import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._inputList = this._formElement.querySelectorAll(".popup__input");
    // Capturamos el botón de submit del formulario
    this._submitButton = this._formElement.querySelector(".popup__button");
    this._submitButtonText = this._submitButton.textContent;
  }

  // Método para cambiar el texto del botón durante la carga
  renderLoading(isLoading, loadingText = "Guardando...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  open(values = null) {
    if (values) {
      this._inputList.forEach((input) => {
        if (values[input.name] !== undefined) {
          input.value = values[input.name];
        }
      });
    }
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      // Eliminamos this.close() de aquí para cerrarlo solo cuando el servidor responda con éxito
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
