import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

import { validationConfig } from "./constants.js";
import Api from "./Api.js";

import PopupWithConfirmation from "./PopupWithConfirmation.js";

// --- INSTANCIA DEL POPUP DE CONFIRMACIÓN ---
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

// --- INSTANCIA DE USERINFO ---
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

// --- VARIABLE GLOBAL PARA EL ID DE USUARIO ---
let userId = null;

// --- CARGA EN CADENA ESTÁNDAR (Método 1 y Método 2 anidados) ---
api
  .getUserInfo()
  .then((userData) => {
    console.log("¡Datos del usuario recibidos!", userData);

    // 1. Guardamos tu ID único de usuario de forma global
    userId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });

    // 2. Ahora que ya tenemos el userId, cargamos de forma segura las tarjetas del servidor
    return api.getUserCard();
  })
  .then((cardsData) => {
    console.log("Tarjetas recibidas desde el servidor:", cardsData);

    // 3. Renderizamos las tarjetas sabiendo ya quién es el usuario actual
    cardsData.forEach((item) => {
      cardsContainer.append(createCard(item));
    });
  })
  .catch((err) => {
    console.error(
      "Error al cargar los datos iniciales desde el servidor:",
      err,
    );
  });

// --- INSTANCIA DEL POPUP DE IMAGEN ---
const imagePopupInstance = new PopupWithImage("#image-popup");
imagePopupInstance.setEventListeners();

// --- FUNCIÓN PARA GENERAR TARJETAS ---
function createCard(data) {
  // Combinamos los datos originales con las IDs de control de autoría
  const cardData = {
    ...data,
    currentUserId: userId,
    ownerId: data.owner?._id || data.owner,
  };

  const card = new Card(
    cardData,
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
      console.log(
        "¡Click en papelera detectado para la tarjeta con ID:",
        cardId,
      );

      // Seteamos la acción en el popup de confirmación
      confirmationPopup.setAction(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            cardInstance.removeCardFromDOM();
            confirmationPopup.close();
            console.log(`Tarjeta ${cardId} eliminada permanentemente.`);
          })
          .catch((err) => console.error("No se pudo borrar la tarjeta:", err));
      });

      confirmationPopup.open();
    },
  );
  return card.generateCard();
}

// --- POPUP PARA EDITAR PERFIL ---
const editProfilePopup = new PopupWithForm("#edit-popup", (formData) => {
  api
    .editUserProfile({
      name: formData.name,
      about: formData.description,
    })
    .then((result) => {
      userInfo.setUserInfo({
        name: result.name,
        description: result.about,
      });
      editProfilePopup.close();
    })
    .catch((err) => console.error("Error al editar el perfil:", err));
});
editProfilePopup.setEventListeners();

// --- POPUP PARA AGREGAR NUEVO LUGAR ---
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
    .catch((err) => console.error("Error al añadir la nueva tarjeta:", err));
});
newCardPopup.setEventListeners();

// --- VALIDACIONES DE FORMULARIOS ---
const editProfileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);

editProfileValidator.setEventListeners();
addCardValidator.setEventListeners();

// --- EVENTOS DE APERTURA ---
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
