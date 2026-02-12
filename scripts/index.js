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

const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

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
  popupElement.classList.remove("popup_opened");
}

// Conectamos el manejador al formulario:
formElement.addEventListener("submit", handleProfileFormSubmit);

const cardTemplate = document.querySelector("#template__card");

function getCardElement(name, link) {
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
