export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._jobElement.textContent,
      avatar: this._avatarElement ? this._avatarElement.src : null,
    };
  }

  setUserInfo({ name, description, avatar }) {
    if (name) this._nameElement.textContent = name;
    if (description) this._jobElement.textContent = description;
    if (avatar && this._avatarElement) this._avatarElement.src = avatar;
  }
}
