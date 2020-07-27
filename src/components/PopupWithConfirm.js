import { Popup } from './Popup.js';

export class PopupWithConfirm extends Popup {
    constructor(popupSelector, { handleRemoveSubmit }) {
        super(popupSelector);
        this._handleRemoveSubmit = handleRemoveSubmit;
        this.setSubmit = this.setSubmit.bind(this);
        this._button = this._popupForm.querySelector('.popup__save-button');
        this._startValue = this._button.textContent;
    }

    open(item, card) {
        this._card = card;
        this._item = item;
        this._setEventListeners();
        super.open();
    }

    setSubmit() {
        this._popupForm.addEventListener('submit', evt => this._handleRemoveSubmit(evt, this._item, this._card));
    }

    _setEventListeners() {
        super.setEventListeners();
    }
}