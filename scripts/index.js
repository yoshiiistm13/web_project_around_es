// scripts/index.js

import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import { validationConfig } from "./constants.js";

// --- INSTANCIA DE API ---
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
const avatarContainer = document.querySelector(".profile__avatar-container");

const profileForm = document.querySelector("#edit-profile-form");
const addCardForm = document.querySelector("#new-card-form");
const avatarForm = document.querySelector("#avatar-form");

// --- INSTANCIA DE POPUP DE CONFIRMACIÓN ---
const confirmationPopup = new PopupWithConfirmation("#PopupWithConfirmation");
confirmationPopup.setEventListeners();

// --- INSTANCIA DE USERINFO ---
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  avatarSelector: ".profile__image",
});

// --- VARIABLE GLOBAL PARA EL ID DE USUARIO ---
let userId = null;

// --- CARGA DE DATOS INICIALES DEL SERVIDOR ---
api
  .getUserInfo()
  .then((userData) => {
    console.log("¡Datos del usuario recibidos!", userData);

    userId = userData._id;

    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
      avatar: userData.avatar,
    });

    return api.getUserCard();
  })
  .then((cardsData) => {
    console.log("Tarjetas recibidas desde el servidor:", cardsData);

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
  editProfilePopup.renderLoading(true); // Muestra "Guardando..."

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
    .catch((err) => console.error("Error al editar el perfil:", err))
    .finally(() => {
      editProfilePopup.renderLoading(false); // Restaura a "Guardar"
    });
});
editProfilePopup.setEventListeners();

// --- POPUP PARA AGREGAR NUEVO LUGAR ---
const newCardPopup = new PopupWithForm("#new-card-popup", (formData) => {
  newCardPopup.renderLoading(true); // Muestra "Guardando..."

  api
    .addNewCard({
      name: formData["place-name"],
      link: formData.link,
    })
    .then((newCardData) => {
      cardsContainer.prepend(createCard(newCardData));
      newCardPopup.close();
    })
    .catch((err) => console.error("Error al añadir la nueva tarjeta:", err))
    .finally(() => {
      newCardPopup.renderLoading(false); // Restaura a "Crear"
    });
});
newCardPopup.setEventListeners();

// --- POPUP PARA CAMBIAR FOTO DE PERFIL (AVATAR) ---
const avatarPopup = new PopupWithForm("#avatar-popup", (formData) => {
  avatarPopup.renderLoading(true); // Muestra "Guardando..."

  api
    .updateAvatar(formData.avatar)
    .then((updatedUserData) => {
      userInfo.setUserInfo({ avatar: updatedUserData.avatar });
      avatarPopup.close();
    })
    .catch((err) => console.error("Error al actualizar el avatar:", err))
    .finally(() => {
      avatarPopup.renderLoading(false); // Restaura a "Guardar"
    });
});
avatarPopup.setEventListeners();

// --- VALIDACIONES DE FORMULARIOS ---
const editProfileValidator = new FormValidator(validationConfig, profileForm);
const addCardValidator = new FormValidator(validationConfig, addCardForm);
const avatarValidator = new FormValidator(validationConfig, avatarForm);

editProfileValidator.setEventListeners();
addCardValidator.setEventListeners();
avatarValidator.setEventListeners();

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

avatarContainer.addEventListener("click", () => {
  avatarPopup.open();
});
