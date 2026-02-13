# Tripleten web_project_around_es

# 📸 Galería Interactiva - Around the US

Una aplicación web dinámica que permite a los usuarios gestionar su perfil y administrar una colección de tarjetas de lugares, incluyendo funcionalidades de edición, creación, eliminación y visualización de imágenes.

## 🛠️ Tecnologías Utilizadas

- **HTML5:** Estructura semántica y uso de `<template>`.
- **CSS3:** Estilos responsivos y animaciones de modales.
- **JavaScript (ES6+):** Manipulación del DOM, manejo de eventos y programación funcional.

## 📝 Explicación del Código (Paso a Paso)

### 1. Datos y Configuración Inicial

- `const initialCards = [...]`: Define el array de objetos con los datos de las tarjetas que se verán al cargar la página.
- `initialCards.forEach(...)`: Itera sobre los datos iniciales para imprimirlos en consola y luego renderizarlos.

### 2. Gestión de Ventanas Modales (Popups)

- `const openModalInfo = document.querySelector("#edit-popup")`: Captura el modal de edición de perfil.
- `function openModal(modal)`: Agrega la clase `popup_is-opened` para mostrar el modal recibido por parámetro.
- `function closeModal(modal)`: Elimina la clase `popup_is-opened` para ocultar el modal.
- `editInfo.addEventListener("click", ...)`: Escucha el clic en el botón de perfil para abrir el modal.
- `closeButton.addEventListener("click", ...)`: Escucha el clic en la "X" para cerrar el modal.

### 3. Edición de Perfil

- `function fillProfileForm()`: Copia los valores actuales de la página (`textContent`) a los campos del formulario (`value`) para que no aparezcan vacíos.
- `function handleProfileFormSubmit(evt)`:
  - `evt.preventDefault()`: Detiene la recarga de la página al enviar el formulario.
  - Actualiza el texto del perfil en el DOM con la información nueva de los inputs.
  - Cierra el popup tras guardar los cambios.

### 4. La Fábrica de Tarjetas (getCardElement)

- `const cardTemplate = document.querySelector("#template__card")`: Selecciona la plantilla HTML.
- `const cardElement = cardTemplate.content.cloneNode(true)`: Crea una copia exacta de la estructura de la tarjeta para usarla.
- `cardTitle.textContent = name`: Inserta el nombre del lugar en la tarjeta clonada.
- `cardImage.src = link`: Inserta la URL de la imagen en el atributo src.
- `likeButton.addEventListener(...)`: Configura el botón de "corazón" para cambiar su estado visual con `toggle`.
- `deleteButton.addEventListener(...)`: Configura el botón de "basura" para ejecutar `cardElement.remove()`.

### 5. Interacción con Imágenes (Zoom)

- `cardImage.addEventListener("click", ...)`: Al hacer clic en la foto de una tarjeta, transfiere sus datos (URL y Título) al modal de imagen grande (`imagePopup`) y lo abre.

### 6. Creación de Nuevas Tarjetas

- `function handleCardFormSubmit(evt)`:
  - Captura los datos escritos por el usuario en el formulario de "Lugar Nuevo".
  - `renderCard(...)`: Inserta la nueva tarjeta al principio de la lista usando `prepend`.
  - `newCardForm.reset()`: Borra el contenido de los inputs automáticamente.

## 👤 Autor

- **@yoshiiistm** - _Desarrollador Junior_ - [Proyecto en GitHub](https://yoshiiistm13.github.io/web_project_around_es/)

---

_Este proyecto fue desarrollado como práctica de manipulación avanzada del DOM y manejo de eventos en JavaScript._
