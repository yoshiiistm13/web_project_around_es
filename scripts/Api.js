export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      // ◄ CORREGIDO
      headers: this._headers, // ◄ CORREGIDO
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  getUserCard() {
    return fetch(`${this._baseUrl}/cards`, {
      // ◄ CORREGIDO
      headers: this._headers, // ◄ CORREGIDO
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  editUserProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers, // Aquí ya va tu authorization y Content-Type
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json(); // Si tiene éxito, devuelve el objeto que te describe el ejercicio
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  changeLikeStatus(cardId, isLiked) {
    // Si ya tiene like (true), mandamos DELETE para quitarlo. Si no (false), mandamos PUT para ponerlo.
    const method = isLiked ? "DELETE" : "PUT";

    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: method,
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json(); // El servidor te regresa el objeto de la tarjeta actualizado
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error al eliminar la tarjeta: ${res.status}`);
    });
  }
}
