import {Popup} from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }
    open() {
        super.open();
        this._popupSelector.querySelector('.cards__image').addEventListener('click', () => {
            const _cardImage = this._popupSelector.querySelector('.cards__image');
            const _popupImage = document.querySelector(".popup__image");
            _popupImage.src = _cardImage.src;
            _popupImage.alt = _cardImage.alt;
            this._popupSelector.querySelector(".popup__caption").textContent = _cardImage.alt;

        });

    }
}