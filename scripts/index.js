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
