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

initialCards.forEach((element) => console.log(element.name));

const openModalInfo = document.querySelector("#edit-popup");
const editInfo = document.querySelector(".profile__edit-button");
const closeButton = openModalInfo.querySelector(".popup__close"); // Nueva variable

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

editInfo.addEventListener("click", () => {
  openModal(openModalInfo);
});

closeButton.addEventListener("click", () => {
  closeModal(openModalInfo);
});

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const jobInput = document.querySelector(".popup__input_type_description");
const nameInput = document.querySelector(".popup__input_type_name");
const btnGuardarPerfil = document.querySelector(".popup__button");

const errorElement = document.querySelector("#name-error");
const errorJob = document.querySelector("#job-error");

nameInput.addEventListener("input", function () {
  if (!nameInput.validity.valid) {
    errorElement.textContent = nameInput.validationMessage;
    errorElement.classList.add("visible");
    nameInput.classList.add("popup__input_type_error");
    btnGuardarPerfil.disabled = true;
    btnGuardarPerfil.classList.add("button_inactive");
  } else {
    errorElement.textContent = "";
    errorElement.classList.remove("visible");

    // AQUÍ: Solo activa si el OTRO input (jobInput) también es válido
    if (jobInput.validity.valid) {
      btnGuardarPerfil.disabled = false;
      btnGuardarPerfil.classList.remove("button_inactive");
    }
  }
});

jobInput.addEventListener("input", function () {
  if (!jobInput.validity.valid) {
    errorJob.textContent = jobInput.validationMessage;
    errorJob.classList.add("visible");
    jobInput.classList.add("popup__input_type_error");
    btnGuardarPerfil.disabled = true;
    btnGuardarPerfil.classList.add("button_inactive");
  } else {
    errorJob.textContent = "";
    errorJob.classList.remove("visible");

    if (nameInput.validity.valid) {
      btnGuardarPerfil.disabled = false;
      btnGuardarPerfil.classList.remove("button_inactive");
    }
  }
});

const titleInput = document.querySelector(".popup__input_type_card-name");
const imageInput = document.querySelector(".popup__input_type_url");
const btnGuardarLugar = document.querySelector(".button.popup__button");

const errorTitle = document.querySelector("#title-error");
const errorImage = document.querySelector("#image-error");

// 1. Definimos la función para controlar el estado del botón
const toggleButtonState = () => {
  if (titleInput.validity.valid && imageInput.validity.valid) {
    btnGuardarLugar.disabled = false;
    btnGuardarLugar.classList.remove("button_inactive");
  } else {
    btnGuardarLugar.disabled = true;
    btnGuardarLugar.classList.add("button_inactive");
  }
};

titleInput.addEventListener("input", function () {
  if (!titleInput.validity.valid) {
    errorTitle.textContent = titleInput.validationMessage;
    errorTitle.classList.add("visible");
    titleInput.classList.add("popup__input_type_error");
  } else {
    errorTitle.textContent = "";
    errorTitle.classList.remove("visible");
    titleInput.classList.remove("popup__input_type_error");
  }
  // 2. Llamamos a la función en cada cambio
  toggleButtonState();
});

imageInput.addEventListener("input", function () {
  if (!imageInput.validity.valid) {
    errorImage.textContent = imageInput.validationMessage;
    errorImage.classList.add("visible");
    imageInput.classList.add("popup__input_type_error");
  } else {
    errorImage.textContent = "";
    errorImage.classList.remove("visible");
    imageInput.classList.remove("popup__input_type_error");
  }
  // 2. Llamamos a la función en cada cambio
  toggleButtonState();
});

// --------------------------------------

function fillProfileForm() {
  console.log("fillProfileForm se está ejecutando"); // ← Agrega esto

  const currentName = profileTitle.textContent;
  const currentJob = profileDescription.textContent;

  console.log("Nombre actual:", currentName); // ← Y esto
  console.log("Trabajo actual:", currentJob); // ← Y esto

  nameInput.value = currentName;
  jobInput.value = currentJob;
}

function handleOpenEditModal() {
  fillProfileForm(); // Primero llena el formulario
  openModal(openModalInfo); // Luego abre el modal
}

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", handleOpenEditModal);

// --------------------------------------

// Buscamos el formulario en el DOM
let formElement = document.querySelector("#edit-profile-form");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  // 1. Obtén los valores de cada campo desde la propiedad value
  // (Asumiendo que ya definiste nameInput y jobInput previamente)
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  // 2. Selecciona los elementos donde se introducirán los valores
  const profileTitle = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");

  // 3. Inserta nuevos valores utilizando la propiedad textContent
  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  // Opcional: cierra el popup tras guardar (puedes usar una función que ya tengas)
  // togglePopup(document.querySelector("#edit-popup"));

  const popupElement = document.querySelector("#edit-popup");
  closeModal(popupElement);
}

// Conectamos el manejador al formulario:
formElement.addEventListener("submit", handleProfileFormSubmit);

const cardTemplate = document.querySelector("#template__card");

function getCardElement() {
  // Buscamos el elemento .card dentro del template y lo clonamos
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button"); // Ya que está en tu HTML, lo seleccionamos
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // Manejador del botón Like
  likeButton.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_is-active");
  });

  // Manejador del botón Eliminar (opcional, pero recomendado)
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

// 5. Implementar la función handler (controlador) por separado para mayor orden
function handleLikeIcon(evt) {
  // evt.target se refiere al botón exacto que recibió el clic
  evt.target.classList.toggle("card__like-button_is-active");
}

const cardsContainer = document.querySelector(".cards__list");

function renderCard(name, link, container) {
  const newCard = getCardElement(name, link);
  container.prepend(newCard);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsContainer);
});

const addCardButton = document.querySelector(".profile__add-button");

const openNewModal = document.querySelector("#new-card-popup");

addCardButton.addEventListener("click", function () {
  openModal(openNewModal);

  const deleteButton = cardElement.querySelector(".card__delete-button");

  deleteButton.addEventListener("click", function () {
    cardElement.remove();
  });
});

// 1. Seleccionamos el modal específico por su ID
const addCardPopup = document.querySelector("#new-card-popup");
// 2. Seleccionamos el botón de cerrar que está DENTRO de ese modal
const closeAddCardButton = addCardPopup.querySelector(".popup__close");
// 3. Configuramos el evento para cerrar
closeAddCardButton.addEventListener("click", function () {
  closeModal(addCardPopup);
});

const newCardForm = document.querySelector("#new-card-form");

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameValue = newCardForm.querySelector(
    ".popup__input_type_card-name",
  ).value;
  const linkValue = newCardForm.querySelector(".popup__input_type_url").value;

  // Renderizamos la nueva tarjeta
  renderCard(nameValue, linkValue, cardsContainer);

  // Limpiamos y cerramos
  newCardForm.reset();
  closeModal(openNewModal);
}

newCardForm.addEventListener("submit", handleCardFormSubmit);

const imagePopup = document.querySelector("#image-popup");
const popupImage = imagePopup.querySelector(".popup__image");
const popupCaption = imagePopup.querySelector(".popup__caption");
const closeImagePopupButton = imagePopup.querySelector(".popup__close");

function getCardElement(name, link) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardTitle.textContent = name;
  cardImage.src = link;
  cardImage.alt = name;

  // Lógica de Like
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_is-active");
  });

  // Lógica de Eliminar (¡Aquí está la solución!)
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  // Lógica de Zoom
  cardImage.addEventListener("click", () => {
    popupCaption.textContent = name;
    popupImage.src = link;
    popupImage.alt = name;
    openModal(imagePopup);
  });

  return cardElement;
}

// Seleccionamos el botón de cerrar del modal de imagen (si no lo habías hecho en el Paso 1)

// Establecemos el detector de clics para cerrar el modal
closeImagePopupButton.addEventListener("click", function () {
  // Cuando se haga clic en el botón de cerrar, el modal debe cerrarse
  closeModal(imagePopup);
});

// Seleccionamos todos los popups de la página
const popups = document.querySelectorAll(".popup");

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    // Si el clic es en el fondo oscuro (clase popup) o en el botón cerrar (clase popup__close)
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
});

// Función para cerrar con la tecla Escape
document.addEventListener("keydown", (evt) => {
  if (evt.key === "Escape") {
    // Buscamos el popup que esté abierto en ese momento
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
});

// Evento para abrir el popup de "Nuevo Lugar" que se cortó en tu mensaje
const openNewModalButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");

openNewModalButton.addEventListener("click", () => {
  openModal(newCardPopup);
});
