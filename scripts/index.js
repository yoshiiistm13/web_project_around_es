import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

// Importamos únicamente los datos puros desde el archivo de constantes
import { initialCards, validationConfig } from "./constants.js";

// --- SELECTORES DEL DOM ---
const cardsContainer = document.querySelector(".cards__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profileForm = document.querySelector("#edit-profile-form");
const addCardForm = document.querySelector("#new-card-form");

// --- 1. INSTANCIA DE USERINFO ---
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// --- 2. INSTANCIA DEL POPUP DE IMAGEN ---
const imagePopupInstance = new PopupWithImage("#image-popup");
imagePopupInstance.setEventListeners();

// --- 3. FUNCIÓN PARA GENERAR TARJETAS ---
function createCard(data) {
  const card = new Card(data, "#template__card", (name, link) => {
    imagePopupInstance.open(name, link);
  });
  return card.generateCard();
}

// Renderizado inicial mediante el recorrido de los datos importados
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
});

// --- 4. INSTANCIAS DE POPUPWITHFORM ---

// Popup para Editar Perfil
const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  userInfo.setUserInfo(formData);
});
editProfilePopup.setEventListeners();

// Popup para Agregar Nuevo Lugar
const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  const name = formData["place-name"];
  const link = formData.link;
  cardsContainer.prepend(createCard({ name, link }));
});
newCardPopup.setEventListeners();

// --- 5. INSTANCIAS DE VALIDACIÓN ---
const editProfileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

editProfileValidator.setEventListeners();
addCardValidator.setEventListeners();

// --- 6. DETECTORES DE EVENTOS DE APERTURA ---

profileEditButton.addEventListener("click", () => {
  const currentUserData = userInfo.getUserInfo();

  // Cargamos los valores vigentes del perfil en los inputs antes de mostrar el formulario
  document.querySelector(".popup__input_type_name").value =
    currentUserData.name;
  document.querySelector(".popup__input_type_description").value =
    currentUserData.description;

  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  newCardPopup.open();
});
