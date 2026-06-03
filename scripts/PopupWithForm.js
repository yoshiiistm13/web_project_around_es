import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  // 1. El constructor recibe el selector del popup y la función callback de envío
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector); // Llama al constructor de la clase padre (Popup)
    this._handleFormSubmit = handleFormSubmit;

    // Seleccionamos el formulario dentro de este popup
    this._formElement = this._popupElement.querySelector(".popup__form");

    // Guardamos todos los inputs que tengan la clase común en una lista
    this._inputList = this._formElement.querySelectorAll(".popup__input");
  }

  // 2. Método privado que recopila los datos de todos los campos de entrada
  _getInputValues() {
    this._formValues = {}; // Creamos el objeto contenedor vacío

    // Recorremos cada input y guardamos su valor usando su atributo 'name'
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });

    // Devolvemos el objeto lleno con la información
    return this._formValues;
  }

  // 3. Modifica el método padre setEventListeners()
  setEventListeners() {
    super.setEventListeners(); // Agrega el detector de click en el icono X y en el fondo (overlay)

    // Agrega el controlador de eventos submit al formulario
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // Evita que la página se recargue

      // Pasa los datos recolectados al callback que maneja el envío
      this._handleFormSubmit(this._getInputValues());

      this.close(); // Cierra el popup automáticamente
    });
  }

  // 4. Modifica el método padre close() para reiniciar el formulario
  close() {
    super.close(); // Ejecuta el cierre de la clase padre
    this._formElement.reset(); // Reinicia todos los campos de texto
  }
}
