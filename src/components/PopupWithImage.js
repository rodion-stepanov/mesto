import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open(data) {
        super.open();
        super.setEventListeners();
        const _popupImage = document.querySelector(".popup__image");
        _popupImage.src = data.link;
        _popupImage.alt = data.name;
        this._popupSelector.querySelector(".popup__caption").textContent = data.name;
    }
}