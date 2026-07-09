import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

import { validationConfig } from "./constants.js";
import Api from "./Api.js";

import PopupWithConfirmation from "./PopupWithConfirmation.js"; // 1. Importas

// 2. Instancias abajo de tus otras constantes
const confirmationPopup = new PopupWithConfirmation("#PopupWithConfirmation");
confirmationPopup.setEventListeners();

const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "152fec0f-114b-49eb-9f24-3dfeca016e9c",
    "Content-Type": "application/json",
  },
});

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

// Metodo 1. Cargar la información del usuario desde el servidor al iniciar
api
  .getUserInfo()
  .then((userData) => {
    console.log("¡Datos del usuario recibidos!", userData);
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });
  })
  .catch((err) => console.error("Error en usuario:", err));

// Metodo 2. Cargar las tarjetas desde el servidor
api
  .getUserCard()
  .then((cardsData) => {
    console.log("Tarjetas recibidas desde el servidor:", cardsData);

    // Recorremos las tarjetas guardadas en el servidor e inyectamos
    cardsData.forEach((item) => {
      cardsContainer.append(createCard(item));
    });
  })
  .catch((err) => {
    console.error(
      "Error al cargar las tarjetas iniciales desde el servidor:",
      err,
    );
  });

// --- 2. INSTANCIA DEL POPUP DE IMAGEN ---
const imagePopupInstance = new PopupWithImage("#image-popup");
imagePopupInstance.setEventListeners();

// --- 3. FUNCIÓN PARA GENERAR TARJETAS (CON LOGICA DE LIKE Y BORRADO INCLUIDA) ---
function createCard(data) {
  const card = new Card(
    data,
    "#template__card",
    (name, link) => {
      imagePopupInstance.open(name, link);
    },
    (cardId, isLiked, cardInstance) => {
      api
        .changeLikeStatus(cardId, isLiked)
        .then((updatedCardData) => {
          cardInstance.updateLikes(updatedCardData.isLiked);
        })
        .catch((err) => console.error("Error al actualizar el like:", err));
    },
    (cardId, cardInstance) => {
      // ◄ ¡CORREGIDO! Agregamos el 5to parámetro
      console.log(
        "¡Click en papelera detectado en index.js para la tarjeta con ID:",
        cardId,
      );

      // Pasamos la acción al robot de confirmación
      confirmationPopup.setAction(() => {
        cardInstance.removeCardFromDOM();
        confirmationPopup.close();
      });

      // Abrimos el popup visualmente
      confirmationPopup.open();
    },
  );
  return card.generateCard();
}

// --- 4. INSTANCIAS DE POPUPWITHFORM ---

// Popup para Editar Perfil
const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  console.log("Paso 1: Datos que salieron del formulario:", formData);

  api
    .editUserProfile({
      name: formData.name,
      about: formData.description,
    })
    .then((result) => {
      console.log(
        "Paso 2: ¡El servidor respondió con éxito! Datos devueltos:",
        result,
      );
      userInfo.setUserInfo({
        name: result.name,
        description: result.about,
      });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.log(
        "Paso 3: El código falló y saltó al CATCH. El error es:",
        err,
      );
    });
});
editProfilePopup.setEventListeners();

// Popup para Agregar Nuevo Lugar (Ejercicio 4)
const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  api
    .addNewCard({
      name: formData["place-name"],
      link: formData.link,
    })
    .then((newCardData) => {
      cardsContainer.prepend(createCard(newCardData));
      newCardPopup.close();
    })
    .catch((err) => {
      console.error("Error al añadir la nueva tarjeta al servidor:", err);
    });
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
  document.querySelector(".popup__input_type_name").value =
    currentUserData.name;
  document.querySelector(".popup__input_type_description").value =
    currentUserData.description;
  editProfilePopup.open();
});

addCardButton.addEventListener("click", () => {
  newCardPopup.open();
});
