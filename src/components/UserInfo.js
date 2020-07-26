export class UserInfo {
    constructor({ profile, description }) {
        this._name = document.querySelector(profile);
        this._description = document.querySelector(description);
    }
    getUserInfo() {
        return {
            name: this._name.textContent,
            description: this._description.textContent
        }
    }
    setUserInfo(formData) {
        this._name.textContent = formData.name;
        this._description.textContent = formData.about;
    }
}