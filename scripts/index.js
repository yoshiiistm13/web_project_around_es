import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal } from "./utils.js";

// ... aquí pones el initialCards, validationConfig,
// y las funciones handleProfileFormSubmit y handleCardFormSubmit que ya tenías ...

// CREAR INSTANCIAS DE VALIDACIÓN
const editFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-profile-form"),
);
const addFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#new-card-form"),
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// CREAR INSTANCIAS DE CARD
function handleImageClick(name, link) {
  // Lógica de zoom aquí
  openModal(imagePopup);
}

initialCards.forEach((data) => {
  const card = new Card(data, "#template__card", handleImageClick);
  document.querySelector(".cards__list").append(card.generateCard());
});
