import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import {
  openModal,
  closeModal,
  setOverlayCloseEventListeners,
} from "./utils.js";

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
  inactiveButtonClass: "button_inactive", // <--- DEBE SER IGUAL AL CSS
  inputErrorClass: "popup__input_type_error",
  errorClass: "visible",
};

// Selectores
const cardsContainer = document.querySelector(".cards__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const profilePopup = document.querySelector("#edit-popup");
const addCardPopup = document.querySelector("#new-card-popup");
const profileForm = document.querySelector("#edit-profile-form");
const addCardForm = document.querySelector("#new-card-form");

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// --- Instanciar Validación ---
const editProfileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

editProfileValidator.setEventListeners();
addCardValidator.setEventListeners();

// --- Manejo de Tarjetas ---
function createCard(data) {
  const card = new Card(data, "#template__card");
  return card.generateCard();
}

initialCards.forEach((item) => {
  cardsContainer.append(createCard(item));
});

// --- Manejadores de Formularios ---
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const name = addCardForm.querySelector(".popup__input_type_card-name").value;
  const link = addCardForm.querySelector(".popup__input_type_url").value;

  cardsContainer.prepend(createCard({ name, link }));
  addCardForm.reset();
  closeModal(addCardPopup);
}

// --- Eventos ---
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

addCardButton.addEventListener("click", () => openModal(addCardPopup));

profileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleCardFormSubmit);

// Iniciar cierres globales
setOverlayCloseEventListeners();
