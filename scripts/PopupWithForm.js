import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._formElement = this._popupElement.querySelector(".popup__form");
    this._inputList = this._formElement.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  open(values = null) {
    // Si pasamos datos (como los de UserInfo), rellenamos los inputs automáticamente
    if (values) {
      this._inputList.forEach((input) => {
        if (values[input.name] !== undefined) {
          input.value = values[input.name];
        }
      });
    }
    // Llamamos al open de la clase padre (Popup.js) para mostrar la ventana en la pantalla
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._formElement.reset();
  }
}
