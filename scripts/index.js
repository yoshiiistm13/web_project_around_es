import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js"; // 👈 Nueva importación
import PopupWithForm from "./PopupWithForm.js"; // 👈 Nueva importación
import UserInfo from "./UserInfo.js"; // 👈 Nueva importación

const initialCards = [
  {
    name: "Valle de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montañas Calvas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional de la Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

// Configuración para validación
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "visible",
};

// Selectores del DOM
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

// --- 3. FUNCIÓN REFACTORIZADA PARA CREAR TARJETAS ---
function createCard(data) {
  // 💥 ¡SOLUCIÓN! Pasamos la función flecha como tercer parámetro conectando la tarjeta al popup
  const card = new Card(data, "#template__card", (name, link) => {
    imagePopupInstance.open(name, link);
  });
  return card.generateCard();
}

// Renderizar tarjetas iniciales
initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
});

// --- 4. INSTANCIAS DE POPUPWITHFORM ---

// Popup de Editar Perfil
const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  // formData contiene { name: "...", description: "..." } automáticamente de los inputs
  userInfo.setUserInfo(formData);
});
editProfilePopup.setEventListeners();

// Popup de Nuevo Lugar
const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  // formData contiene { "place-name": "...", link: "..." } automáticamente
  const name = formData["place-name"];
  const link = formData.link;

  cardsContainer.prepend(createCard({ name, link }));
});
newCardPopup.setEventListeners();

// --- 5. EVENTOS DE APERTURA ---

profileEditButton.addEventListener("click", () => {
  const currentUserData = userInfo.getUserInfo();

  // Rellenamos los campos de texto con los datos guardados en la clase UserInfo
  document.querySelector(".popup__input_type_name").value =
    currentUserData.name;
  document.querySelector(".popup__input_type_description").value =
    currentUserData.description;

  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

// --- 6. INSTANCIAR VALIDACIÓN ---
const editProfileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

editProfileValidator.setEventListeners();
addCardValidator.setEventListeners();
